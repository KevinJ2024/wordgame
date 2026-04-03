import { stopwatch } from "./class_stopwatch.js"

const gameOfWords = new stopwatch(60)

const choiceTime = () => {
	setTimeout(() => gameOfWords.play(), 3000)
}

const btn_word = document.getElementById('btn-word')

// Global variables
const players = new Map()
let turn = ""
const usedWords = []

export const images = [
    '../assets/images/characters/20.webp',
	'../assets/images/characters/19.webp',
	'../assets/images/characters/18.webp',
	'../assets/images/characters/17.webp'
]
localStorage.setItem('images', JSON.stringify(images))

const names = JSON.parse(localStorage.getItem('playerNames')) || []

// --- THEMES STRUCTURE ---
export const themes = [
	{
		title: "Bullying",
		image: "../assets/images/bullying.jpg",
		keywords: ["acoso", "burlas", "insultos", "empatia", "respeto", "ciberacoso", "victima", "agresor", "apoyo", "denunciar"]
	},
	{
		title: "Consumo de Sustancias",
		image: "../assets/images/sustancias.jpg",
		keywords: ["adiccion", "drogas", "alcohol", "prevencion", "salud", "riesgo", "rehabilitacion", "decisiones", "ayuda", "vicio"]
	},
	{
		title: "Salud Mental",
		image: "../assets/images/salud_mental.jpg",
		keywords: ["ansiedad", "depresion", "estres", "terapia", "psicologo", "bienestar", "emociones", "tristeza", "hablar", "autocuidado"]
	}
];

export let currentRound = 0;

// Print current theme and image
export const printTheme = () => {
	const letterContainer = document.getElementById('letter'); 
	letterContainer.innerHTML = "";
	const h1 = document.createElement('h1');
	
	h1.textContent = themes[currentRound].title;
	letterContainer.appendChild(h1);
    
    const characterDiv = document.getElementById("pp_character");
    characterDiv.style.background = `url(${themes[currentRound].image}) no-repeat center center`;
    characterDiv.style.backgroundSize = "cover";
}

// Print player profiles
const printNames = (names) => {
	let i = 0
	names.forEach(name => {
		const div = document.createElement('div')
		div.classList.add('player')
		
        const text_name = document.createElement('h3')
		text_name.textContent = name
		text_name.classList.add('players')
		
        const img = document.createElement('img')
		img.src = images[i]
		img.classList.add("player_images")
		
        const text_points = document.createElement('h3')
		text_points.textContent = '0'
		text_points.id = i 

		div.appendChild(img)
		div.appendChild(text_name)
		div.appendChild(text_points)
		
		document.getElementById('player-box').appendChild(div)
		i++
	})
}

// Initialize players
const createPlayers = (names) => {
	let points = 0
	names.forEach(name => {
		players.set(name, points)
	});
	console.log("Jugadores creados exitosamente")
	
    turn = names[0] 
	printTheme(); 
    
	btn_word.addEventListener('click', () => game(players, names))
}

// Main game logic
const game = (players, names) => {
	event.preventDefault()
	const inputWord = document.getElementById('insert_word')
    const word = inputWord.value.toLowerCase().trim()
	
    inputWord.value = "" 
	const isValid = verifyJustWords(word)
	
    const currentPoints = players.get(turn)
    const playerIndex = names.indexOf(turn)

    if (isValid) {
        const newPoints = addPoints(currentPoints)
        players.set(turn, newPoints)
        document.getElementById(playerIndex.toString()).innerHTML = `${newPoints}`
    } else {
        const newPoints = restPoints(currentPoints)
        players.set(turn, newPoints)
        document.getElementById(playerIndex.toString()).innerHTML = `${newPoints}`
    }
    
	saveWord(word)
}

// Points system
const addPoints = (points) => {
	return points + 10; 
}
const restPoints = (points) => {
	return points - 2; 
}

// Handle turns and rounds
export const changeTurn = () => { 
	if (gameOfWords.counter == 0) {
        
        let currentPlayerIndex = names.indexOf(turn);
        
        if (currentPlayerIndex + 1 < names.length) {
            turn = names[currentPlayerIndex + 1];
            alert(`¡Tiempo! Es el turno de: ${turn}`);
        } else {
            currentRound++;
            
            if (currentRound < themes.length) {
                turn = names[0]; 
                usedWords.length = 0; 
                printTheme();
                alert(`¡Ronda Terminada! Empezamos la temática: ${themes[currentRound].title}. Turno de: ${turn}`);
            } else {
                finishGame();
                return; 
            }
        }
        
		choiceTime()
		gameOfWords.restart()
	}
}

// Finish game and redirect
const finishGame = () =>{
	localStorage.setItem('players', JSON.stringify(Array.from(players)));
	alert('¡Juego Terminado! Haz clic en Aceptar para ver los resultados.')
	window.location.href = './podium.html'
}

// Keep track of used words
const saveWord = (word) => {
	usedWords.push(word)
	return usedWords
}

// Verify if word is valid and belongs to the current theme
const verifyJustWords = (word) => {
    const roundKeywords = themes[currentRound].keywords;
    
	if (/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/.test(word) || usedWords.includes(word) || !roundKeywords.includes(word)) {
		return false
	} else {
		return true
	}
}

// App init
window.addEventListener('DOMContentLoaded', () => {
    createPlayers(names);
    printNames(names);
    choiceTime();
});