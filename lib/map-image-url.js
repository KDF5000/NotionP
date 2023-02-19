import { defaultMapImageUrl } from 'react-notion-x'

export const mapImageUrl = (url, block) => {
  if (!url) {
    return null
  }

  if (block && block.type != "image") {
    return url
  }

  // FIXME: use the unsigned url, so the image would not expired.
  return defaultMapImageUrl(block.format.display_source, block)
}
