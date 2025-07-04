import {Block} from 'payload'

export const Image: Block = {
  slug: 'image',
  interfaceName: 'Image',
  labels:{
    singular: 'Image',
    plural: 'Images',
  },
  fields: [
    {
      type: 'upload',
      name: 'image',
      relationTo: 'media',
    }
  ]
}