export default {
  template: html`
    <div class="small-2 columns text-center">
      <h1 style="font-size:100px;">
        <strong>{{ count }}</strong>
      </h1>
    </div>
  `,
	name: "Count",
	props: {
    count: null,
	}
}