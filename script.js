let palabras = ""; 
const urlAPI = 'https://random-word-api.herokuapp.com/word?lang=es&&number=1&&length=5';
let entradaPalabra = document.getElementById("palabra");
let btnIntentar = document.getElementById("btnIntentar");
let intentos = 0;
let intentosMaximos = 5;

let palabraObjetivo;

fetch(urlAPI)
  .then(response => response.json())
  .then(response => {
    palabras = response[0].toLowerCase(); 
    palabraObjetivo = palabras;
    console.log("Palabra obtenida de la API:", palabras); // Muestra la palabra obtenida de la API en la consola
  })
  .catch(err => {
    console.log("Hubo un error con la API");
    const palabrasArray = ["Mango", "Lapiz", "Nubes", "Perro", "fuerte", "Ducha", "Tigre", "Pizar", "Cebra", "dardo"];
    let indiceAleatorio = Math.floor(Math.random() * palabrasArray.length);
    palabras = palabrasArray[indiceAleatorio].toLowerCase(); 
    palabraObjetivo = palabras;
    console.log("Palabra generada aleatoriamente:", palabras); // Muestra la palabra generada aleatoriamente en la consola
  });

function obtenerPalabra() {
  let palabraObtenida = entradaPalabra.value;
  let resultado = document.getElementById("grid").children;
  let intentosLabel = document.getElementById("intentos"); 

  if (intentos >= intentosMaximos) {
    intentosLabel.textContent = "Has agotado todos los intentos. La palabra era: " + palabraObjetivo;
    return;
  }

  for (let i = 0; i < palabraObtenida.length; i++) {
    if (palabraObtenida[i] === palabras[i]) {
      resultado[i].style.backgroundColor = "green";
    } else {
      let letraCorrectaPosicionIncorrecta = false;
      for (let j = 0; j < palabras.length; j++) {
        if (palabraObtenida[i] === palabras[j] && i !== j) {
          letraCorrectaPosicionIncorrecta = true;
          break;
        }
      }
      if (letraCorrectaPosicionIncorrecta) {
        resultado[i].style.backgroundColor = "yellow";
      } else {
        resultado[i].style.backgroundColor = "gray";
      }
    }
  }

  intentos++;
  intentosLabel.textContent = "Intento " + intentos + " de " + intentosMaximos;

  if (palabraObtenida === palabras) {
    console.log("¡Correcto! Has adivinado la palabra en " + intentos + " intentos.");
    intentosLabel.textContent = "¡Correcto! Has adivinado la palabra en " + intentos + " intentos.";
  } else {
    console.log("Incorrecto. Intento " + intentos + " de " + intentosMaximos);
    intentosLabel.textContent = "Incorrecto. Intento " + intentos + " de " + intentosMaximos;
  }
}

btnIntentar.addEventListener('click', obtenerPalabra);
