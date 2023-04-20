import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { splitNum } from '../../helpers/utils/splitNum';
import { useGetOrdersQuery } from '../../store/services/apiService';
import styles from './Bot.module.css';

function Bot() {
  const { data: orders, isLoading } = useGetOrdersQuery(
    {
      take: 10,
      page: 1,
      status: 'Expectation',
    },
    { pollingInterval: 5000 }
  );
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  console.log(orders);

  // const open = Boolean(anchorEl);
  // const id = open ? 'simple-popover' : undefined;

  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'name',
      headerName: 'Имя',
      width: 150,
      editable: true,
      renderCell: (params: any) => <div>{params?.row?.member?.full_name}</div>,
    },
    {
      field: 'phone',
      headerName: 'Телефон',
      width: 150,
      editable: true,
      renderCell: (params: any) => <div>{params?.row?.member?.phone_number}</div>,
    },
    {
      field: 'adress',
      headerName: 'Адрес',
      width: 150,
      editable: true,
    },
    {
      field: 'comment',
      headerName: 'Комментарии',
      width: 150,
      editable: true,
    },
    {
      field: 'orders',
      headerName: 'Заказы',
      width: 168,
      editable: true,
      renderCell: (params: any) => (
        <div>
          {params?.row.products.map((item: any) => (
            <div key={item.id}>
              {item.menu?.name} {item.count}x
            </div>
          ))}
        </div>
      ),
    },
    {
      field: 'total_price',
      headerName: 'Цена',
      width: 110,
      editable: true,
      renderCell: (params: any) => <div>{splitNum(params?.row.total_price)}</div>,
    },
    {
      field: 'status',
      headerName: 'Статус',
      width: 110,
      renderCell: (params: any) => <div style={{ color: '#1890ff' }}>Ожидание</div>,
    },
    {
      field: 'date',
      headerName: 'Действии',
      width: 200,
      editable: false,
      renderCell: (params: any) => (
        <>
          <Button
            aria-describedby={String(params?.row.id)}
            variant="contained"
            onClick={handleClick}
            size="small"
          >
            Статус
          </Button>
          <Popover
            id={String(params?.row.id)}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            sx={{ padding: 2 }}
          >
            <Box display="flex" flexDirection="column">
              <FormControl sx={{ mx: 3, mt: 3, minWidth: 120 }} size="small">
                <InputLabel id={params?.row.id}>Статус</InputLabel>
                <Select
                  labelId={params?.row.id}
                  id={params?.row.id}
                  value={age}
                  label="Статус"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ожидание</MenuItem>
                  <MenuItem value={20}>Принят</MenuItem>
                  <MenuItem value={30}>Отказ</MenuItem>
                </Select>
              </FormControl>
              <Button
                aria-describedby={params?.row.id}
                variant="contained"
                onClick={handleClick}
                size="small"
                sx={{ mt: 2, mx: 3, mb: 3 }}
              >
                Отправить
              </Button>
            </Box>
          </Popover>
        </>
      ),
    },
  ];
  return (
    <div className={styles.bot}>
      <Box sx={{ height: 'calc(100vh - 170px)', width: '100%' }}>
        <DataGrid
          rows={orders?.data ? orders.data : []}
          columns={columns}
          getRowHeight={() => 'auto'}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          loading={isLoading}
        />
      </Box>
    </div>
  );
}

export default Bot;
