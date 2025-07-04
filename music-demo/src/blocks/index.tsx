import { QuoteBlock } from '@/blocks/Quote/Component'
import { ImageBlock } from '@/blocks/Image/Component'
import { RichTextBlock } from '@/blocks/RichText/Component'
import {Artist} from '@/payload-types'
import { Fragment } from 'react'
import { OembedBlock } from './Oembed/Component'

const blockComponents = {
  image: ImageBlock,
  quote: QuoteBlock,
  richText: RichTextBlock,
  oembed: OembedBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Artist['modules']
}> = (props) => {
  const {blocks} = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return <Fragment>
      {blocks.map((block, index) => {
        const {blockType} = block

        if (blockType && blockType in blockComponents) {
          const Block = blockComponents[blockType]

          if (Block) {
            return <div key={index}>
              {/*@ts-expect-error*/}
              <Block {...block} />
            </div>
          }
          return null
        }

      })}
    </Fragment>
  }
  return null
}