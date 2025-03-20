import type { CollectionConfig } from 'payload'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import writeStaticData from '@/app/(payload)/hooks/writeStaticData'

export const Contact: CollectionConfig = {
  slug: 'contact',
  labels: {
    singular: 'Contact Page Entry',
    plural: 'Contact Page Content',
  },
  access: {
    read: () => true, // Publicly readable
    create: () => true, // Allow creation
    update: () => true, // Allow updates
    delete: () => true, // Allow deletion
  },
  admin: {
    useAsTitle: 'displayTitle', // Use computed title field for admin panel
    defaultColumns: ['type', 'sortOrder'],
  },
  fields: [
    {
      name: 'displayTitle',
      type: 'text',
      admin: {
        hidden: true, // Hide from admin form
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Text Block', value: 'text-block' },
        { label: 'Contact', value: 'contact' },
      ],
      admin: {
        description: 'Select whether this entry is a text block or a contact.',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      required: true,
      unique: true,
      admin: {
        description: 'Determines the display order. Lower numbers appear first.',
        position: 'sidebar',
      },
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [FixedToolbarFeature(), ...defaultFeatures], // Keep all standard features
        admin: {
          placeholder: 'Write the main text block for the Contact page...',
        },
      }),
      admin: {
        description: 'Main text block for the Contact page.',
        condition: (data) => data?.type === 'text-block',
      },
    },
    {
      name: 'contact',
      type: 'group',
      admin: {
        condition: (data) => data?.type === 'contact',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'position',
          type: 'text',
          required: true,
        },
        {
          name: 'institution',
          type: 'text',
          required: false,
        },
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media', // References Media Collection
          required: true,
          admin: {
            description: 'Upload an image for the contact person.',
          },
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        if (data?.type === 'contact' && data?.contact?.name) {
          data.displayTitle = `Contact - ${data.contact.name}`
        } else {
          data.displayTitle = 'Text Block'
        }
        return data
      },
    ],
    afterRead: [
      async ({ doc }) => {
        if (doc?.type === 'contact' && doc?.contact?.name) {
          doc.displayTitle = `Contact - ${doc.contact.name}`
        } else {
          doc.displayTitle = 'Text Block'
        }
        return doc
      },
    ],
    afterChange: [(args: any) => writeStaticData(args)],
    afterDelete: [(args: any) => writeStaticData(args)],
  },
}
