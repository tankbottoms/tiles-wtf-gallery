<script lang="ts">
	export let opened = false;
</script>

{#if opened}
	<div class="ant-modal-root">
		<div class="ant-modal-mask" />
		<div tabindex="-1" class="ant-modal-wrap" role="dialog" on:click|self={() => (opened = false)}>
			<div role="document" class="ant-modal" style="width: 520px; transform-origin: 218px 249px;">
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
						><span class="ant-modal-close-x"
							><span
								role="img"
								aria-label="close"
								class="anticon anticon-close ant-modal-close-icon"
								><svg
									viewBox="64 64 896 896"
									focusable="false"
									data-icon="close"
									width="1em"
									height="1em"
									fill="currentColor"
									aria-hidden="true"
									><path
										d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
									/></svg
								></span
							></span
						></button
					>
					<div class="ant-modal-body">
						<div>
							<h4>JBX holders</h4>
							<div style="margin-bottom: 20px;">
								Token address: <span style="cursor: default; user-select: all; line-height: 22px;"
									>0x3abF...646f66</span
								>
							</div>
							<p style="padding: 10px; background: var(--background-l1);">
								This list is using an experimental data index and may be inaccurate for some
								projects.
							</p>
							<div>
								<div
									style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; width: 100%;"
								>
									<div
										class="ant-select ant-select-single ant-select-show-arrow"
										style="flex: 1 1 0%;"
									>
										<div class="ant-select-selector">
											<span class="ant-select-selection-search"
												><input
													autocomplete="off"
													type="search"
													class="ant-select-selection-search-input"
													role="combobox"
													aria-haspopup="listbox"
													aria-owns="rc_select_2_list"
													aria-autocomplete="list"
													aria-controls="rc_select_2_list"
													aria-activedescendant="rc_select_2_list_0"
													readonly={true}
													unselectable={true}
													value=""
													style="opacity: 0;"
													id="rc_select_2"
												/></span
											><span class="ant-select-selection-item">JBX balance</span>
										</div>
										<span
											class="ant-select-arrow"
											unselectable={true}
											aria-hidden="true"
											style="user-select: none;"
											><span
												role="img"
												aria-label="down"
												class="anticon anticon-down ant-select-suffix"
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
									<div style="cursor: pointer; padding: 10px;">
										<span
											role="img"
											aria-label="sort-descending"
											class="anticon anticon-sort-descending"
											><svg
												viewBox="64 64 896 896"
												focusable="false"
												data-icon="sort-descending"
												width="1em"
												height="1em"
												fill="currentColor"
												aria-hidden="true"
												><path
													d="M839.6 433.8L749 150.5a9.24 9.24 0 00-8.9-6.5h-77.4c-4.1 0-7.6 2.6-8.9 6.5l-91.3 283.3c-.3.9-.5 1.9-.5 2.9 0 5.1 4.2 9.3 9.3 9.3h56.4c4.2 0 7.8-2.8 9-6.8l17.5-61.6h89l17.3 61.5c1.1 4 4.8 6.8 9 6.8h61.2c1 0 1.9-.1 2.8-.4 2.4-.8 4.3-2.4 5.5-4.6 1.1-2.2 1.3-4.7.6-7.1zM663.3 325.5l32.8-116.9h6.3l32.1 116.9h-71.2zm143.5 492.9H677.2v-.4l132.6-188.9c1.1-1.6 1.7-3.4 1.7-5.4v-36.4c0-5.1-4.2-9.3-9.3-9.3h-204c-5.1 0-9.3 4.2-9.3 9.3v43c0 5.1 4.2 9.3 9.3 9.3h122.6v.4L587.7 828.9a9.35 9.35 0 00-1.7 5.4v36.4c0 5.1 4.2 9.3 9.3 9.3h211.4c5.1 0 9.3-4.2 9.3-9.3v-43a9.2 9.2 0 00-9.2-9.3zM310.3 167.1a8 8 0 00-12.6 0L185.7 309c-4.2 5.3-.4 13 6.3 13h76v530c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V322h76c6.7 0 10.5-7.8 6.3-13l-112-141.9z"
												/></svg
											></span
										>
									</div>
									<button type="button" class="ant-btn ant-btn-text ant-btn-icon-only"
										><span role="img" aria-label="download" class="anticon anticon-download"
											><svg
												viewBox="64 64 896 896"
												focusable="false"
												data-icon="download"
												width="1em"
												height="1em"
												fill="currentColor"
												aria-hidden="true"
												><path
													d="M505.7 661a8 8 0 0012.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"
												/></svg
											></span
										></button
									>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>jango.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>14.1 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">277,276,065 JBX (11.55%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												276,547,060 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>peri.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>5.794666 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">254,228,565 JBX (10.59%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												253,881,343 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>dao.jbx.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>19.440750 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">167,241,605 JBX (6.96%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												158,908,271 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>assangedao.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>829.653262 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">87,478,938 JBX (3.64%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x4859...7e6b17</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">85,915,790 JBX (3.58%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0xb8d3...8196ef</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">80,120,452 JBX (3.33%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x367f...5a9273</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">60,480,536 JBX (2.52%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x518e...62632f</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">59,272,615 JBX (2.46%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>jb.daodevinc.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">49,868,304 JBX (2.07%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												49,857,673 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0xb939...3e2ebf</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>110 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">48,048,000 JBX (2%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												48,048,000 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>nft618.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0.0111 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">32,265,941 JBX (1.34%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>sharkdao.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>60.460944 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">30,123,612 JBX (1.25%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												30,123,612 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x11ce...67f53c</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">29,299,889 JBX (1.22%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>mechine.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>19 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">25,121,827 JBX (1.04%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												15,836,730 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>hyperfunk.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>1 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">24,836,434 JBX (1.03%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												393,120 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>demelain.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>100 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">23,213,342 JBX (0.96%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>sagekellyn.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">22,082,345 JBX (0.92%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												21,735,123 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>zeugh.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0.154952 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">21,474,329 JBX (0.89%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												264,084 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0xcb33...8ba06a</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>21 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">18,900,000 JBX (0.78%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x468b...ecad17</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">18,900,000 JBX (0.78%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>mieos.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0.154799 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">18,649,937 JBX (0.77%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												18,169,382 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x031f...d4655a</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>46 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">18,206,341 JBX (0.75%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0xce4a...cab2c9</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>124.882647 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">15,501,639 JBX (0.64%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												8,451 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x01c6...bd74d4</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>66.6 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">15,460,086 JBX (0.64%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>dexer.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>36 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">13,995,207 JBX (0.58%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x6493...96d764</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>14.010537 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">13,019,493 JBX (0.54%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												13,019,493 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x2b19...e8b15c</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>14 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">12,794,931 JBX (0.53%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												12,600,000 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>tankbottoms.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>1.5 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">12,185,234 JBX (0.5%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												369,524 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0xd4ee...895e11</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>47 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">12,124,921 JBX (0.5%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x2109...28c33a</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>50 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">11,606,671 JBX (0.48%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												11,606,671 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0xfu.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>46 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">10,678,137 JBX (0.44%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0xee94...fc4acf</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">9,999,999 JBX (0.41%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x6a02...f22eb6</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>11 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">9,900,000 JBX (0.41%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0xd8fd...b47e1e</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>40 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">9,285,337 JBX (0.38%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>nascent.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>10 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">9,000,000 JBX (0.37%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x84d7...a28342</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">8,922,737 JBX (0.37%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0xd965...29f056</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>20 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">8,736,000 JBX (0.36%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												8,736,000 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x2d81...53fe41</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>20 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">8,736,000 JBX (0.36%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												8,736,000 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0xd64b...ce96a4</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>6.4 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">8,012,007 JBX (0.33%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0xd7dd...6526bb</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">8,000,000 JBX (0.33%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x34e7...5dbf33</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0.9 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">7,914,471 JBX (0.32%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x4bd3...717bf0</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">7,879,848 JBX (0.32%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x6106...6a51a6</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>8.5 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">7,844,931 JBX (0.32%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												7,650,000 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x4709...017c41</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">7,316,130 JBX (0.3%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x2faa...9651a8</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>30 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">6,964,002 JBX (0.29%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												6,964,002 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x8cdf...68638c</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">6,962,497 JBX (0.29%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x330e...a5a832</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>7 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">6,300,000 JBX (0.26%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x3a8e...ac9eb2</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>44.63 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">6,151,723 JBX (0.25%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x3b3f...bc8a72</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>25 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">5,803,335 JBX (0.24%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>mcq.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>25 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">5,803,335 JBX (0.24%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0xee81...62bd2b</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">5,162,740 JBX (0.21%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x5ce4...c5ca67</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>20 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">5,158,520 JBX (0.21%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>nnnnicholas.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>7.9 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">5,141,221 JBX (0.21%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												4,793,999 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>peel.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>2.717953 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">5,041,131 JBX (0.21%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												207,798 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0xd716...148bdf</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>21.5 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">5,001,499 JBX (0.2%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0xedd8...1961f9</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>10 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">4,747,844 JBX (0.19%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0xf9a2...314165</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>19.9 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">4,653,299 JBX (0.19%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0xe6fb...b0d7d2</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>20 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">4,653,299 JBX (0.19%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x82cd...69213b</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>20 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">4,653,299 JBX (0.19%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x8a64...ec167d</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>20 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">4,642,668 JBX (0.19%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x0033...855555</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>5 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">4,593,020 JBX (0.19%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>drgorilla.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">4,494,257 JBX (0.18%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												334,321 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x348f...1e4df8</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">4,243,224 JBX (0.17%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x46de...bb78fd</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">4,030,109 JBX (0.16%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x6c9b...5a703c</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>9 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">3,881,258 JBX (0.16%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x88f9...0c914f</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0.253688 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">3,849,638 JBX (0.16%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												3,502,416 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x33dd...805764</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">3,657,852 JBX (0.15%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x3c44...8c338f</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>4.3 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">3,632,942 JBX (0.15%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>catman.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>14 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">3,444,799 JBX (0.14%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>dhyon.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0.05 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">3,382,013 JBX (0.14%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												49,345 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x21c3...46b938</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>3.5 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">3,344,931 JBX (0.13%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												3,150,000 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>depthmap.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">3,332,916 JBX (0.13%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0xe5b1...c0deed</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">3,266,579 JBX (0.13%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x45d8...3479d7</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>4.4 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">3,236,765 JBX (0.13%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0xfbec...38d454</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">3,118,713 JBX (0.12%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>e168.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>1 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">3,040,293 JBX (0.12%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>mrkimchi.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">3,025,106 JBX (0.12%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x5e85...253e62</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>7 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">3,010,631 JBX (0.12%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x7680...6d2e2f</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>1.11 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">3,008,331 JBX (0.12%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0xd8c4...cc5237</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>2 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">3,000,296 JBX (0.12%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>imdefi1.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">2,923,701 JBX (0.12%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>phytann.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">2,820,033 JBX (0.11%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x8dda...34e5c0</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>11.7 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">2,726,592 JBX (0.11%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x2347...430fef</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>10 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">2,710,605 JBX (0.11%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>zom-bae.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">2,671,263 JBX (0.11%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												1,231,982 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x7f53...a86e4a</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>11.5 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">2,669,534 JBX (0.11%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0xd399...ea426a</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>2.5 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">2,640,613 JBX (0.11%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>mrgoldstein.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">2,603,986 JBX (0.1%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>davinki.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>4 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">2,594,931 JBX (0.1%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												2,400,000 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x9b17...818bdb</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">2,590,352 JBX (0.1%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x1864...37f33f</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">2,536,429 JBX (0.1%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0xa81f...cdd2ee</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">2,521,597 JBX (0.1%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>hillbillyoda.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>6.245243 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">2,505,061 JBX (0.1%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												2,505,061 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0xgogo.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">2,471,932 JBX (0.1%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0xstvg.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0.5 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">2,426,412 JBX (0.1%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												440,099 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>phuktep.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>5 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">2,407,822 JBX (0.1%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0x5396...aa7e4f</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>0 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">2,369,586 JBX (0.09%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>bitleong.eth</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>10 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">2,331,965 JBX (0.09%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0xfa15...a7db60</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>10 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">2,321,334 JBX (0.09%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
								<div
									style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.094);"
								>
									<div style="display: flex; place-content: space-between;">
										<div>
											<div style="line-height: 1.4rem; margin-right: 10px;">
												<span style="cursor: default; user-select: all; line-height: 22px;"
													>0xaa1f...f16214</span
												>
											</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												<span style="font-family: sans-serif;">Ξ</span>10 contributed
											</div>
										</div>
										<div style="text-align: right;">
											<div style="line-height: 1.4rem;">2,321,334 JBX (0.09%)</div>
											<div style="font-size: 0.7rem; color: var(--text-tertiary);">
												0 JBX staked
											</div>
										</div>
									</div>
								</div>
							</div>
							<div style="text-align: center; color: var(--text-secondary); cursor: pointer;">
								Load more
							</div>
						</div>
					</div>
					<div class="ant-modal-footer">
						<button hidden type="button" class="ant-btn"><span>Cancel</span></button><button
							type="button"
							class="ant-btn ant-btn-primary"
							on:click={() => (opened = false)}><span>Done</span></button
						>
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
