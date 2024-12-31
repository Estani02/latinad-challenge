'use client';
import {useParams, useRouter} from 'next/navigation';
import {useEffect} from 'react';

import {selectCampaignById} from '@/features/campaignSlice';
import {useAppSelector} from '@/hooks';
import {Specific} from '@/components';

export default function ScreenDetail() {
  const router = useRouter();
  const {id} = useParams<{id: string}>();
  const campaign = useAppSelector((state) => selectCampaignById(state, Number(id)));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router]);

  if (!campaign) {
    return <Specific.Skeleton.ScreenDetail />;
  }

  return (
    <div className="mt-4 flex h-full w-full items-center justify-center px-[10px] py-6">
      <main className="h-full w-full max-w-[1000px] rounded-2xl bg-white">
        <Specific.Card.ScreenDetail />
      </main>
    </div>
  );
}
