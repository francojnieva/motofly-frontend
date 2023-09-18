
import React, { useState, useEffect } from "react"
import axios from "axios"
import AOS from 'aos'

export const UsersAbout = () => {

  const [aboutData, setAboutData] = useState([])

    useEffect(() => {
      axios.get("https://motofly-deploy-app.onrender.com/api/about-us")
      
      .then((response) => {
        setAboutData(response.data);
      })
      .catch((error) => console.error("Error al obtener los datos:", error))
    }, [])

    useEffect(() => {
      AOS.init()
    }, [])

  return (
    <div className="d-flex flex-column align-items-center flex-md-row justify-content-md-around flex-md-wrap">
      {aboutData.map((data) => (
      <div className= "mb-2 pt-4 m-4" key={data._id} >
          <div className="card-container mb-1" data-aos="flip-right" data-aos-duration="1500" >
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="card-inner p-3" > 
              <div className="d-flex justify-content-center">
                <img className="w-75 rounded-circle" src={`https://motofly-deploy-app.onrender.com/images/${data.profileImg}`} alt={`foto de perfil de ${data.name}`} title={data.name} />
              </div>
              <h3 className="mt-2">{data.name}</h3>
              <p>{data.description}</p>
            </div>
          </div>
      </div>))}
    </div>
  )
}
