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
  lat_sw: string;
  lng_sw: string;
  lat_ne: string;
  lng_ne: string;
}

interface SearchAreaOption {
  value: string; // This will store the display_name
  label: string;
  coords: Coords;
}

export function SearchArea<T extends FieldValues>({field}: SearchAreaProps<T>) {
  const [options, setOptions] = useState<SearchAreaOption[]>([]);
  const [locationSelected, setLocationSelected] = useState<string>();

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
        (item: {lat: string; lon: string; display_name: string; boundingbox: string[]}) => ({
          value: item.display_name,
          label: item.display_name,
          coords: {
            lat_sw: item.boundingbox[0],
            lng_sw: item.boundingbox[2],
            lat_ne: item.boundingbox[1],
            lng_ne: item.boundingbox[3],
          },
        }),
      );

      setOptions(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 300), []);

  const onSelect = (value: string, option: SearchAreaOption) => {
    setLocationSelected(value);
    field.onChange(option.coords);
  };

  return (
    <div className="flex h-fit items-center">
      <MapPin className="text-weak" size={20} />
      <div className="flex flex-col px-3">
        <span className="pl-1 text-xs text-weak">Zona de campaña</span>
        <AutoComplete
          allowClear
          className="h-fit"
          labelRender={(option) => option.label}
          options={options}
          value={locationSelected}
          onChange={(value) =>
            field.onChange({
              value,
              label: value,
              coords: {lat_sw: '', lng_sw: '', lat_ne: '', lng_ne: ''},
            })
          }
          onSearch={debouncedHandleSearch}
          onSelect={onSelect}
        >
          <Input className="border-none p-0 pl-1 outline-none" placeholder="¿A dónde la apuntas?" />
        </AutoComplete>
      </div>
    </div>
  );
}
