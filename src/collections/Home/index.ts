import type { CollectionConfig } from 'payload'
import { lexicalEditor, FixedToolbarFeature } from '@payloadcms/richtext-lexical'

export const Home: CollectionConfig = {
  slug: 'home',
  labels: {
    singular: 'Home Page Section',
    plural: 'Home Page Content',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    defaultColumns: ['content', 'maxUpdates'],
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          FixedToolbarFeature(), 
          ...defaultFeatures,
        ],
        admin: {
          placeholder: 'Type your content here...',
          hideGutter: false,
          hideInsertParagraphAtEnd: false,
        },
      }),
    },
    {
      name: 'maxUpdates',
      type: 'number',
      required: true,
      defaultValue: 3, // Default to 3 latest updates
      admin: {
        position: 'sidebar',
        description: 'Set the number of latest updates to display on the homepage.',
      },
    },
  ],
}
