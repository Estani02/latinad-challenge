'use client';
import React, {useState, useCallback} from 'react';
import {AutoComplete, Input} from 'antd';
import {MapPin} from 'lucide-react';
import {ControllerRenderProps, FieldValues, Path} from 'react-hook-form';
import axios from 'axios';
import debounce from 'lodash.debounce';

interface SearchAreaProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
}

interface Coords {
  lat: string;
  lon: string;
  lat_sw: string;
  lng_sw: string;
  lat_ne: string;
  lng_ne: string;
}

interface SearchAreaOption {
  value: string;
  coords: Coords;
  key: string;
}

export function SearchArea<T extends FieldValues>({field}: SearchAreaProps<T>) {
  const [options, setOptions] = useState<SearchAreaOption[]>([]);
  const [locationSelected, setLocationSelected] = useState<string>('');

  const handleSearch = async (value: string) => {
    if (!value) {
      setOptions([]);

      return;
    }

    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: value,
          format: 'json',
          addressdetails: 1,
          limit: 5,
        },
      });

      const results = response.data.map(
        (item: {
          name: string;
          display_name: string;
          lat: string;
          lon: string;
          place_id: number;
          boundingbox: string[];
        }) => ({
          value: item.display_name,
          coords: {
            lat: item.lat,
            lon: item.lon,
            lat_sw: item.boundingbox[0],
            lng_sw: item.boundingbox[2],
            lat_ne: item.boundingbox[1],
            lng_ne: item.boundingbox[3],
          },
          key: item.place_id,
        }),
      );

      setOptions(results);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching search results:', error);
    }
  };

  // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
  const debouncedHandleSearch = useCallback(debounce(handleSearch, 300), []);

  const onSelect = (value: string, option: SearchAreaOption) => {
    setLocationSelected(value);
    field.onChange(option.coords);
  };

  const onClear = () => {
    setLocationSelected('');
    field.onChange({lan: '', lon: '', lat_sw: '', lng_sw: '', lat_ne: '', lng_ne: ''});
  };

  return (
    <div className="flex h-fit w-full items-center rounded-full bg-white px-4 py-2 lg:w-auto lg:bg-none lg:p-0">
      <MapPin className="text-weak" size={20} />
      <div className="flex w-full flex-col px-3 lg:w-auto">
        <span className="pl-1 text-xs text-weak">Zona de campaña</span>
        <AutoComplete
          allowClear
          className="h-fit w-full lg:w-[400px]"
          notFoundContent="No hay resultados"
          options={options}
          value={locationSelected}
          onChange={(value) => {
            if (!value) {
              onClear();
            } else {
              setLocationSelected(value);
            }
          }}
          onSearch={debouncedHandleSearch}
          onSelect={onSelect}
        >
          <Input
            required
            className="border-none p-0 pl-2 pr-6 outline-none"
            placeholder="¿A dónde la apuntas?"
          />
        </AutoComplete>
      </div>
    </div>
  );
}
