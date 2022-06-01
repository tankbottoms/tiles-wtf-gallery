<script lang="ts">
	export let opened = false;
</script>

{#if opened}
	<div class="ant-modal-root">
		<div class="ant-modal-mask" />
		<div tabindex="-1" class="ant-modal-wrap" role="dialog" on:click|self={() => (opened = false)}>
			<div role="document" class="ant-modal" style="width: 520px; transform-origin: 228px 316px;">
				<div
					tabindex="0"
					aria-hidden="true"
					style="width: 0px; height: 0px; overflow: hidden; outline: none;"
				/>
				<div class="ant-modal-content">
					<button
						type="button"
						aria-label="Close"
						class="ant-modal-close"
						on:click={() => (opened = false)}
					>
						<span class="ant-modal-close-x">
							<span
								role="img"
								aria-label="close"
								class="anticon anticon-close ant-modal-close-icon"
							>
								<svg
									viewBox="64 64 896 896"
									focusable="false"
									data-icon="close"
									width="1em"
									height="1em"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
									/>
								</svg>
							</span>
						</span>
					</button>
					<div class="ant-modal-body">
						<div>
							<h2><slot name="title" /></h2>
							<p><slot name="subtext" /></p>
							<slot />
						</div>
					</div>
					<div class="ant-modal-footer">
						<div style="display: flex; justify-content: space-between; margin-top: 20px;">
							<div />
							<button type="button" class="ant-btn" on:click={() => (opened = false)}>Done</button>
						</div>
					</div>
				</div>
				<div
					tabindex="0"
					aria-hidden="true"
					style="width: 0px; height: 0px; overflow: hidden; outline: none;"
				/>
			</div>
		</div>
	</div>
{/if}
