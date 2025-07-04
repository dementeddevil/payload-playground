import {Block} from 'payload'

export const Quote: Block = {
  slug: 'quote',
  interfaceName: 'Quote',
  labels:{
    singular: 'Quote',
    plural: 'Quotes',
  },
  fields: [
    {
      type: 'textarea',
      name: 'quote text',
      required: true
    },
    {
      type: 'radio',
      name: 'textPosition',
      options:['Left', 'Center', 'Right'],
      defaultValue: 'Left',
    }
  ]
}