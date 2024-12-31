import {Alert, List, Pagination} from 'antd';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import Link from 'next/link';

import {useAppSelector} from '@/hooks';
import {fetchCampaignRequest} from '@/features/campaignSlice';

export function CampaignsResult() {
  const dispatch = useDispatch();
  const {data, currentPage, coordinates, startEnd} = useAppSelector((state) => state.campaign);
  const [perPage, setPerPage] = useState(5);

  const listData = data?.data.map((item) => ({
    name: item.name,
    id: item.id,
  }));

  const handlePageChange = (page: number, pageSize?: number) => {
    const newPerPage = pageSize || perPage;

    setPerPage(newPerPage);
    dispatch(fetchCampaignRequest({coordinates, startEnd, page, per_page: newPerPage}));
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-6">
      <List
        bordered
        className="h-[280px] w-full overflow-hidden overflow-y-auto"
        dataSource={listData}
        header={<h5 className="font-medium">Resultados de la zona</h5>}
        renderItem={(item) => (
          <List.Item>
            <Link href={`/detalle-pantalla/${item.id}`}>{item.name}</Link>
          </List.Item>
        )}
      />
      <div className="flex flex-col items-center justify-center gap-2 lg:gap-4">
        <Pagination
          current={currentPage}
          pageSize={perPage}
          size="small"
          total={data?.total}
          onChange={handlePageChange}
        />
        <Alert
          showIcon
          className="py-2 text-xs lg:py-3 lg:text-sm"
          description="El mapa mostrará solo los ítems visibles en la página actual, según la cantidad seleccionada."
          type="info"
        />
      </div>
    </div>
  );
}
