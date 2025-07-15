import type { CollectionConfig } from 'payload'
import { auth, signOut } from '@/auth'

import { authenticated } from '../../access/authenticated'
import { isAdmin, isAdminFieldLevel } from '@/access/isAdmin'
import { isAdminOrSelf } from '@/access/isAdminOrSelf'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    // Only admins can create users
    create: isAdmin,
    // Admins can read all, but any other logged in user can only read themselves
    read: isAdminOrSelf,
    // Admins can update all, but any other logged in user can only update themselves
    update: isAdminOrSelf,
    // Only admins can delete
    delete: isAdmin,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'roles',
      // Save this field to JWT so we can use from `req.user`
      saveToJWT: true,
      type: 'select',
      hasMany: true,
      defaultValue: ['editor'],
      access: {
        // Only admins can create or update a value for this field
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
        {
          label: 'Local Editor',
          value: 'localEditor',
        },
      ],
    },
    {
      name: 'accounts',
      type: 'array',
      collection: 'accounts',
      on: 'users',
      admin: {
        defaultColumns: ['id', 'type', 'provider'],
      },
    },
    {
      name: 'locales',
      // Save this field to JWT so we can use from `req.user`
      saveToJWT: true,
      type: 'select',
      hasMany: true,
      defaultValue: ['en'],
      access: {
        // Only admins can create or update a value for this field
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      options: [
        {
          label: 'English',
          value: 'en',
        },
        {
          label: 'French',
          value: 'fr',
        },
        {
          label: 'German',
          value: 'de',
        },
        {
          label: 'Spanish',
          value: 'es',
        },
      ],
    },
  ],
  timestamps: true,
}
