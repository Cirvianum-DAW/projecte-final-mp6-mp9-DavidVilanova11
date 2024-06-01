// Function to get query parameter by name
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to fetch wine data using the ID from the URL
async function obtenerDatosVino() {
    const id = getQueryParam('id'); // Extract the 'id' parameter from the URL
    if (!id) {
      console.error('No se ha proporcionado ningún ID de vino en la URL');
      return null;
    }

    try {
      const response = await fetch(`https://6644bc3cb8925626f88fb766.mockapi.io/api/vins/vins/${id}`); // Replace with your API endpoint
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

function generarHTMLVino(vino) {
    console.log(vino);
    const section = document.createElement('section');
    section.className = 'bg-center flex flex-1 flex-col';

    // First Paragraph (description)
    const descripcionParrafo = document.createElement('p');
    descripcionParrafo.className = 'm-2 p-2 bg-slate-300 mb-6';
    descripcionParrafo.textContent = vino.descripcioLlarga;
    section.appendChild(descripcionParrafo);

    // Second Paragraph (price, age, taste)
    const detallesParrafo = document.createElement('p');
    detallesParrafo.className = 'm-2 p-2 bg-slate-900 mb-6 text-white';
    detallesParrafo.innerHTML = `
      Preu: ${vino.preu}€ <br>
      Antiguitat: ${vino.antiguetat} dies <br>
      Gust: ${vino.gust}
    `;
    section.appendChild(detallesParrafo);

    // Image
    const imagenDiv = document.createElement('div');
    const imagen = document.createElement('img');
    imagen.src = "/img/" + vino.imatge; // Make sure the API returns a complete URL or modify accordingly
    imagen.alt = 'Wine Image';
    imagen.style = 'width: 30vw; height: auto;';
    imagenDiv.appendChild(imagen);

    const principal = document.getElementById('principal');
    principal.appendChild(section);
    principal.appendChild(imagenDiv);
}

document.addEventListener('DOMContentLoaded', async () => {
    const vino = await obtenerDatosVino();
    if (vino) {
        generarHTMLVino(vino);
    } else {
        console.error('No se pudo obtener la información del vino');
    }
});
