import { defaultMapImageUrl } from 'react-notion-x'
import { Block } from 'notion-types'

export const mapImageUrl = (url: string, block: Block) => {
  if (!url) {
    return null
  }

  if (block && block.type === "image") {
     // Check if it's a signed URL that expires
     if (url.startsWith('https://s3.us-west-2.amazonaws.com/secure.notion-static.com') || 
        url.startsWith('https://prod-files-secure.s3.us-west-2.amazonaws.com')) {
        return `/api/image?id=${block.id}`
    }
  }

  // FIXME: use the unsigned url, so the image would not expired.
  // @ts-ignore
  if (block && block.format && block.format.display_source) {
      // @ts-ignore
      return defaultMapImageUrl(block.format.display_source, block)
  }
  
  return defaultMapImageUrl(url, block)
}
