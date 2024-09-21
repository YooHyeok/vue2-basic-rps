Vue.component('Root', {
  template: html`
  <div>
    <div class="row">
			<div class="small-5 columns text-center">
				<img 
					:src="myChoiceImage" 
					alt="" 
					class="text-center"
				>
				<h1 class="text-center"><strong>YOU</strong></h1>
			</div>
			<div class="small-2 columns text-center">
				<h1 style="font-size:100px;">
					<strong>{{ count }}</strong>
				</h1>
			</div>
			<div class="small-5 columns text-center">
				<img 
					:src="comChoiceImage" 
					alt="" 
					class="text-center"
				>
				<h1 class="text-center"><strong>Computer</strong></h1>
			</div>
		</div>
		<div class="row">
			<div class="small-6 columns text-center">
				<div class="battle-wrap">
					<img 
						v-for="life in lifeOfMe"
						src="./images/heart.jpg" 
						class="heart" 
						alt=""
					>
					<img 
						v-for="life in leftLifeOfMe"
						src="./images/broken-heart.jpg" 
						class="heart" 
						alt=""
					>
				</div>
			</div>
			<div class="small-6 columns text-center">
				<div class="battle-wrap">
					<img 
						v-for="life in lifeOfCom"
						src="./images/heart.jpg" 
						class="heart" 
						alt=""
					>
					<img 
						v-for="life in leftLifeOfCom"
						src="./images/broken-heart.jpg" 
						class="heart" 
						alt=""
					>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="small-6 columns text-center">
				<div class="row">
					<div class="small-8 small-offset-2 columns text-center">
						<label class="radio-label">
							<input 
								type="radio" 
								v-model="myChoice" 
								value="scissor"
							> 가위
						</label>
						<label class="radio-label">
							<input 
								type="radio" 
								v-model="myChoice" 
								value="rock"
							> 바위
						</label>
						<label class="radio-label">
							<input 
								type="radio" 
								v-model="myChoice" 
								value="paper"
							> 보
						</label>
					</div>
				</div>
				<div class="row">
					<div class="small-12 columns">
						<div class="text-center" v-if="isSelectable">
							<button 
								class="start-btn"
								@click="startGame"
							>
								선택 완료!
							</button>
						</div>
						<div 
							v-else
							class="loading"
						> 
							기다리는 중...
						</div>
					</div>
				</div>
			</div>
			<div class="small-6 columns text-center">
				<p>생각 중...</p>
			</div>
		</div>
		<div class="row">
			<div class="small-12 columns log">
				<ul>
					<li 
						:class="{
							'win-log': log.winner === 'me', 
							'defeat-log': log.winner === 'com', 
							'draw-log': log.winner === 'no one'
						}"
						v-for="log in logs"
					>
						{{ log.message }}
					</li>
				</ul>
			</div>
		</div>
  </div>
  `
  , name: "Root"
  , data: () => {
    return {
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
    }
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
      if (this.myChoice == null) {
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
});