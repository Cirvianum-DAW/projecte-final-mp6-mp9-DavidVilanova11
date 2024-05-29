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
          <div class="px-6 py-4 flex items-center">
            <button class="like-button flex items-center focus:outline-none">
              <svg class="heart-icon w-6 h-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
              </svg>
              <span class="number-of-likes">0</span>
            </button>
            <a href="detall.html?id=${vino.id}" class="ml-auto">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Detalles</button>
            </a>
          </div>
        </div>
      `;
      contenedor.innerHTML += cardHTML;
    });

    // Añadir event listeners a los botones de "like"
    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const numberOfLikesSpan = button.querySelector('.number-of-likes');
        const currentLikes = parseInt(numberOfLikesSpan.textContent, 10);
        numberOfLikesSpan.textContent = currentLikes + 1;
      });
    });
  } else {
    console.log('No se pudieron obtener los datos de los vinos.');
  }
}

generarCardsDeVinos();
