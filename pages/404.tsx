import { Box, Typography } from '@mui/material';
import {
  ShopLayout
} from '../components/layouts';

export default function Custom404() {

  return (
    <ShopLayout title={'Page not found'} pageDescription={'No hay contenido que mostrar'}>
      <Box 
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        height={'calc(100vh - 200px)'}
        sx={{ flexDirection: {xs: 'column', sm: 'row'} }}
      >
        <Typography variant={'h1'} component={'h1'} fontSize={50} fontWeight={100}>404 |</Typography>
        <Typography marginLeft={2}>La página no existe</Typography>
      </Box>
    </ShopLayout>
  )
}