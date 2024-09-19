new Vue({
  el: '#app',
  data: {
    myChoice: null,
    comChoice: null,
    count: 3,
    lifeOfMe: 3,
    lifeOfCom: 3,
    isSelectable: true, // button show/hidden flag
    logs: [],
    selects: [
      { name: '가위', value: 'scissor' },
      { name: '바위', value: 'rock' },
      { name: '보', value: 'paper' },
    ],
  },
  computed: {
    myChoiceImage: function () {
      return this.myChoice !== null 
      ? `images/${this.myChoice}.jpg`
      : 'images/question.jpg'
    },
    comChoiceImage: function () {
      return this.comChoice !== null 
      ? `images/${this.comChoice}.jpg`
      : 'images/question.jpg'
    },
    leftLifeOfMe: function () {
      return 3 - this.lifeOfMe
    },
    leftLifeOfCom: function () {
      return 3 - this.lifeOfCom
    }
  },
  /**
   * 감시자...
   */
  watch: { 
    /* count 변수 감시 */
    count: function (newVal) {
      if (newVal === 0) {

        // 컴퓨터 이미지 변경
        this.selectCom();

        // 가위 바위 보 승패 결정 & 몫 차감
        this.whoIsWin();
        
        this.count = 3;
        
        // [기다리는중]버튼 show / [선택 완료!]버튼 hide
        this.isSelectable = true
        
        // 게임 결과 로그 추가
        this.updateLogs();
        
      }
    },
    /* likeOfMe 변수 감시 */
    lifeOfMe: function (newVal) {
      if (newVal === 0) {
        this.endGame('안타깝네요. 당신이 패배하였습니다.')
      }
    },
    lifeOfCom: function (newVal) {
      if (newVal === 0) {
        this.endGame('축하드립니다. 당신이 승리하였습니다.')
      }
    },
  },
  methods: {
    startGame: function () {

      // [기다리는중]버튼 hide / [선택 완료!]버튼 show
      this.isSelectable = false

      // 라디오 선택 valid
      if (this.myChoice == null) {
        alert('가위 바위 보 중 하나를 선택해주세요') 
        this.isSelectable = true
        return;
      }
      
      // 게임 시작 후 시간 카운팅
      let countDown = setInterval(() => {
        this.count --;
        if (this.count === 0) clearInterval(countDown); // Interval을 멈추라는 의미 (countDown은 interval 식별값)
      }, 1000)
    },
    selectCom: function () {
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
    },
    whoIsWin: function () {
      switch (true) {
        case this.myChoice === this.comChoice:
          this.winner = 'no one'
          break;
          case this.myChoice === 'rock' && this.comChoice === 'scissor':
          this.winner = 'me'
          break;
          case this.myChoice === 'scissor' && this.comChoice === 'paper':
          this.winner = 'me'
          break;
        case this.myChoice === 'paper' && this.comChoice === 'rock' :
          this.winner = 'me'
          break;
        case this.myChoice === 'scissor' && this.comChoice === 'rock' :
          this.winner = 'com'
          break;
        case this.myChoice === 'paper' && this.comChoice === 'scissor':
          this.winner = 'com'
          break;
        case this.myChoice === 'rock' && this.comChoice === 'paper' :
          this.winner = 'com'
          break;
        default:
          this.winner = 'error'
      }
      switch (this.winner) {
        case 'me':
          this.lifeOfCom--;
          break;
        case 'com':
          this.lifeOfMe--;
      }
    },
    updateLogs: function () {
      // let log = `You: ${this.myChoice}, Computer: ${this.comChoice}`
      let log = {
        message: `You: ${this.myChoice}, Computer: ${this.comChoice}`,
        winner: this.winner
      }
      // this.logs.push(log) // 오름차순
      this.logs.unshift(log) // 내림차순
    },
    endGame: function (msg) {
      setTimeout(() => {
        confirm(msg)
        this.lifeOfMe = 3
        this.lifeOfCom = 3
        this.myChoice = null
        this.comChoice = null
        this.winner = null
        this.logs = []
        return;
      }, 500)
    }
  }
})