/* Accederemos a los datos de una API pública de Game Of Thrones, queremos un select con todos los nombres de los personajes para que cuando un usuario seleccione un nombre salga su imagen en el medio de la página, algo así:

Os aportamos el HTML sobre el que haremos el ejercicio:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="index.js" defer></script>
</head>
<body>
    <select id="character-list"></select>
    <div>
        <img class="character-image">
    </div>
</body>
</html>
```

Para obtener los datos con los que jugar necesitaremos estudiar la documentación de la API y buscar la url necesaria para los datos que queramos, para este paso os pedimos que de verdad os esforcéis buscándola en la documentación, queremos la url que me traiga los datos de todos los personajes de GOT, sin embargo, en la slide siguiente tendréis la url directa de esos datos.

URL de la documentación (para que indaguéis): https://thronesapi.com/

Esta sería la URL final (la que deberéis utilizar para vuestra petición):

https://thronesapi.com/api/v2/Characters*/



const API_URL = "https://thronesapi.com/api/v2/Characters";

// 1. Referencias a los elementos del DOM
const characterListSelect = document.getElementById('character-list');
const characterImage = document.querySelector('.character-image');


 // 2. Función para cargar los datos de la API y llenar el select
 
async function loadCharacters() {
    try {
        // Realizar la petición HTTP
        const response = await fetch(API_URL);

        // Verificar si la respuesta fue exitosa (código 200-299)
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }

        // Convertir la respuesta a JSON
        const characters = await response.json();

        // Llenar el <select> con los personajes
        characters.forEach(character => {
            const option = document.createElement('option');
            
            // Usamos fullName para el texto visible en el select
            option.textContent = character.fullName; 
            
            // Usamos imageUrl como el valor (value) que se usará para mostrar la imagen
            option.value = character.imageUrl; 
            
            characterListSelect.appendChild(option);
        });

        // Opcional: Establecer una imagen inicial (el primer personaje de la lista)
        if (characters.length > 0) {
            characterImage.src = characters[0].imageUrl;
            characterImage.alt = characters[0].fullName;
        }
        
        // 3. Añadir el Event Listener para el cambio de selección
        characterListSelect.addEventListener('change', displayCharacterImage);

    } catch (error) {
        console.error("Hubo un problema al cargar los personajes:", error);
        // Mostrar un mensaje de error en la interfaz si la carga falla
        characterListSelect.innerHTML = '<option>Error al cargar los datos</option>';
    }
}

/**
 * 4. Función para mostrar la imagen del personaje seleccionado
 */
function displayCharacterImage() {
    // El 'value' de la opción seleccionada es la URL de la imagen
    const selectedImageUrl = characterListSelect.value; 
    
    // El 'textContent' de la opción seleccionada es el nombre completo (para el 'alt' de la imagen)
    const selectedCharacterName = characterListSelect.options[characterListSelect.selectedIndex].textContent;

    // Actualizar los atributos src y alt de la imagen
    characterImage.src = selectedImageUrl;
    characterImage.alt = selectedCharacterName;
}

// Iniciar el proceso cargando los personajes cuando el script se ejecute
loadCharacters();