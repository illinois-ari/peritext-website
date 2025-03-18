import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: () => true, // Allow access to the admin panel
    create: () => true, //  Allow creating users
    delete: () => true, //  Allow deletion of users
    read: () => true,   //  Allow reading user data
    update: () => true, //  Allow updating users
  },
  auth: true, //  Enables authentication for users
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
  timestamps: true,
}