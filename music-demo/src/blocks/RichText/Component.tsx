import RichTextContent from '@/components/RichText'
import { RichText } from '@/payload-types'

export function RichTextBlock(block: RichText) {

  return (
    <section className="block rte-block rte">
      <RichTextContent data={block.copy} enableGutter={false} />
    </section>
  )
}