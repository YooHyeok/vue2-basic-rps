new Vue({
  el: '#app',
  data: {
    myChoice: null,
    comChoice: null,
    count: 3
  },
  /**
   * 감시자...
   */
  watch: { 
    /* count 변수 감시 */
    count: function (newVal) {
      if (newVal === 0) {
        console.log("카운트가 0이 되었다.")
        let number = Math.random() // 0과 1 사이의 소수 랜덤
        if (number < 0.33) {
          this.comChoice = 'scissor'
          return
        }
        if (number < 0.66) {
          this.comChoice = 'rock'
          return
        }
        this.comChoice = 'paper'
        return;
      }
    }
  },
  methods: {
    startGame: function () {
      if (this.myChoice == null) {
        alert('가위 바위 보 중 하나를 선택해주세요') 
        return;
      }
      
      let countDown = setInterval(() => {
        this.count --;
        if (this.count === 0) clearInterval(countDown); // Interval을 멈추라는 의미 (countDown은 interval 식별값)
      }, 1000)
    }
  }
})