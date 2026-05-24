import { Client } from '@notionhq/client';
import type { ExtendedRecordMap, Block } from 'notion-types';

const notion = new Client({ auth: process.env.NOTION_SECRET_KEY });

// Official API block type → notion-types block type
const BLOCK_TYPE_MAP: Record<string, string> = {
  paragraph: 'text',
  heading_1: 'header',
  heading_2: 'sub_header',
  heading_3: 'sub_sub_header',
  bulleted_list_item: 'bulleted_list',
  numbered_list_item: 'numbered_list',
  to_do: 'to_do',
  toggle: 'toggle',
  code: 'code',
  quote: 'quote',
  image: 'image',
  video: 'video',
  embed: 'embed',
  bookmark: 'bookmark',
  callout: 'callout',
  divider: 'divider',
  table_of_contents: 'table_of_contents',
  child_page: 'page',
  child_database: 'text',
  column_list: 'column_list',
  column: 'column',
  equation: 'equation',
  pdf: 'pdf',
  audio: 'audio',
  file: 'file',
  table: 'table',
  table_row: 'table_row',
  link_preview: 'embed',
  sync_block: 'transclusion_container',
  unsupported: 'text',
};

function stripDashes(id: string): string {
  return id.replace(/-/g, '');
}

function convertRichTextToDecorations(richText: any[]): any[][] {
  if (!richText || richText.length === 0) return [[]];

  return richText.map((rt: any) => {
    const text = rt.plain_text || rt.text?.content || '';
    const decorations: any[][] = [];

    if (rt.annotations?.bold) decorations.push(['b']);
    if (rt.annotations?.italic) decorations.push(['i']);
    if (rt.annotations?.strikethrough) decorations.push(['s']);
    if (rt.annotations?.underline) decorations.push(['u']);
    if (rt.annotations?.code) decorations.push(['c']);

    const href = rt.href || rt.text?.link?.url;
    if (href) {
      decorations.push(['a', href]);
    }

    const color = rt.annotations?.color;
    if (color && color !== 'default') {
      decorations.push(['h', color]);
    }

    return [text, decorations];
  });
}

function getMediaUrl(data: any): string {
  if (!data) return '';
  if (data.type === 'external') return data.external?.url || '';
  if (data.type === 'file') return data.file?.url || '';
  return '';
}

function convertBlock(officialBlock: any, childIds: string[] = []): any {
  const type = BLOCK_TYPE_MAP[officialBlock.type] || 'text';
  const blockId = stripDashes(officialBlock.id);
  const parentId = officialBlock.parent?.page_id
    ? stripDashes(officialBlock.parent.page_id)
    : officialBlock.parent?.database_id
      ? stripDashes(officialBlock.parent.database_id)
      : officialBlock.parent?.block_id
        ? stripDashes(officialBlock.parent.block_id)
        : '';

  const block: any = {
    id: blockId,
    type,
    parent_id: parentId,
    parent_table: officialBlock.parent?.type === 'page_id'
      ? 'block'
      : officialBlock.parent?.type === 'block_id'
        ? 'block'
        : officialBlock.parent?.type || 'block',
    version: 1,
    created_time: new Date(officialBlock.created_time).getTime(),
    last_edited_time: new Date(officialBlock.last_edited_time).getTime(),
    alive: true,
    created_by_table: 'notion_user',
    created_by_id: officialBlock.created_by?.id ? stripDashes(officialBlock.created_by.id) : '',
    last_edited_by_table: 'notion_user',
    last_edited_by_id: officialBlock.last_edited_by?.id ? stripDashes(officialBlock.last_edited_by.id) : '',
  };

  if (childIds.length > 0) {
    block.content = childIds;
  }

  const data = officialBlock[officialBlock.type];
  if (!data) return block;

  switch (officialBlock.type) {
    case 'paragraph':
    case 'heading_1':
    case 'heading_2':
    case 'heading_3':
    case 'toggle':
    case 'bulleted_list_item':
    case 'numbered_list_item':
      block.properties = {
        title: convertRichTextToDecorations(data.rich_text || []),
      };
      break;

    case 'callout': {
      block.properties = {
        title: convertRichTextToDecorations(data.rich_text || []),
      };
      if (data.icon?.emoji) {
        block.format = { page_icon: data.icon.emoji };
      } else if (data.icon?.type === 'external') {
        block.format = { page_icon: data.icon.external?.url };
      } else if (data.icon?.type === 'file') {
        block.format = { page_icon: data.icon.file?.url };
      }
      break;
    }

    case 'quote':
      block.properties = {
        title: convertRichTextToDecorations(data.rich_text || []),
      };
      break;

    case 'to_do':
      block.properties = {
        title: convertRichTextToDecorations(data.rich_text || []),
        checked: [[data.checked ? 'Yes' : 'No']],
      };
      break;

    case 'code':
      block.properties = {
        title: convertRichTextToDecorations(data.rich_text || []),
        language: [[data.language || 'plain text']],
      };
      break;

    case 'image': {
      const url = getMediaUrl(data);
      block.properties = { source: [[url]] };
      if (data.caption?.length) {
        block.properties.caption = convertRichTextToDecorations(data.caption);
      }
      block.format = {
        display_source: url,
        block_width: 1232,
        block_height: 693,
        block_preserve_scale: true,
      };
      break;
    }

    case 'video': {
      const url = getMediaUrl(data);
      block.properties = { source: [[url]] };
      if (data.caption?.length) {
        block.properties.caption = convertRichTextToDecorations(data.caption);
      }
      block.format = {
        display_source: url,
        block_width: 1232,
        block_height: 693,
        block_preserve_scale: true,
      };
      break;
    }

    case 'embed': {
      block.properties = { source: [[data.url || '']] };
      block.format = {
        display_source: data.url || '',
        block_width: 1232,
        block_height: 693,
      };
      break;
    }

    case 'bookmark':
      block.properties = {
        link: [[data.url || '']],
        title: data.caption?.length ? convertRichTextToDecorations(data.caption) : [[data.url || '']],
        description: [[]],
      };
      break;

    case 'equation':
      block.properties = {
        title: [[data.expression || '']],
      };
      break;

    case 'divider':
    case 'table_of_contents':
      break;

    case 'column_list':
    case 'column':
      // content array already set via childIds
      break;

    case 'child_page':
      block.properties = {
        title: [[data.title || '']],
      };
      break;

    case 'child_database':
      block.properties = {
        title: [[data.title || '']],
      };
      break;

    case 'audio': {
      const url = getMediaUrl(data);
      block.properties = { source: [[url]] };
      if (data.caption?.length) {
        block.properties.caption = convertRichTextToDecorations(data.caption);
      }
      break;
    }

    case 'file': {
      const url = getMediaUrl(data);
      block.properties = { source: [[url]] };
      if (data.caption?.length) {
        block.properties.caption = convertRichTextToDecorations(data.caption);
      }
      break;
    }

    case 'pdf': {
      const url = getMediaUrl(data);
      block.properties = { source: [[url]] };
      break;
    }

    case 'link_preview': {
      block.properties = { source: [[data.url || '']] };
      block.format = {
        display_source: data.url || '',
        block_width: 1232,
        block_height: 693,
      };
      break;
    }

    default:
      // Fallback: try to extract rich_text if available
      if (data?.rich_text) {
        block.properties = {
          title: convertRichTextToDecorations(data.rich_text),
        };
      }
      break;
  }

  return block;
}

