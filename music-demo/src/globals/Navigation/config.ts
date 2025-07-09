import { GlobalConfig } from "payload";

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  fields: [
    {
      name: 'navigation links',
      type: 'array',
      label: 'Navigation Links',
      labels: {
        singular: 'Link',
        plural: 'Links',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          localized: true,
        },
        {
          name: 'url',
          type: 'text'
        }
      ],
    },
  ]
}