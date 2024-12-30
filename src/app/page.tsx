import {CampaignsResult} from '@/components/specific/card/CampaignsResult';
import {LaunchCampaign} from '@/components/specific/form/LaunchCampaign';

export default function Home() {
  return (
    <div className="mt-4 h-full">
      <main className="flex h-full w-full flex-col items-center justify-center gap-6 px-6">
        <LaunchCampaign />
        <CampaignsResult />
      </main>
    </div>
  );
}
