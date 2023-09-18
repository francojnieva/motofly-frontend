import imgGithub from '../assets/images/github-icon.svg';
import imgLinkedin from '../assets/images/linkedin-icon.svg';
import imglogo from '../assets/images/logo2.png';
import { NavLink } from 'react-router-dom';

function Footer() {
    const members = [

        {   
            memberName: "Luis Lopez",
            linkGithub: "https://github.com/Luis-Ll",
            linkLinkedin: "https://www.linkedin.com/in/luis-lopez-88342a237",
            altGithubIcon: "Logo del icono de GitHub",
            altLinkedinIcon: "Logo del icono de LinkedIn",
        },
        {   
            memberName: "Erika Cruz",
            linkGithub: "https://github.com/ErikaCV",
            linkLinkedin: "https://www.linkedin.com/in/erika-johana-cruz-vallejo-09ab65276",
            altGithubIcon: "Logo del icono de GitHub",
            altLinkedinIcon: "Logo del icono de LinkedIn",
        },
        {   
            memberName: "Belén Gómez",
            linkGithub: "https://github.com/belugomez",
            linkLinkedin: "https://www.linkedin.com/in/beléngómez",
            altGithubIcon: "Logo del icono de GitHub",
            altLinkedinIcon: "Logo del icono de LinkedIn",
        },
        {   
            memberName: "Franco Nieva",
            linkGithub: "https://github.com/francojnieva",
            linkLinkedin: "https://www.linkedin.com/in/francojnieva/",
            altGithubIcon: "Logo del icono de GitHub",
            altLinkedinIcon: "Logo del icono de LinkedIn",
        },
        {   
            memberName: "Carlos Avanzini",
            linkGithub: "https://github.com/carlosavanzini",
            linkLinkedin: "https://www.linkedin.com/in/carlos-matias-avanzini-4b707b61/",
            altGithubIcon: "Logo del icono de GitHub",
            altLinkedinIcon: "Logo del icono de LinkedIn",
        }
    ]

    const element = members.map(e =>
        <div className='members-item my-2' key={e.memberName}>
            <p className='mb-1'>{e.memberName}</p>
            <div className='linksProfile-container mb-3'>
                <a href={e.linkGithub} className='me-1' target='_blanck'><img src={imgGithub} alt={e.altGithubIcon} /></a>
                <a href={e.linkLinkedin} target='_blanck'><img src={imgLinkedin} alt={e.altLinkedinIcon} /></a>
            </div>
        </div>
    )

  return (
    <footer className='footer-container px-4 px-lg-5 text-white'>
        <div className='d-flex flex-column align-items-center flex-lg-row align-items-lg-center  justify-content-lg-around'>
            <div className='mt-3 logo-container d-flex justify-content-center'>
                <NavLink to="/"><img className="logo-app rounded-circle" src={imglogo} alt="logo de la app"/></NavLink>
            </div>
            <div className='linksPage d-flex flex-column my-3 fw-medium '>
                <NavLink to="/" className=' my-2 link-underline link-underline-opacity-0 text-danger'><i className="bi bi-house-door-fill"></i> Inicio</NavLink>
                <NavLink to="/about" className='my-2 link-underline link-underline-opacity-0 text-danger'>Nosotros</NavLink>
                <NavLink to="/contact" className='my-2 link-underline link-underline-opacity-0 text-danger'>Contacto</NavLink>
            </div>
            <div className='mt-3'>
                {element} 
            </div>
        </div>
        <p className='text-center p-2'>&copy; Copyright Group 3 - 2023</p>
    </footer>
  )
}

export default Footer