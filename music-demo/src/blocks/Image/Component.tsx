import {Image} from '@/payload-types'

export function ImageBlock(block: Image) {
  console.log('image: ', block)
  return (
    <section className="block image-block">
      <img src={block.image?.url} alt={block.image?.alt} />
    </section>
  )
}