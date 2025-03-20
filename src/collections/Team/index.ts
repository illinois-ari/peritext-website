import type { CollectionConfig } from 'payload'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import writeStaticData from '@/app/(payload)/hooks/writeStaticData'

export const Team: CollectionConfig = {
  slug: 'team',
  labels: {
    singular: 'Team Page Section',
    plural: 'Team Page Content',
  },
  access: {
    read: () => true, // Publicly readable
    create: () => true, // Allow creation
    update: () => true, // Allow updates
    delete: () => true, // Allow deletion
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'sortOrder'],
  },
  hooks: {
    afterChange: [(args: any) => writeStaticData(args)],
    afterDelete: [(args: any) => writeStaticData(args)],
  },
  fields: [
    {
      name: 'sortOrder',
      type: 'number',
      required: true,
      unique: true,
      admin: {
        description: 'Determines the order of teams. Lower numbers appear first.',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'members',
      type: 'array',
      required: true,
      labels: {
        singular: 'Team Member',
        plural: 'Team Members',
      },
      fields: [
        {
          name: 'sortOrder',
          type: 'number',
          required: true,
          admin: {
            description: 'Determines the order of members within this team.',
          },
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media', // References Media Collection
          required: true,
          admin: {
            description: 'Upload an image for the team member.',
          },
        },
        {
          name: 'description',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [FixedToolbarFeature(), ...defaultFeatures],
            admin: {
              placeholder: 'Write a short bio...',
            },
          }),
          admin: {
            description: 'Add a bio for the team member.',
          },
        },
        {
          name: 'social',
          type: 'text',
          required: false,
          admin: {
            description: 'Link to the team member’s social profile (optional).',
          },
        },
      ],
    },
  ],
}
