const template= html`
  <div>
    <div class="row">
      <SelectImg 
        :name="'You'"
        :choiceImage="myChoiceImage"
      />
      <Count
        :count="count"
      />
      <SelectImg 
        :name="'Computer'"
        :choiceImage="comChoiceImage"
      />
    </div>
    <div class="row">
      <Life
        :lifeOf="lifeOfMe"
        :leftLifeOf="leftLifeOfMe"
      />
      <Life
        :lifeOf="lifeOfCom"
        :leftLifeOf="leftLifeOfCom"
      />
    </div>
    <div class="row">
      <div class="small-6 columns text-center">
        <Radio
          :selects="selects"
          :choice="choice"
        />        
        <Button 
          :isSelectable="isSelectable"
          :startGame="startGame"
        />
      </div>
      <div class="small-6 columns text-center">
        <p>생각 중...</p>
      </div>
    </div>
    <Result 
      :logs="logs"
    />
  </div>`

import SelectImg from "./select-img.js"
import Count from "./count.js"
import Life from "./life.js"
import Radio from "./radio.js"
import Button from "./button.js"
import Result from "./result.js"

export default {
  template,
  name: "Root",
  components: {
    SelectImg,
    Count,
    Life,
    Button,
    Radio,
    Result

  },
  data: () => {
    return {
      choice: {
        user: null,
        computer: null,
      },
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
    }
  },
  computed: {
    myChoiceImage: function () {
      return this.choice.user !== null 
      ? `public/images/${this.choice.user}.jpg`
      : 'public/images/question.jpg'
    },
    comChoiceImage: function () {
      return this.choice.computer !== null 
      ? `public/images/${this.choice.computer}.jpg`
      : 'public/images/question.jpg'
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
        
        // [기다리는중]버튼 hide / [선택 완료!]버튼 show
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
  
      
      // 라디오 선택 valid
      if (this.choice.user == null) {
        alert('가위 바위 보 중 하나를 선택해주세요') 
        return;
      }
      
      // [기다리는중]버튼 show / [선택 완료!]버튼 hide
      this.isSelectable = false
      
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
            this.choice.computer = 'scissor';
            break;
          case (number < 0.66):
            this.choice.computer = 'rock';
            break;
          default:
            this.choice.computer = 'paper';
        }
    },
    whoIsWin: function () {
      switch (true) {
        case this.choice.user === this.choice.computer:
          this.winner = 'no one'
          break;
          case this.choice.user === 'rock' && this.choice.computer === 'scissor':
          this.winner = 'me'
          break;
          case this.choice.user === 'scissor' && this.choice.computer === 'paper':
          this.winner = 'me'
          break;
        case this.choice.user === 'paper' && this.choice.computer === 'rock' :
          this.winner = 'me'
          break;
        case this.choice.user === 'scissor' && this.choice.computer === 'rock' :
          this.winner = 'com'
          break;
        case this.choice.user === 'paper' && this.choice.computer === 'scissor':
          this.winner = 'com'
          break;
        case this.choice.user === 'rock' && this.choice.computer === 'paper' :
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
      // let log = `You: ${this.choice.user}, Computer: ${this.choice.computer}`
      let log = {
        message: `You: ${this.choice.user}, Computer: ${this.choice.computer}`,
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
        this.choice.user = null
        this.choice.computer = null
        this.winner = null
        this.logs = []
        return;
      }, 500)
    }
  }
}