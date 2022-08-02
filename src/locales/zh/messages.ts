/*eslint-disable*/ export const messages = {
	'(Optional) Add a memo to this payment on-chain': '（可选的）在此链上付款中添加备注',
	'(Optional) Add a note to this payment on-chain': '（可选的）在此链上付款中添加备注',
	'({0}%)': ['(', ['0'], '%)'],
	'({realTokenAllocationPercent}% of all newly minted tokens).': [
		'（',
		['realTokenAllocationPercent'],
		'% 新铸造的代币）。'
	],
	'0% fee': '0% 费率',
	'1 year': '1 年',
	'1. Project details': '1. 项目详情',
	'100% overflow': '100% 溢出',
	'2. Funding cycle': '2. Funding cycle',
	'24 hours': '24 小时',
	'3-day delay': '延迟三天生效',
	'3. Review and deploy': '3. Review and deploy',
	'30 days': '30 天',
	'7 days': '7 天',
	'7-day delay': '延迟七天生效',
	'90 days': '90 天',
	'<0/> Archived projects have not been modified or deleted on the blockchain, and can still be interacted with directly through the Juicebox contracts.':
		'<0/> 被存档的项目在区块链上并没有被修改或删除，用户仍然可以直接通过 Juicebox 合约进行交互。',
	'<0/> The Juicebox protocol is open to anyone, and project configurations can vary widely. There are risks associated with interacting with all projects on the protocol. Projects built on the protocol are not endorsed or vetted by JuiceboxDAO or Peel. Do your own research and understand the risks before committing your funds.':
		'<0/> Juicebox协议向所有人开放，不同项目的配置可能相差很大。与协议上的项目进行交互是存在风险的。在协议上部署的项目未经JuiceboxDAO或Peel的认可或审查。所以您应该在付款之前，做好自己的研究并了解其中的风险。',
	'<0/> owner balance': '<0/> 项目钱包余额',
	'<0/>{0} after {feePercentage}% JBX membership fee': [
		'<0/>',
		['0'],
		' after ',
		['feePercentage'],
		'% JBX membership fee'
	],
	'<0/>{0}{1} distributed': ['<0/>', ['0'], ['1'], ' distributed'],
	'<0><1/>{netDistributionAmount}</0> after {feePercentage}% JBX fee': [
		'<0><1/>',
		['netDistributionAmount'],
		'</0> after ',
		['feePercentage'],
		'% JBX fee'
	],
	'<0><1>This project has no overflow</1>, so you will not receive any ETH for burning tokens.</0>':
		'<0><1>这个项目目前筹集的资金并未溢出</1>，此时燃烧代币将不会收到 ETH。</0>',
	'<0>Juicebox contracts</0> are unaudited, and may be vulnerable to bugs or hacks. All funds moved through Juicebox could be lost or stolen. JuiceboxDAO and Peel are not liable for any losses by projects or their supporters.':
		'<0>Juicebox 合约</0>未经审计，可能容易出 BUG 或者被攻击。所有通过 Juicebox 转移的资金都可能丢失或被盗。JuiceboxDAO 不对项目或其支持者造成的任何损失负责。',
	'<0>Learn more</0> about burning tokens.': '<0>进一步了解</0> 代币的燃烧。',
	'<0>Learn more</0> about funding cycle duration.': '<0>进一步了解</0> 筹款周期持续时间。',
	'<0>Learn more</0> about funding cycles.': '<0>进一步了解</0> 筹款周期。',
	'<0>Learn more</0> about overflow.': '<0>进一步了解</0> 溢出。',
	'<0>NOTE:</0> This project has a balance of 0. Projects cannot be migrated without a balance. To migrate this project, first pay it or use the button below to deposit 1 wei (0.000000000000000001 or 10<1>-18</1> ETH).':
		'<0>注意：</0> 该项目余额为零，无法迁移。如果要迁移该项目，先直接支付或是通过下方按钮存入 1 wei （0.000000000000000001 or 10<1>-18</1> ETH）。',
	'<0>No duration set.</0>Funding can be reconfigured at any time. Reconfigurations will start a new funding cycle.':
		'<0>No duration set.</0>Funding can be reconfigured at any time. Reconfigurations will start a new funding cycle.',
	'<0>Note:</0> These properties will <1>not</1> be editable immediately within a funding cycle. They can only be changed for <2>upcoming</2> funding cycles.':
		'<0>注意：</0> 这些属性<1>不能</1> 在同一个筹款周期内马上进行修改。 更改配置只能在 <2>后面的</2> 筹款周期内完成。',
	'<0>Note:</0> Tokens cannot be claimed because no ERC-20 token has been issued for this project. ERC-20 tokens must be issued by the project owner.':
		'<0>Note:</0> Tokens cannot be claimed because no ERC-20 token has been issued for this project. ERC-20 tokens must be issued by the project owner.',
	'<0>Notice:</0> These balances will not reflect transfers of claimed tokens because the {tokenSymbol} ERC-20 token has not yet been indexed by Juicebox.':
		[
			'<0>注意：</0> 因为 ',
			['tokenSymbol'],
			' ERC-20 代币还没被 Juicebox 索引，目前还不会根据已领取代币的转移操作来更新这些余额。'
		],
	'<0>Peel</0> is the DAO that manages the juicebox.money frontend interface. You can reach out to Peel either through the <1>Peel Discord</1> or the <2>Juicebox Discord</2>.':
		'<0>Peel</0>是一个 DAO，负责管理 juicebox.money 的前端页面。你可以通过<1>Peel</1> 或 <2>Juicebox</2> 的 Discord 服务器来接触 Peel。',
	"<0>Recurring funding cycles</0> (for example, distribute $30,000 from your project's treasury every 14 days).":
		"<0>Recurring funding cycles</0> (for example, distribute $30,000 from your project's treasury every 14 days).",
	"<0>Target is 0.</0> The project's entire balance will be considered overflow. <1>Learn more</1> about overflow.":
		"<0>Target is 0.</0> The project's entire balance will be considered overflow. <1>Learn more</1> about overflow.",
	'<0>This project has no overflow</0>, so you will not receive any ETH for burning tokens.':
		'<0>This project has no overflow</0>, so you will not receive any ETH for burning tokens.',
	'Trending projects': '热门项目',
	'<0>Your unclaimed {tokenSymbol} tokens:</0> {0}': [
		'<0>你当前未领取的 ',
		['tokenSymbol'],
		' 代币数量：</0> ',
		['0']
	],
	'<0>{tokenSymbol} ERC-20 address:</0> <1/>': [
		'<0>',
		['tokenSymbol'],
		' ERC-20 address:</0> <1/>'
	],
	'@': '@',
	"A <0>discount rate</0> to automatically reduce the issuance rate of your project's token (tokens/ETH) each new funding cycle.":
		"A <0>discount rate</0> to automatically reduce the issuance rate of your project's token (tokens/ETH) each new funding cycle.",
	'A bonding curve rewards people who wait longer to redeem your tokens for overflow.':
		'联合曲线奖励那些等待更长时间才去赎回代币的人。',
	'A mechanism like Juicebox where upfront financial commitments should be honored over time is only guaranteed within an ecosystem like Ethereum.':
		'像 Juicebox 这样的机制，前期的财务承诺应该随着时间的推移得到兑现，只有在以太坊这样的生态系统中才能得到保证。',
	'A project can be archived by its owner from the tools menu on the project page.':
		'项目所有者可以在项目页面上的“工具菜单”中对项目进行存档。',
	'A project can choose to reserve a percentage of tokens for itself. Instead of being distributed to paying users, this percentage of tokens is instead minted for the project.':
		'项目可以选择为自己保留一定比例的代币。这些代币不是分发给付费的用户，而是给到项目方。',
	'A project can reserve a percentage of tokens minted from every payment it receives. Reserved tokens can be distributed according to the allocation below at any time.':
		'项目每收到一笔付款都会铸造代币，其中某个百分比的代币会保留在项目内。保留代币可随时按以下分配方案进行分发。',
	"A project's lifetime is defined in funding cycles. If a funding target is set, the project can withdraw no more than the target for the duration of the cycle.":
		'一个项目的寿命是以筹款周期来定义的。如果设定了筹款目标，那么在周期内，项目的提款不能超过目标。',
	'A reconfiguration to an upcoming funding cycle must be submitted at least 3 days before it starts.':
		'对之后筹款周期的重新配置，至少得提前三天提交。',
	'A reconfiguration to an upcoming funding cycle must be submitted at least 7 days before it starts.':
		'对之后筹款周期的重新配置，至少得提前七天提交。',
	"A reserved rate of more than 90% is risky for contributors. Contributors won't receive many tokens for their contribution.":
		"A reserved rate of more than 90% is risky for contributors. Contributors won't receive many tokens for their contribution.",
	AVAILABLE: '可提取',
	Activity: '最近动态',
	'Add a payout': 'Add a payout',
	'Add a split': 'Add a split',
	"Add funds to this project's balance without minting tokens.": '往项目中添加资金，但不铸造代币。',
	'Add image': '添加图片',
	'Add payout': 'Add payout',
	'Add split': 'Add split',
	'Add to Balance': '添加到余额',
	'Add to balance': '添加到余额',
	'Add token receiver': '添加代币接收者',
	Address: '地址',
	'Address required': 'Address required',
	'Address:': 'Address:',
	'Address: {0}': ['Address: ', ['0']],
	'Adjust incentives for paying your project.':
		'调整激励措施，以便鼓励其他人或项目向你的项目付款。',
	All: '全部',
	'All assets': '所有资产',
	'All changes will be applied to the <0>upcoming</0> funding cycle.':
		'所有更改会应用于 <0>之后的</0> 筹款周期。',
	'All funds can be distributed by the project. The project will have no overflow (the same as setting the target to infinity).':
		'所有资金都可以分配给项目，项目将不再会产生溢出（把筹款目标设为无限也是同样结果）。',
	'All projects': '所有项目',
	'All {0} will go to the project owner:': ['所有 ', ['0'], ' 会给到项目拥有者：'],
	"Allocate a portion of your project's reserved tokens to other Ethereum wallets or Juicebox projects.":
		'把您项目的一部分保留代币分发给其他以太坊钱包或其他Juicebox项目。',
	'Allow minting tokens': '允许铸造代币',
	'Allow token minting': '允许铸造代币',
	Allowed: '允许',
	'Almost definitely.': '答案是肯定的.',
	Amount: '数量',
	'Amount of ERC-20 tokens to claim': 'Amount of ERC-20 tokens to claim',
	'Amount paid': '支付数额',
	'Amount to distribute': 'Amount to distribute',
	"An invite link to your project's Discord server.": '项目 Discord 的邀请链接。',
	"Any changes will take effect in the next funding cycle. The current funding cycle won't be altered.":
		"Any changes will take effect in the next funding cycle. The current funding cycle won't be altered.",
	'Any reconfiguration to an upcoming funding cycle will take effect once the current cycle ends. A project with no strategy may be vulnerable to being rug-pulled by its owner.':
		'对之后的筹款周期进行重新配置，更改将在当前周期结束后生效。 没有策略的项目会有项目方跑路的风险。',
	"Any treasury funds in excess of the distribution limit is called <0>overflow</0>. Overflow can be claimed by your project's token holders by redeeming their tokens. <1>Learn more</1> about overflow.":
		"Any treasury funds in excess of the distribution limit is called <0>overflow</0>. Overflow can be claimed by your project's token holders by redeeming their tokens. <1>Learn more</1> about overflow.",
	'Any treasury funds within the distribution limit can be paid out to destinations that you can define as <0>splits</0>. <1>Learn more</1> about payout splits.':
		'Any treasury funds within the distribution limit can be paid out to destinations that you can define as <0>splits</0>. <1>Learn more</1> about payout splits.',
	'Archive project': '存档项目',
	Archived: '已存档',
	'Are you sure you want to start over?': '你确定要重新开始吗？',
	Assets: '资产',
	'Available after fee:': '扣除手续费后可用',
	'Available funds are distributed according to the payouts below.':
		'可用资金会分发给以下支出对象。',
	'Available:': '可用:',
	'Back to top': '回到顶部',
	'Balance exceeded': '超出余额',
	"Balance of the project owner's wallet.": "Balance of the project owner's wallet.",
	Beneficiary: 'Beneficiary',
	'Beneficiary address': '受益人钱包地址',
	'Big ups to the Ethereum community for crafting the infrastructure and economy to make Juicebox possible.':
		'依托于以太坊社区精心打造的基础设施和经济生态，Juicebox 才得以实现。',
	'Block number': '区块数',
	Blog: '博客',
	'Bonding curve rate': '联合曲线比率',
	'Bonding curve:': '联合曲线：',
	'Build a community around a project, fund it, and program its spending. Light enough for a group of friends, powerful enough for a global network of anons.':
		'围绕一个项目建立一个社区，为其提供资金，并对其支出进行规划。既能简单易用让一群知己好友轻松创建属于自己的社区项目，也可以强大到能够支持一个全球匿名网络的运作',
	'Built for:': '服务的对象:',
	'Burn project tokens': '燃烧项目代币',
	"Burn your {tokensLabel}. You won't receive ETH in return because this project has no overflow.":
		['燃烧你的 ', ['tokensLabel'], '。你不会收到 ETH 作为回报，因为这个项目没有溢出的资金。'],
	'Burn {0} {tokensTextShort}': ['燃烧 ', ['0'], ' ', ['tokensTextShort']],
	'Burn {tokensLabel}': ['燃烧 ', ['tokensLabel']],
	'Burn {tokensTextLong}': ['燃烧 ', ['tokensTextLong']],
	"By default, all unallocated funds can be distributed to the project owner's wallet.":
		'默认的情况下，所有未分配资金可被分发给项目拥有者的钱包。',
	"By default, the issuance rate for your project's token is 1,000,000 tokens / 1 ETH. For example, a 1 ETH contribution to your project will return 1,000,000 tokens. You can manipulate the issuance rate with the following configurations.":
		"By default, the issuance rate for your project's token is 1,000,000 tokens / 1 ETH. For example, a 1 ETH contribution to your project will return 1,000,000 tokens. You can manipulate the issuance rate with the following configurations.",
	'By default, these tokens are reserved for the project owner, but you can also allocate portions to other wallet addresses.':
		'By default, these tokens are reserved for the project owner, but you can also allocate portions to other wallet addresses.',
	"Can I change my project's contract after it's been created?": '项目合约创建后，我还更改它吗?',
	'Can I delete a project?': '我可以删除一个项目吗？',
	Cancel: '取消',
	'Cannot redeem tokens for ETH because this project has no overflow.':
		'这个项目的筹款没有溢出，无法用代币赎回 ETH',
	'Changes to project details will take effect immediately.':
		'Changes to project details will take effect immediately.',
	'Changes to these attributes can be made at any time and will be applied to your project immediately.':
		'可以随时修改这些属性，并立即应用于你的项目。',
	"Changes to your project's funding configuration require a community-approved period to take effect, which acts as a safeguard against rug pulls. Your supporters don't have to trust you — even though they already do.":
		'对项目资金的变动需要经过社区的批准阶段才能生效，这可以作为预防项目方跑路的措施。项目支持者不需要依赖于对你的信任 —— 尽管他们已经这样做了。',
	"Check this to mint this project's ERC-20 tokens to your wallet. Leave unchecked to have your token balance tracked by Juicebox, saving gas on this transaction. You can always claim your ERC-20 tokens later.":
		"Check this to mint this project's ERC-20 tokens to your wallet. Leave unchecked to have your token balance tracked by Juicebox, saving gas on this transaction. You can always claim your ERC-20 tokens later.",
	'Check this to mint {tokenSymbol} ERC-20 to your wallet. Leave unchecked to have your token balance tracked by Juicebox, saving gas on this transaction. You can always claim your ERC-20 tokens later.':
		[
			'Check this to mint ',
			['tokenSymbol'],
			' ERC-20 to your wallet. Leave unchecked to have your token balance tracked by Juicebox, saving gas on this transaction. You can always claim your ERC-20 tokens later.'
		],
	'Claim {0}': ['Claim ', ['0']],
	'Claim {0} as ERC-20 tokens': ['Claim ', ['0'], ' as ERC-20 tokens'],
	'Claim {tokenTextShort}': ['Claim ', ['tokenTextShort']],
	'Claim {tokenTextShort} as ERC-20 tokens': ['Claim ', ['tokenTextShort'], ' as ERC-20 tokens'],
	'Claim {tokensLabel} as ERC-20': ['Claim ', ['tokensLabel'], ' as ERC-20'],
	'Claiming {tokenSymbol} tokens will convert your {tokenSymbol} balance to ERC-20 tokens and mint them to your wallet.':
		[
			'Claiming ',
			['tokenSymbol'],
			' tokens will convert your ',
			['tokenSymbol'],
			' balance to ERC-20 tokens and mint them to your wallet.'
		],
	'Claiming {tokenTextLong} will convert your {tokenTextShort} balance to ERC-20 tokens and mint them to your wallet.':
		[
			'Claiming ',
			['tokenTextLong'],
			' will convert your ',
			['tokenTextShort'],
			' balance to ERC-20 tokens and mint them to your wallet.'
		],
	Close: '关闭',
	'Commit portions of your funds to the people or projects you want to support, or the contributors you want to pay. When you get paid, so do they.':
		'提前设定把您资金的一部分自动分拨给您想要支持的人或项目，或者您需要支付的贡献者。您获得收入的同时，他们也会收到相应款项。',
	'Community funding for people and projects': '为个人和项目提供社区资助',
	'Configure how your project will collect and spend funds.':
		'Configure how your project will collect and spend funds.',
	'Configure restrictions for your funding cycles.':
		'Configure restrictions for your funding cycles.',
	"Configure the dynamics of your project's token.":
		"Configure the dynamics of your project's token.",
	'Congrats on creating your project!': '恭喜你创建了自己的项目！',
	Connect: '连接钱包',
	'Connect wallet to deploy': '连接钱包以部署',
	'Connect wallet to pay': 'Connect wallet to pay',
	'Contract address: {0}': ['合约地址：', ['0']],
	'Contributors will not receive any tokens in exchange for paying this project.':
		'捐献者给项目付款将不会获得任何代币。',
	'Contributors will receive a relatively small portion of tokens in exchange for paying this project.':
		'捐款者给项目付款将获得相对较低比例的代币。',
	'Copied!': '已复制！',
	'Copy to clipboard': '复制到剪贴板',
	'Create project': '创建项目',
	'Creating a Juicebox project mints you an NFT (ERC-721) representing ownership over it. Whoever owns this NFT can configure the rules of the game and how payouts are distributed.':
		'创建一个 Juicebox 项目时，你会得到一个代表项目所有权的 NFT（ERC-721）。无论谁拥有这个NFT，都可以设置游戏规则以及决定如何分配报酬。',
	Current: '当前',
	'Current 3rd Party Exchange Rates': 'Current 3rd Party Exchange Rates',
	'Current owner: {ownerAddress}': ['Current owner: ', ['ownerAddress']],
	'Currently worth: <0><1/>{0}</0>': ['当前价值： <0><1/>', ['0'], '</0>'],
	'Custom strategy': '自定义策略',
	'Custom token beneficiary': '自定义代币受益人',
	'Cycle #{0}': ['周期 #', ['0']],
	'Dark theme': '深色主题',
	Date: 'Date',
	'Date created': '创建日期',
	Days: 'Days',
	'Deploy new project configuration': 'Deploy new project configuration',
	'Deploy project': '部署项目',
	'Deploy project on {signerNetwork}': ['在', ['signerNetwork'], ' 上部署项目'],
	'Deploy project to {0}': ['Deploy project to ', ['0']],
	'Deposit 1 wei to @{handle}': ['存入 1 wei 给 @', ['handle']],
	'Design your project': '设计你的项目',
	Details: '详情',
	Disabled: '已禁用',
	"Disabled when your project's distribution limit is <0>No limit</0> (infinite)":
		"Disabled when your project's distribution limit is <0>No limit</0> (infinite)",
	"Disabled when your project's funding cycle duration is 0.":
		"Disabled when your project's funding cycle duration is 0.",
	"Disabled when your project's funding cycle has no duration.":
		"Disabled when your project's funding cycle has no duration.",
	Disconnect: '断开连接',
	Discord: 'Discord',
	'Discount rate': '折扣率',
	"Display ERC-20 tokens and other Juicebox project tokens that are in this project's owner's wallet.":
		"Display ERC-20 tokens and other Juicebox project tokens that are in this project's owner's wallet.",
	'Distribute available funds to other Ethereum wallets or Juicebox projects as payouts. Use this to pay contributors, charities, Juicebox projects you depend on, or anyone else. Funds are distributed whenever a withdrawal is made from your project.':
		'把可用资金分发给其他以太坊钱包或者其他Juicebox项目。使用这项功能付款给项目的贡献者、慈善机构、其他帮助你的Juicebox项目、或是任何其他人。无论什么时候从您项目提款，资金都会自动进行发放。',
	'Distribute funds': '分发资金',
	'Distribute reserved {tokenTextPlural}': ['Distribute reserved ', ['tokenTextPlural']],
	'Distribute {0}': ['分发 ', ['0']],
	'Distribute {tokenTextPlural}': ['Distribute ', ['tokenTextPlural']],
	'Distribute {tokensText}': ['Distribute ', ['tokensText']],
	Distributed: '已分发',
	'Distribution limit': 'Distribution limit',
	'Distribution limit infinite': 'Distribution limit infinite',
	'Distribution limit, duration and payouts': 'Distribution limit, duration and payouts',
	'Distribution splits': 'Distribution splits',
	'Distributions to other Juicebox project do not incur any fee.':
		'Distributions to other Juicebox project do not incur any fee.',
	'Do I have to make my project open source to use Juicebox as its business model?':
		'要把 Juicebox 用作项目的商业模式的话，我必须把项目进行开源吗？',
	Docs: '文档',
	'Documentation on v1.1 contracts': 'v1.1 合约的文档',
	'Does a project benefit from its own overflow?': '项目是否能从溢出中获益？',
	Done: '完成',
	'Download CSV': '下载 CSV',
	'Download CSV of payments': 'Download CSV of payments',
	'Download CSV of project activity': 'Download CSV of project activity',
	'Download CSV of {0} holders': ['下载包含 ', ['0'], ' 持有者的 CSV'],
	'Due to their public nature, any exploits to the contracts may have irreversible consequences, including loss of funds. Please use Juicebox with caution.':
		'由于其公共性质，任何对合约的恶意利用都可能产生不可逆转的后果，包括资金损失。请谨慎使用 Juicebox。',
	Duration: '持续时间',
	'ERC-20 community tokens': 'ERC-20 community tokens',
	'ERC-20 tokens can only be minted once an ERC-20 token has been issued for this project.':
		'ERC-20 tokens can only be minted once an ERC-20 token has been issued for this project.',
	"Each project has its own <0>ERC-20 tokens</0>. Anyone who contributes funds to a project receives that project's tokens in return. Token balances will be tracked by the protocol until ERC-20 tokens are optionally issued by the project owner.":
		'每个项目都有自己的<0>ERC-20代币</0>。每个资助项目的人都会获得项目代币作为回报。在项目方发行 ERC-20 代币之前，代币余额会由协议来记录。',
	'Edit existing split': 'Edit existing split',
	'Edit project': 'Edit project',
	'Edit project details': 'Edit project details',
	'Edit reserved token allocation': '保留代币的分配方案',
	'Edit token allocation': '编辑代币的分发',
	'Edit token receiver': '编辑代币接收方',
	'Edit tracked assets': '编辑监测的资产',
	'Enable Juicebox V2': 'Enable Juicebox V2',
	Enabled: '已启用',
	'Enabling this allows the project owner to manually mint any amount of tokens to any address.':
		'允许项目所有者手动铸造并发送任何数量的代币。',
	'Enabling this will mint {tokenSymbol} ERC-20 tokens. Otherwise staked {tokenSymbol} tokens will be minted, which can be claimed later as ERC-20 by the receiver.':
		[
			'Enabling this will mint ',
			['tokenSymbol'],
			' ERC-20 tokens. Otherwise staked ',
			['tokenSymbol'],
			' tokens will be minted, which can be claimed later as ERC-20 by the receiver.'
		],
	'Enabling token minting will appear risky to contributors. Only enable this when necessary.':
		'Enabling token minting will appear risky to contributors. Only enable this when necessary.',
	End: '结束时间',
	'Error loading holders': 'Error loading holders',
	'Error loading payments': 'Error loading payments',
	'Ethereum protocols and DAOs': '以太坊协议和 DAO',
	'Ethereum provides a public environment where internet apps like Juicebox can run in a permission-less, trustless, and unstoppable fashion.':
		'以太坊提供了一个公共环境，让 Juicebox 这样的互联网应用得以无需许可、无需信任且无可阻挡地在上面运行。',
	FAQ: '常见问题解答',
	FAQs: '常见问题解答',
	'For example, with a bonding curve of 70%, redeeming 10% of the token supply at any given time will claim around 7% of the total overflow.':
		'例如：在 70% 的联合曲线配置下，任意时间赎回 10% 的代币供应将能从总溢出中领取到 7% 左右。',
	'For more info, check out this <0>short video</0> on bonding curves.':
		'想了解更多信息，请查看关于联合曲线的<0>视频短片</0>。',
	'For more info, check out this <0>short video</0>.': '了解更多信息，请查看 <0>短片</0>。',
	'For users paying through your app, you should route those funds through the Juicebox smart contracts so they receive tokens in return.':
		'对于通过你的应用程序进行支付的用户，你应该将资金再导向 Juicebox 智能合约，这样他们才能收到作为回报的代币。',
	Funding: 'Funding',
	'Funding Distribution': '资金分发',
	'Funding cycle': '筹款周期',
	'Funding cycle details': '筹款周期详情',
	'Funding cycle duration': '筹款周期持续时间',
	'Funding cycle target': '筹款周期目标',
	'Funding cycles': 'Funding cycles',
	'Funding cycles can be reconfigured moments before a new cycle begins, without notifying contributors.':
		'新的筹款周期开始前即可重新配置筹款周期参数，无须通知捐款者。',
	'Funding distribution': '资金分发',
	'Funding target': '筹款目标',
	'Funds will be distributed to:': '资金将会分发给：',
	'Give feedback': '提交反馈',
	'Give us your feedback': '向我们反馈',
	'Go to Etherscan': '跳转到 Etherscan',
	Handle: '标识',
	'Heads up': '注意',
	History: '历史',
	Holders: '持有者',
	'Holding these tokens entitles a project to a portion of its own overflow.':
		'持有这些代币，项目就有资格获得溢出的一部分。',
	Holdings: '持有',
	Hours: 'Hours',
	'How decentralized is Juicebox?': 'Juicebox 的去中心化程度如何？',
	"How did we do? We'd love to get your feedback so we can make creating Juicebox projects as juicy as possible!":
		'我们是怎么做的？ 我们很乐意收到您的反馈，以便我们尽可能多地创建 Juicebox 项目！',
	'How do I archive a project?': '怎样才能把一个项目存档呢？',
	'How do I create a project?': '怎样创建一个项目呢？',
	'How have the contracts been tested?': '这些合约是如何被测试的？',
	'How long one funding cycle will last. Funding cycle <0>reconfigurations</0> will only take effect for <1>upcoming</1> funding cycles, i.e. once a current funding cycle has ended.':
		'一个筹款周期的时长是多少。筹款周期 <0>参数设置的更改</0> 只能生效于 <1>后面的</1> 筹款周期，亦即是当前筹款周期终止之后。',
	'How your project will distribute funds.': '您的项目将如何分配资金。',
	'However, Juicebox is still experimental software. Although the Juicebox contract team have done their part to shape the smart contracts for public use and have tested the code thoroughly, the risk of exploits is never 0%.':
		'然而，Juicebox仍处于试验阶段。尽管Juicebox的合约团队已经完成了他们的工作，以使智能合约公开可用并对代码进行了彻底的测试，但仍存在漏洞被利用的风险。',
	'I understand': '我明白了',
	ID: 'ID',
	'ID: {0}': ['ID: ', ['0']],
	"If locked, this can't be edited or removed until the lock expires or the funding cycle is reconfigured.":
		'如果锁定了，这一项就不能编辑或删除，除非锁定失效或重新配置筹款周期。',
	"If locked, this split can't be edited or removed until the lock expires or the funding cycle is reconfigured.":
		"If locked, this split can't be edited or removed until the lock expires or the funding cycle is reconfigured.",
	"If you know how much your project needs to earn over some period of time to be sustainable, you can set a funding target with that amount. If your project earns more than that, the surplus funds are locked in an overflow pool. Anyone holding your project's tokens can claim a portion of the overflow pool in exchange for redeeming their tokens.":
		'如果你知道你的项目在一段时间内需要多少资金才能维持下去，你可以设定一个相应的资金目标。 如果项目获取到的资金比预想的多，盈余的资金就会被锁定在一个溢出池中。 任何持有你项目代币的人，都可以通过燃烧代币来赎回溢出池中的一部分。',
	"If you're interested in creating a project but still confused on how to get started, consider watching this <0>instructional video</0>. Also feel free to reach out in the <1>Juicebox Discord</1> where our team will be happy to help bring your project idea to life!":
		'如果你对创建一个项目感兴趣，却不知道该如何开始，可以考虑看看这个<0>教学视频</0>。也可以在 <1>Juicebox Discord</1> 中寻求帮助，我们的团队将很乐意帮助您实现您的项目想法！',
	"If you're unsure if you need to claim, you probably don't.":
		'如果你不确定你是否需要领取，那么你或许不需要。',
	'In Juicebox': '项目金库余额',
	'In wallet': '项目钱包余额',
	Incentives: '激励措施',
	'Indie artists, devs, creators': '独立艺术家，开发者，创作者',
	Infinite: 'Infinite',
	'Initial issuance rate will be {0} tokens / ETH for contributors. {1} tokens / ETH will be reserved by the project.':
		[
			'Initial issuance rate will be ',
			['0'],
			' tokens / ETH for contributors. ',
			['1'],
			' tokens / ETH will be reserved by the project.'
		],
	'Invalid address': 'Invalid address',
	'Issuance rate': 'Issuance rate',
	'Issue ERC-20': 'Issue ERC-20',
	'Issue ERC-20 token': '发行 ERC-20 代币',
	"Issue an ERC-20 to be used as this project's token. Once issued, anyone can claim their existing token balance in the new token.":
		'发行 ERC-20 合约作为项目代币。一旦发行，任何人都可以将现存的余额铸造为对应代币。',
	'Issue token': '发行代币',
	"It isn't possible to remove a project's data from the blockchain, but we can hide it in the app if you'd like to prevent people from seeing or interacting with it — just let us know in <0>Discord</0>. Keep in mind people will still be able to use your project by interacting directly with the contract.":
		'想在区块链上删除项目数据是不可能的，但如果你不想让人们看见它或与它交互，请在 <0>Discord</0> 中告诉我们，我们可以将它在应用程序中隐藏。请记住，人们仍然能够通过直接与合约交互来使用你的项目。',
	"It'd be a lot cooler if you did": '如果你这么做了会更好',
	'JBX Fee ({0}%):': ['JBX 费率（', ['0'], '%）：'],
	'JBX Fee ({feePercentage}%):': ['JBX Fee (', ['feePercentage'], '%):'],
	'Juicebox Project ID': 'Juicebox Project ID',
	"Juicebox V2 on {0} isn't enabled.": ['Juicebox V2 on ', ['0'], " isn't enabled."],
	'Juicebox has handled tens of thousands of ETH through its protocol, and has so far had 0 security mishaps.':
		'Juicebox已经通过其协议处理了数万个ETH，到目前为止还没有发生过安全事故。',
	'Juicebox is a governance-minimal protocol. There are only a few levers that can be tuned, none of which impose changes for users without their consent. The Juicebox governance smart contract can adjust these levers.':
		'Juicebox 是一个治理最小化的协议，这意味着只有少数几个参数可以进行调整，这些调整均需经用户同意后才会生效。Juicebox 的治理合约可以调整这些参数。',
	'Juicebox is an open protocol on Ethereum that is funded using Juicebox itself. You can check out the contractualized budget specs <0>here</0>.':
		'Juicebox 是以太坊上的一个开放协议，其本身也是通过这个平台筹集资金的。你可以在<0>这里</0>上查看合约化的预算详情。',
	'Juicebox loading animation': 'Juicebox loading animation',
	'Juicebox project': 'Juicebox project',
	'Juicebox was built to allow people and projects to get paid for creating public art and infrastructure, as much as or more than they would working towards corporate ends. No more shady business.':
		'Juicebox 的建立是为了让人们和项目在创造公共艺术和基础设施时获得报酬，跟他们为企业工作时获得的一样，甚至会更多。再也没有黑幕交易。',
	'Last paid': '上次支付',
	'Last paid timestamp': '上次支付的时间戳',
	Later: 'Later',
	Latest: '最近',
	'Latest Payments': '最近付款',
	'Light theme': '浅色主题',
	'Load more': '加载更多',
	'Lock until': '锁定至',
	'Locked:': 'Locked:',
	Logo: '标志',
	MAX: '最大值',
	Manage: '管理代币',
	'Manage {0}': ['管理 ', ['0']],
	'Manage {tokenText}': ['Manage ', ['tokenText']],
	Memo: '留言',
	'Migrate to Juicebox V1.1': '迁移至 Juicebox V1.1',
	'Mint as ERC-20': 'Mint as ERC-20',
	"Mint new {tokensLabel} into an account. Only a project's owner, a designated operator, or one of its terminal's delegates can mint its tokens.":
		[
			'Mint new ',
			['tokensLabel'],
			" into an account. Only a project's owner, a designated operator, or one of its terminal's delegates can mint its tokens."
		],
	'Mint project tokens on demand': '按需铸造项目代币',
	'Mint tokens to a custom address.': '铸造代币并发给自定义地址',
	'Mint {tokensLabel}': ['铸造 ', ['tokensLabel']],
	'Mint {tokensTokenLower}': ['Mint ', ['tokensTokenLower']],
	Minutes: 'Minutes',
	'More trending projects': '更多热门项目',
	'Move your {tokensLabel} from the Juicebox contract to your wallet.': [
		'将你的 ',
		['tokensLabel'],
		' 从 Juicebox 合约中取到你的钱包里。'
	],
	'NO LIMIT': 'NO LIMIT',
	Name: '名称',
	New: '新',
	'Next: Funding cycle': 'Next: Funding cycle',
	'Next: Review and deploy': 'Next: Review and deploy',
	No: '取消',
	'No activity yet': '暂无动态',
	'No funding target: The project will control how all funds are distributed, and none can be redeemed by token holders.':
		'不设定筹款目标：所有的资金如何分发都由此项目决定，代币持有者无法赎回。',
	'No limit': 'No limit',
	'No limit (infinite)': 'No limit (infinite)',
	'No more than the funding cycle target can be distributed by the project in a single funding cycle.':
		'在单个筹款周期中，项目无法提取超出筹款目标的资金。',
	'No past funding cycles': '没有历史筹款周期',
	'No strategy': '暂无策略',
	'No target': '没有筹款目标',
	'No target set.': '不设定筹款目标。',
	'Not set': '未设定',
	Note: 'Note',
	'Note:': '请注意：',
	'Note: Juicebox is new, unaudited, and not guaranteed to work perfectly. Before spending money, do your own research: <0>ask questions</0>, <1>check out the code</1>, and understand the risks!':
		'注意： Juicebox是一个全新的协议，它未经审计且不保证能完美工作。 在花钱之前请先做好您自己的研究：提出疑问，核查代码以及了解所涉及的风险！',
	'Note: Tokens can be minted manually when allowed in the current funding cycle. This can be changed by the project owner for upcoming cycles.':
		'Note: Tokens can be minted manually when allowed in the current funding cycle. This can be changed by the project owner for upcoming cycles.',
	'Notice from {0}:': ['通知自', ['0'], ':'],
	'Open source businesses': '开源业务',
	"Other assets in this project's owner's wallet.": '项目拥有者钱包内的其他资产',
	"Overflow is created if your project's balance exceeds your funding cycle target. Overflow can be redeemed by your project's token holders.":
		'如果您项目的资金余额超出您的筹款周期目标，就会产生溢出。项目代币持有人可以赎回溢出部分资金。',
	'Paid as <0/>': '支付 <0/>',
	'Pause payments': '暂停支付',
	'Pause received payments': '暂停接受付款',
	Paused: '已暂停',
	Pay: '支付',
	'Pay amount': '支付金额',
	'Pay button': '支付按钮',
	'Pay button text': '支付按钮文本',
	'Pay disclosure': '付款声明',
	'Pay {0}': ['支付 ', ['0']],
	Payer: 'Payer',
	"Paying <0>{0}</0> is not an investment — it's a way to support the project. Any value or utility of the tokens you receive is determined by {1}.":
		[
			'向 <0>',
			['0'],
			'</0> 支付并不是投资 —— 而是支持项目的一种方式。你收到代币的价值和效用都由 ',
			['1'],
			' 决定。'
		],
	'Paying this project is currently disabled, because the token reserved rate is 100% and no tokens will be earned by making a payment.':
		'因代币保留率为 100% 且支付后并不会获得相应的代币，该项目的支付功能目前已禁用。',
	'Paying this project is currently disabled.': '当前项目已暂停接收付款。',
	Payments: '支付',
	'Payments are paused for the current funding cycle.': '当前筹款周期暂停付款。',
	'Payments paused': '付款已暂停',
	'Payout amount': 'Payout amount',
	'Payout recipients': 'Payout recipients',
	'Payout splits': 'Payout splits',
	"Payout splits can't be scheduled when the distribution limit is Zero.":
		"Payout splits can't be scheduled when the distribution limit is Zero.",
	'Payouts (optional)': '支出 (可选)',
	'Payouts to Ethereum addresses incur a {feePercentage}% fee. Your project will receive JBX in return at the current issuance rate.':
		[
			'Payouts to Ethereum addresses incur a ',
			['feePercentage'],
			'% fee. Your project will receive JBX in return at the current issuance rate.'
		],
	"Peach's Juicebox Stand": '桃子的果汁摊',
	Peel: 'Peel',
	'People using Juicebox are interacting with each other through public infrastructure—not a private, profit-seeking corporate service that brokers the exchange.':
		'使用 Juicebox 的人是通过公共基础设施相互交互的 —— 而不是通过一个私人的、追求利润的企业服务来中介交流。',
	Percent: 'Percent',
	'Percent allocation': '分配百分比',
	'Percent of distribution limit': 'Percent of distribution limit',
	'Percentage of the distribution limit this payee will receive.':
		'Percentage of the distribution limit this payee will receive.',
	'Percentage this payee will receive of all funds raised.':
		'Percentage this payee will receive of all funds raised.',
	'Percentages must add up to 100% or less': '百分比总数相加必须少于或等于100%',
	'Please contact the Juicebox dev team through our <0>Discord</0> to have your project archived.':
		'Please contact the Juicebox dev team through our <0>Discord</0> to have your project archived.',
	Podcast: '播客',
	'Potential risks': 'Potential risks',
	'Powered by public smart contracts on': '由公共智能合约提供支持 ',
	'Preview:': 'Preview:',
	'Programmable spending': '可编程的开支',
	Project: '项目',
	'Project ID is a number.': 'Project ID is a number.',
	'Project ID:': 'Project ID:',
	'Project Token': '项目代币',
	'Project configuration': 'Project configuration',
	'Project description': '项目说明',
	'Project details': '项目详情',
	'Project details reconfigurations will create a separate transaction.':
		'Project details reconfigurations will create a separate transaction.',
	'Project for {ensName} not found': ['Project for ', ['ensName'], ' not found'],
	'Project handle': '项目标识',
	'Project handle must be unique.': '项目标识必须是唯一的。',
	'Project name': '项目名称',
	'Project name, handle, links, and other details.': '项目名称，标识，链接以及其他详细信息。',
	'Project owner': '项目拥有者',
	'Project owner (you)': 'Project owner (you)',
	'Project owners can configure a delay period, meaning reconfigurations to an upcoming funding cycle must be submitted a certain number of days before it starts. For example, a 3-day delay period means reconfigurations must be submitted at least 3 days before the next funding cycle starts. This gives token holders time to react to the decision and reduces the chance of rug-pulls.':
		'项目方可以配置一个延迟期，这意味着对即将到来的筹款周期的重新配置必须在某个时间段内提交。例如，3天的延迟期意味着重新配置必须至少在下一个筹款周期开始前的3天内提交。这给了代币持有者对决策做出反应的时间，并减少了项目方跑路的机会。',
	'Project token': 'Project token',
	'Project {projectId} not found': ['项目 ', ['projectId'], ' 未找到'],
	Projects: '项目',
	'Projects building on Juicebox pay a {JB_FEE}% JBX membership fee from withdrawn funds into the JuiceboxDAO treasury. Projects can then use their JBX to participate in the governance of JuiceboxDAO and its collective treasury, as well as redeem from its growing <0>overflow</0>. The fee is also subject to change via JBX member votes.':
		[
			'Juicebox 上的项目提取资金时，会支付 ',
			['JB_FEE'],
			'% 的JBX会员费用给到 JuiceboxDAO 金库。然后，项目可以使用他们获取到的 JBX 来参与 JuiceboxDAO 及其集体金库的治理，也可从其增长的 <0>溢出</0>中赎回。该费率也可通过 JBX 的成员投票来改变。'
		],
	'Projects can be created with an optional discount rate designed to incentivize supporters to contribute earlier rather than later. The amount of tokens rewarded per amount paid to your project will decrease by the discount rate with each new funding cycle. A higher discount rate will incentivize supporters to pay your project earlier rather than later.':
		'创建项目时，可选择配置一个折扣率用于激励早期支持者。 每个新的筹款周期，支付给项目的每笔金额所奖励的代币数量将按折扣率递减。更高的折扣率将激励支持者尽早资助你的项目。',
	'Projects on Juicebox': 'Juicebox 上的项目',
	'Projects using Juicebox': '正在使用 Juicebox 的项目',
	'Projects using a reserved rate of {reservedRateRiskyMin}% or more will appear risky to contributors, as a relatively small number of tokens will be received in exchange for paying your project.':
		[
			'项目使用的代币保留率大于或等于',
			['reservedRateRiskyMin'],
			'% 会让捐款人觉得项目不安全，因为这种情况下给您的项目捐款从而获得的代币数量会比较少。'
		],
	'Public goods and services': '公共产品和服务',
	'Rankings based on number of contributions and volume gained in the last {trendingWindow} days. <0>See code</0>':
		['按最近 ', ['trendingWindow'], ' 天的支付次数与数额排行。<0>查看代码</0>'],
	'Receive ERC-20': 'Receive ERC-20',
	'Receive {receiveText}': ['接收 ', ['receiveText']],
	'Recipients will receive payouts in ETH.': 'Recipients will receive payouts in ETH.',
	Reconfiguration: '重新配置',
	'Reconfiguration rules': 'Reconfiguration rules',
	'Reconfiguration strategy': '重新配置策略',
	Reconfigure: '重新配置',
	'Reconfigure funding': '重新配置筹款',
	'Reconfigure project details': 'Reconfigure project details',
	'Reconfigure rules': 'Reconfigure rules',
	'Reconfigure token': 'Reconfigure token',
	'Reconfigure upcoming': '重新配置之后的筹款',
	'Reconfigure upcoming funding': '重新配置之后的筹款',
	'Reconfigure upcoming funding cycles': 'Reconfigure upcoming funding cycles',
	Redeem: '赎回',
	"Redeem your {tokensLabel} for a portion of the project's overflow. Any {tokensLabel} you redeem will be burned.":
		[
			'赎回你的 ',
			['tokensLabel'],
			' 来获取一部分项目的溢出资金。用于赎回的 ',
			['tokensLabel'],
			' 将会被燃烧掉。'
		],
	'Redeem {0} {tokensTextShort} for ETH': ['燃烧 ', ['0'], ' ', ['tokensTextShort'], ' 来赎回 ETH'],
	'Redeem {tokensLabel} for ETH': ['燃烧 ', ['tokensLabel'], ' 来赎回 ETH'],
	'Redeem {tokensTextLong} for ETH': ['燃烧 ', ['tokensTextLong'], ' 来赎回 ETH'],
	'Redemption rate': '赎回率',
	'Redemption rate: <0>{0}%</0>': ['Redemption rate: <0>', ['0'], '%</0>'],
	'Redistributable surplus': '可分派的盈余',
	Refresh: '刷新',
	Required: '必需',
	'Reserved rate': '保留率',
	'Reserved token allocation (optional)': '保留代币的分配方案（可选）',
	'Reserved token allocations': '保留代币的分配方案',
	'Reserved tokens': '保留代币',
	'Reserved {0}': ['已保留 ', ['0']],
	'Reserved {tokenSymbolPlural}': ['Reserved ', ['tokenSymbolPlural']],
	'Reserved {tokenTextPlural}: <0>{reservedTokensFormatted} {tokenTextPlural}</0>': [
		'Reserved ',
		['tokenTextPlural'],
		': <0>',
		['reservedTokensFormatted'],
		' ',
		['tokenTextPlural'],
		'</0>'
	],
	'Reserved {tokensText}': ['Reserved ', ['tokensText']],
	Reserves: '保留',
	Resources: '相关资料',
	'Restrict how the owner can reconfigure upcoming funding cycles to mitigate abuse of power. <0>Learn more.</0>':
		'Restrict how the owner can reconfigure upcoming funding cycles to mitigate abuse of power. <0>Learn more.</0>',
	'Restrict payments and printing tokens.': '限制付款以及铸造代币。',
	'Restricted actions': '受限操作',
	'Review & Deploy': '检查并部署',
	'Review project': '检查项目',
	'Review project configuration': 'Review project configuration',
	'Reward specific community members with tokens.': '用代币奖励特定的社区成员。',
	Rules: '规则',
	'Rules for determining how funding cycles can be reconfigured':
		'Rules for determining how funding cycles can be reconfigured',
	'Rules for how changes can be made to your project.': '项目筹款周期配置的更改规则。',
	"Rules for how this project's funding cycles can be reconfigured.":
		'关于如何重新配置该项目筹款周期的规则',
	Save: '保存',
	'Save changes': '保存更改',
	'Save funding configuration': '保存筹款设置',
	'Save handle': '保存标识',
	'Save payouts': '保存开支配置',
	'Save project details': '保存项目详情',
	'Save reconfiguration': '保存新的配置',
	'Save rules': 'Save rules',
	'Save split': 'Save split',
	'Save token allocation': '保存代币的分配方案',
	'Save token configuration': 'Save token configuration',
	'Save token receiver': '保存代币的接收方',
	'Save tracked assets': '保存监测资产项',
	'Search projects by handle': '通过标识搜索项目',
	Seconds: 'Seconds',
	'See transaction': '查看交易',
	'Set a funding cycle duration': '设置筹款周期持续时间',
	'Set a funding cycle target': '设定筹款周期目标',
	"Set a funding target to cover predictable expenses. Any extra funds (<0>overflow</0>) can be claimed by anyone holding your project's tokens alongside you.":
		'设定一个筹款目标以保证计划内的开销。对于超出部分的资金(<0>溢出</0>)，您及其他持有项目代币的人都有权去领取。',
	"Set the amount of funds you'd like to distribute from your treasury each funding cycle.":
		"Set the amount of funds you'd like to distribute from your treasury each funding cycle.",
	"Set the amount of funds you'd like to raise each funding cycle. Any funds raised within the funding cycle target can be distributed by the project, and can't be redeemed by your project's token holders.":
		'设定你每个筹款周期想要筹款的金额。筹款周期目标以内的金额会分配给项目，项目代币持有人不能通过赎回取得这部分资金。',
	'Set the length of your funding cycles, which can enable:':
		'Set the length of your funding cycles, which can enable:',
	'Set the length of your funding cycles.': '设定您的筹款周期时长。',
	'Should you Juicebox?': '你应该使用Juicebox吗?',
	'Since you have not set a funding duration, changes to these settings will be applied immediately.':
		'鉴于你并未设置筹款持续时间，对这些设置的修改将会立即生效。',
	'Some funding cycle properties may indicate risk for project contributors.':
		'一些筹款周期的配置可能会给项目贡献者们造成一些风险。',
	"Some properties of the project's current funding cycle may indicate risk for contributors.":
		"Some properties of the project's current funding cycle may indicate risk for contributors.",
	'Specific limit': 'Specific limit',
	Spending: '资金分配',
	'Staked balance': '已存入余额',
	Start: '开始时间',
	'Start Over': '重新来过',
	'Sum of percentages cannot exceed 100%': '百分比合计不能超过 100%',
	'Sum of percentages cannot exceed 100%.': '百分比合计不能超过 100%.',
	Target: '目标',
	'Target is 0: All funds will be considered overflow and can be redeemed by burning project tokens.':
		'目标为 0 ：所有资金将被视为溢出，可以通过燃烧项目代币来赎回。',
	'Text displayed on your project\'s "pay" button. Leave this blank to use the default.':
		'显示在项目的“付款”按钮上的文本。此处留空则使用默认值。',
	"That's the plan, but the core Juicebox contracts will first be deployed to Ethereum Mainnet.":
		'有这一个这是计划，但核心的 Juicebox 合约将首先部署到以太坊主网。',
	'The JBX protocol is unaudited, and projects built on it may be vulnerable to bugs or exploits. Be smart!':
		'JBX 协议未经审计，基于它构建的项目可能受到 bug 的影响或漏洞被恶意利用。使用风险请自行承担！',
	'The Juicebox V2 frontend is still in development. It is <0>not recommended</0> for use on mainnet. Some features are missing and there are known bugs. <1>Use with caution.</1>':
		'The Juicebox V2 frontend is still in development. It is <0>not recommended</0> for use on mainnet. Some features are missing and there are known bugs. <1>Use with caution.</1>',
	'The Juicebox V2 frontend is still in development. Some features are missing and there are known bugs.':
		'The Juicebox V2 frontend is still in development. Some features are missing and there are known bugs.',
	'The Juicebox protocol is governed by a community of JBX token holders who vote on proposals fortnightly.':
		'Juicebox协议由JBX代币持有者组成的社区所管理，他们每两周对提案进行投票。',
	'The address of any smart contract deployed on {signerNetwork} that implements': [
		'在 ',
		['signerNetwork'],
		' 上部署的智能合约地址，该合约实现了'
	],
	'The address that should receive the tokens minted from paying this project.':
		'项目收到付款时，应该接收到新铸造代币的地址。',
	'The amount of tokens this project has reserved. These tokens can be distributed to reserved token beneficiaries.':
		'The amount of tokens this project has reserved. These tokens can be distributed to reserved token beneficiaries.',
	'The amount of tokens to mint to the receiver.': 'The amount of tokens to mint to the receiver.',
	'The amount that has been distributed from the Juicebox balance in this funding cycle, out of the current distribution limit. No more than the distribution limit can be distributed in a single funding cycle—any remaining ETH in Juicebox is overflow, until the next cycle begins.':
		'The amount that has been distributed from the Juicebox balance in this funding cycle, out of the current distribution limit. No more than the distribution limit can be distributed in a single funding cycle—any remaining ETH in Juicebox is overflow, until the next cycle begins.',
	'The amount that has been distributed from the Juicebox balance in this funding cycle, out of the current funding target. No more than the funding target can be distributed in a single funding cycle—any remaining ETH in Juicebox is overflow, until the next cycle begins.':
		'当前筹款周期中，从筹款目标中已提取的金额。单个筹款周期中，超出目标的资金不能被分发——Juicebox 中剩余的 ETH 都记为溢出，直到下个周期开始。',
	"The balance of the project owner's wallet.": "The balance of the project owner's wallet.",
	'The balance of this project in the Juicebox contract.': '该项目在Juicebox合约中的余额。',
	"The code could always use more eyes and more critique to further the community's confidence. Join our <0>Discord</0> and check out the code on <1>GitHub</1> to work with us.":
		'如果有更多人来帮助审阅代码，将能够进一步增强社区的信心。加入我们的 <0>Discord</0>，以及在 <1>Github</1> 上拉取代码来与我们一起工作。',
	'The contract team will soon start working on L2 payment terminals for Juicebox projects.':
		'合约开发团队将很快开始为 Juicebox 上的项目提供 L2层支付终端。',
	'The distribution limit for this funding cycle is 0, meaning all funds in Juicebox are currently considered overflow. Overflow can be redeemed by token holders, but not distributed.':
		'The distribution limit for this funding cycle is 0, meaning all funds in Juicebox are currently considered overflow. Overflow can be redeemed by token holders, but not distributed.',
	"The funds available to distribution for this funding cycle (before the {feePercentage}% JBX fee is subtracted). This number won't roll over to the next funding cycle, so funds should be distributed before this funding cycle ends.":
		[
			'The funds available to distribution for this funding cycle (before the ',
			['feePercentage'],
			"% JBX fee is subtracted). This number won't roll over to the next funding cycle, so funds should be distributed before this funding cycle ends."
		],
	'The future will be led by creators, and owned by communities.':
		'创造者将引领未来, 而社区会拥有未来.',
	'The issuance rate will decrease by this percentage with each new funding cycle. A higher discount rate will incentivize supporters to pay your project earlier than later.':
		'The issuance rate will decrease by this percentage with each new funding cycle. A higher discount rate will incentivize supporters to pay your project earlier than later.',
	'The maximum amount of funds that can be distributed from this project in one funding cycle. Funds will be withdrawn in ETH no matter the currency you choose.':
		'The maximum amount of funds that can be distributed from this project in one funding cycle. Funds will be withdrawn in ETH no matter the currency you choose.',
	'The percent this individual receives of the overall {reservedRate}% reserved token allocation': [
		'这个地址会收到保留代币中的 ',
		['reservedRate'],
		'%'
	],
	'The project owner may mint any supply of tokens at any time, diluting the token share of all existing contributors.':
		'项目方可以随时铸造任意数量的代币，这会稀释所有代币持有者的份额。',
	'The project owner may reconfigure this funding cycle at any time, without notice.':
		'项目方可以随时修改当前筹款周期的配置，不需要事先通知。',
	"The project's tokens that are minted and distributed as a result of a received payment are ERC-20's. The amount of tokens minted and distributed are proportional to the volume of payments received, weighted by the project's discount rate over time.":
		'项目在收到付款之后铸造和分发的代币是 ERC-20 标准的。分发数量与收到的付款金额成正比，随着时间推移，这个比例会按项目的折扣率不断进行加权计算。',
	'The ratio of tokens rewarded per payment amount will decrease by this percentage with each new funding cycle. A higher discount rate will incentivize supporters to pay your project earlier than later.':
		'按付款金额奖励项目代币的比例，会随着进入新的筹款周期不断按这个比率递进减少。较高的折扣率会鼓励您的支持者更早一点给您的项目捐款。',
	'The rest is left to share between token holders.':
		'The rest is left to share between token holders.',
	'The target for this funding cycle is 0, meaning all funds in Juicebox are currently considered overflow. Overflow can be redeemed by token holders, but not distributed.':
		'当前筹款周期的目标为零，意味着目前所有资金都视作溢出。代币持有者可以从溢出池中赎回 ETH，但是项目方不能从溢出池中提取资金。',
	'The total amount received by this project through Juicebox since it was created.':
		'该项目自创建以来通过 Juicebox 接收的总金额。',
	'There are no payouts defined for this funding cycle. The project owner will recieve all available funds.':
		'There are no payouts defined for this funding cycle. The project owner will recieve all available funds.',
	'There are no reserved token recipients defined for this funding cycle. The project owner will receive all available tokens.':
		'There are no reserved token recipients defined for this funding cycle. The project owner will receive all available tokens.',
	'There are unit tests written for every condition of every function in the contracts, and integration tests for every workflow that the protocol supports.':
		'对合约中所有函数的所有条件都写了单元测试，对协议支持的每个工作流程都写了集成测试。',
	'There was also a script written to iteratively run the integration tests using a random input generator, prioritizing edge cases. The code has successfully passed over 1 million test cases through this stress-testing script.':
		'这里还有一个集成测试脚本，该脚本使用随机输入生成器迭代运行，优先处理边缘情况。项目代码使用这个压力测试脚本已经成功通过了超过100万个测试用例。',
	'These attributes can be changed at any time.': '任何时候都可以修改这些属性。',
	'These settings will <0>not</0> be editable immediately within a funding cycle. They can only be changed for <1>upcoming</1> funding cycles.':
		'这些属性<0>不能</0> 在同一个筹款周期内马上进行修改。 更改的配置只会在 <1>后面的</1> 筹款周期生效。',
	'This address is an unrecognized strategy contract. Make sure it is correct!':
		'此地址是一个未识别的策略合约。请确保这个地址是对的。',
	'This address will receive any tokens minted when the recipient project gets paid.':
		'有人给这个项目付款时，此地址会收到保留的代币。',
	'This address will receive the tokens minted from paying this project.':
		'This address will receive the tokens minted from paying this project.',
	'This funding cycle may pose risks to contributors. Check the funding cycle details before paying this project.':
		'当前筹款周期可能存在一定风险。支付前请先检查筹款周期的配置详情。',
	'This list is using an experimental data index and may be inaccurate for some projects.':
		'这个列表是通过实验性的数据索引统计而得到的，对某些项目来说可能并不精确。',
	"This means that anyone can see the code that they're using, anyone can use the code without asking for permission, and no one can mess with the code or take it down.":
		'这意味着任何人都可以看到他们正在使用的代码，任何人都可以在不征求许可的情况下使用该代码，而且没有人可以搞乱代码或把它删除掉。',
	'This project has been archived and cannot be paid.': '此项目已存档，无法支付。',
	'This project is currently using the Juicebox V1 terminal contract. New features introduced in V1.1 allow the project owner to:':
		'这个项目正在使用 Juicebox V1 Terminal 合约。V1.1 的新特性使得项目拥有者可以：',
	'This project uses the V2 version of the Juicebox contracts.':
		'This project uses the V2 version of the Juicebox contracts.',
	'This rate determines the amount of overflow that each token can be redeemed for at any given time. On a lower bonding curve, redeeming a token increases the value of each remaining token, creating an incentive to hold tokens longer than others. A bonding curve of 100% means all tokens will have equal value regardless of when they are redeemed.':
		'This rate determines the amount of overflow that each token can be redeemed for at any given time. On a lower bonding curve, redeeming a token increases the value of each remaining token, creating an incentive to hold tokens longer than others. A bonding curve of 100% means all tokens will have equal value regardless of when they are redeemed.',
	'This rate determines the amount of overflow that each token can be redeemed for at any given time. On a lower bonding curve, redeeming a token increases the value of each remaining token, creating an incentive to hold tokens longer than others. A redemption rate of 100% means all tokens will have equal value regardless of when they are redeemed.':
		'This rate determines the amount of overflow that each token can be redeemed for at any given time. On a lower bonding curve, redeeming a token increases the value of each remaining token, creating an incentive to hold tokens longer than others. A redemption rate of 100% means all tokens will have equal value regardless of when they are redeemed.',
	'This rate determines the amount of overflow that each token can be redeemed for at any given time. On a lower redemption rate, redeeming a token increases the value of each remaining token, creating an incentive to hold tokens longer than others. The default redemption rate of 100% means all tokens will have equal value regardless of when they are redeemed. Learn more in this <0>short video</0>.':
		'This rate determines the amount of overflow that each token can be redeemed for at any given time. On a lower redemption rate, redeeming a token increases the value of each remaining token, creating an incentive to hold tokens longer than others. The default redemption rate of 100% means all tokens will have equal value regardless of when they are redeemed. Learn more in this <0>short video</0>.',
	'This text will be displayed to your supporters before they complete their payment.':
		'以上文本内容会在您的支持者完成付款前向其显示。',
	"This website (juicebox.money) connects to the Juicebox protocol's smart contracts, deployed on the Ethereum network. (note: anyone else can make a website that also connects to these same smart contracts. For now, don't trust any site other than this one to access the Juicebox protocol).":
		'本网站(Juicebox.money)连接到 Juicebox 协议的各项智能合约中，这些合约都部署在以太坊网络上。(注：任何人都能制作网站连接到这些智能合约。目前除了本网站，请不要通过其他网站去访问 Juicebox 协议)。',
	'This will erase all of your changes.': '这将删除你所有的更改。',
	'To: <0/>': '分配给：<0/>',
	Token: '代币',
	'Token address: <0/>': '代币地址：<0/>',
	'Token beneficiary address': 'Token beneficiary address',
	'Token beneficiary:': 'Token beneficiary:',
	'Token minting': '代币铸造',
	'Token minting allows the project owner to mint project tokens at any time.':
		'Token minting allows the project owner to mint project tokens at any time.',
	"Token minting is only available for V1.1 projects. Token minting can be enabled or disabled by reconfiguring the project's funding cycle.":
		'代币铸造功能只在 V1.1 项目中可用。可以通过重新配置项目的筹款周期来启用或禁用这一功能。',
	'Token name': '代币名称',
	'Token redeem value': '代币赎回价值',
	'Token symbol': '代币符号',
	Tokens: '代币',
	'Tokens are earned by anyone who pays your project, and can be redeemed for overflow if your project has set a funding target.':
		'当有人对你的项目进行支付时，他们会获得项目代币。在项目设定了筹款目标时, 可以通过赎回项目代币来获得溢出资金。',
	"Tokens can be redeemed for a portion of a project's <0>overflow</0>, letting you benefit from its success. After all, you helped it get there. The token may also give you exclusive member-only privledges, and allow you to contribute to the governance of the community.":
		'代币可以用来赎回一部分项目的 <0>溢出资金</0>，让你从项目的成功中受益。毕竟，是你帮助它实现的。代币还可以提供专属于成员的特权，并允许你为社区的治理做出贡献。',
	"Tokens can be redeemed for a portion of this project's ETH overflow, according to the bonding curve rate of the current funding cycle. <0>Tokens are burned when they are redeemed.</0>":
		'代币可以用于赎回项目溢出的一部分 ETH，基于当前筹款周期的联合曲线率。<0>赎回时代币会被燃烧掉。</0>',
	"Tokens can be redeemed for a portion of this project's ETH overflow, according to the redemption rate of the current funding cycle. <0>Tokens are burned when they are redeemed.</0>":
		"Tokens can be redeemed for a portion of this project's ETH overflow, according to the redemption rate of the current funding cycle. <0>Tokens are burned when they are redeemed.</0>",
	'Tokens cannot be claimed because no ERC-20 token has been issued for this project. ERC-20 tokens must be issued by the project owner.':
		'Tokens cannot be claimed because no ERC-20 token has been issued for this project. ERC-20 tokens must be issued by the project owner.',
	'Tokens receiver': 'Tokens receiver',
	'Tokens:': 'Tokens:',
	Tools: '工具',
	'Total ETH paid': '一共支付的 ETH',
	'Total funds:': '总资金：',
	'Total raised': '总筹款',
	'Total supply': '总供应量',
	'Total: {0}%': ['总共：', ['0'], '%'],
	'Transaction pending...': 'Transaction pending...',
	'Transfer ownership': '所有权转移',
	'Transfer unclaimed {tokenSymbolShort}': ['转账未领取的 ', ['tokenSymbolShort']],
	'Transfer {tokenSymbolShort}': ['转账 ', ['tokenSymbolShort']],
	'Transparency & accountability': '透明度&问责制',
	Trending: '热门',
	Twitter: 'Twitter',
	'Unarchive project': '取消项目的存档状态',
	Unavailable: '不可用',
	'Unless payments are paused in your funding cycle settings, your project will still be able to receive payments directly through the Juicebox protocol contracts.':
		'除非“付款”已在您的筹款周期设置中被暂停，否则您的项目仍可通过Juicebox协议的智能合约直接收到付款。',
	'Unstaked balance': '取出的余额',
	'Untitled project': '项目未命名',
	Upcoming: '未来',
	'Updates you make to this section will only be applied to <0>upcoming</0> funding cycles.':
		'Updates you make to this section will only be applied to <0>upcoming</0> funding cycles.',
	Upload: '上传',
	'Uploaded to: <0>{url}</0>': ['已上传至：<0>', ['url'], '</0>'],
	"Users fund your project by paying to use your app or service, or as a patron or investor by making a payment directly to your project's smart contract (like on this app).":
		'用户可以通过付费使用你的应用程序或服务来资助你的项目，也可以作为赞助人或投资者，直接向你项目的智能合约付款（就像在现在这款应用上）。',
	'Using a duration is recommended. Allowing funding cycles to be reconfigured at any time will appear risky to contributors.':
		'推荐设置一个持续时间。对于贡献者来说，可以随时修改配置的筹款周期是具有风险的。',
	'Using a reconfiguration strategy is recommended. Projects with no strategy will appear risky to contributors.':
		'推荐设置一个修改配置的策略（延迟生效）。对于贡献者来说，没有策略的项目是具有风险的。',
	V1: 'V1',
	'V1.1': 'V1.1',
	'Version of the terminal contract used by this project.': '当前项目所使用的 Terminal 版本。',
	Volume: '总收入',
	'Wallet address': '钱包地址',
	Website: '网站',
	'What are community tokens?': '什么是社区代币？',
	'What are the risks?': '有什么风险？',
	'What does Juicebox cost?': 'Juicebox 平台怎么收费？',
	'What is overflow?': '什么是溢出？',
	"What's a bonding curve?": '什么是联合曲线？',
	"What's a discount rate?": '什么是折扣率？',
	"What's going on under the hood?": '里面究竟有什么乾坤？',
	'When enabled, the project owner can manually mint any amount of tokens to any address.':
		'When enabled, the project owner can manually mint any amount of tokens to any address.',
	'When enabled, your project cannot receive direct payments.':
		'When enabled, your project cannot receive direct payments.',
	"When someone pays your project, they'll receive your project's tokens in return. Tokens can be redeemed for a portion of your project's overflow funds; when you win, your community wins with you. Leverage your project's token to grant governance rights, community access, or other membership perks.":
		'当有人向你的项目付款时，他们会收到项目的代币作为回报。 代币可以兑换你项目的部分溢出资金；让你的社区和你共赢。 利用你的项目代币来授予治理权、社区访问权或其他成员福利。',
	"When token minting is allowed, the owner of this project has permission to mint any number of tokens to any address at their discretion. This has the effect of diluting all current token holders, without increasing the project's treasury balance. The project owner can reconfigure this along with all other properties of the funding cycle.":
		'当铸造代币功能启用时，该项目方可以铸造任意数量的代币并发送给任意地址。这一操作并不会增加项目金库的余额，所以会稀释所有当前代币持有者的份额。和其他属性一样，也可以在每个筹款周期中重新配置这一项。',
	'Whenever someone pays your project, this percentage of tokens will be reserved and the rest will go to the payer.':
		'Whenever someone pays your project, this percentage of tokens will be reserved and the rest will go to the payer.',
	'Whenever someone pays your project, this percentage of tokens will be reserved and the rest will go to the payer. Reserve tokens are reserved for the project owner by default, but can also be allocated to other wallet addresses by the owner. Once tokens are reserved, anyone can "mint" them, which distributes them to their intended receivers.':
		'有人对你的项目付款时，这一比例的代币会被保留, 剩余的代币会发送至付款人。在默认情况下, 保留代币会留给项目拥有者, 但是项目拥有者也可以将保留代币分配给其他钱包地址。保留代币产生后，任何人都可以把它们“铸造”出来，亦即把保留代币分发给预先指定的接收人。',
	'Who funds Juicebox projects?': '谁会资助 Juicebox 上的这些项目？',
	'Who is Peel?': '什么是Peel？',
	'Why Ethereum?': '为什么是以太坊？',
	"Why should I want to own a project's tokens?": '为什么我会想要持有一个项目的代币？',
	'Will be rounded to <0/>{0}': ['Will be rounded to <0/>', ['0']],
	'Will it work on L2s?': '它能在 L2 上运行吗？',
	'With Juicebox, projects are built and maintained by motivated punks getting paid transparently, and funded by a community of users and patrons who are rewarded as the projects they support succeed.':
		'积极进取的朋克们通过 Juicebox 构建和维护项目，并以透明的方式获得报酬。用户和赞助者组成的社区对项目给予资助，而他们则可以在项目成功时获得回报。',
	'With a distribution limit of Zero, no funds can be distributed by the project. All funds belong to token holders as overflow.':
		'With a distribution limit of Zero, no funds can be distributed by the project. All funds belong to token holders as overflow.',
	"With an infinite distribution limit, all funds can be distributed by the project. The project will have no overflow, meaning token holders won't be able to redeem their tokens for treasury funds.":
		"With an infinite distribution limit, all funds can be distributed by the project. The project will have no overflow, meaning token holders won't be able to redeem their tokens for treasury funds.",
	Withdraw: '提取',
	'Withdraw funds': '提取资金',
	Workspace: '工作空间',
	"Would you like to issue an ERC-20 token to be used as this project's token?":
		"Would you like to issue an ERC-20 token to be used as this project's token?",
	Yes: '确定',
	'You can redeem your {tokenTextLong} for overflow without claiming them. You can transfer your unclaimed {tokenTextLong} to another address from the Tools menu, which can be accessed from the wrench icon in the upper right hand corner of this project.':
		[
			'You can redeem your ',
			['tokenTextLong'],
			' for overflow without claiming them. You can transfer your unclaimed ',
			['tokenTextLong'],
			' to another address from the Tools menu, which can be accessed from the wrench icon in the upper right hand corner of this project.'
		],
	'You can still redeem your {tokenSymbol} tokens for overflow without claiming them, and you can transfer your unclaimed {tokenSymbol} tokens to another address from the Tools menu, which can be accessed from the wrench icon in the upper right hand corner of this project.':
		[
			'未领取的 ',
			['tokenSymbol'],
			' 代币，依然可以用来赎回溢出池中的 ETH，也可以在工具菜单中把代币直接转给其他地址。点击右上角的扳手按钮可以打开工具菜单。'
		],
	'You have set a funding cycle target.': '您设定了一个筹款周期目标。',
	'You will receive minimum {minReturnedTokensFormatted} ETH': [
		'You will receive minimum ',
		['minReturnedTokensFormatted'],
		' ETH'
	],
	'You will receive {0}{1} ETH': ['你会收到 ', ['0'], ['1'], ' ETH'],
	'You will receive {minReturnedTokensFormatted} ETH': [
		'You will receive ',
		['minReturnedTokensFormatted'],
		' ETH'
	],
	"You'll be able to issue ERC-20 tokens once your project contract has been deployed. Until then, the protocol will track token balances, allowing your supporters to earn tokens and redeem for overflow in the meantime.":
		'项目合约部署上线后，你就可以铸造ERC-20代币了。在此之后，协议就会开始追踪代币余额，同时允许你的支持者获得代币以及赎回代币取得项目溢出资金。',
	'Your balance': '你的余额',
	'Your balance: {0}': ['你的余额：', ['0']],
	'Your feedback will be sent to a <0>public Discord channel </0>for our development team to consider.':
		'您的反馈会被发送至一个 <0>Discord 的公开频道</0>，我们的开发团队可以查看并考量。',
	'Your project cannot receive direct payments while paused.':
		'暂停期间，你的项目不会再收到直接付款。',
	"Your project is funded across funding cycles. A funding cycle has a funding target and a duration. Your project's funding cycle configuration will depend on the kind of project you're starting.":
		'您的项目按筹款周期来进行筹款。每个筹款周期都有一个筹款目标和周期时长。您项目的筹款周期配置视您将创建项目的种类而定。',
	'Your project will appear archived, and will not be able to receive payments through the juicebox.money app. You can unarchive a project at any time. Please allow a few days for your project to appear under the "archived" filter on the Projects page.':
		'您的项目将体现为“存档”，并且将无法通过juicebox.money应用程序接收付款。您可以在任何时候取消项目的存档。请留出几天时间，以便您的项目显示在"项目"页面上的"已存档"过滤器下。',
	'Your project will be created on the Juicebox V2 contracts. <0>Learn more.</0>':
		'Your project will be created on the Juicebox V2 contracts. <0>Learn more.</0>',
	'Your project will immediately appear active on the juicebox.money app. Please allow a few days for it to appear in the "active" projects list on the Projects page.':
		'您的项目将立即在 juicebox.money 应用程序上显示为“活动”状态。请留出几天时间，让它显示在"项目"页面上的"活动"项目列表中。',
	'Your project will still be able to receive payments directly through the Juicebox protocol contracts.':
		'您的项目仍可通过Juicebox协议的智能合约直接收到付款。',
	"Your project's Twitter handle.": '项目的推特账号',
	"Your project's funding cycle target and duration.": '项目筹款周期的目标与持续时间。',
	"Your project's website.": '你项目的网站。',
	'Your transaction has been submitted and is awaiting confirmation.':
		'Your transaction has been submitted and is awaiting confirmation.',
	'Your unclaimed {tokenTextLong}': ['Your unclaimed ', ['tokenTextLong']],
	'Zero, no funds can be distributed': 'Zero, no funds can be distributed',
	'after {0}% JBX fee': ['计算 ', ['0'], '% JBX 费用之后'],
	'characters max': '最大字符数',
	days: '天',
	handle: '标识',
	'https://discord.gg/abcdefgh': 'https://discord.gg/abcdefgh',
	'https://your-project.com': 'https://your-project.com',
	juiceboxETH: 'juiceboxETH',
	'last {trendingWindowDays} days': ['最近 ', ['trendingWindowDays'], ' 天'],
	loading: '加载中',
	'locked until {lockedUntilFormatted}': ['locked until ', ['lockedUntilFormatted']],
	'matching "{searchText}"': ['满足条件 "', ['searchText'], '"'],
	'or <0><1>buy {tokenText} on exchange<2/></1></0>': [
		'或是 <0><1>在交易所购买 ',
		['tokenText'],
		' <2/></1></0>'
	],
	project: '项目',
	'project owner': '项目拥有者',
	projects: '项目',
	token: '代币',
	tokens: '代币',
	'tokens redeemed': '代币已赎回',
	until: '直到',
	'{0} after JBX fee': ['收取 JBX 费用之后 ', ['0']],
	'{0} ago': [['0'], ' 之前'],
	"{0} are distributed to anyone who pays this project. If the project has set a funding target, tokens can be redeemed for a portion of the project's overflow whether or not they have been claimed yet.":
		[
			['0'],
			" are distributed to anyone who pays this project. If the project has set a funding target, tokens can be redeemed for a portion of the project's overflow whether or not they have been claimed yet."
		],
	'{0} balance': [['0'], ' 余额'],
	'{0} balance: <0><1>{1} {tokensTextShort}</1><2>({share}% of supply)</2></0>': [
		['0'],
		' balance: <0><1>',
		['1'],
		' ',
		['tokensTextShort'],
		'</1><2>(',
		['share'],
		'% of supply)</2></0>'
	],
	'{0} contributed': [['0'], ' 已贡献'],
	'{0} days': [['0'], ' 天'],
	'{0} for you': ['给到你的 ', ['0']],
	'{0} holders': [['0'], ' 持有者'],
	'{0} reserved': [['0'], ' 已保留'],
	'{0} staked': [['0'], ' 已存入'],
	'{0} total': [['0'], ' 总共'],
	'{0} will go to the project owner: <0/>': [['0'], ' 会给到项目拥有者：<0/>'],
	'{0} withdrawn': ['已提取 ', ['0']],
	'{0} {1} reserved': [['0'], ['1'], ' 保留'],
	'{0}% of supply': ['占比 ', ['0'], '%'],
	'{0}% to <0/>': [['0'], '% 分配给 <0/>'],
	'{0}% to {1}': [['0'], '% 分配给 ', ['1']],
	'{0}/{1} withdrawn': ['已提取 ', ['0'], '/', ['1']],
	'{0}{1}': [['0'], ['1']],
	'{count} total': ['总共 ', ['count']],
	'{exchangeName} has no market for {tokenSymbol}.': [
		['exchangeName'],
		' 不存在 ',
		['tokenSymbol'],
		' 的兑换市场'
	],
	'{formattedTimeLeft} left': [['formattedTimeLeft'], ' left'],
	'{formattedTimeLeft} until #{0}': [['formattedTimeLeft'], ' until #', ['0']],
	'{handle} not found': [['handle'], ' 没有找到'],
	'{handle} will be available soon! Try refreshing the page shortly.': [
		['handle'],
		' 很快就能使用了！可以尝试立即刷新页面。'
	],
	'{label}': [['label']],
	'{payerRate} (+ {reservedRate} reserved) {tokenSymbolPlural}/ETH': [
		['payerRate'],
		' (+ ',
		['reservedRate'],
		' reserved) ',
		['tokenSymbolPlural'],
		'/ETH'
	],
	'{payerRate} {tokenSymbolPlural}/ETH': [['payerRate'], ' ', ['tokenSymbolPlural'], '/ETH'],
	'{paymentCount, plural, one {# payment} other {# payments}}': [
		['paymentCount', 'plural', { one: ['#', ' payment'], other: ['#', ' payments'] }]
	],
	'{tokenSymbolPlural} received per ETH paid to the treasury. This can change over time according to the discount rate and reserved tokens amount of future funding cycles.':
		[
			['tokenSymbolPlural'],
			' received per ETH paid to the treasury. This can change over time according to the discount rate and reserved tokens amount of future funding cycles.'
		],
	'{tokenSymbol} ERC-20 address': [['tokenSymbol'], ' ERC-20 address'],
	'{tokenSymbol}/ETH exchange rate on {exchangeName}.': [
		'在 ',
		['exchangeName'],
		' 的兑换率为 ',
		['tokenSymbol'],
		'/ETH'
	],
	'{tokenTextSingular} recipients': [['tokenTextSingular'], ' recipients'],
	"{tokensLabel} are distributed to anyone who pays this project. If the project has set a funding target, tokens can be redeemed for a portion of the project's overflow whether or not they have been claimed yet.":
		[
			['tokensLabel'],
			' 会被分配给付款的人。如果项目设置了筹款目标，可以燃烧代币来按比例赎回溢出池中的 ETH。'
		],
	'{tokensText} reserved': [['tokensText'], ' reserved'],
	'{tokensTokenUpper} amount': [['tokensTokenUpper'], ' amount'],
	'{unclaimedBalanceFormatted} {tokenText} claimable': [
		['unclaimedBalanceFormatted'],
		' ',
		['tokenText'],
		' claimable'
	],
	'{userOwnershipPercentage}% of total supply': [['userOwnershipPercentage'], '% of total supply']
};