async function fetchAllBlocks(parentId: string): Promise<any[]> {
  let response = await notion.blocks.children.list({
    block_id: parentId,
    page_size: 100,
  });

  let blocks = [...response.results];

  while (response.has_more && response.next_cursor) {
    response = await notion.blocks.children.list({
      block_id: parentId,
      page_size: 100,
      start_cursor: response.next_cursor,
    });
    blocks = blocks.concat(response.results);
  }

  // Recursively fetch children for blocks that have them
  const results: any[] = [];
  for (const block of blocks) {
    if ((block as any).has_children) {
      const children = await fetchAllBlocks(block.id);
      (block as any)._children = children;
    }
    results.push(block);
  }

  return results;
}

function processBlocksIntoMap(blocks: any[], blockMap: Record<string, any>): void {
  for (const block of blocks) {
    const children = (block as any)._children || [];
    const childIds = children.map((c: any) => stripDashes(c.id));

    const converted = convertBlock(block, childIds);
    blockMap[converted.id] = { role: 'editor', value: converted };

    if (children.length > 0) {
      processBlocksIntoMap(children, blockMap);
    }
  }
}

export async function getPageRecordMap(pageId: string): Promise<ExtendedRecordMap> {
  // Fetch page metadata
  const page = await notion.pages.retrieve({ page_id: pageId }) as any;

  // Fetch all blocks recursively
  const blocks = await fetchAllBlocks(pageId);

  // Build block map
  const blockMap: Record<string, any> = {};

  // Create the page block
  const pageBlockId = stripDashes(pageId);
  const pageBlock: any = {
    id: pageBlockId,
    type: 'page',
    parent_id: page.parent?.page_id ? stripDashes(page.parent.page_id)
      : page.parent?.database_id ? stripDashes(page.parent.database_id)
        : '',
    parent_table: page.parent?.type === 'page_id' ? 'block' : 'space',
    version: 1,
    created_time: new Date(page.created_time).getTime(),
    last_edited_time: new Date(page.last_edited_time).getTime(),
    alive: true,
    created_by_table: 'notion_user',
    created_by_id: page.created_by?.id ? stripDashes(page.created_by.id) : '',
    last_edited_by_table: 'notion_user',
    last_edited_by_id: page.last_edited_by?.id ? stripDashes(page.last_edited_by.id) : '',
    content: blocks.map(b => stripDashes(b.id)),
    properties: {},
    format: {},
    permissions: [{ role: 'editor', type: 'user_permission' }],
    file_ids: [],
  };

  // Set page title
  const titleProp = Object.values(page.properties || {}).find((p: any) => p.type === 'title') as any;
  if (titleProp?.title) {
    pageBlock.properties.title = convertRichTextToDecorations(titleProp.title);
  }

  // Set page cover
  if (page.cover) {
    pageBlock.format.page_cover = page.cover.type === 'external'
      ? page.cover.external?.url
      : page.cover.file?.url;
    pageBlock.format.page_cover_position = 0.5;
  }

  // Set page icon
  if (page.icon) {
    if (page.icon.type === 'emoji') {
      pageBlock.format.page_icon = page.icon.emoji;
    } else if (page.icon.type === 'external') {
      pageBlock.format.page_icon = page.icon.external?.url;
    } else if (page.icon.type === 'file') {
      pageBlock.format.page_icon = page.icon.file?.url;
    }
  }

  blockMap[pageBlockId] = { role: 'editor', value: pageBlock };

  // Process all child blocks
  processBlocksIntoMap(blocks, blockMap);

  return {
    block: blockMap,
    collection: {},
    collection_view: {},
    notion_user: {},
    collection_query: {},
    signed_urls: {},
  };
}
