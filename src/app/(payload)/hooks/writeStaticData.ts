import fs from 'fs';
import path from 'path';
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';

// Helper: Convert "tutorials-overview" => "tutorialsOverview"
const toCamelCase = (str: string): string =>
  str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());

/**
 * Hook to write Payload data into static TypeScript files
 * Runs every time a document is changed inside Payload
 */
const writeStaticData: CollectionAfterChangeHook | CollectionAfterDeleteHook = async (
  args: any,
) => {
  const { collection, req } = args;
  const collectionSlug = collection.slug;
  const camelSlug = toCamelCase(collectionSlug); // For export + filename

  const filePath = path.join(process.cwd(), 'src/static', `${camelSlug}.ts`);

  try {
    const payload = req.payload;

    // Fetch all docs from this collection
    const data = await payload.find({ collection: collectionSlug, pagination: false });

    // Generate the file contents
    const tsContent = `export const ${camelSlug}Data = ${JSON.stringify(data.docs, null, 2)};\n`;

    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write the static file
    fs.writeFileSync(filePath, tsContent);
    console.log(`✅ Static data written to: ${filePath}`);
  } catch (error) {
    console.error(`❌ Failed to write static data for ${collectionSlug}:`, error);
  }
};

export default writeStaticData;