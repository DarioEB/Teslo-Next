import {
  useState,
  useContext
} from 'react';

import {
  GetStaticPaths,
  NextPage,
  GetStaticProps
} from 'next';

import {
  useRouter
} from 'next/router';

import {
  Box,
  Button,
  Chip,
  Grid,
  Typography
} from '@mui/material';

import { CartContext } from '../../context';

import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui';

import {
  ICartProduct,
  IProduct,
  ISize
} from '../../interfaces';

import { dbProducts } from '../../database';

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {

  const router = useRouter();

  const { addProductToCart } = useContext(CartContext);

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 0
  });

  const onSelectedSize = (size: ISize) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      size
    }))
  }

  const onUpdatedQuantity = (quantity: number) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      quantity
    }));
  }

  const onAddProduct = () => {
    if (!tempCartProduct.size) return;
  
    addProductToCart(tempCartProduct);
    router.push('/cart');

  }

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>

        <Grid item xs={12} sm={7}>
          <ProductSlideshow
            images={product.images}
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection={'column'}>

            {/* title */}
            <Typography variant={'h1'} component={'h1'}>{product.title}</Typography>
            <Typography variant={'subtitle1'} component={'h2'}>$ {product.price}</Typography>

            {/* stock */}
            <Box sx={{ my: 2 }}>
              <Typography variant={'subtitle2'}>Stock</Typography>

              <ItemCounter
                currentValue={tempCartProduct.quantity}
                updatedQuantity={onUpdatedQuantity}
                maxValue={(product.inStock > 5) ? 5 : product.inStock}
              />

              <SizeSelector
                selectedSize={tempCartProduct.size}
                sizes={product.sizes}
                onSelectedSize={onSelectedSize}
              />
            </Box>

            {
              product.inStock > 0 ? (
                <Button
                  color={'secondary'}
                  className='circular-btn'
                  onClick={onAddProduct}
                >
                  {tempCartProduct.size
                    ? 'Agregar al carrito'
                    : 'Seleccione una talla'
                  }
                </Button>
              ) : (
                <Chip
                  label={'No hay disponibles'}
                  color={'error'}
                  variant={'outlined'}
                />
              )
            }

            <Box sx={{ mt: 3 }}>
              <Typography variant={'subtitle2'}>Descripción</Typography>
              <Typography variant={'body2'}>{product.description}</Typography>
            </Box>

          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

// getServerSideProps - implementación
// NO USAR ESTO... SSR
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {

//   const { slug = '' } = params as {slug: string};
  // const product = await dbProducts.getProductBySlug(slug);

//   if (!product) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {
//       product
//     }
//   }
// }

// getStaticPaths...
export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const productSlugs = await dbProducts.getAllProductSlugs();

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: 'blocking'
  }
}

// getStaticProps...
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  console.log(product);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    // Revalidatión de los datos de la página cada 24 horas
    revalidate: 60 * 60 * 24
  }
}

export default ProductPage;