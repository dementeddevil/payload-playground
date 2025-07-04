import {Block} from 'payload'

export const Oembed: Block = {
  slug: 'oembed',
  interfaceName: 'Oembed',
  labels:{
    singular: 'oEmbed',
    plural: 'oEmbeds',
  },
  fields: [
    {
      type: 'text',
      name: 'URL',
      required: true
    }
  ]
}