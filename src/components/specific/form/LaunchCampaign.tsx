'use client';

import * as z from 'zod';
import {SearchIcon} from 'lucide-react';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {SearchArea} from '../auto-complete/SearchArea';
import {StartEndCampaign} from '../data-picker/StartEndCampaign';

import {LaunchCampaignType} from '@/types';
import {fetchCampaignRequest} from '@/features/campaignSlice';
import {useAppDispatch} from '@/hooks';

const schema = z.object({
  coordinates: z.object({
    lat: z.string().nonempty('Debes seleccionar una opción'),
    lon: z.string().nonempty('Debes seleccionar una opción'),
    lat_sw: z.string().nonempty('Debes seleccionar una opción'),
    lng_sw: z.string().nonempty('Debes seleccionar una opción'),
    lat_ne: z.string().nonempty('Debes seleccionar una opción'),
    lng_ne: z.string().nonempty('Debes seleccionar una opción'),
  }),
  startEnd: z.tuple([
    z.string().nonempty('Debes seleccionar una fecha de inicio'),
    z.string().nonempty('Debes seleccionar una fecha de fin'),
  ]),
});

export function LaunchCampaign() {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LaunchCampaignType>({
    resolver: zodResolver(schema),
    defaultValues: {
      coordinates: {lat: '', lon: '', lat_sw: '', lng_sw: '', lat_ne: '', lng_ne: ''},
      startEnd: [null, null],
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    return dispatch(fetchCampaignRequest(data));
  });

  return (
    <form
      className="mt-10 flex flex-col items-center gap-4 rounded-full px-4 py-2 text-weak lg:flex-row lg:gap-0 lg:bg-white"
      onSubmit={onSubmit}
    >
      <Controller
        control={control}
        name="coordinates"
        render={({field}) => (
          <div className="flex w-full flex-col lg:w-auto lg:gap-1">
            <SearchArea<LaunchCampaignType> field={field} />
          </div>
        )}
      />
      <div className="flex w-full flex-col lg:w-auto lg:gap-1">
        <div className="flex w-full items-center justify-between gap-4 rounded-full bg-white px-4 py-2 lg:w-auto lg:bg-none lg:p-0">
          <Controller
            control={control}
            name="startEnd"
            render={({field}) => <StartEndCampaign<LaunchCampaignType> field={field} />}
          />
          <button
            className="ml-4 rounded-full bg-primary px-5 py-2 text-white transition-colors duration-200 hover:bg-primary-dark disabled:bg-gray-500"
            disabled={Object.keys(errors).length > 0}
            type="submit"
          >
            <SearchIcon size={20} />
          </button>
        </div>
      </div>
    </form>
  );
}
