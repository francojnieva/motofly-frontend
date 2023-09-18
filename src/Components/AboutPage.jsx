import { UsersAbout } from "./UsersAbout.jsx";
import Testimony from "./Testimony.jsx";
import BreadcrumbPages from "./Breadcrumb.jsx";

function AboutPage() {

  return (
    <>
    
    <BreadcrumbPages/>
    <div className="py-4 ">
    <div className="container">
      <h1 className="text-start fw-light pb-3" >Nuestro Equipo</h1>
      <p className="container text-start fw-medium fs-5"> Somos un grupo de entusiastas estudiantes de desarrollo web, compartimos el objetivo común de crecer como desarrolladores.</p>
      <UsersAbout />
      </div>
      <div className="institution-container d-flex flex-column justify-content-center aling-items-center text-center pt-5 px-2 px-lg-5">
        <h2 className="mb-3 fw-bolder">Nuestra Institución</h2>
        <p className="fw-medium container">En <span className="text-danger fw-bolder">Rolling Code School</span>, nos encontramos ante una emocionante oportunidad de desarrollo personal y profesional, donde la pasión por la programación se fusiona con un ambiente colaborativo y una comunidad que nos impulsa a crecer.</p>
        <p className="fw-medium container">Durante el curso, hemos adquirido una base en desarrollo web. A lo largo de los meses, estudiamos diferentes tecnologías: HTML5, CSS3, Bootstrap, JavaScript, ReactJS, Express, NodeJS y MongoDB. Además metodologías ágiles como SCRUM, controlar versiones de código a través de Git y GitHub y gestional tareas con Trello.</p>
        <p></p>
      </div>
      <div className="container">
      <h2 className=" text-start fw-light">Testimonios</h2>
      <Testimony/>
      </div>
    </div>
    </>
  );
}

export default AboutPage;