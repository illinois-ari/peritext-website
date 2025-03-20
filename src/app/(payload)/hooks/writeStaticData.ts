import fs from 'fs'
import path from 'path'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

/**
 * Hook to write Payload data into static TypeScript files
 * Runs every time a document is changed inside Payload
 */
const writeStaticData: CollectionAfterChangeHook | CollectionAfterDeleteHook = async (
  args: any,
) => {
  const { collection, req } = args
  const collectionSlug = collection.slug // Ensure we get the correct slug
  const filePath = path.join(process.cwd(), 'src/static', `${collectionSlug}.ts`)

  try {
    const payload = req.payload

    // Fetch all data from the collection
    const data = await payload.find({ collection: collectionSlug, pagination: false })

    // Convert to TypeScript format
    const tsContent = `export const ${collectionSlug}Data = ${JSON.stringify(data.docs, null, 2)};`

    // Ensure directory exists before writing
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    // Write the file
    fs.writeFileSync(filePath, tsContent)
    console.log(`✅ Updated static data: ${filePath}`)
  } catch (error) {
    console.error(`❌ Failed to write static data for ${collectionSlug}:`, error)
  }
}

export default writeStaticData
