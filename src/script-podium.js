const playersArray = localStorage.getItem('players');
// Convertimos el array guardado de nuevo a un Map para leer los puntos
const playersMap = new Map(JSON.parse(playersArray));
const names = JSON.parse(localStorage.getItem('playerNames')) || []
const images = JSON.parse(localStorage.getItem('images')) || []

const printResults = () =>{
    let i = 0
    const resultsContainer = document.getElementById('total');
    resultsContainer.innerHTML = ""; // Limpiamos el contenedor por seguridad

    names.forEach(name => {
        const player_box = document.createElement('div')
        player_box.classList.add('player_box')
        
        const text = document.createElement('h3')
        text.textContent = name + ":"
        
        const img = document.createElement('img')
        img.src = images[i]
        img.classList.add("player_images")
        
        const text_points = document.createElement('h3')
        // Obtenemos los puntos del Map usando el nombre del jugador
        const currentPoints = playersMap.get(name) || 0;
        text_points.textContent = `${currentPoints} puntos`;
        
        player_box.appendChild(img)
        player_box.appendChild(text)
        player_box.appendChild(text_points)
        
        resultsContainer.appendChild(player_box)
        i++
    })
}


window.addEventListener('DOMContentLoaded', printResults)