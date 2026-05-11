import { changeTurn } from "./script-game.js";

export class stopwatch {
   constructor(intervalTime) {
      this.intervalTime = intervalTime
      this.counter = intervalTime
      this.interval = null
      this.state = 'stop'
   }

   play() {
      if (this.state === 'play') return
      this.state = 'play'
      
      const wordList = document.getElementById('ListWords')
      wordList.style.visibility = 'visible'
      wordList.style.opacity = '1'
      

      this.interval = setInterval(() => {
         this.counter--
         document.getElementById('time').innerHTML = this.counter
         
         if (this.counter === 0) {
            wordList.style.opacity = "0.4"
            clearInterval(this.interval)
            this.state = 'stop'
            document.getElementById('time').innerHTML = "Tiempo"
            
            changeTurn()
         }
      }, 1000)
   }

   restart() {
      clearInterval(this.interval)
      this.counter = this.intervalTime
      this.state = 'stop'
      console.log('Reloj reiniciado')
   }
}