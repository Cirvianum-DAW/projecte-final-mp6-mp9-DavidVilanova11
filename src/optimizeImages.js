const sharp = require('sharp');
const fs = require('fs');

const imagesToOptimize = [
  {
    input: '/Users/daw25/projectem9uf2/MP9_UF1_tailwind-project/Public/img/wine1.png',
    output: '/Users/daw25/projectem9uf2/MP9_UF1_tailwind-project/Public/img/wine1_optimized.webp',
  },
  {
    input: '/Users/daw25/projectem9uf2/MP9_UF1_tailwind-project/Public/img/wine2.png',
    output: '/Users/daw25/projectem9uf2/MP9_UF1_tailwind-project/Public/img/wine2.png_optimized.webp',
  },
  {
    input: '/Users/daw25/projectem9uf2/MP9_UF1_tailwind-project/Public/img/wine3.png',
    output: '/Users/daw25/projectem9uf2/MP9_UF1_tailwind-project/Public/img/wine3_optimized.webp',
  },
  {
    input: '/Users/daw25/projectem9uf2/MP9_UF1_tailwind-project/Public/img/wine4.png',
    output:'/Users/daw25/projectem9uf2/MP9_UF1_tailwind-project/Public/img/wine4_optimized.webp',
  }
];

// Función para optimizar una imagen
const optimizeImage = ({ input, output }) => {
  sharp(input)
    .resize({ width: 800 }) 
    .toFile(output, (err, info) => {
      if (err) {
        console.error(`Error al optimizar la imagen ${input}:`, err);
      } else {
        console.log(`Imagen optimizada y guardada correctamente: ${output}`);
        console.log(info);
      }
    });
};

imagesToOptimize.forEach(optimizeImage);