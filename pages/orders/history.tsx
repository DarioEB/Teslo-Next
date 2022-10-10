import NextLink from 'next/link';
import {
  Chip,
  Grid,
  Link,
  Typography
} from '@mui/material';

import {
  DataGrid,
  GridColDef,
  GridValueGetterParams
} from '@mui/x-data-grid';

import {
  ShopLayout
} from '../../components/layouts';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 100,
  },
  {
    field: 'fullname',
    headerName: 'Nombre completo',
    width: 300,
  },
  {
    field: "paid",
    headerName: "Pagada",
    description: 'Muestra información si está pagada la orden o no',
    width: 200,
    renderCell: (params: GridValueGetterParams) => {
      return (
        params.row.paid
          ? <Chip color={'success'} label={'Pagada'} variant={'outlined'} />
          : <Chip color={'error'} label={'Pagada'} variant={'outlined'} />
      )
    }
  },
  {
    field: "Orden",
    headerName: "Ver orden",
    description: 'Ver detalles de la orden',
    width: 200,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink passHref href={`/orders/${params.row.id}`}>
          <Link underline={'always'}>
            Ver orden
          </Link>
        </NextLink>
      )
    }
  }
];

const rows = [
  { id: 1, paid: true, fullname: 'Dario Eliseo Barboza'},
  { id: 2, paid: true, fullname: 'Melissa Flores'},
  { id: 3, paid: false, fullname: 'Guillermo Rodriguez'},
  { id: 4, paid: true, fullname: 'Neves Daniela'},
  { id: 5, paid: false, fullname: 'Emiliano Granti' },
  { id: 6, paid: true, fullname: 'Emilia Atias'}
]

export default function HistoryPage() {


  return (
    <ShopLayout
      title={'Historial de ordenes'}
      pageDescription={'Historial de ordenes del cliente'}
    >
      <Typography
        variant={'h1'}
        component={'h1'}
      >Historial de ordenes</Typography>

      <Grid container>
        <Grid item sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  )
}