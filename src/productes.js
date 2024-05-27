async function obtenerDatosVinos() {
    try {
      const response = await fetch('https://6644bc3cb8925626f88fb766.mockapi.io/api/vins/vins');
      if (!response.ok) {
        throw new Error('Error al obtener los datos de la API');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ha ocurrido un error:', error);
      return null;
    }
  }
  
  async function generarCardsDeVinos() {
    const contenedor = document.querySelector('.contenidor-cards'); // Asigna el ID del contenedor donde quieres agregar las cards
    const vinos = await obtenerDatosVinos();
    if (vinos) {
      vinos.forEach(vino => {
        const cardHTML = `
          <div class="max-w-sm rounded overflow-hidden shadow-lg m-4 md:w-1/2" data-category="${vino.categoria}">
            <img src="/img/${vino.imatge}" alt="${vino.nom}" class="w-full h-100 object-cover">
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">${vino.nom}</div>
              <p class="text-gray-700 text-base">${vino.descripcio}</p>
            </div>
            <div class="px-6 py-4">
              <a href="detall.html?id=${vino.id}">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Detalles</button>
              </a>
            </div>
          </div>
        `;
        contenedor.innerHTML += cardHTML;
      });
    } else {
      console.log('No se pudieron obtener los datos de los vinos.');
    }
  }
  
  generarCardsDeVinos();
  
