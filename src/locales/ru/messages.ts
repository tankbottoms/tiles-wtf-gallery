/*eslint-disable*/ export const messages = {
	'(Optional) Add a memo to this payment on-chain':
		'(Необязательно) Добавить примечание к этому платежу в цепочке',
	'(Optional) Add a note to this payment on-chain':
		'(Необязательно) Добавить примечание к этому платежу в цепочке',
	'({0}%)': ['(', ['0'], '%)'],
	'({realTokenAllocationPercent}% of all newly minted tokens).': [
		'(',
		['realTokenAllocationPercent'],
		'% всех вновь выпущенных токенов).'
	],
	'0% fee': '0% комиссия',
	'1 year': '1 год',
	'1. Project details': '1. Детали проекта',
	'100% overflow': '100% превышение',
	'2. Funding cycle': '2. Funding cycle',
	'24 hours': '24 часа',
	'3-day delay': '3-дневная задержка',
	'3. Review and deploy': '3. Review and deploy',
	'30 days': '30 дней',
	'7 days': '7 дней',
	'7-day delay': '7-дневная задержка',
	'90 days': '90 дней',
	'<0/> Archived projects have not been modified or deleted on the blockchain, and can still be interacted with directly through the Juicebox contracts.':
		'<0/> Архивные проекты не были изменены или удалены в блокчейне, и с ними по-прежнему можно взаимодействовать напрямую через контракты Juicebox.',
	'<0/> The Juicebox protocol is open to anyone, and project configurations can vary widely. There are risks associated with interacting with all projects on the protocol. Projects built on the protocol are not endorsed or vetted by JuiceboxDAO or Peel. Do your own research and understand the risks before committing your funds.':
		'<0/> Протокол Juicebox открыт для всех, и конфигурации проектов могут сильно различаться. Взаимодействие со всеми проектами протокола связано с определенными рисками. Проекты, созданные на основе протокола, не поддерживаются и не проверяются JuiceboxDAO или Peel. Прежде чем вкладывать средства, проведите собственное исследование и осознайте риски.',
	'<0/> owner balance': '<0/> баланс владельца',
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
		'<0><1>В этом проекте нет переполнения</1>, поэтому вы не получите ETH за сжигание токенов..</0>',
	'<0>Juicebox contracts</0> are unaudited, and may be vulnerable to bugs or hacks. All funds moved through Juicebox could be lost or stolen. JuiceboxDAO and Peel are not liable for any losses by projects or their supporters.':
		'<0>Контракты Juicebox</0> не проверяются и могут быть уязвимы к ошибкам или взломам. Все средства, перемещаемые через Juicebox, могут быть потеряны или украдены. JuiceboxDAO и Peel не несут ответственности за любые потери проектов или их сторонников.',
	'<0>Learn more</0> about burning tokens.': '<0>Узнайте больше</0> о сжигании токенов.',
	'<0>Learn more</0> about funding cycle duration.':
		'<0>Подробнее</0> о продолжительности цикла финансирования.',
	'<0>Learn more</0> about funding cycles.':
		'<0>Подробнее</0> о продолжительности цикла финансирования.',
	'<0>Learn more</0> about overflow.': '<0>Узнайте больше</0> о переполнении.',
	'<0>NOTE:</0> This project has a balance of 0. Projects cannot be migrated without a balance. To migrate this project, first pay it or use the button below to deposit 1 wei (0.000000000000000001 or 10<1>-18</1> ETH).':
		'<0>ПРИМЕЧАНИЕ:</0>Этот проект имеет баланс 0. Проекты не могут быть перенесены без баланса. Чтобы перенести этот проект, сначала оплатите его или используйте кнопку ниже, чтобы внести 1 wei (0.000000000000000001 or 10<1>-18</1> ETH).',
	'<0>No duration set.</0>Funding can be reconfigured at any time. Reconfigurations will start a new funding cycle.':
		'<0>No duration set.</0>Funding can be reconfigured at any time. Reconfigurations will start a new funding cycle.',
	'<0>Note:</0> These properties will <1>not</1> be editable immediately within a funding cycle. They can only be changed for <2>upcoming</2> funding cycles.':
		'<0> Примечание. </0> Свойства цикла финансирования <1>n не <1>n будут редактируемыми непосредственно в цикле финансирования. Их можно изменить только на <2> предстоящих <2> цикла финансирования.',
	'<0>Note:</0> Tokens cannot be claimed because no ERC-20 token has been issued for this project. ERC-20 tokens must be issued by the project owner.':
		'<0>Note:</0> Tokens cannot be claimed because no ERC-20 token has been issued for this project. ERC-20 tokens must be issued by the project owner.',
	'<0>Notice:</0> These balances will not reflect transfers of claimed tokens because the {tokenSymbol} ERC-20 token has not yet been indexed by Juicebox.':
		[
			'<0>Внимание:</0> Эти балансы не будут отражать переводы выбранных токенов, поскольку токен ERC-20 ',
			['tokenSymbol'],
			' еще не был проиндексирован Juicebox.'
		],
	'<0>Peel</0> is the DAO that manages the juicebox.money frontend interface. You can reach out to Peel either through the <1>Peel Discord</1> or the <2>Juicebox Discord</2>.':
		'<0>Peel</0> - это DAO, управляющее интерфейсом фронтенда juicebox.money. Вы можете связаться с Peel либо через <1>Peel Discord</1>, либо через <2>Juicebox Discord</2>.',
	"<0>Recurring funding cycles</0> (for example, distribute $30,000 from your project's treasury every 14 days).":
		"<0>Recurring funding cycles</0> (for example, distribute $30,000 from your project's treasury every 14 days).",
	"<0>Target is 0.</0> The project's entire balance will be considered overflow. <1>Learn more</1> about overflow.":
		"<0>Target is 0.</0> The project's entire balance will be considered overflow. <1>Learn more</1> about overflow.",
	'<0>This project has no overflow</0>, so you will not receive any ETH for burning tokens.':
		'<0>This project has no overflow</0>, so you will not receive any ETH for burning tokens.',
	'Trending projects': 'Трендовые проекты',
	'<0>Your unclaimed {tokenSymbol} tokens:</0> {0}': [
		'<0>Ваши невостребованные ',
		['tokenSymbol'],
		' токены:</0> ',
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
		'Кривая связи вознаграждает людей, которые дольше ждут, чтобы обменять ваши токены на переполнение.',
	'A mechanism like Juicebox where upfront financial commitments should be honored over time is only guaranteed within an ecosystem like Ethereum.':
		'Такой механизм, как Juicebox, в котором финансовые обязательства должны выполняться с течением времени, гарантируется только в такой экосистеме, как Ethereum (Эфириум).',
	'A project can be archived by its owner from the tools menu on the project page.':
		'Проект может быть архивирован его владельцем из меню инструментов на странице проекта.',
	'A project can choose to reserve a percentage of tokens for itself. Instead of being distributed to paying users, this percentage of tokens is instead minted for the project.':
		'Проект может зарезервировать для себя процент токенов. Вместо того, чтобы распределяться среди платящих пользователей, этот процент токенов создается для проекта.',
	'A project can reserve a percentage of tokens minted from every payment it receives. Reserved tokens can be distributed according to the allocation below at any time.':
		'Проект может резервировать процент выпущенных токенов с каждого платежа, который он получает. Зарезервированные токены могут быть распределены в соответствии с приведенным ниже распределением в любое время.',
	"A project's lifetime is defined in funding cycles. If a funding target is set, the project can withdraw no more than the target for the duration of the cycle.":
		'Срок действия проекта определен в циклах финансирования. Если установлен целевой показатель финансирования, проект может вывести не более целевого показателя на период действия цикла.',
	'A reconfiguration to an upcoming funding cycle must be submitted at least 3 days before it starts.':
		'Реконфигурацию/план изменений для предстоящего цикла финансирования необходимо отправить не менее чем за 7 дней до его начала.',
	'A reconfiguration to an upcoming funding cycle must be submitted at least 7 days before it starts.':
		'Реконфигурацию/план изменений для предстоящего цикла финансирования необходимо отправить не менее чем за 3 дня до его начала.',
	"A reserved rate of more than 90% is risky for contributors. Contributors won't receive many tokens for their contribution.":
		"A reserved rate of more than 90% is risky for contributors. Contributors won't receive many tokens for their contribution.",
	AVAILABLE: 'ДОСТУПНО',
	Activity: 'Активность',
	'Add a payout': 'Add a payout',
	'Add a split': 'Add a split',
	"Add funds to this project's balance without minting tokens.":
		'Пополняйте средства на баланс этого проекта без создания жетонов.',
	'Add image': 'Добавить изображение',
	'Add payout': 'Add payout',
	'Add split': 'Add split',
	'Add to Balance': 'Добавить к балансу',
	'Add to balance': 'Добавить к балансу',
	'Add token receiver': 'Добавить получателя токена',
	Address: 'Адрес',
	'Address required': 'Address required',
	'Address:': 'Address:',
	'Address: {0}': ['Адрес: ', ['0']],
	'Adjust incentives for paying your project.': 'Отрегулируйте стимулы для оплаты вашего проекта.',
	All: 'Все',
	'All assets': 'Все активы',
	'All changes will be applied to the <0>upcoming</0> funding cycle.':
		'Все изменения будут применены к <0>предстоящему</0> циклу финансирования.',
	'All funds can be distributed by the project. The project will have no overflow (the same as setting the target to infinity).':
		'все средства могут быть распределены по проекту, и в проекте не будет переполнения. (Это то же самое, что и установка цели на бесконечность).',
	'All projects': 'Все проекты',
	'All {0} will go to the project owner:': ['Все ', ['0'], ' будут направлены владельцу проекта:'],
	"Allocate a portion of your project's reserved tokens to other Ethereum wallets or Juicebox projects.":
		'Выделите часть зарезервированных токенов вашего проекта на другие кошельки Ethereum или проекты Juicebox.',
	'Allow minting tokens': 'Разрешить майнинг токенов',
	'Allow token minting': 'Разрешить минтить токены',
	Allowed: 'Разрешено',
	'Almost definitely.': 'Почти определенно.',
	Amount: 'Количество',
	'Amount of ERC-20 tokens to claim': 'Amount of ERC-20 tokens to claim',
	'Amount paid': 'Оплаченная сумма',
	'Amount to distribute': 'Amount to distribute',
	"An invite link to your project's Discord server.":
		'Ссылка для приглашения на сервер Discord вашего проекта.',
	"Any changes will take effect in the next funding cycle. The current funding cycle won't be altered.":
		"Any changes will take effect in the next funding cycle. The current funding cycle won't be altered.",
	'Any reconfiguration to an upcoming funding cycle will take effect once the current cycle ends. A project with no strategy may be vulnerable to being rug-pulled by its owner.':
		'Любая перенастройка на предстоящий цикл финансирования вступит в силу после завершения текущего цикла. Проект, не имеющий стратегии или плана, может быть уязвим для владельца.',
	"Any treasury funds in excess of the distribution limit is called <0>overflow</0>. Overflow can be claimed by your project's token holders by redeeming their tokens. <1>Learn more</1> about overflow.":
		"Any treasury funds in excess of the distribution limit is called <0>overflow</0>. Overflow can be claimed by your project's token holders by redeeming their tokens. <1>Learn more</1> about overflow.",
	'Any treasury funds within the distribution limit can be paid out to destinations that you can define as <0>splits</0>. <1>Learn more</1> about payout splits.':
		'Any treasury funds within the distribution limit can be paid out to destinations that you can define as <0>splits</0>. <1>Learn more</1> about payout splits.',
	'Archive project': 'Заархивировать проект',
	Archived: 'В архиве',
	'Are you sure you want to start over?': 'Вы уверены, что хотите начать все сначала?',
	Assets: 'Активы',
	'Available after fee:': 'Доступно после комиссии:',
	'Available funds are distributed according to the payouts below.':
		'Доступные средства распределяются в соответствии с приведенными ниже выплатами.',
	'Available:': 'Доступно:',
	'Back to top': 'Вернуться наверх',
	'Balance exceeded': 'Баланс превышен',
	"Balance of the project owner's wallet.": "Balance of the project owner's wallet.",
	Beneficiary: 'Получатель',
	'Beneficiary address': 'Адрес получателя',
	'Big ups to the Ethereum community for crafting the infrastructure and economy to make Juicebox possible.':
		'Большое спасибо сообществу Ethereum за создание инфраструктуры и экономики, что сделало Juicebox возможным.',
	'Block number': 'Номер блока',
	Blog: 'Блог',
	'Bonding curve rate': 'Ставка скорости кривой по облигациям',
	'Bonding curve:': 'Ставка скорости кривой по облигациям:',
	'Build a community around a project, fund it, and program its spending. Light enough for a group of friends, powerful enough for a global network of anons.':
		'Это возможность построить сообщество вокруг проекта, профинансировать его, и распределить затраты. Достаточно легкий для группы друзей и достаточно мощный для глобальной сети незнакомцев. ',
	'Built for:': 'Создан для:',
	'Burn project tokens': 'Сжечь токены проекта',
	"Burn your {tokensLabel}. You won't receive ETH in return because this project has no overflow.":
		[
			'Сожгите свой ',
			['tokensLabel'],
			'. Вы не получите ETH взамен, потому что у этого проекта нет перетока.'
		],
	'Burn {0} {tokensTextShort}': ['Сжечь ', ['0'], ' ', ['tokensTextShort']],
	'Burn {tokensLabel}': ['Сжечь ', ['tokensLabel']],
	'Burn {tokensTextLong}': ['Сжечь ', ['tokensTextLong']],
	"By default, all unallocated funds can be distributed to the project owner's wallet.":
		'По умолчанию все нераспределенные средства могут быть распределены на кошелек владельца проекта.',
	"By default, the issuance rate for your project's token is 1,000,000 tokens / 1 ETH. For example, a 1 ETH contribution to your project will return 1,000,000 tokens. You can manipulate the issuance rate with the following configurations.":
		"By default, the issuance rate for your project's token is 1,000,000 tokens / 1 ETH. For example, a 1 ETH contribution to your project will return 1,000,000 tokens. You can manipulate the issuance rate with the following configurations.",
	'By default, these tokens are reserved for the project owner, but you can also allocate portions to other wallet addresses.':
		'By default, these tokens are reserved for the project owner, but you can also allocate portions to other wallet addresses.',
	"Can I change my project's contract after it's been created?":
		'Могу ли я изменить контракт своего проекта после его создания?',
	'Can I delete a project?': 'Могу ли я удалить проект?',
	Cancel: 'Отменить',
	'Cannot redeem tokens for ETH because this project has no overflow.':
		'Невозможно обменять токены на ETH, так как в этом проекте нет переполнения.',
	'Changes to project details will take effect immediately.':
		'Changes to project details will take effect immediately.',
	'Changes to these attributes can be made at any time and will be applied to your project immediately.':
		'Изменения этих атрибутов можно внести в любое время, и они будут немедленно применены к вашему проекту.',
	"Changes to your project's funding configuration require a community-approved period to take effect, which acts as a safeguard against rug pulls. Your supporters don't have to trust you — even though they already do.":
		'Изменения в конфигурации финансирования вашего проекта требуют одобренного сообществом периода для вступления в силу, что служит защитой от перетягивания ковра. Ваши сторонники не обязаны доверять вам — даже если они уже доверяют.',
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
	Close: 'Закрыть',
	'Commit portions of your funds to the people or projects you want to support, or the contributors you want to pay. When you get paid, so do they.':
		'Выделите часть своих средств людям или проектам, которых вы хотите поддержать, или спонсорам, которым вы хотите платить. Когда вам платят, им тоже платят.',
	'Community funding for people and projects': 'Сообщество финансирует людей и их проекты',
	'Configure how your project will collect and spend funds.':
		'Configure how your project will collect and spend funds.',
	'Configure restrictions for your funding cycles.':
		'Configure restrictions for your funding cycles.',
	"Configure the dynamics of your project's token.":
		"Configure the dynamics of your project's token.",
	'Congrats on creating your project!': 'Поздравляю с созданием вашего проекта!',
	Connect: 'Подключиться',
	'Connect wallet to deploy': 'Подключите кошелёк для развертывания',
	'Connect wallet to pay': 'Connect wallet to pay',
	'Contract address: {0}': ['Адрес контракта: ', ['0']],
	'Contributors will not receive any tokens in exchange for paying this project.':
		'Участники не получат никаких токенов в обмен на оплату этого проекта.',
	'Contributors will receive a relatively small portion of tokens in exchange for paying this project.':
		'Участники получат относительно небольшую часть токенов в обмен на оплату этого проекта.',
	'Copied!': 'Скопировано!',
	'Copy to clipboard': 'Копировать в буфер обмена',
	'Create project': 'Создать проект',
	'Creating a Juicebox project mints you an NFT (ERC-721) representing ownership over it. Whoever owns this NFT can configure the rules of the game and how payouts are distributed.':
		'При создании проекта Juicebox вы получаете NFT (ERC-721), предоставляющий право собственности на него. Тот, кто владеет этим NFT, может настраивать правила игры и распределять выплаты.',
	Current: 'Текущий',
	'Current 3rd Party Exchange Rates': 'Current 3rd Party Exchange Rates',
	'Current owner: {ownerAddress}': ['Current owner: ', ['ownerAddress']],
	'Currently worth: <0><1/>{0}</0>': ['На данный момент стоит: <0><1/>', ['0'], '</0>'],
	'Custom strategy': 'Индивидуальная стратегия',
	'Custom token beneficiary': 'Custom token beneficiary',
	'Cycle #{0}': ['Цикл #', ['0']],
	'Dark theme': 'Тёмная тема',
	Date: 'Date',
	'Date created': 'Дата создания',
	Days: 'Days',
	'Deploy new project configuration': 'Deploy new project configuration',
	'Deploy project': 'Развернуть проект',
	'Deploy project on {signerNetwork}': ['Развернуть проект на ', ['signerNetwork']],
	'Deploy project to {0}': ['Deploy project to ', ['0']],
	'Deposit 1 wei to @{handle}': ['Депозит 1 wei на @', ['handle']],
	'Design your project': 'Создай свой проект',
	Details: 'Подробности',
	Disabled: 'Отключен',
	"Disabled when your project's distribution limit is <0>No limit</0> (infinite)":
		"Disabled when your project's distribution limit is <0>No limit</0> (infinite)",
	"Disabled when your project's funding cycle duration is 0.":
		"Disabled when your project's funding cycle duration is 0.",
	"Disabled when your project's funding cycle has no duration.":
		"Disabled when your project's funding cycle has no duration.",
	Disconnect: 'Отключиться',
	Discord: 'Дискорд',
	'Discount rate': 'Учетная ставка ',
	"Display ERC-20 tokens and other Juicebox project tokens that are in this project's owner's wallet.":
		"Display ERC-20 tokens and other Juicebox project tokens that are in this project's owner's wallet.",
	'Distribute available funds to other Ethereum wallets or Juicebox projects as payouts. Use this to pay contributors, charities, Juicebox projects you depend on, or anyone else. Funds are distributed whenever a withdrawal is made from your project.':
		'Распределяйте доступные средства на другие кошельки Ethereum или проекты Juicebox в качестве выплат. Используйте это, чтобы платить вкладчикам, благотворительным организациям, проектам Juicebox, от которых вы зависите, или кому-либо еще. Средства распределяются всякий раз, когда производится вывод средств из вашего проекта.',
	'Distribute funds': 'Распределить средства',
	'Distribute reserved {tokenTextPlural}': ['Distribute reserved ', ['tokenTextPlural']],
	'Distribute {0}': 'Распределение',
	'Distribute {tokenTextPlural}': ['Distribute ', ['tokenTextPlural']],
	'Distribute {tokensText}': ['Distribute ', ['tokensText']],
	Distributed: 'Распределено',
	'Distribution limit': 'Distribution limit',
	'Distribution limit infinite': 'Distribution limit infinite',
	'Distribution limit, duration and payouts': 'Distribution limit, duration and payouts',
	'Distribution splits': 'Distribution splits',
	'Distributions to other Juicebox project do not incur any fee.':
		'Distributions to other Juicebox project do not incur any fee.',
	'Do I have to make my project open source to use Juicebox as its business model?':
		'Должен ли я сделать свой проект открытым, чтобы использовать Juicebox в качестве бизнес-модели?',
	Docs: 'Документы',
	'Documentation on v1.1 contracts': 'Документация по контрактам версии 1.1',
	'Does a project benefit from its own overflow?':
		'Выигрывает ли проект от собственного переполнения?',
	Done: 'Готово',
	'Download CSV': 'Скачать CSV',
	'Download CSV of payments': 'Скачать CSV данных о платежах',
	'Download CSV of project activity': 'Скачать CSV о активности проекта',
	'Download CSV of {0} holders': ['Загрузить CSV из ', ['0'], ' держателей'],
	'Due to their public nature, any exploits to the contracts may have irreversible consequences, including loss of funds. Please use Juicebox with caution.':
		'В связи с публичным характером, любые эксплойты к контрактам могут иметь необратимые последствия, включая потерю средств. Пожалуйста, используйте Juicebox с осторожностью.',
	Duration: 'Продолжительность',
	'ERC-20 community tokens': 'Токены сообщества ERC-20',
	'ERC-20 tokens can only be minted once an ERC-20 token has been issued for this project.':
		'ERC-20 tokens can only be minted once an ERC-20 token has been issued for this project.',
	"Each project has its own <0>ERC-20 tokens</0>. Anyone who contributes funds to a project receives that project's tokens in return. Token balances will be tracked by the protocol until ERC-20 tokens are optionally issued by the project owner.":
		'Каждый проект имеет свои собственные <0>ERC-20 токены</0>. Каждый, кто вносит средства в проект, получает взамен токены этого проекта. Остатки токенов будут отслеживаться протоколом до тех пор, пока владелец проекта не выпустит токены ERC-20 по своему усмотрению.',
	'Edit existing split': 'Edit existing split',
	'Edit project': 'Редактировать проект',
	'Edit project details': 'Edit project details',
	'Edit reserved token allocation': 'Изменить зарезервированное распределение токенов',
	'Edit token allocation': 'Изменить распределение токенов',
	'Edit token receiver': 'Редактировать получателей токенов',
	'Edit tracked assets': 'Изменить отслеживаемые активы',
	'Enable Juicebox V2': 'Enable Juicebox V2',
	Enabled: 'Разрешено',
	'Enabling this allows the project owner to manually mint any amount of tokens to any address.':
		'Включение этой опции позволяет владельцу проекта вручную минтить любое количество токенов на любой адрес.',
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
	End: 'Конец',
	'Error loading holders': 'Error loading holders',
	'Error loading payments': 'Error loading payments',
	'Ethereum protocols and DAOs': 'Протоколы Ethereum и ДАО (DAO)',
	'Ethereum provides a public environment where internet apps like Juicebox can run in a permission-less, trustless, and unstoppable fashion.':
		'Ethereum обеспечивает публичную среду, в которой интернет-приложения, такие, как Juicebox, могут работать без разрешений, без потребности доверия и без остановки.',
	FAQ: 'FAQ (Вопросы)',
	FAQs: 'FAQ (Вопросы)',
	'For example, with a bonding curve of 70%, redeeming 10% of the token supply at any given time will claim around 7% of the total overflow.':
		'Например: с кривой связи 70%, погашение 10% количества токенов в любой момент времени потребует около 7% от общего переполнения.',
	'For more info, check out this <0>short video</0> on bonding curves.':
		'Для получения дополнительной информации посмотрите это <0>короткое видео</0> о кривых склеивания.',
	'For more info, check out this <0>short video</0>.':
		'Для получения дополнительной информации посмотрите это <0>короткое видео</0>.',
	'For users paying through your app, you should route those funds through the Juicebox smart contracts so they receive tokens in return.':
		'Если пользователи платят через ваше приложение, вы должны направить эти средства через смарт-контракты Juicebox, чтобы они получили токены взамен.',
	Funding: 'Funding',
	'Funding Distribution': 'Распределение финансирования',
	'Funding cycle': 'Цикл финансирования',
	'Funding cycle details': 'Детали цикла финансирования',
	'Funding cycle duration': 'Продолжительность цикла финансирования',
	'Funding cycle target': 'Цель цикла финансирования',
	'Funding cycles': 'Funding cycles',
	'Funding cycles can be reconfigured moments before a new cycle begins, without notifying contributors.':
		'Циклы финансирования можно изменить за несколько минут до начала нового цикла без уведомления вкладчиков.',
	'Funding distribution': 'Распределение финансирования',
	'Funding target': 'Цель финансирования',
	'Funds will be distributed to:': 'Средства будут распределены по следующим направлениям:',
	'Give feedback': 'Оставьте свой отзыв',
	'Give us your feedback': 'Дайте нам свой отзыв',
	'Go to Etherscan': 'Перейти к Etherscan',
	Handle: 'Никнейм',
	'Heads up': 'Уведомления',
	History: 'История',
	Holders: 'Держатели',
	'Holding these tokens entitles a project to a portion of its own overflow.':
		'Хранение этих токенов дает проекту право на часть собственного переполнения.',
	Holdings: 'Держатели',
	Hours: 'Hours',
	'How decentralized is Juicebox?': 'Насколько децентрализован Juicebox?',
	"How did we do? We'd love to get your feedback so we can make creating Juicebox projects as juicy as possible!":
		'Как мы справились? Мы будем рады получить ваши отзывы, чтобы сделать создание проектов Juicebox как можно более эффективным!',
	'How do I archive a project?': 'Как я могу заархивировать проект?',
	'How do I create a project?': 'Как я могу создать проект?',
	'How have the contracts been tested?': 'Как проверялись контракты?',
	'How long one funding cycle will last. Funding cycle <0>reconfigurations</0> will only take effect for <1>upcoming</1> funding cycles, i.e. once a current funding cycle has ended.':
		'Как долго продлится один цикл финансирования. Цикл финансирования <0> перенастройки <0> вступят в силу только для <1> предстоящих <1> циклов финансирования, т. е. после завершения текущего цикла финансирования.',
	'How your project will distribute funds.':
		'Как ваш проект будет зарабатывать деньги и управлять ими.',
	'However, Juicebox is still experimental software. Although the Juicebox contract team have done their part to shape the smart contracts for public use and have tested the code thoroughly, the risk of exploits is never 0%.':
		'Однако Juicebox все еще является экспериментальным программным обеспечением. Хотя команда разработчиков контрактов Juicebox внесла свой вклад в формирование смарт-контрактов для публичного использования и тщательно протестировала код, риск эксплойтов никогда не равен 0%.',
	'I understand': 'Я понимаю',
	ID: 'ID',
	'ID: {0}': ['ID: ', ['0']],
	"If locked, this can't be edited or removed until the lock expires or the funding cycle is reconfigured.":
		'Если блокировка заблокирована, ее нельзя изменить или удалить, пока не истечет срок блокировки или не будет изменена конфигурация цикла финансирования.',
	"If locked, this split can't be edited or removed until the lock expires or the funding cycle is reconfigured.":
		"If locked, this split can't be edited or removed until the lock expires or the funding cycle is reconfigured.",
	"If you know how much your project needs to earn over some period of time to be sustainable, you can set a funding target with that amount. If your project earns more than that, the surplus funds are locked in an overflow pool. Anyone holding your project's tokens can claim a portion of the overflow pool in exchange for redeeming their tokens.":
		'Если вы знаете, сколько ваш проект должен заработать за определенный период времени, чтобы быть устойчивым, вы можете установить целевой уровень финансирования с учетом этой суммы. Если ваш проект заработает больше этой суммы, излишки средств будут заблокированы в пуле перелива. Любой владелец токенов вашего проекта может претендовать на часть пула перелива в обмен на погашение своих токенов.',
	"If you're interested in creating a project but still confused on how to get started, consider watching this <0>instructional video</0>. Also feel free to reach out in the <1>Juicebox Discord</1> where our team will be happy to help bring your project idea to life!":
		'Если вы заинтересованы в создании проекта, но не знаете, как начать, посмотрите это <0>инструктивное видео</0>. Также не стесняйтесь обращаться в <1>Juicebox Discord</1>, где наша команда будет рада помочь воплотить вашу идею проекта в жизнь!',
	"If you're unsure if you need to claim, you probably don't.":
		'Если вы не уверены, нужно ли вам предъявлять претензии, вы, вероятно, этого не делаете.',
	'In Juicebox': 'В Juicebox',
	'In wallet': 'В кошельке',
	Incentives: 'Поощрения',
	'Indie artists, devs, creators': 'Инди артистов, музыкантов, разработчиков, и создателей.',
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
	'Issue ERC-20 token': 'Выпуск токенов ERC-20',
	"Issue an ERC-20 to be used as this project's token. Once issued, anyone can claim their existing token balance in the new token.":
		'Выпустите токен ERC-20, который будет использоваться в качестве токена этого проекта. После выпуска любой желающий может заявить о своем существующем балансе токенов в новом токене.',
	'Issue token': 'Выдача токенов',
	"It isn't possible to remove a project's data from the blockchain, but we can hide it in the app if you'd like to prevent people from seeing or interacting with it — just let us know in <0>Discord</0>. Keep in mind people will still be able to use your project by interacting directly with the contract.":
		'Удалить данные проекта из блокчейна невозможно, но мы можем скрыть их в приложении, если вы хотите, чтобы люди не могли видеть их или взаимодействовать с ними - просто сообщите нам об этом в <0>Discord</0>. Помните, что люди по-прежнему смогут использовать ваш проект, взаимодействуя непосредственно с контрактом.',
	"It'd be a lot cooler if you did": 'Было бы намного круче, если бы вы это сделали',
	'JBX Fee ({0}%):': ['Комиссия JBX (', ['0'], '%):'],
	'JBX Fee ({feePercentage}%):': ['JBX Fee (', ['feePercentage'], '%):'],
	'Juicebox Project ID': 'Juicebox Project ID',
	"Juicebox V2 on {0} isn't enabled.": ['Juicebox V2 on ', ['0'], " isn't enabled."],
	'Juicebox has handled tens of thousands of ETH through its protocol, and has so far had 0 security mishaps.':
		'Juicebox обработал десятки тысяч ETH через свой протокол, и до сих пор у него было 0 проблем с безопасностью.',
	'Juicebox is a governance-minimal protocol. There are only a few levers that can be tuned, none of which impose changes for users without their consent. The Juicebox governance smart contract can adjust these levers.':
		'Juicebox - это протокол с минимальным управлением, что означает, что есть только несколько рычагов, которые можно настроить, ни один из которых не налагает изменений для пользователей без их согласия. Смарт-контракт управления Juicebox может регулировать эти рычаги.',
	'Juicebox is an open protocol on Ethereum that is funded using Juicebox itself. You can check out the contractualized budget specs <0>here</0>.':
		'Juicebox - это открытый протокол на Ethereum, который финансируется с помощью самого Juicebox. Вы можете ознакомиться со спецификацией бюджета на основе контрактов <0>здесь</0>.',
	'Juicebox loading animation': 'Juicebox loading animation',
	'Juicebox project': 'Juicebox project',
	'Juicebox was built to allow people and projects to get paid for creating public art and infrastructure, as much as or more than they would working towards corporate ends. No more shady business.':
		'Juicebox был построен, чтобы позволить людям и проектам получать оплату за создание публичного искусства и инфраструктуры столько же или больше, чем они будут работать для достижения корпоративных целей. Больше никаких теневых дел.',
	'Last paid': 'Последний платеж',
	'Last paid timestamp': 'Последняя оплаченная временная метка',
	Later: 'Later',
	Latest: 'Последние',
	'Latest Payments': 'Последние платежи',
	'Light theme': 'Светлая тема',
	'Load more': 'Загрузить ещё',
	'Lock until': 'Заблокировать до',
	'Locked:': 'Locked:',
	Logo: 'Логотип',
	MAX: 'Максимум',
	Manage: 'Управление',
	'Manage {0}': ['Управлять ', ['0']],
	'Manage {tokenText}': ['Manage ', ['tokenText']],
	Memo: 'Мемо',
	'Migrate to Juicebox V1.1': 'Перейти на Juicebox V1.1',
	'Mint as ERC-20': 'Mint as ERC-20',
	"Mint new {tokensLabel} into an account. Only a project's owner, a designated operator, or one of its terminal's delegates can mint its tokens.":
		[
			'Чеканить новые ',
			['tokensLabel'],
			' на счет. Чеканить токены может только владелец проекта, назначенный оператор или один из делегатов его терминала.'
		],
	'Mint project tokens on demand': 'Создание токенов проекта по требованию',
	'Mint tokens to a custom address.': 'Чеканка жетонов на пользовательский адрес.',
	'Mint {tokensLabel}': ['Чеканить ', ['tokensLabel']],
	'Mint {tokensTokenLower}': ['Mint ', ['tokensTokenLower']],
	Minutes: 'Minutes',
	'More trending projects': 'Другие актуальные проекты',
	'Move your {tokensLabel} from the Juicebox contract to your wallet.': [
		'Move your ',
		['tokensLabel'],
		' from the Juicebox contract to your wallet.'
	],
	'NO LIMIT': 'NO LIMIT',
	Name: 'Название',
	New: 'Новый',
	'Next: Funding cycle': 'Next: Funding cycle',
	'Next: Review and deploy': 'Next: Review and deploy',
	No: 'Нет',
	'No activity yet': 'Нет активности',
	'No funding target: The project will control how all funds are distributed, and none can be redeemed by token holders.':
		'Нет цели финансирования: проект будет контролировать, как распределяются все средства, и ничего не может быть обменяно владельцами токенов.',
	'No limit': 'No limit',
	'No limit (infinite)': 'No limit (infinite)',
	'No more than the funding cycle target can be distributed by the project in a single funding cycle.':
		'Не более одного целевого показателя цикла финансирования можно распределить по проекту в рамках одного цикла финансирования.',
	'No past funding cycles': 'Нет прошлых циклов финансирования',
	'No strategy': 'Нет стратегии/или плана',
	'No target': 'Нет цели',
	'No target set.': 'Цель не установлена.',
	'Not set': 'Не установлено',
	Note: 'Примечание',
	'Note:': 'Примечание:',
	'Note: Juicebox is new, unaudited, and not guaranteed to work perfectly. Before spending money, do your own research: <0>ask questions</0>, <1>check out the code</1>, and understand the risks!':
		'Примечание: Juicebox является новым проектом, не прошедшим финансовую проверку, и его работа не гарантируется. Прежде чем тратить деньги, проведите собственное исследование: задайте вопросы, проверьте код и осознайте риски!',
	'Note: Tokens can be minted manually when allowed in the current funding cycle. This can be changed by the project owner for upcoming cycles.':
		'Note: Tokens can be minted manually when allowed in the current funding cycle. This can be changed by the project owner for upcoming cycles.',
	'Notice from {0}:': ['Уведомление от ', ['0'], ':'],
	'Open source businesses': 'Бизнес с открытым исходным кодом',
	"Other assets in this project's owner's wallet.":
		'Другие активы в кошельке владельца этого проекта.',
	"Overflow is created if your project's balance exceeds your funding cycle target. Overflow can be redeemed by your project's token holders.":
		'Переполнение создается, если остаток вашего проекта превышает цель цикла финансирования. Переполнение может быть использовано владельцами токенов вашего проекта.',
	'Paid as <0/>': 'Оплачено как <0/>',
	'Pause payments': 'Приостановить платежи',
	'Pause received payments': 'Приостановить полученные платежи',
	Paused: 'Приостановлено',
	Pay: 'Оплатить',
	'Pay amount': 'Сумма платежа',
	'Pay button': 'Кнопка "Оплатить"',
	'Pay button text': 'Кнопка оплаты',
	'Pay disclosure': 'Раскрытие информации о платеже',
	'Pay {0}': ['Заплатить ', ['0']],
	Payer: 'Payer',
	"Paying <0>{0}</0> is not an investment — it's a way to support the project. Any value or utility of the tokens you receive is determined by {1}.":
		[
			'Paying <0>',
			['0'],
			"</0> is not an investment — it's a way to support the project. Any value or utility of the tokens you receive is determined by ",
			['1'],
			'.'
		],
	'Paying this project is currently disabled, because the token reserved rate is 100% and no tokens will be earned by making a payment.':
		'Платеж этого проекта в настоящее время отключен, потому что ставка зарезервированного токена 100% и токены не будут заработаны путем совершения этого платежа.',
	'Paying this project is currently disabled.': 'Оплата этого проекта в настоящее время отключена.',
	Payments: 'Платежи',
	'Payments are paused for the current funding cycle.':
		'Платежи приостановлены для текущего цикла финансирования.',
	'Payments paused': 'Платежи приостановлены',
	'Payout amount': 'Payout amount',
	'Payout recipients': 'Payout recipients',
	'Payout splits': 'Payout splits',
	"Payout splits can't be scheduled when the distribution limit is Zero.":
		"Payout splits can't be scheduled when the distribution limit is Zero.",
	'Payouts (optional)': 'Выплаты (необязательно)',
	'Payouts to Ethereum addresses incur a {feePercentage}% fee. Your project will receive JBX in return at the current issuance rate.':
		[
			'Payouts to Ethereum addresses incur a ',
			['feePercentage'],
			'% fee. Your project will receive JBX in return at the current issuance rate.'
		],
	"Peach's Juicebox Stand": 'Рандомное имя',
	Peel: 'Peel',
	'People using Juicebox are interacting with each other through public infrastructure—not a private, profit-seeking corporate service that brokers the exchange.':
		'Люди, использующие Juicebox, взаимодействуют друг с другом через общедоступную инфраструктуру, а не через частную, ориентированную на прибыль корпоративную службу, которая является брокером обмена.',
	Percent: 'Percent',
	'Percent allocation': 'Процентное распределение',
	'Percent of distribution limit': 'Percent of distribution limit',
	'Percentage of the distribution limit this payee will receive.':
		'Percentage of the distribution limit this payee will receive.',
	'Percentage this payee will receive of all funds raised.':
		'Percentage this payee will receive of all funds raised.',
	'Percentages must add up to 100% or less': 'Сумма процентов должна составлять 100 % или меньше',
	'Please contact the Juicebox dev team through our <0>Discord</0> to have your project archived.':
		'Please contact the Juicebox dev team through our <0>Discord</0> to have your project archived.',
	Podcast: 'Подкаст',
	'Potential risks': 'Potential risks',
	'Powered by public smart contracts on':
		'Управляется и работает на общественных смарт-контрактах на',
	'Preview:': 'Preview:',
	'Programmable spending': 'Планируемые расходы',
	Project: 'Проект',
	'Project ID is a number.': 'Project ID is a number.',
	'Project ID:': 'Project ID:',
	'Project Token': 'Токен проекта',
	'Project configuration': 'Project configuration',
	'Project description': 'Описание Проекта',
	'Project details': 'Детали проекта',
	'Project details reconfigurations will create a separate transaction.':
		'Для изменения конфигурации деталей проекта будет создана отдельная транзакция.',
	'Project for {ensName} not found': ['Project for ', ['ensName'], ' not found'],
	'Project handle': 'Никнейм проекта',
	'Project handle must be unique.': 'Никнейм проекта должен быть уникальным.',
	'Project name': 'Название проекта',
	'Project name, handle, links, and other details.':
		'Название проекта, описание, ссылки и другие детали.',
	'Project owner': 'Владелец проекта',
	'Project owner (you)': 'Project owner (you)',
	'Project owners can configure a delay period, meaning reconfigurations to an upcoming funding cycle must be submitted a certain number of days before it starts. For example, a 3-day delay period means reconfigurations must be submitted at least 3 days before the next funding cycle starts. This gives token holders time to react to the decision and reduces the chance of rug-pulls.':
		'Владельцы проектов могут настроить период задержки, что означает, что изменения в конфигурации предстоящего цикла финансирования должны быть представлены за определенное определенное количество дней до его начала. Например, период задержки в 3 дня означает, что изменения конфигурации должны быть представлены не позднее чем за 3 дня до начала следующего цикла финансирования. Это дает держателям токенов время отреагировать на принятое решение и снижает вероятность rug-pulls.',
	'Project token': 'Project token',
	'Project {projectId} not found': ['Проект ', ['projectId'], ' не найден'],
	Projects: 'Проекты',
	'Projects building on Juicebox pay a {JB_FEE}% JBX membership fee from withdrawn funds into the JuiceboxDAO treasury. Projects can then use their JBX to participate in the governance of JuiceboxDAO and its collective treasury, as well as redeem from its growing <0>overflow</0>. The fee is also subject to change via JBX member votes.':
		[
			'Проекты, построенные на Juicebox, платят ',
			['JB_FEE'],
			'% членского взноса JBX от выведенных средств в казну JuiceboxDAO. Затем проекты могут использовать свои JBX для участия в управлении JuiceboxDAO и его коллективной казной, а также получать средства из растущего <0>переполнения</0>. Плата также может быть изменена путем голосования членов JBX.'
		],
	'Projects can be created with an optional discount rate designed to incentivize supporters to contribute earlier rather than later. The amount of tokens rewarded per amount paid to your project will decrease by the discount rate with each new funding cycle. A higher discount rate will incentivize supporters to pay your project earlier rather than later.':
		'Проекты могут быть созданы с дополнительной ставкой скидки, призванной стимулировать сторонников делать взносы раньше, а не позже. Количество токенов, начисляемых на сумму, внесенную в ваш проект, будет уменьшаться на величину дисконтной ставки с каждым новым циклом финансирования. Более высокая ставка скидки будет стимулировать сторонников вносить деньги в ваш проект раньше, чем позже.',
	'Projects on Juicebox': 'Проекты в Juicebox',
	'Projects using Juicebox': 'Проекты с использованием Juicebox',
	'Projects using a reserved rate of {reservedRateRiskyMin}% or more will appear risky to contributors, as a relatively small number of tokens will be received in exchange for paying your project.':
		[
			'Проекты, использующие зарезервированную ставку в размере ',
			['reservedRateRiskyMin'],
			'% или выше, будут казаться вкладчикам рискованными, поскольку в обмен на оплату вашего проекта будет получено относительно небольшое количество токенов.'
		],
	'Public goods and services': 'Общественные товары услуги',
	'Rankings based on number of contributions and volume gained in the last {trendingWindow} days. <0>See code</0>':
		[
			'Рейтинг, основанный на количестве вкладов и объеме, полученном за последние ',
			['trendingWindow'],
			' дней. <0>Увидеть код</0>'
		],
	'Receive ERC-20': 'Receive ERC-20',
	'Receive {receiveText}': ['Получить', ['receiveText']],
	'Recipients will receive payouts in ETH.': 'Recipients will receive payouts in ETH.',
	Reconfiguration: 'Реконфигурация',
	'Reconfiguration rules': 'Reconfiguration rules',
	'Reconfiguration strategy': 'Стратегия изменения конфигурации',
	Reconfigure: 'Перенастройте',
	'Reconfigure funding': 'Перенастроить финансирование',
	'Reconfigure project details': 'Перенастроить детали проекта',
	'Reconfigure rules': 'Reconfigure rules',
	'Reconfigure token': 'Перенастроить токен',
	'Reconfigure upcoming': 'Перенастроить предстоящие ',
	'Reconfigure upcoming funding': 'Перенастроить предстоящие финансирование',
	'Reconfigure upcoming funding cycles': 'Reconfigure upcoming funding cycles',
	Redeem: 'Обменять',
	"Redeem your {tokensLabel} for a portion of the project's overflow. Any {tokensLabel} you redeem will be burned.":
		[
			'Redeem your ',
			['tokensLabel'],
			" for a portion of the project's overflow. Any ",
			['tokensLabel'],
			' you redeem will be burned.'
		],
	'Redeem {0} {tokensTextShort} for ETH': ['Обменять ', ['0'], ' ', ['tokensTextShort'], ' за ETH'],
	'Redeem {tokensLabel} for ETH': ['Обменять ', ['tokensLabel'], ' за ETH'],
	'Redeem {tokensTextLong} for ETH': ['Обменять ', ['tokensTextLong'], ' за ETH'],
	'Redemption rate': 'Коэффициент выкупа',
	'Redemption rate: <0>{0}%</0>': ['Redemption rate: <0>', ['0'], '%</0>'],
	'Redistributable surplus': 'Перераспределяемый излишек',
	Refresh: 'Обновить',
	Required: 'Требуется',
	'Reserved rate': 'Резервная ставка',
	'Reserved token allocation (optional)': 'Зарезервированные распределения токенов (необязательно)',
	'Reserved token allocations': 'Зарезервированные распределения токенов',
	'Reserved tokens': 'Зарезервированные токены',
	'Reserved {0}': ['Зарезервировано ', ['0']],
	'Reserved {tokenSymbolPlural}': ['Зарезервировано ', ['tokenSymbolPlural']],
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
	Reserves: 'Резервирование',
	Resources: 'Pесурсы',
	'Restrict how the owner can reconfigure upcoming funding cycles to mitigate abuse of power. <0>Learn more.</0>':
		'Restrict how the owner can reconfigure upcoming funding cycles to mitigate abuse of power. <0>Learn more.</0>',
	'Restrict payments and printing tokens.': 'Ограничить платежи и печать токенов.',
	'Restricted actions': 'Ограниченные действия',
	'Review & Deploy': 'Обзор & Развертывание',
	'Review project': 'Просмотр проекта',
	'Review project configuration': 'Review project configuration',
	'Reward specific community members with tokens.':
		'Награждайте определенных членов сообщества токенами.',
	Rules: 'Правила',
	'Rules for determining how funding cycles can be reconfigured':
		'Правила определения того, как можно изменить конфигурацию циклов финансирования',
	'Rules for how changes can be made to your project.': 'Правила внесения изменений в ваш проект.',
	"Rules for how this project's funding cycles can be reconfigured.":
		'Правила изменения конфигурации циклов финансирования этого проекта.',
	Save: 'Сохранить',
	'Save changes': 'Сохранить изменения',
	'Save funding configuration': 'Сохранить конфигурацию финансирования',
	'Save handle': 'Save handle',
	'Save payouts': 'Сохранить платежи',
	'Save project details': 'Сохранить детали проекта',
	'Save reconfiguration': 'Сохранить перенастройки',
	'Save rules': 'Save rules',
	'Save split': 'Save split',
	'Save token allocation': 'Сохранить распределение токена',
	'Save token configuration': 'Save token configuration',
	'Save token receiver': 'Сохранить получается токена',
	'Save tracked assets': 'Сохранить отслеживаемые активы',
	'Search projects by handle': 'Поиск проектов по имени',
	Seconds: 'Seconds',
	'See transaction': 'Увидить трансакцию',
	'Set a funding cycle duration': 'Установите продолжительность цикла финансирования',
	'Set a funding cycle target': 'Установите продолжительность цикла финансирования',
	"Set a funding target to cover predictable expenses. Any extra funds (<0>overflow</0>) can be claimed by anyone holding your project's tokens alongside you.":
		'Установите цель финансирования для покрытия предсказуемых расходов. Любые дополнительные средства (<0>overflow</0>) могут быть затребованы любым, кто держит токены вашего проекта вместе с вами.',
	"Set the amount of funds you'd like to distribute from your treasury each funding cycle.":
		"Set the amount of funds you'd like to distribute from your treasury each funding cycle.",
	"Set the amount of funds you'd like to raise each funding cycle. Any funds raised within the funding cycle target can be distributed by the project, and can't be redeemed by your project's token holders.":
		'Установите количество средств для каждого цикла финансирования. Любые средства, собранные в рамках цикла финансирования, могут быть распределены по проекту и не могут быть использованы владельцами токенов вашего проекта.',
	'Set the length of your funding cycles, which can enable:':
		'Set the length of your funding cycles, which can enable:',
	'Set the length of your funding cycles.': 'Установите длину циклов финансирования.',
	'Should you Juicebox?': 'Следует ли вам заниматься Juicebox?',
	'Since you have not set a funding duration, changes to these settings will be applied immediately.':
		'Поскольку вы не установили срок финансирования, изменения в этих настройках будут применены немедленно.',
	'Some funding cycle properties may indicate risk for project contributors.':
		'Некоторые свойства цикла финансирования могут указывать на риск для участников проекта.',
	"Some properties of the project's current funding cycle may indicate risk for contributors.":
		"Some properties of the project's current funding cycle may indicate risk for contributors.",
	'Specific limit': 'Specific limit',
	Spending: 'Расходы',
	'Staked balance': 'Учтенный баланс',
	Start: 'Начать',
	'Start Over': 'Начать заново',
	'Sum of percentages cannot exceed 100%': 'Сумма процентов не может превышать 100%',
	'Sum of percentages cannot exceed 100%.': 'Сумма процентов не может превышать 100%.',
	Target: 'Цель',
	'Target is 0: All funds will be considered overflow and can be redeemed by burning project tokens.':
		'Цель - 0: Все средства будут считаться переполненными и могут быть использованы при сжигании токенов.',
	'Text displayed on your project\'s "pay" button. Leave this blank to use the default.':
		'Текст, отображаемый на кнопке "Оплатить". Оставьте это поле пустым, чтобы использовать значение по умолчанию.',
	"That's the plan, but the core Juicebox contracts will first be deployed to Ethereum Mainnet.":
		'Это план, но основные контракты Juicebox сначала будут развернуты в основной сети Ethereum.',
	'The JBX protocol is unaudited, and projects built on it may be vulnerable to bugs or exploits. Be smart!':
		'Протокол JBX не прошел аудит, и проекты, построенные на нем, могут быть уязвимы для ошибок или эксплойтов. ',
	'The Juicebox V2 frontend is still in development. It is <0>not recommended</0> for use on mainnet. Some features are missing and there are known bugs. <1>Use with caution.</1>':
		'The Juicebox V2 frontend is still in development. It is <0>not recommended</0> for use on mainnet. Some features are missing and there are known bugs. <1>Use with caution.</1>',
	'The Juicebox V2 frontend is still in development. Some features are missing and there are known bugs.':
		'The Juicebox V2 frontend is still in development. Some features are missing and there are known bugs.',
	'The Juicebox protocol is governed by a community of JBX token holders who vote on proposals fortnightly.':
		'Протокол Juicebox управляется сообществом держателей токенов JBX, которые голосуют по предложениям раз в две недели.',
	'The address of any smart contract deployed on {signerNetwork} that implements': [
		'Адрес любого смарт-контракта, реализуемого на ',
		['signerNetwork'],
		','
	],
	'The address that should receive the tokens minted from paying this project.':
		'Адрес, который должен получить токены, которые не были обменены для оплаты этого проекта.',
	'The amount of tokens this project has reserved. These tokens can be distributed to reserved token beneficiaries.':
		'The amount of tokens this project has reserved. These tokens can be distributed to reserved token beneficiaries.',
	'The amount of tokens to mint to the receiver.': 'The amount of tokens to mint to the receiver.',
	'The amount that has been distributed from the Juicebox balance in this funding cycle, out of the current distribution limit. No more than the distribution limit can be distributed in a single funding cycle—any remaining ETH in Juicebox is overflow, until the next cycle begins.':
		'The amount that has been distributed from the Juicebox balance in this funding cycle, out of the current distribution limit. No more than the distribution limit can be distributed in a single funding cycle—any remaining ETH in Juicebox is overflow, until the next cycle begins.',
	'The amount that has been distributed from the Juicebox balance in this funding cycle, out of the current funding target. No more than the funding target can be distributed in a single funding cycle—any remaining ETH in Juicebox is overflow, until the next cycle begins.':
		'Сумма, которая была распределена из баланса Juicebox в этом цикле финансирования, из текущего целевого показателя финансирования. Объем средств не превышает целевого показателя финансирования в рамках одного цикла финансирования: любой оставшийся ETH в Juicebox переполнен, до начала следующего цикла.',
	"The balance of the project owner's wallet.": "The balance of the project owner's wallet.",
	'The balance of this project in the Juicebox contract.':
		'Баланс этого проекта в контракте Juicebox.',
	"The code could always use more eyes and more critique to further the community's confidence. Join our <0>Discord</0> and check out the code on <1>GitHub</1> to work with us.":
		'Коду всегда не помешает больше глаз и больше критики, чтобы укрепить доверие сообщества. Присоединяйтесь к нашему <0>Discord</0> и проверьте код на <1>GitHub</1>, чтобы работать с нами.',
	'The contract team will soon start working on L2 payment terminals for Juicebox projects.':
		'В ближайшее время контрактная команда начнет работу над платежными терминалами L2 для проектов Juicebox.',
	'The distribution limit for this funding cycle is 0, meaning all funds in Juicebox are currently considered overflow. Overflow can be redeemed by token holders, but not distributed.':
		'The distribution limit for this funding cycle is 0, meaning all funds in Juicebox are currently considered overflow. Overflow can be redeemed by token holders, but not distributed.',
	"The funds available to distribution for this funding cycle (before the {feePercentage}% JBX fee is subtracted). This number won't roll over to the next funding cycle, so funds should be distributed before this funding cycle ends.":
		[
			'The funds available to distribution for this funding cycle (before the ',
			['feePercentage'],
			"% JBX fee is subtracted). This number won't roll over to the next funding cycle, so funds should be distributed before this funding cycle ends."
		],
	'The future will be led by creators, and owned by communities.':
		'Будущее будет возглавляться создателями и принадлежать сообществам.',
	'The issuance rate will decrease by this percentage with each new funding cycle. A higher discount rate will incentivize supporters to pay your project earlier than later.':
		'The issuance rate will decrease by this percentage with each new funding cycle. A higher discount rate will incentivize supporters to pay your project earlier than later.',
	'The maximum amount of funds that can be distributed from this project in one funding cycle. Funds will be withdrawn in ETH no matter the currency you choose.':
		'Максимальная сумма средств, которая может быть распределена из этого проекта за один цикл финансирования. Средства будут выводиться в ETH независимо от выбранной вами валюты.',
	'The percent this individual receives of the overall {reservedRate}% reserved token allocation': [
		'Процент, который получает это лицо от общего количества ',
		['reservedRate'],
		'%зарезервированное распределение токенов'
	],
	'The project owner may mint any supply of tokens at any time, diluting the token share of all existing contributors.':
		'Владелец проекта может чеканить любое количество токенов в любое время, уменьшая долю токенов всех существующих участников.',
	'The project owner may reconfigure this funding cycle at any time, without notice.':
		'Владелец проекта может изменить конфигурацию этого цикла финансирования в любое время без предварительного уведомления.',
	"The project's tokens that are minted and distributed as a result of a received payment are ERC-20's. The amount of tokens minted and distributed are proportional to the volume of payments received, weighted by the project's discount rate over time.":
		'Токены проекта, которые чеканятся и распространяются в результате полученного платежа, являются токенами ERC-20. Количество майнинга и распределения токенов пропорционально объему полученных платежей, взвешенных по ставке дисконтирования проекта во времени.',
	'The ratio of tokens rewarded per payment amount will decrease by this percentage with each new funding cycle. A higher discount rate will incentivize supporters to pay your project earlier than later.':
		'Соотношение вознаграждения токенов на сумму платежа будет уменьшаться на этот процент с каждым новым циклом финансирования. Более высокая учетная ставка будет стимулировать сторонников платить за ваш проект раньше, чем позже.',
	'The rest is left to share between token holders.':
		'The rest is left to share between token holders.',
	'The target for this funding cycle is 0, meaning all funds in Juicebox are currently considered overflow. Overflow can be redeemed by token holders, but not distributed.':
		'Целью данного цикла финансирования является 0, то есть все средства в Juicebox в настоящее время считаются переполнением. Переполнение может быть использовано держателями токенов, но не распределено.',
	'The total amount received by this project through Juicebox since it was created.':
		'Общая сумма, полученная этим проектом через Juicebox с момента его создания.',
	'There are no payouts defined for this funding cycle. The project owner will recieve all available funds.':
		'There are no payouts defined for this funding cycle. The project owner will recieve all available funds.',
	'There are no reserved token recipients defined for this funding cycle. The project owner will receive all available tokens.':
		'There are no reserved token recipients defined for this funding cycle. The project owner will receive all available tokens.',
	'There are unit tests written for every condition of every function in the contracts, and integration tests for every workflow that the protocol supports.':
		'Существуют модульные тесты, написанные для каждого условия каждой функции в контрактах, и интеграционные тесты для каждого рабочего процесса, поддерживаемого протоколом.',
	'There was also a script written to iteratively run the integration tests using a random input generator, prioritizing edge cases. The code has successfully passed over 1 million test cases through this stress-testing script.':
		'Также был написан сценарий для итеративного запуска интеграционных тестов с использованием генератора случайных входных данных с приоритетом крайних случаев. Код успешно прошел более 1 миллиона тестовых случаев с помощью этого сценария стресс-тестирования.',
	'These attributes can be changed at any time.':
		'Эти параметры могут быть изменены в любое время.',
	'These settings will <0>not</0> be editable immediately within a funding cycle. They can only be changed for <1>upcoming</1> funding cycles.':
		'Эти настройки <0> не <0> будут доступны для редактирования немедленно в течение цикла финансирования. Они могут быть изменены только для <1> предстоящих <1> циклов финансирования.',
	'This address is an unrecognized strategy contract. Make sure it is correct!':
		'Этот адрес является непризнанным стратегическим контрактом. Убедитесь, что он правильный!',
	'This address will receive any tokens minted when the recipient project gets paid.':
		'Этот адрес будет получать все токены, сделанные при оплате проекта получателя.',
	'This address will receive the tokens minted from paying this project.':
		'This address will receive the tokens minted from paying this project.',
	'This funding cycle may pose risks to contributors. Check the funding cycle details before paying this project.':
		'Этот цикл финансирования может представлять риски для вкладчиков. Перед оплатой этого проекта проверьте детали цикла финансирования.',
	'This list is using an experimental data index and may be inaccurate for some projects.':
		'Этот список использует экспериментальный индекс данных и может быть неточным для некоторых проектов.',
	"This means that anyone can see the code that they're using, anyone can use the code without asking for permission, and no one can mess with the code or take it down.":
		'Это означает, что любой может видеть код, который они используют, любой может использовать код, не спрашивая разрешения, и никто не может вмешиваться в код или удалять его.',
	'This project has been archived and cannot be paid.':
		'Этот проект был заархивирован и не может быть оплачен.',
	'This project is currently using the Juicebox V1 terminal contract. New features introduced in V1.1 allow the project owner to:':
		'Этот проект в настоящее время использует терминальный контракт Juicebox V1. Новые функции, представленные в версии 1.1, позволяют владельцу проекта:',
	'This project uses the V2 version of the Juicebox contracts.':
		'В этом проекте используется версия V2 контрактов Juicebox.',
	'This rate determines the amount of overflow that each token can be redeemed for at any given time. On a lower bonding curve, redeeming a token increases the value of each remaining token, creating an incentive to hold tokens longer than others. A bonding curve of 100% means all tokens will have equal value regardless of when they are redeemed.':
		'This rate determines the amount of overflow that each token can be redeemed for at any given time. On a lower bonding curve, redeeming a token increases the value of each remaining token, creating an incentive to hold tokens longer than others. A bonding curve of 100% means all tokens will have equal value regardless of when they are redeemed.',
	'This rate determines the amount of overflow that each token can be redeemed for at any given time. On a lower bonding curve, redeeming a token increases the value of each remaining token, creating an incentive to hold tokens longer than others. A redemption rate of 100% means all tokens will have equal value regardless of when they are redeemed.':
		'This rate determines the amount of overflow that each token can be redeemed for at any given time. On a lower bonding curve, redeeming a token increases the value of each remaining token, creating an incentive to hold tokens longer than others. A redemption rate of 100% means all tokens will have equal value regardless of when they are redeemed.',
	'This rate determines the amount of overflow that each token can be redeemed for at any given time. On a lower redemption rate, redeeming a token increases the value of each remaining token, creating an incentive to hold tokens longer than others. The default redemption rate of 100% means all tokens will have equal value regardless of when they are redeemed. Learn more in this <0>short video</0>.':
		'This rate determines the amount of overflow that each token can be redeemed for at any given time. On a lower redemption rate, redeeming a token increases the value of each remaining token, creating an incentive to hold tokens longer than others. The default redemption rate of 100% means all tokens will have equal value regardless of when they are redeemed. Learn more in this <0>short video</0>.',
	'This text will be displayed to your supporters before they complete their payment.':
		'Этот текст будет показан всем, кто оплачивает ваш проект, до того, как они завершат свою оплату.',
	"This website (juicebox.money) connects to the Juicebox protocol's smart contracts, deployed on the Ethereum network. (note: anyone else can make a website that also connects to these same smart contracts. For now, don't trust any site other than this one to access the Juicebox protocol).":
		'Этот веб-сайт (juicebox.money) подключается к смарт-контрактам протокола Juicebox, развернутым в сети Ethereum. (примечание: любой другой может создать веб-сайт, который также подключается к тем же смарт-контрактам. На данный момент не доверяйте никакому другому сайту, кроме этого, для доступа к протоколу Juicebox).',
	'This will erase all of your changes.': 'Это удалит все ваши изменения.',
	'To: <0/>': 'Кому: <0/>',
	Token: 'Токен',
	'Token address: <0/>': 'Адрес токена: <0/>',
	'Token beneficiary address': 'Token beneficiary address',
	'Token beneficiary:': 'Token beneficiary:',
	'Token minting': 'Производство токенов',
	'Token minting allows the project owner to mint project tokens at any time.':
		'Token minting allows the project owner to mint project tokens at any time.',
	"Token minting is only available for V1.1 projects. Token minting can be enabled or disabled by reconfiguring the project's funding cycle.":
		'Создание токенов доступно только для проектов версии 1.1. Возможность создания токенов может быть включена или отключена путем изменения конфигурации цикла финансирования проекта.',
	'Token name': 'Название токена',
	'Token redeem value': 'Стоимость погашения токенов',
	'Token symbol': 'Символ токена',
	Tokens: 'Жетоны',
	'Tokens are earned by anyone who pays your project, and can be redeemed for overflow if your project has set a funding target.':
		'Токены зарабатываются любым, кто оплачивает ваш проект, и могут быть обменены на реальные деньги которые находятся в излишке, если ваш проект установил цель финансирования.',
	"Tokens can be redeemed for a portion of a project's <0>overflow</0>, letting you benefit from its success. After all, you helped it get there. The token may also give you exclusive member-only privledges, and allow you to contribute to the governance of the community.":
		'Жетоны можно обменять на часть <0>переполнения</0> проекта, что позволит вам воспользоваться его успехом. В конце концов, вы помогли ему достичь успеха. Токен также может дать вам эксклюзивные привилегии только-для-членов сообщества и позволить вам внести свой вклад в управление сообществом.',
	"Tokens can be redeemed for a portion of this project's ETH overflow, according to the bonding curve rate of the current funding cycle. <0>Tokens are burned when they are redeemed.</0>":
		'Токены могут быть выкуплены за часть переполнения ETH данного проекта в соответствии со скоростью ставки кривой связывания текущего цикла финансирования. <0> Токены сгорают, когда их выкупают.</0>',
	"Tokens can be redeemed for a portion of this project's ETH overflow, according to the redemption rate of the current funding cycle. <0>Tokens are burned when they are redeemed.</0>":
		"Tokens can be redeemed for a portion of this project's ETH overflow, according to the redemption rate of the current funding cycle. <0>Tokens are burned when they are redeemed.</0>",
	'Tokens cannot be claimed because no ERC-20 token has been issued for this project. ERC-20 tokens must be issued by the project owner.':
		'Tokens cannot be claimed because no ERC-20 token has been issued for this project. ERC-20 tokens must be issued by the project owner.',
	'Tokens receiver': 'Tokens receiver',
	'Tokens:': 'Токены:',
	Tools: 'Инструменты',
	'Total ETH paid': 'Общий платёж ETH',
	'Total funds:': 'Всего средств:',
	'Total raised': 'Итого собрано',
	'Total supply': 'Общее предложение',
	'Total: {0}%': ['Итого: ', ['0'], '%'],
	'Transaction pending...': 'Transaction pending...',
	'Transfer ownership': 'Передача права собственности',
	'Transfer unclaimed {tokenSymbolShort}': ['Передача невостребованного ', ['tokenSymbolShort']],
	'Transfer {tokenSymbolShort}': ['Перевод ', ['tokenSymbolShort']],
	'Transparency & accountability': 'Прозрачность и подотчетность',
	Trending: 'Тенденции',
	Twitter: 'Твиттер',
	'Unarchive project': 'Разархивировать проект',
	Unavailable: 'Недоступно',
	'Unless payments are paused in your funding cycle settings, your project will still be able to receive payments directly through the Juicebox protocol contracts.':
		'Если платежи не приостановлены в настройках вашего цикла финансирования, ваш проект по-прежнему сможет получать платежи напрямую через протокольные контракты Juicebox.',
	'Unstaked balance': 'Неучтенный баланс',
	'Untitled project': 'Безымянный проект',
	Upcoming: 'Предстоящие',
	'Updates you make to this section will only be applied to <0>upcoming</0> funding cycles.':
		'Обновления, внесенные вами в этот раздел, будут применяться только к <0>предстоящим</0> циклам финансирования.',
	Upload: 'загрузить',
	'Uploaded to: <0>{url}</0>': ['Загружено : <0>', ['url'], '</0>'],
	"Users fund your project by paying to use your app or service, or as a patron or investor by making a payment directly to your project's smart contract (like on this app).":
		'Пользователи финансируют ваш проект, платя за использование вашего приложения или сервиса, или в качестве покровителя или инвестора, производя оплату непосредственно на смарт-контракт вашего проекта (как в этом приложении).',
	'Using a duration is recommended. Allowing funding cycles to be reconfigured at any time will appear risky to contributors.':
		'Рекомендуется использовать продолжительность. Предоставление возможности изменения конфигурации циклов финансирования в любое время покажется вкладчикам рискованным.',
	'Using a reconfiguration strategy is recommended. Projects with no strategy will appear risky to contributors.':
		'Рекомендуется использовать стратегию реконфигурации. Проекты без стратегии покажутся участникам рискованными.',
	V1: 'V1',
	'V1.1': 'V1.1',
	'Version of the terminal contract used by this project.':
		'Версия терминального контракта, используемая в этом проекте.',
	Volume: 'Объём',
	'Wallet address': 'Адрес кошелька',
	Website: 'Веб-сайт',
	'What are community tokens?': 'Что такое токены сообщества?',
	'What are the risks?': 'Какие риски?',
	'What does Juicebox cost?': 'Сколько стоит Juicebox?',
	'What is overflow?': 'Что такое переполнение или излишек финансов?',
	"What's a bonding curve?": 'Что такое кривая связи?',
	"What's a discount rate?": 'Что такое дисконтная ставка?',
	"What's going on under the hood?": 'Что творится под капотом?',
	'When enabled, the project owner can manually mint any amount of tokens to any address.':
		'When enabled, the project owner can manually mint any amount of tokens to any address.',
	'When enabled, your project cannot receive direct payments.':
		'When enabled, your project cannot receive direct payments.',
	"When someone pays your project, they'll receive your project's tokens in return. Tokens can be redeemed for a portion of your project's overflow funds; when you win, your community wins with you. Leverage your project's token to grant governance rights, community access, or other membership perks.":
		'Когда кто-то платит вашему проекту, он получает взамен токены вашего проекта. Токены могут быть обменены на часть средств вашего проекта; когда вы выигрываете, ваше сообщество выигрывает вместе с вами. Используйте токены вашего проекта для предоставления прав управления, доступа к сообществу или других привилегий для участников.',
	"When token minting is allowed, the owner of this project has permission to mint any number of tokens to any address at their discretion. This has the effect of diluting all current token holders, without increasing the project's treasury balance. The project owner can reconfigure this along with all other properties of the funding cycle.":
		'Когда допускается обработка токенов, владелец этого проекта имеет разрешение на удаление любого количества токенов на любой адрес по своему усмотрению. Это влечет за собой размытие всех текущих владельцев токенов без увеличения казначейского баланса проекта. Владелец проекта может перенастроить это вместе со всеми остальными свойствами цикла финансирования.',
	'Whenever someone pays your project, this percentage of tokens will be reserved and the rest will go to the payer.':
		'Whenever someone pays your project, this percentage of tokens will be reserved and the rest will go to the payer.',
	'Whenever someone pays your project, this percentage of tokens will be reserved and the rest will go to the payer. Reserve tokens are reserved for the project owner by default, but can also be allocated to other wallet addresses by the owner. Once tokens are reserved, anyone can "mint" them, which distributes them to their intended receivers.':
		'Всякий раз, когда кто-то оплачивает ваш проект, этот процент токенов будет зарезервирован, а остальная часть переходит к плательщику. Резервные токены по умолчанию зарезервированы для владельца проекта, но также могут быть выделены владельцем для других адресов кошелька. После того, как токены зарезервированы, любой желающий может их «чеканить», который также рассылает их предполагаемым получателям.',
	'Who funds Juicebox projects?': 'Кто финансирует проекты Juicebox?',
	'Who is Peel?': 'Кто такой Peel?',
	'Why Ethereum?': 'Почему Эфириум/Ethereum?',
	"Why should I want to own a project's tokens?": 'Почему я должен владеть токенами проекта?',
	'Will be rounded to <0/>{0}': ['Will be rounded to <0/>', ['0']],
	'Will it work on L2s?': 'Будет ли работать на L2?',
	'With Juicebox, projects are built and maintained by motivated punks getting paid transparently, and funded by a community of users and patrons who are rewarded as the projects they support succeed.':
		'С помощью Juicebox проекты создаются и поддерживаются мотивированными панками, получающими оплату и финансируемыми сообществом пользователей и покровителей, которые получают вознаграждение по мере успеха проектов, которые они поддерживают.',
	'With a distribution limit of Zero, no funds can be distributed by the project. All funds belong to token holders as overflow.':
		'With a distribution limit of Zero, no funds can be distributed by the project. All funds belong to token holders as overflow.',
	"With an infinite distribution limit, all funds can be distributed by the project. The project will have no overflow, meaning token holders won't be able to redeem their tokens for treasury funds.":
		"With an infinite distribution limit, all funds can be distributed by the project. The project will have no overflow, meaning token holders won't be able to redeem their tokens for treasury funds.",
	Withdraw: 'Снятие',
	'Withdraw funds': 'Вывести средства',
	Workspace: 'Рабочее пространство',
	"Would you like to issue an ERC-20 token to be used as this project's token?":
		"Would you like to issue an ERC-20 token to be used as this project's token?",
	Yes: 'Да',
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
			'Вы по-прежнему можете выкупить свои ',
			['tokenSymbol'],
			' токены для переполнения, не требуя их, и вы можете перевести свои невостребованные ',
			['tokenSymbol'],
			' токены на другой адрес из меню «Инструменты», доступ к которому можно получить с помощью значка гаечного ключа в правом верхнем углу этого проекта.'
		],
	'You have set a funding cycle target.': 'Вы установили цель цикла финансирования.',
	'You will receive minimum {minReturnedTokensFormatted} ETH': [
		'You will receive minimum ',
		['minReturnedTokensFormatted'],
		' ETH'
	],
	'You will receive {0}{1} ETH': ['Вы получите ', ['0'], ['1'], ' ETH'],
	'You will receive {minReturnedTokensFormatted} ETH': [
		'You will receive ',
		['minReturnedTokensFormatted'],
		' ETH'
	],
	"You'll be able to issue ERC-20 tokens once your project contract has been deployed. Until then, the protocol will track token balances, allowing your supporters to earn tokens and redeem for overflow in the meantime.":
		'Вы сможете выпускать ERC-20 токены после того, как ваш контракт по проекту будет установлен. До тех пор протокол будет отслеживать балансы токенов, позволяя вашим сторонникам заработать токены и использовать их для переполнения.',
	'Your balance': 'Ваш баланс',
	'Your balance: {0}': ['Ваш баланс: ', ['0']],
	'Your feedback will be sent to a <0>public Discord channel </0>for our development team to consider.':
		'Ваши отзывы будут отправлены <0> на публичный Дискорд канал </0> для рассмотрения нашей командой разработчиков.',
	'Your project cannot receive direct payments while paused.':
		'Ваш проект не может получать прямые платежи в то время как он приостановлен.',
	"Your project is funded across funding cycles. A funding cycle has a funding target and a duration. Your project's funding cycle configuration will depend on the kind of project you're starting.":
		'Ваш проект финансируется через циклы финансирования. Цикл финансирования имеет цель финансирования и продолжительность. Конфигурация цикла финансирования вашего проекта будет зависеть от типа проекта, который вы начинаете.',
	'Your project will appear archived, and will not be able to receive payments through the juicebox.money app. You can unarchive a project at any time. Please allow a few days for your project to appear under the "archived" filter on the Projects page.':
		'Ваш проект окажется заархивированным и не сможет получать платежи через приложение juicebox.money. Вы можете снять архивацию с проекта в любое время. Пожалуйста, подождите несколько дней, чтобы ваш проект появился под фильтром "архивированные" на странице Проекты.',
	'Your project will be created on the Juicebox V2 contracts. <0>Learn more.</0>':
		'Your project will be created on the Juicebox V2 contracts. <0>Learn more.</0>',
	'Your project will immediately appear active on the juicebox.money app. Please allow a few days for it to appear in the "active" projects list on the Projects page.':
		'Ваш проект сразу станет активным в приложении juicebox.money. Пожалуйста, дайте несколько дней, чтобы он появился в списке "активных" проектов на странице Проекты.',
	'Your project will still be able to receive payments directly through the Juicebox protocol contracts.':
		'Ваш проект по-прежнему сможет получать платежи напрямую через протокольные контракты Juicebox.',
	"Your project's Twitter handle.": 'Описание вашего проекта в Твиттере.',
	"Your project's funding cycle target and duration.":
		'Цель и продолжительность цикла финансирования вашего проекта.',
	"Your project's website.": 'Сайт вашего проекта.',
	'Your transaction has been submitted and is awaiting confirmation.':
		'Your transaction has been submitted and is awaiting confirmation.',
	'Your unclaimed {tokenTextLong}': ['Your unclaimed ', ['tokenTextLong']],
	'Zero, no funds can be distributed': 'Zero, no funds can be distributed',
	'after {0}% JBX fee': ['после  ', ['0'], '% комиссии JBX'],
	'characters max': 'максимальное количество символов',
	days: 'дней',
	handle: 'никнейм',
	'https://discord.gg/abcdefgh': 'https://discord.gg/abcdefgh',
	'https://your-project.com': 'https://ваш проект.com',
	juiceboxETH: 'juiceboxETH',
	'last {trendingWindowDays} days': ['последние ', ['trendingWindowDays'], ' дней'],
	loading: 'загрузка',
	'locked until {lockedUntilFormatted}': ['заблокировано до ', ['lockedUntilFormatted']],
	'matching "{searchText}"': ['соответствие с"', ['searchText'], '"'],
	'or <0><1>buy {tokenText} on exchange<2/></1></0>': [
		'или <0><1>купить ',
		['tokenText'],
		' на бирже <2/></1></0>'
	],
	project: 'проект',
	'project owner': 'владелец проекта',
	projects: 'проекты',
	token: 'токен',
	tokens: 'токены',
	'tokens redeemed': 'погашенных токенов',
	until: 'до',
	'{0} after JBX fee': [['0'], ' после комиссии JBX'],
	'{0} ago': [['0'], ' лет назад'],
	"{0} are distributed to anyone who pays this project. If the project has set a funding target, tokens can be redeemed for a portion of the project's overflow whether or not they have been claimed yet.":
		[
			['0'],
			" are distributed to anyone who pays this project. If the project has set a funding target, tokens can be redeemed for a portion of the project's overflow whether or not they have been claimed yet."
		],
	'{0} balance': [['0'], ' баланс'],
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
	'{0} contributed': [['0'], ' внесли вклад'],
	'{0} days': [['0'], ' дней'],
	'{0} for you': [['0'], ' для вас'],
	'{0} holders': [['0'], ' держатели'],
	'{0} reserved': [['0'], ' зарезервировано'],
	'{0} staked': [['0'], ' размещено'],
	'{0} total': [['0'], ' всего'],
	'{0} will go to the project owner: <0/>': [['0'], ' будет перенаправлен владельцу проекта: <0/>'],
	'{0} withdrawn': [['0'], ' снято'],
	'{0} {1} reserved': [['0'], ' ', ['1'], ' зарезервировано'],
	'{0}% of supply': [['0'], '% от поставки'],
	'{0}% to <0/>': [['0'], '% до <0/>'],
	'{0}% to {1}': [['0'], '% к ', ['1']],
	'{0}/{1} withdrawn': [['0'], ['1'], ' снято'],
	'{0}{1}': [['0'], ['1']],
	'{count} total': ['Итого ', ['количество']],
	'{exchangeName} has no market for {tokenSymbol}.': [
		['exchangeName'],
		' не имеет пула ликвидности для ',
		['tokenSymbol'],
		'.'
	],
	'{formattedTimeLeft} left': [['formattedTimeLeft'], ' left'],
	'{formattedTimeLeft} until #{0}': [['formattedTimeLeft'], ' until #', ['0']],
	'{handle} not found': [['никнейм'], ' не найден'],
	'{handle} will be available soon! Try refreshing the page shortly.': [
		['Handle'],
		' будет скоро доступен! Попробуй перезагрузить страницу.'
	],
	'{label}': [['название']],
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
		'Обменный курс ',
		['tokenSymbol'],
		'/ETH на ',
		['exchangeName'],
		'.'
	],
	'{tokenTextSingular} recipients': [['tokenTextSingular'], ' recipients'],
	"{tokensLabel} are distributed to anyone who pays this project. If the project has set a funding target, tokens can be redeemed for a portion of the project's overflow whether or not they have been claimed yet.":
		[
			['tokensLabel'],
			' распространяются среди всех, кто оплачивает этот проект. Если проектустановил целевой показатель финансирования, токены могут быть выкуплены для частипереполнения проекта независимо от того, были ли они еще востребованы или нет.'
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
