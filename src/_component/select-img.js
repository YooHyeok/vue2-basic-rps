Vue.component('SelectImg', {
  template: html`
    <div class="small-5 columns text-center">
      <img 
        :src="choiceImage" 
        alt="" 
        class="text-center"
      >
      <h1 class="text-center"><strong>{{name}}</strong></h1>
    </div>
  `,
  props: {
    choiceImage: null,
    name: null
  }
});