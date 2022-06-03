<!-- Provided two elements, place them with as much space inbetween as the parent allows
Seen in the preview of jb for "In Juicebox..."
-->
<section on:click>
	<slot name="left" />
	<slot name="right" />
</section>

<style>
	section {
		display: flex;
		justify-content: space-between;
	}
</style>
