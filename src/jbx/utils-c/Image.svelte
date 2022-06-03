<script lang="ts">
	export let src: string;
</script>

<span
	style="box-sizing:border-box;display:inline-block;overflow:hidden;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;position:relative;max-width:100%"
>
	<span
		style="box-sizing:border-box;display:block;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;max-width:100%"
	>
		<img
			style="display:block;max-width:100%;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0"
			alt=""
			aria-hidden="true"
			{src}
		/>
	</span>
	<img
		alt=""
		{src}
		decoding="async"
		data-nimg="intrinsic"
		style="position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%"
	/>
</span>

<style>
	span {
		background: red;
		width: 200px;
		height: 200px;
	}
</style>
