import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';

import {
  ShopLayout 
} from '../../components/layouts'

export default function CartPage() {

  return (
    <ShopLayout
      title={'Carrito - 3'}
      pageDescription={'Carrito de compras de la tienda'}
    >
      <Typography variant={'h1'} component={'h1'}>Carrito</Typography>

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
              <Typography variant={'h2'}>Orden</Typography>
              <Divider sx={{ my:1 }} />

              {/* Orden Summary */}
              <OrderSummary />
              
              <Box sx={{ mt:3 }}>
                <Button color={'secondary'} className={'circular-btn'} fullWidth>
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </ShopLayout>
  )
}