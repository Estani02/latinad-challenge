'use client';
import {Specific} from '.';

import {useAppSelector} from '@/hooks';

export function Filters() {
  const {startEnd, coordinates} = useAppSelector((state) => state.campaign);

  return (
    <div
      className={
        startEnd && coordinates
          ? 'lg:px-4" mt-2 flex w-full flex-col items-center gap-4 rounded-2xl bg-white py-3 text-weak lg:flex-row lg:gap-0 lg:rounded-full'
          : 'hidden'
      }
    >
      <Specific.Form.Filters />
    </div>
  );
}
