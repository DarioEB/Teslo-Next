import NextLink from 'next/link';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography
} from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';

import {
  ShopLayout 
} from '../../components/layouts'

export default function SuumaryPage() {

  return (
    <ShopLayout
      title={'Resumen de orden'}
      pageDescription={'Resumen de la orden'}
    >
      <Typography variant={'h1'} component={'h1'}>Resumen de la orden</Typography>

      <Grid container spacing={2}>
        
        <Grid item xs={12} sm={7}>
          {/* Cart List */}
          <CartList
            editable
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className={'summary-card'} >
            <CardContent>
              <Typography variant={'h2'}>Resumen (3 products)</Typography>
              <Divider sx={{ my:1 }} />

              <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography variant={'subtitle1'}>Dirección de entrega</Typography>
              
                <NextLink
                  href={'/checkout/address'}
                  passHref
                >
                  <Link underline={'always'}>
                    Editar
                  </Link>
                </NextLink>
              </Box>

              <Typography >Dario Barboza</Typography>
              <Typography >323 Algún lugar</Typography>
              <Typography >Inidiana, 235</Typography>
              <Typography >Estados Unidos</Typography>
              <Typography >+1 2323454523</Typography>

              <Divider sx={{my:1}} />

              <Box display={'flex'} justifyContent={'end'}>
                <NextLink href={'/cart'} passHref>
                  <Link underline={'always'}>
                    Editar
                  </Link>
                </NextLink>
              </Box>
              
              {/* Orden Summary */}
              <OrderSummary />
              
              <Box sx={{ mt:3 }}>
                <Button color={'secondary'} className={'circular-btn'} fullWidth>
                  Confirmar orden
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </ShopLayout>
  )
}