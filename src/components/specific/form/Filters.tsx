'use client';
import {useForm, Controller} from 'react-hook-form';
import {Button, Input, Select} from 'antd';

import {LaunchCampaignType} from '@/types';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {fetchCampaignRequest} from '@/features/campaignSlice';

export function Filters() {
  const {startEnd, coordinates} = useAppSelector((state) => state.campaign);
  const dispatch = useAppDispatch();

  const {control, handleSubmit, reset} = useForm<LaunchCampaignType>({
    defaultValues: {
      coordinates: undefined,
      startEnd: undefined,
      locationType: undefined,
      priceMin: undefined,
      priceMax: undefined,
      search: undefined,
      sizeType: undefined,
    },
  });

  const optionSize = [
    {label: 'Pequeño', value: 'small'},
    {label: 'Mediano', value: 'medium'},
    {label: 'Grande', value: 'big'},
    {label: 'Gigante', value: 'giant'},
  ];

  const optionLocation = [
    {label: 'Interior', value: 'indoor'},
    {label: 'Exterior', value: 'outdoor'},
    {label: 'Punto de venta', value: 'pos'},
    {label: 'Buses', value: 'buses'},
  ];

  const onSubmit = handleSubmit(async (data) => {
    data.coordinates = coordinates;
    data.startEnd = startEnd;

    return dispatch(fetchCampaignRequest(data));
  });

  const filterClean = () => {
    dispatch(
      fetchCampaignRequest({
        coordinates: coordinates,
        startEnd: startEnd,
      }),
    );
    reset();
  };

  return (
    <form
      className="flex w-full flex-col justify-center gap-2 px-3 lg:flex-row lg:items-end lg:gap-5"
      onSubmit={onSubmit}
    >
      <Controller
        control={control}
        name="priceMin"
        render={({field}) => (
          <div className="flex w-full flex-col lg:w-auto">
            <span className="pl-1 text-xs text-weak">Precio mínimo</span>
            <Input allowClear min={1} placeholder="Precio mínimo" type="number" {...field} />
          </div>
        )}
      />
      <Controller
        control={control}
        name="priceMax"
        render={({field}) => (
          <div className="flex w-full flex-col lg:w-auto">
            <span className="pl-1 text-xs text-weak">Precio máximo</span>
            <Input allowClear min={1} placeholder="Precio máximo" type="number" {...field} />
          </div>
        )}
      />
      <Controller
        control={control}
        name="sizeType"
        render={({field}) => (
          <div className="flex w-full flex-col lg:w-auto">
            <span className="pl-1 text-xs text-weak">Tamaño</span>
            <Select allowClear options={optionSize} {...field} placeholder="Tamaño" />
          </div>
        )}
      />
      <Controller
        control={control}
        name="locationType"
        render={({field}) => (
          <div className="flex w-full flex-col lg:w-auto">
            <span className="pl-1 text-xs text-weak">Tipo de ubicación</span>
            <Select
              allowClear
              options={optionLocation}
              {...field}
              placeholder="Tipo de ubicación"
            />
          </div>
        )}
      />
      <Controller
        control={control}
        name="search"
        render={({field}) => (
          <div className="flex w-full flex-col lg:w-auto">
            <span className="pl-1 text-xs text-weak">Nombre</span>
            <Input allowClear placeholder="Busacr por nombre" {...field} />
          </div>
        )}
      />
      <div className="flex flex-col items-end gap-2 lg:flex-row">
        <Button className="bg-primary text-white" htmlType="submit" type="primary">
          Filtrar búsqueda
        </Button>
        <Button color="danger" variant="outlined" onClick={filterClean}>
          Limpiar filtros
        </Button>
      </div>
    </form>
  );
}
