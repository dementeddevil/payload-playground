import { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
  slug: 'footer',
  fields: [
    {
      name: 'copyright',
      type: 'text',
      localized: true,
    },
    {
      name: 'footerLinks',
      type: 'array',
      label: 'Footer Links',
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