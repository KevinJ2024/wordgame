import { getRandomLetter, images } from "./script-game.js";
import { printLetter } from "./script-game.js";
import { changeTurn } from "./script-game.js";

let i = 1

export let randomLetter = ""

export class stopwatch {
   constructor(intervalTime) {
      this.intervalTime = intervalTime
      this.counter = intervalTime
      this.interval = null
      this.state = 'stop'
   }

   play() {
      if (this.state == 'play') return
      this.state = 'play'
      document.getElementById('insert_word').value = ""
      document.getElementById('insert_word').style.visibility = 'visible'
      this.interval = setInterval(() => {
         this.counter--
         document.getElementById('time').innerHTML= this.counter
         if (this.counter == 0) {
            document.getElementById('insert_word').style.visibility = 'hidden'
            clearInterval(this.interval)
            this.state = 'stop'
            changeTurn()
            document.getElementById('time').innerHTML= "stop"
            //generate the first random letter
            randomLetter = getRandomLetter()
            printLetter(randomLetter)
            document.getElementById('pp_character').innerHTML = ""
            document.getElementById('pp_character').style = `background: url(${images[i]}) no-repeat center center;
	         background-size: cover;
	         width: 100px;
	         height: 100px;`
            i++
         }
      }, 1000)
   }

   restart() {
      clearInterval(this.interval)
      this.counter = this.intervalTime
      this.state = 'stop'
      console.log('reloj reiniciado')
   }
}


