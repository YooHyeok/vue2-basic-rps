export default Vue.component('Radio', {
  template: html`
    <div class="row">
      <div class="small-8 small-offset-2 columns text-center">
        <label 
          v-for="(rps,index) in selects"
          class="radio-label"
        >
          <input 
            type="radio" 
            v-model="choice.user" 
            :value="rps.value"
          > {{rps.name}}
        </label>
      </div>
    </div>
  `,
	name: "Radio",
	props: {
		selects: null,
		choice: null,
	}
});