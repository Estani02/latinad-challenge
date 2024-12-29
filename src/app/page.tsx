import Image from 'next/image';

import {LaunchCampaign} from '@/components/specific/form/LaunchCampaign';

export default function Home() {
  return (
    <div className="relative h-screen">
      <main className="flex w-full items-center justify-center">
        <LaunchCampaign />
        <Image
          alt="bg"
          className="absolute bottom-0 left-0 right-0"
          height={400}
          src="/bk-latinad.png"
          width={1724}
        />
      </main>
    </div>
  );
}
