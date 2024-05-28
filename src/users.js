  document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm'); // Asegúrate de que este ID coincide con el formulario en tu HTML
  
    if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
  
        const email = document.getElementById('email').value;
        const contrasenya = document.getElementById('password').value;
  
        try {
          const apiUrl = 'https://6644bc3cb8925626f88fb766.mockapi.io/api/vins/usuaris'; // Reemplaza esto con la URL de tu endpoint de usuarios
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
          console.log('Usuario autenticado:', data);
          // Aquí puedes redirigir al usuario a otra página o mostrar un mensaje de éxito
        } catch (error) {
          console.error('Ha ocurrido un error al iniciar sesión:', error);
          // Aquí puedes mostrar un mensaje de error al usuario
        }
      });
    }
  });
  
  async function register(email, contrasenya) {
    const apiUrl = 'https://6644bc3cb8925626f88fb766.mockapi.io/api/vins/usuaris'; // Reemplaza esto con la URL de tu endpoint de usuarios
  
    try {
      // Verificar si ya existe un usuario con el mismo email
      const usuariosResponse = await fetch(apiUrl + `?search=${email}`);
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
      return null;
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm'); // Asegúrate de que este ID coincide con el formulario en tu HTML
    
    if (registerForm) {
      registerForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    
        const email = document.getElementById('email').value;
        const contrasenya = document.getElementById('password').value;
    
        try {
          // Ejecutar la función register para verificar y registrar al usuario
          const registrado = await register(email, contrasenya);
          
          if (registrado) {
            // Si el usuario se registró correctamente, redirigir a una página de éxito o mostrar un mensaje
            console.log('Usuario registrado correctamente:', registrado);
            // Aquí puedes redirigir al usuario a otra página o mostrar un mensaje de éxito
          } else {
            // Si hubo algún error al registrar el usuario, puedes mostrar un mensaje de error
            console.error('Ha ocurrido un error al registrar el usuario');
          }
        } catch (error) {
          // Capturar cualquier error que pueda ocurrir durante el registro
          console.error('Ha ocurrido un error al registrar el usuario:', error);
          // Aquí puedes mostrar un mensaje de error al usuario
        }
      });
    }
  });
  
  

  function verificarAutenticacion() {
    const usuario = localStorage.getItem('usuario');
    console.log(usuario);
    if (!usuario && window.location.pathname !== '/register.html') {
      window.location.href = 'login.html'; // Redirigir al login si no está autenticado y no estamos en register.html
    }
  }
  
  
  document.addEventListener('DOMContentLoaded', () => {
    verificarAutenticacion();
    mostrarNombreUsuario();
  
    const loginForm = document.getElementById('loginForm');
  
    if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const email = document.getElementById('email').value;
        const contrasenya = document.getElementById('password').value;
  
        try {
          const apiUrl = 'https://6644bc3cb8925626f88fb766.mockapi.io/api/vins/usuaris';
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
          console.log('Usuario autenticado:', data);
          
          // Guardar el usuario en localStorage
          localStorage.setItem('usuario', JSON.stringify(data));
  
          // Redirigir a la página principal o de bienvenida
          window.location.href = 'index.html';
        } catch (error) {
          console.error('Ha ocurrido un error al iniciar sesión:', error);
          // Aquí puedes mostrar un mensaje de error al usuario
        }
      });
    }
  
    // Manejar el evento de logout
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        localStorage.removeItem('usuario');
        window.location.href = 'login.html';
      });
    }

  });
  
  function verificarAutenticacion() {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
      window.location.href = 'login.html'; // Redirigir al login si no está autenticado
    }
  }
  
  function mostrarNombreUsuario() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
      const nombreUsuarioElemento = document.getElementById('nombreUsuario');
      if (nombreUsuarioElemento) {
        nombreUsuarioElemento.textContent = usuario.email; // Cambia esto si tienes un campo específico para el nombre
      }
    }
  }
  


  // Llama a la función al cargar cada página
  document.addEventListener('DOMContentLoaded', verificarAutenticacion);
  
  