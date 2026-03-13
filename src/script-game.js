import { stopwatch } from "./class_stopwatch.js"
import { randomLetter } from "./class_stopwatch.js";

const gameOfWords = new stopwatch(60)

const choiceTime = () => {

	setTimeout(() => gameOfWords.play(), 3000)
}

const btn_word = document.getElementById('btn-word')
//global variables
const players = new Map()
let turn = ""
let firstRandom = ""
const usedWords = []
export const images = ['../assets/images/characters/20.webp',
	'../assets/images/characters/19.webp',
	'../assets/images/characters/18.webp',
	'../assets/images/characters/17.webp']
	localStorage.setItem('images', JSON.stringify(images))
//get the names from the script.js
const names = JSON.parse(localStorage.getItem('playerNames')) || []

//function to print the names of the players
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
		text_points.id=i

		div.appendChild(img)
		div.appendChild(text_name)
		div.appendChild(text_points)
		

		document.getElementById('player-box').appendChild(div)
		i++
	})
	document.getElementById("pp_character").style = `background: url(${images[0]}) no-repeat center center;
	background-size: cover;
	width: 100px;
	height: 100px;`
}

//create a Map from the name of players an the initial points of them (0)
const createPlayers = (names) => {
	let points = 0
	names.forEach(name => {
		players.set(name, points)
	});
	console.log("jugadores creados")
	//initial turn (player 1)
	turn = names[0]
	//generate the first random letter
	firstRandom = getRandomLetter().toLowerCase()
	printLetter(firstRandom)
	//event for start the game (is neccesary create the players for run the game)
	btn_word.addEventListener('click', () => game(players, names))
}

//function that generate the random letters
export const getRandomLetter = () => {
	const alphabet = 'abcdefghijklmnopqrstuvwxyz';
	const randomIndex = Math.floor(Math.random() * alphabet.length);
	const finalLetter = alphabet[randomIndex]
	return finalLetter;
}

//print the random letter
export const printLetter = (randomLetter) => {
	const main = document.getElementById('letter')
	main.innerHTML = ""
	const h1 = document.createElement('h1')
	h1.textContent = randomLetter
	document.getElementById('letter').appendChild(h1)
}
// (function that is the core of the game)
const game = (players, names) => {
	event.preventDefault()
	const word = document.getElementById('insert_word').value.toLowerCase()
	document.getElementById('insert_word').value = ""
	const validate = verifyJustWords(word)
	// player 1
	if (turn == names[0]) {
		//get the current points from the player 1
		const currentPoints = players.get(names[0])
		if ((word[0] == randomLetter || word[0] == firstRandom) && validate == true) {
			saveWord(word) //send the letter to the usedNames array
			//get the new points from the function addPoints
			const newPoints = addPoints(currentPoints)
			players.set(names[0], newPoints) //update the points in the map
			document.getElementById('0').innerHTML = `${players.get(names[0])}` //show the points of the player
		} else {
			saveWord(word)
			//get the new points from the function restPoints
			const newPoints = restPoints(currentPoints)
			players.set(names[0], newPoints) //update the points in the map
			document.getElementById('0').innerHTML = `${players.get(names[0])}`
		}
		//player 2
	} else if (turn == names[1]) {
		//get the current points from the player 2
		const currentPoints = players.get(names[1])
		if ((word[0] == randomLetter || word[0] == firstRandom) && validate == true) {
			//get the new points from the function addPoints
			const newPoints = addPoints(currentPoints)
			players.set(names[1], newPoints) //update the points in the map
			document.getElementById('1').innerHTML = `${players.get(names[1])}`
		} else {
			//get the new points from the function restPoints
			const newPoints = restPoints(currentPoints)
			players.set(names[1], newPoints) //update the points in the map
			document.getElementById('1').innerHTML = `${players.get(names[1])}`
		}
		//player 3
	} else if (turn == names[2]) {
		//get the current points from the player 3
		const currentPoints = players.get(names[2])
		if ((word[0] == randomLetter || word[0] == firstRandom) && validate == true) {
			//get the new points from the function addPoints
			const newPoints = addPoints(currentPoints)
			players.set(names[2], newPoints) //update the points in the map
			document.getElementById('2').innerHTML = `${players.get(names[2])}`
		} else {
			//get the new points from the function restPoints
			const newPoints = restPoints(currentPoints)
			players.set(names[2], newPoints) //update the points in the map
			document.getElementById('2').innerHTML = `${players.get(names[2])}`
		}
		//player 4
	} else if (turn == names[3]) {
		//get the current points from the player 4
		const currentPoints = players.get(names[3])
		if ((word[0] == randomLetter || word[0] == firstRandom) && validate == true) {
			//get the new points from the function addPoints
			const newPoints = addPoints(currentPoints)
			players.set(names[3], newPoints) //update the points in the map
			document.getElementById('3').innerHTML = `${players.get(names[3])}`
		} else {
			//get the new points from the function restPoints
			const newPoints = restPoints(currentPoints)
			players.set(names[3], newPoints) //update the points in the map
			document.getElementById('3').innerHTML = `${players.get(names[3])}`
		}
	}
	saveWord(word)
}

//function for add points to a player
const addPoints = (player) => {
	return player + 1;
}
const restPoints = (player) => {
	return player - 2;
}

//change turn
export const changeTurn = () => {
	if (gameOfWords.counter == 0) {
		if (turn == names[0]) {
			turn = names[1]
		} else if (turn == names[1]) {
			if (names[2]) {
				turn = names[2]
			} else {
				finishGame()
			}
		} else if (turn == names[2]) {
			if (names[3]) {
				turn = names[3]
			} else {
				finishGame()
			}
		}
		else if (turn == names[3]) {
			finishGame()
		}
		choiceTime()
		gameOfWords.restart()
	}
}

const finishGame = () =>{
	localStorage.setItem('players', JSON.stringify(Array.from(players)));
	alert('game over, click for results')
	window.location.href = './podium.html'
}

//function to push words to usedWords array
const saveWord = (word) => {
	usedWords.push(word.toLowerCase())
	return usedWords
}
//function to verify if the word has spaces, if has a symbol or if the word is repeated
const verifyJustWords = (word) =>{
	if (/[^a-zA-Z\s]/.test(word) || usedWords.includes(word) || word.includes(" ")) {
		return false
	} else{
		return true
	}
}

window.addEventListener('DOMContentLoaded', createPlayers(names), printNames(names), choiceTime())