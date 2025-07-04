import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor
} from '@payloadcms/richtext-lexical'

import {Block} from 'payload'

export const RichText: Block = {
  slug: 'richText',
  interfaceName: 'RichText',
  labels:{
    singular: 'Rich Text',
    plural: 'Rich Texts',
  },
  fields: [
    {
      name: 'copy',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
          ]
        },
      }),
      label: false,
      required: true,
    },
  ]
}