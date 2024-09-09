new Vue({
  el: '#app',
  data: {
    myChoice: null,
    count: 3
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