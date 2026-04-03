import { stopwatch } from "./class_stopwatch.js"
import { themes } from "./ImagesDictionary.js"

const gameOfWords = new stopwatch(15)

// Break Time Beetween Players
const choiceTime = () => {
	setTimeout(() => gameOfWords.play(), 3000)
}

const playersArray = localStorage.getItem('players');
const playersMap = new Map(JSON.parse(playersArray));

const btn_word = document.getElementById('btn-word')

// Global variables
const players = new Map()
let turn = ""
const usedWords = []
const playedRounds = [];

export const images = [
	'../assets/images/characters/20.webp',
	'../assets/images/characters/19.webp',
	'../assets/images/characters/18.webp',
	'../assets/images/characters/17.webp'
]
localStorage.setItem('images', JSON.stringify(images))

// Functions For Control Game
const getRandomRound = () => {
	const currentArray = themes[currentLevel]["images"];

	const availableIndices = currentArray
		.map((_, index) => index)
		.filter(index => !playedRounds.includes(index));

	if (availableIndices.length === 0) return null;

	const randomRound = Math.floor(Math.random() * availableIndices.length);

	console.log(availableIndices)
	return availableIndices[randomRound];
}

const names = Array.from(playersMap.keys()) || []
const currentLevel = localStorage.getItem("level")
let randomRound = getRandomRound()

// Print current theme and image
export const printTheme = () => {
	const letterContainer = document.getElementById('letter');
	letterContainer.innerHTML = "";
	// const h1 = document.createElement('h1');
	// h1.textContent = themes[currentLevel]["images"][randomRound].title;
	// letterContainer.appendChild(h1);
	console.log(themes[currentLevel]["levelName"])
	console.log(themes[currentLevel]["images"][randomRound].title)

	const characterDiv = document.getElementById("imageRound");
	characterDiv.style.background = `url(${themes[currentLevel]["images"][randomRound].image}) no-repeat center center`;
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
		text_points.textContent = 0
		text_points.id = i

		div.appendChild(img)
		div.appendChild(text_name)
		div.appendChild(text_points)

		document.getElementById('player-box').appendChild(div)
		i++
	})
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

// Keep track of used words
const saveWord = (word) => {
	usedWords.push(word)
	return usedWords
}

// Verify if word is valid and belongs to the current theme
const verifyJustWords = (word) => {
	const roundKeywords = themes[currentLevel]["images"][randomRound].keywords;

	if (/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/.test(word) || usedWords.includes(word) || !roundKeywords.includes(word)) {
		return false
	} else {
		return true
	}
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

		if (randomRound !== null && currentPlayerIndex + 1 < names.length) {
			turn = names[currentPlayerIndex + 1];
			// reset used words cause change the tematic
			usedWords.length = 0;
			// insert round in player rounds and update for a new round
			playedRounds.push(randomRound)
			randomRound = getRandomRound()

			printTheme();
			alert(`¡Tiempo Terminado! Turno de: ${turn}`);
		} else {
			finishGame();
			return;
		}

		choiceTime()
		gameOfWords.restart()
	}
}

// Finish game and redirect
const finishGame = () => {
	localStorage.setItem('players', JSON.stringify(Array.from(players)));
	alert('¡Nivel Terminado! Haz clic en Aceptar para ver los resultados.')
	window.location.href = './podium.html'
}

// Initialize players
const createPlayers = (names) => {
	let points = 0
	names.forEach(name => {
		players.set(name, 0)
	});

	turn = names[0]
	printTheme();

	btn_word.addEventListener('click', () => game(players, names))
}

const restartStats = () => {
    const players = new Map
    names.forEach(name => {
        players.set(name, 0)
    })

    localStorage.setItem('players', JSON.stringify(Array.from(players)));
}

// App init
window.addEventListener('DOMContentLoaded', () => {
	restartStats();
	createPlayers(names);
	printNames(names);
	choiceTime();
});