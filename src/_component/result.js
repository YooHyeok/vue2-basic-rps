Vue.component('Result', {
  template: html`
    <div class="row">
			<div class="small-12 columns log">
				<ul>
					<li 
						v-for="(log, index) in logs"
						v-bind:key="index"
						:class="{
							'win-log': log.winner === 'me', 
							'defeat-log': log.winner === 'com', 
							'draw-log': log.winner === 'no one'
						}"
					>
						{{ log.message }}
					</li>
				</ul>
			</div>
		</div>
  `,
	name: "Result",
	props: {
		logs: null
	}
});