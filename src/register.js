async function register(email, contrasenya) {
  const apiUrl = 'https://6644bc3cb8925626f88fb766.mockapi.io/api/vins/usuaris';

  try {
    // Verificar si ya existe un usuario con el mismo email
    const usuariosResponse = await fetch(apiUrl + `?search=${email}`);
    if (!usuariosResponse.ok) {
      if (usuariosResponse.status === 404) {
        // Si no se encuentra ningún usuario, continuar con el registro
        // Proceder con el registro
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            contrasenya: contrasenya,
            vinsPreferits: []
          })
        });

        if (!response.ok) {
          throw new Error('Error al registrar el usuario');
        }

        const data = await response.json();
        return data;
      } else {
        throw new Error('Error al buscar el usuario');
      }
    }

    const usuariosData = await usuariosResponse.json();

    if (usuariosData.length > 0) {
      throw new Error('Ya existe un usuario con este email');
    }

    // Si no hay usuarios con el mismo email, proceder con el registro
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        contrasenya: contrasenya,
        vinsPreferits: []
      })
    });

    if (!response.ok) {
      throw new Error('Error al registrar el usuario');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ha ocurrido un error al registrar el usuario:', error);
    throw error;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');

  if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const email = document.getElementById('email').value;
      const contrasenya = document.getElementById('password').value;

      try {
        if (!email || !contrasenya) {
          throw new Error('Por favor, rellena todos los campos');
        }

        const registrado = await register(email, contrasenya);
        
        console.log('Usuario registrado correctamente:', registrado);
        alert('Usuario registrado correctamente');
      } catch (error) {
        if (error.message === 'Ya existe un usuario con este email') {
          alert(error.message);
        } else {
          console.error('Ha ocurrido un error al registrar el usuario:', error);
          alert('Ha ocurrido un error al registrar el usuario. Inténtalo de nuevo más tarde.');
        }
      }
    });
  }
});
