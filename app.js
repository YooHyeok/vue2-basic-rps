new Vue({
  el: '#app',
  data: {
    myChoice: null,
    comChoice: null,
    count: 3,
  },
  /**
   * 감시자...
   */
  watch: { 
    /* count 변수 감시 */
    count: function (newVal) {
      if (newVal === 0) {
        // 컴퓨터 이미지 변경
        let number = Math.random() // 0과 1 사이의 소수 랜덤
        switch (true) {
          case (number < 0.33):
            this.comChoice = 'scissor';
            break;
          case (number < 0.66):
            this.comChoice = 'rock';
            break;
          default:
            this.comChoice = 'paper';
        }
        // 가위 바위 보 승패 결정
        switch (true) {
          case this.myChoice === this.comChoice:
            this.winter = 'no one'
            break;
            case this.myChoice === 'rock' && this.comChoice === 'scissor':
            this.winter = 'me'
            break;
            case this.myChoice === 'scissor' && this.comChoice === 'paper':
            this.winter = 'me'
            break;
          case this.myChoice === 'paper' && this.comChoice === 'rock' :
            this.winter = 'me'
            break;
          case this.myChoice === 'scissor' && this.comChoice === 'rock' :
            this.winter = 'com'
            break;
          case this.myChoice === 'paper' && this.comChoice === 'scissor':
            this.winter = 'com'
            break;
          case this.myChoice === 'rock' && this.comChoice === 'paper' :
            this.winter = 'com'
            break;
          default:
            this.winter = 'error'
        }
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