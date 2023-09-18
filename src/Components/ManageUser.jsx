import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Obtener la lista de usuarios desde el backend al cargar el componente
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://motofly-deploy-app.onrender.com/api/users'); // Endpoint para obtener usuarios
      setUsers(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de usuarios', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://motofly-deploy-app.onrender.com/api/users/${userId}`); // Endpoint para eliminar usuario
      fetchUsers(); // Actualizar la lista después de eliminar
    } catch (error) {
      console.error('Error al eliminar usuario', error);
    }
  };

  return (
    <div>
      <h2>Administrar Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre de Usuario</th>
            <th>Correo Electrónico</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleDeleteUser(user._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUsers;
