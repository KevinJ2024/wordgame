const btn_players = document.getElementById('btn-players')
let selectOption = document.querySelector('select').value

// Function to update the inputs based on the selected option
const RefreshScreen = () => {
	let i = 0
	const main = document.getElementById('forms')
	main.innerHTML = ""  // Clear the forms before adding new ones
	selectOption = document.querySelector('select').value
	console.log(selectOption)

	let numPlayers = 4  // Default: assume there are 4 players
	if (selectOption == 2) {
		numPlayers = 2
	} else if (selectOption == 3) {
		numPlayers = 3
	}

	// Create inputs based on the selected option
	while (i < numPlayers) {
		createInputs(i)
		i++
	}
}

// Function to create inputs for the players
const createInputs = (i) => {
	const label = document.createElement('label')
	label.for = "name_players_" + i  // Each input will have a unique ID
	label.textContent = "Insert name of player " + (i + 1)

	const input = document.createElement('input')
	input.type = "text"
	input.id = "name_players_" + i  // Unique ID for each input
	input.placeholder = "Username..."

	label.appendChild(input)
	document.getElementById('forms').appendChild(label)
}

// Function to verify the players' names
const getNames = () => {
	const names = []
	let valid = true
	const maxLength = 7
	const inputs = document.querySelectorAll('input')

	inputs.forEach(input => {
		const value = input.value.trim()
		// Check for only letters and spaces, and the maximum length
		if (/[^a-zA-Z\s]/.test(value) || value.length > maxLength || value.length === 0 || names.includes(value)) {
			valid = false
		} else {
			names.push(value)
		}
	})

	// If not valid, show an alert and return false
	if (!valid || names.length !== inputs.length) {
		alert("- Please, only letters and complete all fields. \n\ - The maximum length is " + maxLength + " characters \n" + "- The min lenght is 0 characters \n - You cant repeat Names")
		return false
	}
	return names
}

// Main function to handle the button click
const page = () => {
	// Event when the button is clicked
	btn_players.addEventListener('click', () => {
		let names = getNames()  // Get the names

		// If the names are valid, save them in localStorage and redirect
		if (names) {
			localStorage.setItem('playerNames', JSON.stringify(names))  // Save names in localStorage
			window.location.href = './templates/game.html'  // Redirect to the game page
		}
	})
}

// Initialize the form and events
document.getElementById('menu').addEventListener('change', RefreshScreen)
window.addEventListener('DOMContentLoaded', RefreshScreen)

// Call the main function to handle the button click
page()
