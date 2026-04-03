const playersArray = localStorage.getItem('players');
// Convertimos el array guardado de nuevo a un Map para leer los puntos
const playersMap = new Map(JSON.parse(playersArray));
const names = Array.from(playersMap.keys()) || []
const images = JSON.parse(localStorage.getItem('images')) || []

const btnNextLevel = document.getElementById("nextLevel")
const btnBackStart = document.getElementById("backStart")

const printResults = () => {
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

const nextLevel = () => {
    let currentLevel = localStorage.getItem("level")
    let nextLevel = parseInt(currentLevel) + 1
    if (currentLevel == 3) {
        nextLevel = 1
    }
    
    const players = new Map
    names.forEach(name => {
        players.set(name, 0)
    })

    localStorage.setItem('players', JSON.stringify(Array.from(players)));
    localStorage.setItem("level", nextLevel)
    window.location.href = "./game.html"
}

const restartStats = () => {
    const players = new Map
    names.forEach(name => {
        players.set(name, 0)
    })

    localStorage.setItem('players', JSON.stringify(Array.from(players)));
    window.location.href = "../index.html"
}

window.addEventListener('DOMContentLoaded', printResults)
btnNextLevel.addEventListener("click", nextLevel)
btnBackStart.addEventListener("click", restartStats)