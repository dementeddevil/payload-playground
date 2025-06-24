import type { CollectionConfig } from 'payload'

export const Homepage: CollectionConfig = {
  slug: 'homepage',
  admin: {
    pagination: {
      defaultLimit: 1,
    },
  },
  defaultPopulate: {
    news: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'hero',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          required: true,
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'news',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
    },
    {
      name: 'video',
      type: 'text',
      label: 'Video Embed',
    },
    {
      name: 'artists',
      type: 'relationship',
      relationTo: 'artists',
      hasMany: true,
    },
  ],
}
