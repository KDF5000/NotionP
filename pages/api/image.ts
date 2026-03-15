import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Block ID is required' });
  }

  try {
    const block = await notion.blocks.retrieve({ block_id: id });

    // @ts-ignore
    if (block.type === 'image' && block.image.type === 'file') {
      // @ts-ignore
      const url = block.image.file.url;
      // Cache the redirect for 50 minutes (Notion URLs last 60 mins)
      res.setHeader('Cache-Control', 'public, max-age=3000, s-maxage=3000');
      return res.redirect(307, url);
    } 
    // @ts-ignore
    else if (block.type === 'image' && block.image.type === 'external') {
       // @ts-ignore
      return res.redirect(307, block.image.external.url);
    }

    return res.status(404).json({ error: 'Image not found or not a file type' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
