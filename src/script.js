const btn_players = document.getElementById('btn-players')
const menuSelect = document.getElementById('menu')
const levelMenu = document.getElementById("levelMenu")

// Función para actualizar los inputs basados en la opción seleccionada
const actualizarPantalla = () => {
	let i = 0
	const main = document.getElementById('forms')
	main.innerHTML = ""  // Limpiar los formularios antes de agregar nuevos
	const selectOption = menuSelect.value

	let numPlayers = 4  // Por defecto asume 4 jugadores
	if (selectOption == 2) {
		numPlayers = 2
	} else if (selectOption == 3) {
		numPlayers = 3
	}

	while (i < numPlayers) {
		crearInputs(i)
		i++
	}
}

// Función para crear los campos de texto para los jugadores
const crearInputs = (i) => {
	const label = document.createElement('label')
	label.htmlFor = "name_players_" + i
	label.textContent = "Ingresa el nombre del jugador " + (i + 1)

	const input = document.createElement('input')
	input.type = "text"
	input.id = "name_players_" + i
	input.placeholder = "Nombre..."

	label.appendChild(input)
	document.getElementById('forms').appendChild(label)
}

// Inicializar la pantalla por primera vez
actualizarPantalla()

// Escuchar cambios en el menú desplegable (Reemplaza el onchange del HTML)
menuSelect.addEventListener('change', actualizarPantalla)

// Función para obtener y validar los nombres de los jugadores
const obtenerNombres = () => {
	const names = []
	let valid = true
	const maxLength = 10
	const inputs = document.querySelectorAll('input')

	inputs.forEach(input => {
		const value = input.value.trim()
		// Validar que solo sean letras, sin espacios extra, y que cumpla la longitud
		if (/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/.test(value) || value.length > maxLength || value.length === 0 || names.includes(value)) {
			valid = false
		} else {
			names.push(value)
		}
	})

	// Si no es válido, mostrar alerta y detener
	if (!valid || names.length !== inputs.length) {
		alert("Por favor, corrige lo siguiente:\n\n" +
			"- Completa todos los campos solo con letras.\n" +
			"- La longitud máxima es de " + maxLength + " caracteres.\n" +
			"- Los nombres no pueden estar vacíos ni repetirse entre jugadores.")
		return false
	}
	return names
}

// Función principal para manejar el clic del botón JUGAR
const iniciarPagina = () => {
	btn_players.addEventListener('click', () => {
		let names = obtenerNombres()
		const players = new Map
		// reincia valores al presionar jugar
		names.forEach(name => {
			players.set(name, 0)
		})

		// Si los nombres son válidos, guardarlos en localStorage y redirigir
		if (names) {
			localStorage.setItem('players', JSON.stringify(Array.from(players)));
			localStorage.setItem("level", levelMenu.value)
			window.location.href = './templates/game.html'
		}
	})
}

// Iniciar el escuchador de eventos
iniciarPagina()