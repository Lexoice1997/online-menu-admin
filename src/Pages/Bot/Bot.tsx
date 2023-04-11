import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import styles from './Bot.module.css';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
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
    field: 'orders',
    headerName: 'Заказы',
    width: 110,
    editable: true,
  },
];

const rows = [
  { id: 1, name: 'Snow', phone: 'Jon', orders: 3500 },
  { id: 2, name: 'Lannister', phone: 'Cersei', orders: 4200 },
  { id: 3, name: 'Lannister', phone: 'Jaime', orders: 4500 },
  { id: 4, name: 'Stark', phone: 'Arya', orders: 1600 },
  { id: 5, name: 'Targaryen', phone: 'Daenerys', orders: null },
  { id: 6, name: 'Melisandre', phone: null, orders: 15000 },
  { id: 7, name: 'Clifford', phone: 'Ferrara', orders: 4400 },
  { id: 8, name: 'Frances', phone: 'Rossini', orders: 3600 },
  { id: 9, name: 'Roxie', phone: 'Harvey', orders: 6500 },
];

function Bot() {
  return (
    <div className={styles.bot}>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}

export default Bot;
