export const dynamic = 'force-static';

import PageSkeleton from '@/components/PageSkeleton';
import DataClient from '@/components/DataClient';
import { pageSettingsData } from "@/static/pageSettings";

const accentColor = '#FF6347';

// Get the page title from pageSettingsData
const pageSettings = pageSettingsData.find(setting => setting.page === "data");
const pageTitle = pageSettings?.title || "Dataset, Exploration & Visualizations";

export default function Data() {
  return (
    <PageSkeleton title={pageTitle} showLine lineColor={accentColor}>
      <DataClient />
    </PageSkeleton>
  );
}