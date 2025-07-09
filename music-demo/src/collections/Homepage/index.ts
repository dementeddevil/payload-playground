import type { CollectionConfig } from 'payload'

import { isAdmin } from '@/access/isAdmin'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { isLocalized } from '@/access/isLocalized'

export const Homepage: CollectionConfig = {
  slug: 'homepage',
  access: {
    // Only admins can create
    create: isAdmin,
    // All can view if published
    read: authenticatedOrPublished,
    // Only admins can update
    update: isLocalized,
    // Only admins can delete
    delete: isLocalized,
  },
  admin: {
    pagination: {
      defaultLimit: 1,
    },
  },
  labels: {
    plural: "Homepage",
    singular: "Homepage"
  },
  defaultPopulate: {
    news: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'hero',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
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
      name: 'newsSection',
      type: 'group',
      fields:[
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          localized: true,
        },
        {
        name: 'news',
        type: 'relationship',
        relationTo: 'posts',
        hasMany: true,
      },
    ]
    },
    {
      name: 'videoSection',
      type: 'group',
      fields:[
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          localized: true,
        },
        {
          name: 'video',
          type: 'text',
          label: 'Video Embed',
        },
    ]
    },
    {
      name: 'artistsSection',
      type: 'group',
      fields:[
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          localized: true,
        },
        {
          name: 'artists',
          type: 'relationship',
          relationTo: 'artists',
          hasMany: true,
        },
    ]
    },
  ],
}
