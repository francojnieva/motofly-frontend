import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useUserContext } from './UserContext';

function LoginForm() {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const { login } = useUserContext();
  
  const [errorDate, setErrorDate] = useState('');
  const [formError, setFormError] = useState('');
  const [formMessage, setFormMessage] = useState('');

  const onSubmit = async (data) => {
    setErrorDate('');

    try {
      await login(data.email, data.password);
    } catch (err) {
      setFormError('Por favor, verifique sus credenciales para iniciar sesión');
      setFormMessage('');
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className='color-base'></div>
      <div className='form-container m-4 col col-md-9 col-lg-6'>
        <h2 className='mb-4 fw-bolder'>Iniciar sesión</h2>
        <form className='form-login' onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <Controller
              name='email'
              control={control}
              defaultValue=''
              rules={{
                required: 'Por favor, ingrese un correo electrónico.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i,
                  message: 'Ingrese una dirección de correo electrónico válida.',
                },
              }}
              render={({ field }) => (
                <input
                  type='email'
                  placeholder='Dirección de correo electrónico'
                  autoComplete='off'
                  {...field}
                  className='form-control rounded'
                />
              )}
            />
            {errors.email && (
              <p className='text-danger'>
                {errors.email.message}
              </p>
            )}
          </div>
          <div className='mb-4'>
            <Controller
              name='password'
              control={control}
              defaultValue=''
              rules={{
                required: 'Por favor, ingrese una contraseña.',
                minLength: {
                  value: 10,
                  message: 'La contraseña debe tener al menos 10 caracteres.',
                },
              }}
              render={({ field }) => (
                <input
                  minLength="10"
                  type='password'
                  placeholder='Contraseña'
                  autoComplete='off'
                  {...field}
                  className='form-control rounded'
                />
              )}
            />
            {errors.password && (
              <p className='text-danger'>
                {errors.password.message}
              </p>
            )}
          </div>
        
          {formError && <p className="p-2 rounded bg-danger text-white">{formError}</p>}
          {errorDate && (
            <p className="text-danger">{errorDate}</p>
          )}
          <div className='text-center mt-2'>
            <button type='submit' className='btn btn-danger'>
              Iniciar sesión
            </button>
          </div>
        </form>
        <p className='mb-0 mt-4 text-center'>¿No tienes una cuenta?</p>
        <div className='text-center mt-3'>
          <Link to="/register" className='link-underline link-underline-opacity-0 link-underline-opacity-75-hover'>Registrarme</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginForm;
