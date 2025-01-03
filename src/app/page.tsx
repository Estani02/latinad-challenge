import {Specific} from '@/components/';
import {Filters} from '@/components/Filters';

export default function Home() {
  return (
    <div className="mt-4 h-full">
      <main className="flex h-full w-full flex-col items-center justify-center gap-6 px-3 lg:px-6">
        <Specific.Form.LaunchCampaign />
        <Filters />
        <Specific.Card.CampaignsResult />
      </main>
    </div>
  );
}
