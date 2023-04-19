import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Popover,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { useGetOrdersQuery } from '../../store/services/apiService';
import styles from './Bot.module.css';

const rows = [
  {
    id: 1,
    name: 'Snow',
    phone: '+998972411997',
    adress: 'Нукус мангит',
    comment: 'Order order',
    orders: 'pizza 2x',
    total: 50000,
    status: 'Ожидание',
  },
  {
    id: 2,
    name: 'Snow',
    phone: '+998972411997',
    adress: 'Нукус мангит',
    comment: 'Order order',
    orders: 'pizza 2x',
    total: 50000,
    status: 'Ожидание',
  },
  {
    id: 3,
    name: 'Snow',
    phone: '+998972411997',
    adress: 'Нукус мангит',
    comment: 'Order order',
    orders: 'pizza 2x',
    total: 50000,
    status: 'Ожидание',
  },
  {
    id: 4,
    name: 'Snow',
    phone: '+998972411997',
    adress: 'Нукус мангит',
    comment: 'Order order',
    orders: 'pizza 2x',
    total: 50000,
    status: 'Ожидание',
  },
  {
    id: 5,
    name: 'Snow',
    phone: '+998972411997',
    adress: 'Нукус мангит',
    comment: 'Order order',
    orders: 'pizza 2x',
    total: 50000,
    status: 'Ожидание',
  },
  {
    id: 6,
    name: 'Snow',
    phone: '+998972411997',
    adress: 'Нукус мангит',
    comment: 'Order order',
    orders: 'pizza 2x',
    total: 50000,
    status: 'Ожидание',
  },
  {
    id: 7,
    name: 'Snow',
    phone: '+998972411997',
    adress: 'Нукус мангит',
    comment: 'Order order',
    orders: 'pizza 2x',
    total: 50000,
    status: 'Ожидание',
  },
  {
    id: 8,
    name: 'Snow',
    phone: '+998972411997',
    adress: 'Нукус мангит',
    comment: 'rOrder orderOrder orderOrder orderOrder order',
    orders: 'pizza 2x',
    total: 50000,
    status: 'Ожидание',
  },
  {
    id: 9,
    name: 'Snow',
    phone: '+998972411997',
    adress: 'Нукус мангит',
    comment: 'Order order',
    orders: 'pizza 2x',
    total: 50000,
    status: 'Ожидание',
  },
];

function Bot() {
  const { data: orders, isLoading } = useGetOrdersQuery({
    take: 5,
    page: 1,
    status: 'Expectation',
  });
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 5,
    page: 0,
  });
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  console.log(orders);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
    },
    {
      field: 'phone',
      headerName: 'Телефон',
      width: 150,
      editable: true,
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
              {item.menu.name} {item.count}x
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
    },
    {
      field: 'status',
      headerName: 'Статус',
      width: 110,
      editable: true,
    },
    {
      field: 'date',
      headerName: 'Действии',
      width: 200,
      editable: false,
      renderCell: (params: any) => (
        <>
          <Button aria-describedby={id} variant="contained" onClick={handleClick} size="small">
            Статус
          </Button>
          <Popover
            id={id}
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
                <InputLabel id="demo-select-small">Статус</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
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
                aria-describedby={id}
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
