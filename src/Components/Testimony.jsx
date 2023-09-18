import React, { useState, useEffect } from "react"
import axios from "axios"
import Card from 'react-bootstrap/Card';
import AOS from 'aos'

function Testimony() {

    const [testimonyData, setTestimonyData] = useState([])

    useEffect(() => {
      axios.get("https://motofly-deploy-app.onrender.com/api/testimony")
      
      .then((response) => {
        setTestimonyData(response.data);
      })
      .catch((error) => console.error("Error al obtener los datos:", error))
    }, [])

    useEffect(() => {
      AOS.init()
    }, [])

  return (
    <div className=" p-3 container d-flex flex-column align-items-center flex-md-row justify-content-md-around flex-md-wrap">
      {testimonyData.map((data) => (
        <div key={data._id} className="testimony-container" data-aos="fade-up" data-aos-duration="1200">
          <Card className="mb-4 card pt-2 px-0" style={{ width: '18rem' }}>
            <div className="d-flex justify-content-center">
              <Card.Img variant="top" className="w-75 rounded-circle" src={`https://motofly-deploy-app.onrender.com/images/${data. profileImg}`} alt={`foto de perfil de ${data.name}`} title={data.name} />
            </div>
            <Card.Body>
              <Card.Title>{data.name}</Card.Title>
              <Card.Text>
                {data.testimony}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>))}
    </div>
  )
}

export default Testimony