import NextLink from 'next/link';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography
} from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';

import {
  ShopLayout
} from '../../components/layouts'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

export default function OrderPage() {

  return (
    <ShopLayout
      title={'Resumen de la orden - 123123423'}
      pageDescription={'Resumen de la orden'}
    >
      <Typography variant={'h1'} component={'h1'}>Order: ABC123123</Typography>

      <Chip
        sx={{ my: 2 }}
        label={'Pendiente de pago'}
        variant={'outlined'}
        color={'error'}
        icon={<CreditCardOffOutlined />}
      />

      <Chip
        sx={{ my: 2 }}
        label={'Orden ya pagada'}
        variant={'outlined'}
        color={'error'}
        icon={<CreditScoreOutlined />}
      />

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
              <Divider sx={{ my: 1 }} />

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

              <Divider sx={{ my: 1 }} />

              <Box display={'flex'} justifyContent={'end'}>
                <NextLink href={'/cart'} passHref>
                  <Link underline={'always'}>
                    Editar
                  </Link>
                </NextLink>
              </Box>

              {/* Orden Summary */}
              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                {/* Pagar */}
                <Chip
                  sx={{ my: 2 }}
                  label={'Orden ya pagada'}
                  variant={'outlined'}
                  color={'error'}
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </ShopLayout>
  )
}