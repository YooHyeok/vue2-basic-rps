export default Vue.component('Life', {
  template: html`
    <div class="small-6 columns text-center">
      <div class="battle-wrap">
        <img 
          v-for="(life, index) in lifeOf"
          src="public/images/heart.jpg" 
          class="heart" 
          alt=""
        >
        <img 
          v-for="(life, index) in leftLifeOf"
          src="public/images/broken-heart.jpg" 
          class="heart" 
          alt=""
        >
      </div>
    </div>
  `,
	name: "Life",
	props: {
		lifeOf: null,
		leftLifeOf: null,
	}
});