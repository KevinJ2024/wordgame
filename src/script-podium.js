const playersArray = localStorage.getItem('players');
const players = new Map(JSON.parse(playersArray));
const names = JSON.parse(localStorage.getItem('playerNames')) || []
const images = JSON.parse(localStorage.getItem('images')) || []
const printResults = () =>{
    let i = 0
    names.forEach(name => {
        const player_box = document.createElement('div')
        player_box.classList.add('player_box')
        const text = document.createElement('h3')
        text.textContent = name + ":"
        const img = document.createElement('img')
        img.src = images[i]
        img.classList.add("player_images")
        const text_points = document.createElement('h3')
        text_points.textContent = players.get(names[i])
        player_box.appendChild(img)
        player_box.appendChild(text)
        player_box.appendChild(text_points)
        
        document.getElementById('total').appendChild(player_box)
        i++
    })
}

window.addEventListener('DOMContentLoaded',printResults())
console.log(players);