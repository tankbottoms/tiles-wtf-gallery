<script lang="ts">
	import tos from '$markdown/tos';
	import { marked } from 'marked';
</script>

<section>
	<div class="only-mobile">
		<br />
	</div>

	{@html marked(tos)}

	<br />
	<br />
</section>

<style>
	section {
		max-width: 900px;
		margin: 0 auto;
		text-align: justify;
		padding: 1rem;
	}
</style>
