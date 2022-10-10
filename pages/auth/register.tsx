import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import { useForm } from 'react-hook-form';

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

import { AuthLayout } from "../../components/layouts/AuthLayout";
import { validations } from '../../utils'; 

type FormData = {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage() {

  const { registerUser } = useContext(AuthContext);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onRegisterForm = async ({ name, email, password }: FormData) => {
    setShowError(false);

    const { hasError, message } = await registerUser(name, email, password);

    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    router.replace('/'); 
  }

  return (
    <AuthLayout title={'Registro'}>
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <Typography variant={'h1'} component={'h1'}>Crear cuenta</Typography>
              <Chip
                label={errorMessage}
                color={'error'}
                icon={<ErrorOutline />}
                className={'fadeIn'}
                sx={{ display: showError ? 'flex' : 'none' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type={'text'}
                label={'Nombre Completo'}
                variant={'filled'}
                fullWidth
                {...register('name', {
                  required: 'Este campo es obligatorio',
                  minLength: { value: 3, message: 'Mínimo 3 caracteres' }
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type={'email'}
                label={'Correo'}
                variant={'filled'}
                fullWidth
                {...register('email', {
                  required: 'Este campo es obligatorio',
                  validate: validations.isEmail
                })}
                error={!!errors.name}
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
                  required: 'Este campo es obligatorio',
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
                Registrarme
              </Button>
            </Grid>

            <Grid item xs={12} display={'flex'} justifyContent={'end'}>
              <NextLink
                href={'/auth/login'}
                passHref
              >
                <Link underline={'always'}>
                  ¿Ya tienes cuenta?
                </Link>
              </NextLink>
            </Grid>

          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}