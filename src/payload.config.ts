// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import sharp from 'sharp'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Team } from './collections/Team'
import { Users } from './collections/Users'
import { About } from './collections/About'
import { Contact } from './collections/Contact'
import { Blog } from './collections/Blog'
import { Home } from './collections/Home'
import { PageSettings } from './collections/PageSettings'

import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Media } from './collections/Media'

// import { defaultLexical } from '@/fields/defaultLexical'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    autoLogin: {
      email: 'admin@peritext.illinois.edu',
      username: 'admin',
      password: '12345',
      prefillOnly: true,
    },
  },
  editor: lexicalEditor({}), // Enables Lexical across Payload
  // editor: defaultLexical,
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  collections: [Users, Media, PageSettings, Team, About, Contact, Blog, Home],
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: () => true, // Allow only logged-in users to run jobs
    },
    tasks: [],
  },
})
