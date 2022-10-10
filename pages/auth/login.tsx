import { useContext, useState } from 'react';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography
} from '@mui/material';
import { ErrorOutline } from '@mui/icons-material'; 

import { AuthContext } from '../../context'; 

import { validations } from '../../utils'; 

import { AuthLayout } from "../../components/layouts/AuthLayout";

type FormData = {
  email: string,
  password: string,
};

const LoginPage: NextPage = () => {

  const { loginUser } = useContext(AuthContext);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);
  
  const onLoginUser = async ({email, password}: FormData) => {
    
    setShowError(false);
    
    const isValidLogin = await loginUser(email, password);
    
    if (!isValidLogin) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000) 
    
      return;
    } 

    // El usuario no puede volver a la página anterior
    router.replace('/'); 
  }

  return (
    <AuthLayout title={'Ingresar'}>
      <form
        onSubmit={handleSubmit(onLoginUser)}
        noValidate
      >
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <Typography variant={'h1'} component={'h1'}>Iniciar Sesión</Typography>

              <Chip
                label={'No reconocemos ese usuario / contraseña'}
                color={'error'}
                icon={<ErrorOutline />}
                className={'fadeIn'}
                sx={{display: showError ? 'flex' : 'none' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type={'email'}
                label={'Correo'}
                variant={'filled'}
                fullWidth
                {...register('email', {
                  required: 'Este campo es requerido',
                  validate: validations.isEmail
                })}
                error={ !!errors.email }
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label={'Contraseña'}
                type={'password'}
                variant={'filled'}
                fullWidth
                {...register('password', {
                  required: 'Este campo es requerido',
                  minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type={'submit'}
                color={'secondary'}
                className="circular-btn"
                fullWidth
                size={'large'}
              >
                Ingresar
              </Button>
            </Grid>

            <Grid item xs={12} display={'flex'} justifyContent={'end'}>
              <NextLink
                href={'/auth/register'}
                passHref
              >
                <Link underline={'always'}>
                  ¿No tienes cuenta?
                </Link>
              </NextLink>
            </Grid>

          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default LoginPage;