async function register(email, contrasenya) {
    const apiUrl = 'https://tu-api.com/api/usuarios'; // Reemplaza esto con la URL de tu endpoint de usuarios
    try {
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
      return null;
    }
  }
  
  async function login(email, contrasenya) {
    const apiUrl = 'https://tu-api.com/api/usuarios'; // Reemplaza esto con la URL de tu endpoint de usuarios
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          contrasenya: contrasenya
        })
      });
      if (!response.ok) {
        throw new Error('Credenciales inválidas');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ha ocurrido un error al iniciar sesión:', error);
      return null;
    }
  }
  