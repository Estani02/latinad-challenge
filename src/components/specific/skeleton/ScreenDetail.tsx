import {Skeleton} from 'antd';
import React from 'react';

export function ScreenDetail() {
  return (
    <div className="mt-4 flex h-full w-full items-center justify-center px-[10px] py-6">
      <div className="flex w-full max-w-[1000px] flex-col gap-6 rounded-2xl bg-white">
        <div className="relative h-[300px] w-full overflow-hidden rounded-t-xl">
          <Skeleton.Image active className="!h-full !max-h-[700px] !w-full !max-w-[1000px]" />
        </div>
        <div className="flex flex-col gap-6 p-6">
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </div>
      </div>
    </div>
  );
}
