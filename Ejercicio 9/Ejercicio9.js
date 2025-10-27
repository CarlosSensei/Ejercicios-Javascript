/*Ahora realizaremos una petición a la PokeAPI, queremos mostrar al entrar en la página la imagen de un Pokemon, la magia estará en que cada vez que recargues la página, será un nuevo Pokemon dentro de la primera generación de Pokemon, es decir, del 1 al 151.

Los Pokemon no solo tienen una imagen, si no que tendrán muchas, hay que hallar la manera de encontrar la que más os guste.

Para ello el HTML será muy sencillo, y la URL esta vez os la aportaremos directamente, aunque os aconsejamos echarle un ojo a la documentación ya que es muy completa.

Documentación: https://pokeapi.co/

URL: https://pokeapi.co/api/v2/pokemon/1

Tened en cuenta que esta URL se refiere al pokemon número 1, que es bulbasaur, debemos hallar la manera de con una url similar ir consiguiendo pokemons aleatorios dentro de unos límites.*/


// Rango de la Primera Generación de Pokémon
const MIN_ID = 1;
const MAX_ID = 151;

// Base de la URL de la PokeAPI para obtener detalles de un Pokémon
const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

// Referencia al elemento <img> en el DOM
const pokemonImageElement = document.querySelector('.random-image');

/**
 * 1. Genera un número entero aleatorio dentro del rango [min, max] (inclusivo).
 * @param {number} min - El límite inferior del rango.
 * @param {number} max - El límite superior del rango.
 * @returns {number} Un ID de Pokémon aleatorio.
 */
function getRandomPokemonId(min, max) {
    // Math.random() genera un número entre 0 (inclusivo) y 1 (exclusivo).
    // Math.floor() redondea hacia abajo al entero más cercano.
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 2. Carga los datos del Pokémon aleatorio y actualiza la imagen.
 */
async function loadRandomPokemon() {
    try {
        // Generar un ID aleatorio entre 1 y 151
        const randomId = getRandomPokemonId(MIN_ID, MAX_ID);
        
        // Construir la URL completa para el Pokémon aleatorio
        const apiUrl = `${POKEAPI_BASE_URL}${randomId}`;
        console.log(`Cargando Pokémon con ID: ${randomId}`);
        
        // Realizar la petición a la API
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos del Pokémon: ${response.statusText}`);
        }

        // Convertir la respuesta a JSON
        const data = await response.json();
        
        // --- Lógica para seleccionar la mejor imagen ---
        
        // La PokeAPI tiene muchas imágenes. Usaremos 'front_default' de 'sprites',
        // que es la vista frontal estándar. Puedes cambiar esto por:
        // - data.sprites.other['official-artwork'].front_default (más moderna y grande)
        // - data.sprites.back_default (vista trasera)
        const imageUrl = data.sprites.front_default;
        
        // El nombre del Pokémon para el atributo 'alt'
        const pokemonName = data.name.toUpperCase();
        
        // 3. Actualizar el elemento de imagen en el DOM
        if (imageUrl) {
            pokemonImageElement.src = imageUrl;
            pokemonImageElement.alt = `Imagen de ${pokemonName}`;
            
            // Opcional: Mostrar el nombre en el cuerpo del documento para verificar
            if (!document.getElementById('pokemon-name')) {
                const nameDisplay = document.createElement('h2');
                nameDisplay.id = 'pokemon-name';
                document.body.appendChild(nameDisplay);
            }
            document.getElementById('pokemon-name').textContent = `¡${pokemonName} (ID: ${randomId})!`;

        } else {
            // Manejo de caso si el Pokémon no tiene la imagen específica seleccionada
            pokemonImageElement.alt = `No se encontró la imagen para ${pokemonName}.`;
        }

    } catch (error) {
        console.error("Hubo un error en la carga del Pokémon:", error);
        pokemonImageElement.alt = "Error al cargar los datos del Pokémon.";
    }
}

// Iniciar el proceso al cargar la página
loadRandomPokemon();