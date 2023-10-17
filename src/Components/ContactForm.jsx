import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import '../styles/ContactForm.css'
import axios from 'axios';

const ContactForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      lastname: '',
      email: '',
      message: '',
    },
  })

  const [formMessage, setFormMessage] = useState('')
  const [formError, setFormError] = useState('')

  const onSubmit = async (data) => {
   
    try {
      await axios.post('https://motofly-deploy-app.onrender.com/api/contact', data)
      setFormError('')
      setFormMessage('Datos enviados')
      reset()

      setTimeout(() => {
        setFormMessage('')
      }, 2000)

    } catch (error) {
      setFormError('Ha ocurrido un error al enviar los datos.')
      setFormMessage('')
    }
  }

  return (
    <div>
      <div className="cf-container">
      <h2 className="text-center fw-bolder-4 pt-4">Contacto</h2>
      <p className='fw-medium-4 px-3'>Completa el siguiente formulario y nos pondremos en contacto lo antes posible. Muchas gracias.</p>
      <form className="cf-form my-4" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          rules={{
            required: 'El nombre es requerido',
            minLength: { value: 4, message: 'El nombre debe tener entre 4 y 20 caracteres' },
            maxLength: { value: 20, message: 'El apellido no puede tener más de 20 caracteres' },
          }}
          render={({ field }) => (
            <div>
              <input
                {...field}
                minLength="4"
                maxLength="20"
                placeholder="Nombre"
                autoComplete="off"
                type="text"
                className="form-control required"
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
          )}
        />
        <Controller
          name="lastname"
          control={control}
          rules={{
            required: 'El apellido es requerido',
            minLength: { value: 4, message: 'El apellido debe tener entre 4 y 20 caracteres' },
            maxLength: { value: 20, message: 'El apellido no puede tener más de 20 caracteres' },
          }}
          render={({ field }) => (
            <div>
              <input
                {...field}
                minLength="4"
                maxLength="20"
                placeholder="Apellido"
                autoComplete="off"
                type="text"
                className="form-control required"
              />
              {errors.lastname && <p>{errors.lastname.message}</p>}
            </div>
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'El email es requerido',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i,
              message: 'Dirección de correo inválida',
            },
            minLength: {
              value: 6,
              message:
                "La dirección de correo debe tener entre 6 y 20 caracteres",
            },
            maxLength: {
              value: 20,
              message:
                "La dirección de correo debe tener menos de 20 caracteres",
            },
          }}
          render={({ field }) => (
            <div>
              <input
                {...field}
                minLength="6"
                maxLength="20"
                placeholder="Dirección de correo electrónico"
                autoComplete="off"
                type="email"
                className="form-control required"
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
          )}
        />
        <Controller
          name="message"
          control={control}
          rules={{
            required: 'El mensaje es requerido',
            maxLength: { value: 250, message: 'El mensaje no puede tener más de 250 caracteres' },
          }}
          render={({ field }) => (
            <div>
              <textarea
                {...field}
                maxLength="250"
                placeholder="Deja tu mensaje"
                autoComplete="off"
                className="form-control required"
              />
              {errors.message && <p>{errors.message.message}</p>}
            </div>
          )}
        />
        {formMessage && <p className="p-2 rounded bg-success text-white">{formMessage}</p>}
        {formError && <p className="p-2 rounded bg-danger text-white">{formError}</p>}
        <button className='btn' type="submit">Enviar</button>
      </form>
    </div>
    <div className='map-container container my-xl-5 d-xl-flex justify-content-xl-evenly align-items-xl-center'>
      <div className='text-container'>
        <h2 className='text-center fw-bolder pt-3 pb-3'>¿Dónde nos encontramos?</h2>
        <p className='fw-medium'>Nuestra sede central está ubicada en el corazón de Tucumán en Barrio Sur, lo que nos permite operar de manera eficiente y estar cerca de nuestros clientes y proveedores.</p>
        <p className='fw-medium'>Es fácilmente accesible desde cualquier parte de la ciudad. Los amantes de las dos ruedas pueden explorar una amplia variedad de motocicletas de diferentes marcas y modelos.</p>
      </div>
      <div className='iframe-container '>
        <iframe className='container-fluid rounded' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113927.31384044558!2d-65.30499577997975!3d-26.83268184590282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94223792d6c56903%3A0xf88d5b92b5c56527!2sSan%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1ses-419!2sar!4v1691084125840!5m2!1ses-419!2sar" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  </div>
  );
}

export default ContactForm;
