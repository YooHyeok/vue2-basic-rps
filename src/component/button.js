export default {
  template: html`
    <div class="row">
      <div class="small-12 columns">
        <div 
          v-if="isSelectable"
          class="text-center" 
        >
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
  `,
	name: "Button",
	props: {
		isSelectable: null,
    startGame: Function
	}
}