import { getPayload } from 'payload';
import configPromise from '../payload-config.js';
import fs from 'fs';
import path from 'path';

const collections = ['page-settings', 'about', 'home', 'blog', 'team', 'contact'];

async function generateStaticData() {
  const payload = await getPayload({ config: configPromise });

  for (const collection of collections) {
    console.log(`📦 Fetching data for collection: ${collection}`);

    const data = await payload.find({
      collection,
      pagination: false,
      limit: 1000, // Adjust if necessary
      sort: collection === 'blog' ? '-datePosted' : 'order', // Sort rules per collection
      depth: 2, // Fetch related media file details if needed
    });

    const processedData = data.docs.map((doc) => ({
      ...doc,
      id: String(doc.id), // Convert ID to string for safety
    }));

    // Write to JSON file
    const filePath = path.join(process.cwd(), `src/static/${collection}.json`);
    fs.writeFileSync(filePath, JSON.stringify(processedData, null, 2));

    console.log(`✅ Saved static data for '${collection}' at ${filePath}`);
  }

  console.log("🎉 All static data has been generated successfully!");
}

generateStaticData().catch(console.error);