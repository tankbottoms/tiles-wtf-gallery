<script lang="ts">
	import CurrencyUnit from '$components/CurrencyUnit.svelte';
	import Popup from '$components/Popup.svelte';

	let opened = false;
</script>

<div class="ant-row ant-row-bottom" style="margin-left: -20px; margin-right: -20px; row-gap: 0px;">
	<div
		class="ant-col ant-col-xs-24 ant-col-md-12"
		style="padding-left: 20px; padding-right: 20px; margin-top: 40px;"
	>
		<div>
			<div
				style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: nowrap; margin-bottom: 15px;"
			>
				<div
					style="text-transform: uppercase; color: var(--text-tertiary); font-size: 0.8rem; font-weight: 500;"
				>
					<span
						><span style="margin-right: 5px;">Volume</span><span
							role="img"
							aria-label="question-circle"
							tabindex="-1"
							class="anticon anticon-question-circle"
							><svg
								viewBox="64 64 896 896"
								focusable="false"
								data-icon="question-circle"
								width="1em"
								height="1em"
								fill="currentColor"
								aria-hidden="true"
								><path
									d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
								/><path
									d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"
								/></svg
							></span
						></span
					>
				</div>
				<div style="margin-left: 10px;">
					<span style="font-weight: 500; font-size: 1.1rem; line-height: 1;"
						><span style="color: var(--text-primary)"
							><span><span style="font-family: sans-serif;">Ξ</span>6,855.3174</span></span
						></span
					>
				</div>
			</div>
			<div
				style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: nowrap;"
			>
				<div
					style="text-transform: uppercase; color: var(--text-tertiary); font-size: 0.8rem; font-weight: 500;"
				>
					<span
						><span style="margin-right: 5px;">In Juicebox</span><span
							role="img"
							aria-label="question-circle"
							tabindex="-1"
							class="anticon anticon-question-circle"
							><svg
								viewBox="64 64 896 896"
								focusable="false"
								data-icon="question-circle"
								width="1em"
								height="1em"
								fill="currentColor"
								aria-hidden="true"
								><path
									d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
								/><path
									d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"
								/></svg
							></span
						></span
					>
				</div>
				<div style="margin-left: 10px;">
					<div
						style="font-weight: 500; font-size: 1.1rem; line-height: 1; color: rgb(245, 163, 18); margin-left: 10px;"
					>
						<span
							style="text-transform: uppercase; color: var(--text-tertiary); font-size: 0.8rem; font-weight: 500;"
							><span><span style="font-family: sans-serif;">Ξ</span>5,864.10</span>
						</span><span><span>US$</span>16,815,137</span>
					</div>
				</div>
			</div>
			<div
				style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: nowrap;"
			>
				<div
					style="text-transform: uppercase; color: var(--text-tertiary); font-size: 0.8rem; font-weight: 500;"
				>
					<span
						><span style="margin-right: 5px;">Distributed</span><span
							role="img"
							aria-label="question-circle"
							tabindex="-1"
							class="anticon anticon-question-circle"
							><svg
								viewBox="64 64 896 896"
								focusable="false"
								data-icon="question-circle"
								width="1em"
								height="1em"
								fill="currentColor"
								aria-hidden="true"
								><path
									d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
								/><path
									d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"
								/></svg
							></span
						></span
					>
				</div>
				<div style="margin-left: 10px;">
					<div
						style="text-transform: uppercase; color: var(--text-primary); font-size: 0.8rem; font-weight: 500;"
					>
						<span><span>US$</span>170,300</span> / <span><span>US$</span>170,300</span>
					</div>
				</div>
			</div>
			<div style="display: flex; align-items: center;">
				<div
					class="ant-progress ant-progress-line ant-progress-status-success ant-progress-default"
					style="min-width: 10px;"
				>
					<div class="ant-progress-outer">
						<div class="ant-progress-inner">
							<div
								class="ant-progress-bg"
								style="width: 100%; height: 8px; background: rgb(245, 163, 18);"
							/>
						</div>
					</div>
				</div>
				<div
					style="min-width: 4px; height: 15px; border-radius: 2px; background: var(--text-primary) margin-left: 5px; margin-right: 5px; margin-top: 3px;"
				/>
				<div
					class="ant-progress ant-progress-line ant-progress-status-success ant-progress-default"
					style="width: 9773.83%; min-width: 10px;"
				>
					<div class="ant-progress-outer">
						<div class="ant-progress-inner">
							<div
								class="ant-progress-bg"
								style="width: 100%; height: 8px; background: rgb(245, 163, 18);"
							/>
						</div>
					</div>
				</div>
			</div>
			<div
				style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: nowrap; margin-top: 15px;"
			>
				<div
					style="text-transform: uppercase; color: var(--text-tertiary); font-size: 0.8rem; font-weight: 500;"
				>
					<span
						><span style="margin-right: 5px;">In wallet</span><span
							role="img"
							aria-label="question-circle"
							tabindex="-1"
							class="anticon anticon-question-circle"
							><svg
								viewBox="64 64 896 896"
								focusable="false"
								data-icon="question-circle"
								width="1em"
								height="1em"
								fill="currentColor"
								aria-hidden="true"
								><path
									d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
								/><path
									d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"
								/></svg
							></span
						></span
					>
				</div>
				<div style="margin-left: 10px;">
					<span
						><span
							style="text-transform: uppercase; color: var(--text-tertiary); font-size: 0.8rem; font-weight: 500;"
							><div style="display: inline-block; justify-content: space-between;">
								<span>167,241,605 JBX</span>
							</div>
							+
						</span><span style="font-weight: 500; font-size: 1.1rem; line-height: 1;"
							><span><span style="font-family: sans-serif;">Ξ</span>5.92</span></span
						></span
					>
				</div>
			</div>
			<div style="text-align: right;">
				<span
					style="text-transform: uppercase; color: var(--text-tertiary); font-size: 0.8rem; font-weight: 500; cursor: pointer;"
					on:click={() => (opened = !opened)}
				>
					All assets <span role="img" aria-label="right-circle" class="anticon anticon-right-circle"
						><svg
							viewBox="64 64 896 896"
							focusable="false"
							data-icon="right-circle"
							width="1em"
							height="1em"
							fill="currentColor"
							aria-hidden="true"
							><path
								d="M666.7 505.5l-246-178A8 8 0 00408 334v46.9c0 10.2 4.9 19.9 13.2 25.9L566.6 512 421.2 617.2c-8.3 6-13.2 15.6-13.2 25.9V690c0 6.5 7.4 10.3 12.7 6.5l246-178c4.4-3.2 4.4-9.8 0-13z"
							/><path
								d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
							/>
						</svg>
					</span>
				</span>
			</div>
			<Popup bind:opened>
				<svelte:fragment slot="title">Assets</svelte:fragment>
				<svelte:fragment slot="subtext">
					Other assets in this project's owner's wallet.
				</svelte:fragment>
				<div class="ant-space ant-space-vertical" style="width: 100%; margin-top: 20px; gap: 8px;">
					<div class="ant-space-item">
						<div style="display: flex; justify-content: space-between;">
							<span>167,241,605 JBX</span>
							<a
								class="text-primary hover-text-action-primary hover-text-decoration-underline"
								href="#/p/juicebox"
								style="font-weight: 500; color: var(--text-tertiary);"
							>
								@juicebox
							</a>
						</div>
					</div>
				</div>
			</Popup>
		</div>
	</div>
	<div
		class="ant-col ant-col-xs-24 ant-col-md-12"
		style="padding-left: 20px; padding-right: 20px; margin-top: 40px;"
	>
		<div style="display: flex; width: 100%;">
			<div style="flex: 1 1 0%; margin-right: 10px;">
				<div class="formatted-number-input">
					<div class="ant-row ant-form-item" style="row-gap: 0px;">
						<div class="ant-col ant-form-item-control">
							<div class="ant-form-item-control-input">
								<div class="ant-form-item-control-input-content">
									<div style="display: flex; align-items: center;">
										<div class="ant-input-number antd-no-number-handler" style="width: 100%;">
											<div class="ant-input-number-handler-wrap">
												<span
													unselectable={true}
													role="button"
													aria-label="Increase Value"
													aria-disabled="false"
													class="ant-input-number-handler ant-input-number-handler-up"
													><span
														role="img"
														aria-label="up"
														class="anticon anticon-up ant-input-number-handler-up-inner"
														><svg
															viewBox="64 64 896 896"
															focusable="false"
															data-icon="up"
															width="1em"
															height="1em"
															fill="currentColor"
															aria-hidden="true"
															><path
																d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"
															/></svg
														></span
													></span
												><span
													unselectable={true}
													role="button"
													aria-label="Decrease Value"
													aria-disabled="true"
													class="ant-input-number-handler ant-input-number-handler-down ant-input-number-handler-down-disabled"
													><span
														role="img"
														aria-label="down"
														class="anticon anticon-down ant-input-number-handler-down-inner"
														><svg
															viewBox="64 64 896 896"
															focusable="false"
															data-icon="down"
															width="1em"
															height="1em"
															fill="currentColor"
															aria-hidden="true"
															><path
																d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"
															/></svg
														></span
													></span
												>
											</div>
											<div class="ant-input-number-input-wrap">
												<input
													autocomplete="off"
													role="spinbutton"
													aria-valuemin={0}
													aria-valuenow={0}
													step={1}
													placeholder="0"
													class="ant-input-number-input"
													value={0}
												/>
											</div>
										</div>
										<div style="margin-left: -54px; z-index: 1; font-size: 0.8rem;">
											<div id="accessory1.0835528991799181">
												<CurrencyUnit />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div style="font-size: 0.7rem;">
					Receive 56,035 JBX/1 ETH
					<div>
						or <span
							><span
								style="color: var(--text-action-primary); cursor: pointer; padding: 0.5rem 0px;"
								>buy JBX on exchange<span
									role="img"
									aria-label="question-circle"
									tabindex="-1"
									class="anticon anticon-question-circle"
									style="margin-left: 0.2rem;"
									><svg
										viewBox="64 64 896 896"
										focusable="false"
										data-icon="question-circle"
										width="1em"
										height="1em"
										fill="currentColor"
										aria-hidden="true"
										><path
											d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
										/><path
											d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"
										/></svg
									></span
								></span
							></span
						>
					</div>
				</div>
			</div>
			<div style="text-align: center; min-width: 150px;">
				<button type="button" class="ant-btn ant-btn-primary" style="width: 100%;"
					><span>Add juice</span></button
				>
			</div>
		</div>
	</div>
</div>
