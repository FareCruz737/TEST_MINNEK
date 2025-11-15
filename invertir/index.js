function InvertirCaracteres(arr) {

// Función que detecta si el valor es un caracter especial
  const esEspecial = (val) => {
    if (typeof val === 'number') return false;          // verifica si el valor es un numero
    if (typeof val === 'string' && /^[a-zA-Z]$/.test(val)) return false; //verifica si es una letra
    return true;                                        // Todo lo demás => especial
  };

  // Extraer elementos NO especiales (se invertirán)
  const normales = arr.filter(x => !esEspecial(x)).reverse();

  let indiceNormales = 0;

  // Reconstruir sin mover los caracteres especiales
  return arr.map(item => {
    if (esEspecial(item)) {
      return item;                   // Los especiales se quedan donde están
    } else {
      return normales[indiceNormales++];  // Reemplazar con el próximo de la lista invertida
    }
  });
}

const data= ['n', 2, '&', 'a', 'l', 9, '$', 'q', 47, 'i', 'a', 'j', 'b', 'z', '%', 8];

console.log(InvertirCaracteres(data));

// Para Correr este codigo se puede hacer de dos formas. Desde la consola usando nodejs,
// entrando a la carpeta contiene el archivo index.js 

// ejemplo: node invertir.js

// La segunda manera es dirigirse a una pagina de consola virtual. 
// como recomendacion les invito usar: Progamiz

// Link: https://www.programiz.com/javascript/online-compiler/
