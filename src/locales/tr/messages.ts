/*eslint-disable*/ export const messages = {
	'(Optional) Add a memo to this payment on-chain':
		'(İsteğe bağlı) Bu ödemeye zincir üstü bir not ekleyin',
	'(Optional) Add a note to this payment on-chain':
		'(İsteğe bağlı) Bu ödemeye zincir üstü bir not ekleyin',
	'({0}%)': ['(', ['0'], '%)'],
	'({realTokenAllocationPercent}% of all newly minted tokens).': [
		"(tüm yeni basılmış token'ların %",
		['realTokenAllocationPercent'],
		' kadarı).'
	],
	'0% fee': '%0 ücret',
	'1 year': '1 yıl',
	'1. Project details': '1. Proje ayrıntıları',
	'100% overflow': '%100 taşma',
	'2. Funding cycle': '2. Funding cycle',
	'24 hours': '24 saat',
	'3-day delay': '3 günlük gecikme',
	'3. Review and deploy': '3. Review and deploy',
	'30 days': '30 gün',
	'7 days': '7 gün',
	'7-day delay': '7 günlük gecikme',
	'90 days': '90 gün',
	'<0/> Archived projects have not been modified or deleted on the blockchain, and can still be interacted with directly through the Juicebox contracts.':
		'<0/> Arşivlenen projeler blok zincirinde değiştirilmemiştir veya silinmemiştir ve yine de doğrudan Juicebox sözleşmeleri aracılığıyla etkileşime girilebilir.',
	'<0/> The Juicebox protocol is open to anyone, and project configurations can vary widely. There are risks associated with interacting with all projects on the protocol. Projects built on the protocol are not endorsed or vetted by JuiceboxDAO or Peel. Do your own research and understand the risks before committing your funds.':
		'<0/> Juicebox protokolü herkese açıktır ve proje yapılandırmaları çok farklı olabilir. Protokoldeki tüm projelerle etkileşime girmenin riskleri vardır. Protokole dayalı projeler JuiceboxDAO veya Peel tarafından incelenmez veya onaylanmaz, bu nedenle kendi araştırmanızı yapmalı ve fonlarınızı taahhüt etmeden önce riskleri anlamalısınız.',
	'<0/> owner balance': '<0/> sahip bakiyesi',
	'<0/>{0} after {feePercentage}% JBX membership fee': [
		'<0/>',
		['0'],
		' after ',
		['feePercentage'],
		'% JBX membership fee'
	],
	'<0/>{0}{1} distributed': ['<0/>', ['0'], ['1'], ' distributed'],
	'<0><1/>{netDistributionAmount}</0> after {feePercentage}% JBX fee': [
		'%',
		['feePercentage'],
		' JBX ücretinden sonra dağıtılan net <0><1/>',
		['netDistributionAmount'],
		'</0>'
	],
	'<0><1>This project has no overflow</1>, so you will not receive any ETH for burning tokens.</0>':
		"<0><1>Bu projede taşma bulunmadığından</1> token'ları yakma karşılığında ETH almayacaksınız.</0>",
	'<0>Juicebox contracts</0> are unaudited, and may be vulnerable to bugs or hacks. All funds moved through Juicebox could be lost or stolen. JuiceboxDAO and Peel are not liable for any losses by projects or their supporters.':
		"<0>Juicebox sözleşmeleri</0> denetlenmemiştir ve hatalara ve hack'lenmelere karşı savunmasız olabilir. Juicebox vasıtasıyla taşınan tüm fonlar kaybolabilir veya çalınabilir. JuiceboxDAO ve Peel, projelerin veya onların destekçilerinin kayıplarından sorumlu değildir.",
	'<0>Learn more</0> about burning tokens.': 'Token yakma hakkında <0>daha fazla bilgi edinin</0>.',
	'<0>Learn more</0> about funding cycle duration.':
		'Finansman döngü süresi hakkında <0>daha fazla bilgi edinin</0>.',
	'<0>Learn more</0> about funding cycles.':
		'Finansman döngüleri hakkında <0>daha fazla bilgi edinin</0>.',
	'<0>Learn more</0> about overflow.': 'Taşma hakkında <0>daha fazla bilgi edinin</0>.',
	'<0>NOTE:</0> This project has a balance of 0. Projects cannot be migrated without a balance. To migrate this project, first pay it or use the button below to deposit 1 wei (0.000000000000000001 or 10<1>-18</1> ETH).':
		'<0>NOT:</0> Bu projenin bakiyesi 0. Projeler bakiye olmadan taşınamaz. Bu projeyi taşımak için önce ödemesini yapın veya 1 wei (0.00000000000000001 veya 10<1>-18</1> ETH) yatırmak için aşağıdaki butonu kullanın.',
	'<0>No duration set.</0>Funding can be reconfigured at any time. Reconfigurations will start a new funding cycle.':
		'<0>No duration set.</0>Funding can be reconfigured at any time. Reconfigurations will start a new funding cycle.',
	'<0>Note:</0> These properties will <1>not</1> be editable immediately within a funding cycle. They can only be changed for <2>upcoming</2> funding cycles.':
		'<0>Not:</0> Bu özellikler, bir finansman döngüsü içinde doğrudan <1>düzenlenemez</1>. Özellikler yalnızca <2>yaklaşan</2> finansman döngüleri için değiştirilebilir.',
	'<0>Note:</0> Tokens cannot be claimed because no ERC-20 token has been issued for this project. ERC-20 tokens must be issued by the project owner.':
		"<0>Not:</0> Bu proje için herhangi bir ERC-20 token'ı çıkarılmadığından token'lar talep edilemez. ERC-20 token'ları proje sahibi tarafından çıkarılmalıdır.",
	'<0>Notice:</0> These balances will not reflect transfers of claimed tokens because the {tokenSymbol} ERC-20 token has not yet been indexed by Juicebox.':
		[
			'<0>Uyarı:</0> ',
			['tokenSymbol'],
			" ERC-20 token'ı henüz Juicebox tarafından dizine eklenmediğinden, bu bakiyeler talep edilen token'ların transferlerini yansıtmaz."
		],
	'<0>Peel</0> is the DAO that manages the juicebox.money frontend interface. You can reach out to Peel either through the <1>Peel Discord</1> or the <2>Juicebox Discord</2>.':
		"<0>Peel</0>, juicebox.money kullanıcı arayüzünü yöneten DAO'dur. Peel'e <1>Peel Discord</1> veya <2>Juicebox Discord</2> aracılığıyla ulaşabilirsiniz.",
	"<0>Recurring funding cycles</0> (for example, distribute $30,000 from your project's treasury every 14 days).":
		"<0>Recurring funding cycles</0> (for example, distribute $30,000 from your project's treasury every 14 days).",
	"<0>Target is 0.</0> The project's entire balance will be considered overflow. <1>Learn more</1> about overflow.":
		"<0>Target is 0.</0> The project's entire balance will be considered overflow. <1>Learn more</1> about overflow.",
	'<0>This project has no overflow</0>, so you will not receive any ETH for burning tokens.':
		"<0>Bu projede taşma bulunmadığından</0> token'ları yakma karşılığında ETH almayacaksınız.",
	'Trending projects': 'Çok konuşulan projeler',
	'<0>Your unclaimed {tokenSymbol} tokens:</0> {0}': [
		'<0>Hak talebinde bulunulmamış ',
		['tokenSymbol'],
		" token'larınız:</0> ",
		['0']
	],
	'<0>{tokenSymbol} ERC-20 address:</0> <1/>': ['<0>', ['tokenSymbol'], ' ERC-20 adresi:</0> <1/>'],
	'@': '@',
	"A <0>discount rate</0> to automatically reduce the issuance rate of your project's token (tokens/ETH) each new funding cycle.":
		"A <0>discount rate</0> to automatically reduce the issuance rate of your project's token (tokens/ETH) each new funding cycle.",
	'A bonding curve rewards people who wait longer to redeem your tokens for overflow.':
		'Bağlanma eğrisi, tokenlerinizi taşma amaçlı kullanmak için daha uzun süre bekleyen insanları ödüllendirir.',
	'A mechanism like Juicebox where upfront financial commitments should be honored over time is only guaranteed within an ecosystem like Ethereum.':
		'Juicebox gibi, önceden yapılan finansal taahhütlerin zaman içinde yerine getirilmesi gereken bir mekanizma, yalnızca Ethereum gibi bir ekosistemde garanti edilir.',
	'A project can be archived by its owner from the tools menu on the project page.':
		'Bir proje sahibi tarafından proje sayfasındaki araçlar menüsünden arşivlenebilir.',
	'A project can choose to reserve a percentage of tokens for itself. Instead of being distributed to paying users, this percentage of tokens is instead minted for the project.':
		'Bir proje, kendisi için tokenlerin bir yüzdesini ayırmayı seçebilir. Bu token yüzdesi, ödeme yapan kullanıcılara dağıtılmak yerine proje için kullanılabilir.',
	'A project can reserve a percentage of tokens minted from every payment it receives. Reserved tokens can be distributed according to the allocation below at any time.':
		"Bir proje, aldığı her ödemeden basılan token'ların belirli bir yüzdesini ayırabilir. Ayrılan token'lar, herhangi bir zamanda aşağıdaki tahsise göre dağıtılabilir.",
	"A project's lifetime is defined in funding cycles. If a funding target is set, the project can withdraw no more than the target for the duration of the cycle.":
		'Bir projenin ömrü, finansman döngülerinde tanımlanır. Bir finansman hedefi belirlenirse proje döngü süresince hedeften fazlasını çekemez.',
	'A reconfiguration to an upcoming funding cycle must be submitted at least 3 days before it starts.':
		'Yaklaşan bir finansman döngüsü için yeniden yapılandırma, döngü başlamadan en az 3 gün önce sunulmalıdır.',
	'A reconfiguration to an upcoming funding cycle must be submitted at least 7 days before it starts.':
		'Yaklaşan bir finansman döngüsü için yeniden yapılandırma, döngü başlamadan en az 7 gün önce sunulmalıdır.',
	"A reserved rate of more than 90% is risky for contributors. Contributors won't receive many tokens for their contribution.":
		"A reserved rate of more than 90% is risky for contributors. Contributors won't receive many tokens for their contribution.",
	AVAILABLE: 'MEVCUT',
	Activity: 'Etkinlik',
	'Add a payout': 'Add a payout',
	'Add a split': 'Add a split',
	"Add funds to this project's balance without minting tokens.":
		'Bu projenin bakiyesine token basmadan fon ekleyin.',
	'Add image': 'Resim ekle',
	'Add payout': 'Add payout',
	'Add split': 'Add split',
	'Add to Balance': 'Bakiyeye Ekle',
	'Add to balance': 'Bakiyeye ekle',
	'Add token receiver': 'Token alıcısı ekle',
	Address: 'Adres',
	'Address required': 'Address required',
	'Address:': 'Address:',
	'Address: {0}': ['Adres: ', ['0']],
	'Adjust incentives for paying your project.':
		'Projenize gelecek ödemeler için teşvikleri ayarlayın.',
	All: 'Hepsi',
	'All assets': 'Tüm varlıklar',
	'All changes will be applied to the <0>upcoming</0> funding cycle.':
		'Tüm değişiklikler <0>yaklaşan</0> finansman döngüsüne uygulanacaktır.',
	'All funds can be distributed by the project. The project will have no overflow (the same as setting the target to infinity).':
		'Tüm fonlar proje tarafından dağıtılabilir ve projede taşma olmaz. (Hedefi sonsuza ayarlamakla aynıdır.).',
	'All projects': 'Tüm projeler',
	'All {0} will go to the project owner:': ['Tüm ', ['0'], ' proje sahibine gidecek:'],
	"Allocate a portion of your project's reserved tokens to other Ethereum wallets or Juicebox projects.":
		"Projenizin ayrılan token'larının bir kısmını diğer Ethereum cüzdanlarına veya Juicebox projelerine tahsis edin.",
	'Allow minting tokens': "Token'ların basılmasına izin verin",
	'Allow token minting': 'Token basmaya izin ver',
	Allowed: 'İzin verildi',
	'Almost definitely.': 'Neredeyse kesinlikle.',
	Amount: 'Miktar',
	'Amount of ERC-20 tokens to claim': 'Talep edilecek ERC-20 token miktarı',
	'Amount paid': 'Ödenen miktar',
	'Amount to distribute': 'Dağıtılacak miktar',
	"An invite link to your project's Discord server.": 'Projenizin Discord Sunucusuna davet linki.',
	"Any changes will take effect in the next funding cycle. The current funding cycle won't be altered.":
		'Tüm değişiklikler bir sonraki finansman döngüsünde etkili olacaktır. Mevcut finansman döngüsünde değişiklik olmayacaktır.',
	'Any reconfiguration to an upcoming funding cycle will take effect once the current cycle ends. A project with no strategy may be vulnerable to being rug-pulled by its owner.':
		'Yaklaşan bir finansman döngüsüne yönelik herhangi bir yeniden yapılandırma, mevcut döngü sona erdiğinde yürürlüğe girecektir. Stratejisi olmayan bir proje, sahibi tarafından e-dolanrıcılığa karşı savunmasız olabilir.',
	"Any treasury funds in excess of the distribution limit is called <0>overflow</0>. Overflow can be claimed by your project's token holders by redeeming their tokens. <1>Learn more</1> about overflow.":
		"Any treasury funds in excess of the distribution limit is called <0>overflow</0>. Overflow can be claimed by your project's token holders by redeeming their tokens. <1>Learn more</1> about overflow.",
	'Any treasury funds within the distribution limit can be paid out to destinations that you can define as <0>splits</0>. <1>Learn more</1> about payout splits.':
		'Any treasury funds within the distribution limit can be paid out to destinations that you can define as <0>splits</0>. <1>Learn more</1> about payout splits.',
	'Archive project': 'Projeyi arşivle',
	Archived: 'Arşivlendi',
	'Are you sure you want to start over?': 'Baştan başlamak istediğinizden emin misiniz?',
	Assets: 'Varlıklar',
	'Available after fee:': 'Ücretten sonra kullanılabilir:',
	'Available funds are distributed according to the payouts below.':
		'Mevcut fonlar aşağıdaki ödemelere göre dağıtılır.',
	'Available:': 'Mevcut:',
	'Back to top': 'Başa dön',
	'Balance exceeded': 'Bakiye aşıldı',
	"Balance of the project owner's wallet.": 'Proje sahibinin cüzdan bakiyesi.',
	Beneficiary: 'Faydalanıcı',
	'Beneficiary address': 'Faydalanıcı adresi',
	'Big ups to the Ethereum community for crafting the infrastructure and economy to make Juicebox possible.':
		"Juicebox'ı mümkün kılan altyapı ve ekonomiyi hazırladığı için Ethereum topluluğuna selamlar.",
	'Block number': 'Blok numarası',
	Blog: 'Blog',
	'Bonding curve rate': 'Bağlanma eğrisi oranı',
	'Bonding curve:': 'Bağlanma eğrisi:',
	'Build a community around a project, fund it, and program its spending. Light enough for a group of friends, powerful enough for a global network of anons.':
		'Bir proje etrafında bir topluluk oluşturun, onu finanse edin ve harcamalarını programlayın. Bir grup arkadaş için yeterince hafif, küresel bir duyuru ağı için yeterince güçlü.',
	'Built for:': 'Şunlar için üretildi:',
	'Burn project tokens': "Proje token'larını yakın",
	"Burn your {tokensLabel}. You won't receive ETH in return because this project has no overflow.":
		[
			'Burn your ',
			['tokensLabel'],
			". You won't receive ETH in return because this project has no overflow."
		],
	'Burn {0} {tokensTextShort}': [['0'], ' adet ', ['tokensTextShort'], " token'ını yak"],
	'Burn {tokensLabel}': ['Burn ', ['tokensLabel']],
	'Burn {tokensTextLong}': [['tokensTextLong'], ' yak'],
	"By default, all unallocated funds can be distributed to the project owner's wallet.":
		'Aksi istenmediği takdirde, tahsis edilmemiş bütün fonlar proje sahibinin cüzdanına dağıtılabilir.',
	"By default, the issuance rate for your project's token is 1,000,000 tokens / 1 ETH. For example, a 1 ETH contribution to your project will return 1,000,000 tokens. You can manipulate the issuance rate with the following configurations.":
		"By default, the issuance rate for your project's token is 1,000,000 tokens / 1 ETH. For example, a 1 ETH contribution to your project will return 1,000,000 tokens. You can manipulate the issuance rate with the following configurations.",
	'By default, these tokens are reserved for the project owner, but you can also allocate portions to other wallet addresses.':
		'By default, these tokens are reserved for the project owner, but you can also allocate portions to other wallet addresses.',
	"Can I change my project's contract after it's been created?":
		'Projemin sözleşmesini oluşturulduktan sonra değiştirebilir miyim?',
	'Can I delete a project?': 'Bir projeyi silebilir miyim?',
	Cancel: 'İptal',
	'Cannot redeem tokens for ETH because this project has no overflow.':
		'Bu projede taşma bulunmadığından ETH için token talep edilemez.',
	'Changes to project details will take effect immediately.':
		'Proje detaylarında yapılan değişiklikler hemen etkili olacaktır.',
	'Changes to these attributes can be made at any time and will be applied to your project immediately.':
		'Bu özellikler üzerinde herhangi bir zamanda değişiklik yapılabilir ve projenize hemen uygulanacaktır.',
	"Changes to your project's funding configuration require a community-approved period to take effect, which acts as a safeguard against rug pulls. Your supporters don't have to trust you — even though they already do.":
		'Projenizin finansman yapılandırmasında yapılan değişikliklerin yürürlüğe girmesi için topluluk tarafından onaylanmış bir süre gerekir ve bu, dolandırıcılıklara karşı bir koruma görevi görür. Destekçileriniz size güvenmek zorunda değil - zaten güveniyor olsalar bile.',
	"Check this to mint this project's ERC-20 tokens to your wallet. Leave unchecked to have your token balance tracked by Juicebox, saving gas on this transaction. You can always claim your ERC-20 tokens later.":
		"Bu projenin ERC-20 token'larını cüzdanınıza basmak için burayı işaretleyin. Token bakiyenizin Juicebox tarafından takip edilmesini sağlamak için işaretlemeden bırakın ve bu işlemde gazdan tasarruf edin. ERC-20 token'larınızı daha sonra her zaman talep edebilirsiniz.",
	'Check this to mint {tokenSymbol} ERC-20 to your wallet. Leave unchecked to have your token balance tracked by Juicebox, saving gas on this transaction. You can always claim your ERC-20 tokens later.':
		[
			'Cüzdanınıza ',
			['tokenSymbol'],
			" ERC-20 basmak için burayı işaretleyin. Token bakiyenizin Juicebox tarafından takip edilmesini sağlamak için işaretlemeden bırakın ve bu işlemde gazdan tasarruf edin. ERC-20 token'larınızı daha sonra her zaman talep edebilirsiniz."
		],
	'Claim {0}': ['Claim ', ['0']],
	'Claim {0} as ERC-20 tokens': ['Claim ', ['0'], ' as ERC-20 tokens'],
	'Claim {tokenTextShort}': ['Claim ', ['tokenTextShort']],
	'Claim {tokenTextShort} as ERC-20 tokens': ['Claim ', ['tokenTextShort'], ' as ERC-20 tokens'],
	'Claim {tokensLabel} as ERC-20': [['tokensLabel'], " token'larını ERC-20 olarak talep edin"],
	'Claiming {tokenSymbol} tokens will convert your {tokenSymbol} balance to ERC-20 tokens and mint them to your wallet.':
		[
			['tokenSymbol'],
			" token'larını talep etmek, ",
			['tokenSymbol'],
			" bakiyenizi ERC-20 token'larına dönüştürecek ve bunları cüzdanınıza basacaktır."
		],
	'Claiming {tokenTextLong} will convert your {tokenTextShort} balance to ERC-20 tokens and mint them to your wallet.':
		[
			'Claiming ',
			['tokenTextLong'],
			' will convert your ',
			['tokenTextShort'],
			' balance to ERC-20 tokens and mint them to your wallet.'
		],
	Close: 'Kapat',
	'Commit portions of your funds to the people or projects you want to support, or the contributors you want to pay. When you get paid, so do they.':
		'Gelirinizin bir kısmını, desteklemek istediğiniz kişilere veya projelere veya ödeme yapmak istediğiniz katkıda bulunanlara gitmesi için taahhüt edin. Siz ödeme aldığınızda, onlar da alsın.',
	'Community funding for people and projects': 'İnsanlar ve projeler için topluluk finansmanı',
	'Configure how your project will collect and spend funds.':
		'Configure how your project will collect and spend funds.',
	'Configure restrictions for your funding cycles.':
		'Configure restrictions for your funding cycles.',
	"Configure the dynamics of your project's token.":
		"Configure the dynamics of your project's token.",
	'Congrats on creating your project!': 'Tebrikler, projenizi oluşturdunuz!',
	Connect: 'Bağlan',
	'Connect wallet to deploy': 'Connect wallet to deploy',
	'Connect wallet to pay': 'Ödemek için cüzdanınızı bağlayın',
	'Contract address: {0}': ['Sözleşme Adresi: ', ['0']],
	'Contributors will not receive any tokens in exchange for paying this project.':
		'Katkı sahipleri bu projeye ödeme karşılığında token almayacaktır.',
	'Contributors will receive a relatively small portion of tokens in exchange for paying this project.':
		"Katkı sahipleri bu projeye ödeme karşılığında token'ların nispeten küçük bir kısmını alacaktır.",
	'Copied!': 'Kopyalandı!',
	'Copy to clipboard': 'Panoya kopyala',
	'Create project': 'Proje oluştur',
	'Creating a Juicebox project mints you an NFT (ERC-721) representing ownership over it. Whoever owns this NFT can configure the rules of the game and how payouts are distributed.':
		"Bir Juicebox projesi oluşturmak, size üzerinde sahipliğinizi temsil eden bir NFT (ERC-721) verir. Bu NFT'ye sahip olan kişi, oyunun kurallarını ve ödemelerin nasıl dağıtılacağını yapılandırabilir.",
	Current: 'Güncel',
	'Current 3rd Party Exchange Rates': 'Güncel 3. Taraf Kripto Kurları',
	'Current owner: {ownerAddress}': ['Current owner: ', ['ownerAddress']],
	'Currently worth: <0><1/>{0}</0>': ['Güncel değeri: <0><1/>', ['0'], '</0>'],
	'Custom strategy': 'Özel strateji',
	'Custom token beneficiary': 'Custom token beneficiary',
	'Cycle #{0}': ['Döngü #', ['0']],
	'Dark theme': 'Koyu tema',
	Date: 'Tarih',
	'Date created': 'Oluşturma tarihi',
	Days: 'Days',
	'Deploy new project configuration': 'Yeni proje yapılandırmasını devreye alın',
	'Deploy project': 'Deploy project',
	'Deploy project on {signerNetwork}': ['Deploy project on ', ['signerNetwork']],
	'Deploy project to {0}': ['Deploy project to ', ['0']],
	'Deposit 1 wei to @{handle}': ['@', ['handle'], ' hesabına 1 wei yatırın'],
	'Design your project': 'Projenizi tasarlayın',
	Details: 'Detaylar',
	Disabled: 'Devre dışı',
	"Disabled when your project's distribution limit is <0>No limit</0> (infinite)":
		"Disabled when your project's distribution limit is <0>No limit</0> (infinite)",
	"Disabled when your project's funding cycle duration is 0.":
		"Disabled when your project's funding cycle duration is 0.",
	"Disabled when your project's funding cycle has no duration.":
		"Disabled when your project's funding cycle has no duration.",
	Disconnect: 'Bağlantıyı kes',
	Discord: 'Discord',
	'Discount rate': 'İndirim oranı',
	"Display ERC-20 tokens and other Juicebox project tokens that are in this project's owner's wallet.":
		"Bu proje sahibinin cüzdanında bulunan ERC-20 token'larını ve diğer Juicebox proje token'larını görüntüleyin.",
	'Distribute available funds to other Ethereum wallets or Juicebox projects as payouts. Use this to pay contributors, charities, Juicebox projects you depend on, or anyone else. Funds are distributed whenever a withdrawal is made from your project.':
		'Uygun fonları diğer Ethereum cüzdanlarına veya Juicebox projelerine ödeme olarak dağıtın. Bunu katılımcılara, yardım kuruluşlarına, bağlı olduğunuz Juicebox projelerine veya başkalarına ödeme yapmak için kullanın. Projelerinizden para çekildiğinde fonlar dağıtılır.',
	'Distribute funds': 'Fonları dağıt',
	'Distribute reserved {tokenTextPlural}': ['Ayrılmış ', ['tokenTextPlural'], " token'ları dağıt"],
	'Distribute {0}': [['0'], ' dağıt'],
	'Distribute {tokenTextPlural}': [['tokenTextPlural'], " token'ları dağıt"],
	'Distribute {tokensText}': [['tokensText'], " token'ları dağıt"],
	Distributed: 'Dağıtıldı',
	'Distribution limit': 'Dağıtım sınırı',
	'Distribution limit infinite': 'Distribution limit infinite',
	'Distribution limit, duration and payouts': 'Dağıtım sınırı, süre ve ödemeler',
	'Distribution splits': 'Distribution splits',
	'Distributions to other Juicebox project do not incur any fee.':
		'Distributions to other Juicebox project do not incur any fee.',
	'Do I have to make my project open source to use Juicebox as its business model?':
		"Juicebox'ı iş modeli olarak kullanmak için projemi açık kaynak yapmak zorunda mıyım?",
	Docs: 'Dokümanlar',
	'Documentation on v1.1 contracts': 'V1.1 sözleşmelerine ilişkin belgeler',
	'Does a project benefit from its own overflow?': 'Bir proje kendi taşmasından faydalanır mı?',
	Done: 'Tamamlandı',
	'Download CSV': "CSV'yi indirin",
	'Download CSV of payments': "Ödemeler CSV'sini indirin",
	'Download CSV of project activity': "Proje Etkinliği CSV'sini indirin",
	'Download CSV of {0} holders': [['0'], " sahipleri CSV'sini indirin"],
	'Due to their public nature, any exploits to the contracts may have irreversible consequences, including loss of funds. Please use Juicebox with caution.':
		"Kamuya açık olmaları nedeniyle, sözleşmelere yönelik herhangi bir istismarın, fon kaybı da dahil olmak üzere geri dönüşü olmayan sonuçları olabilir. Lütfen Juicebox'ı dikkatli kullanın.",
	Duration: 'Süre',
	'ERC-20 community tokens': "ERC-20 topluluk token'ları",
	'ERC-20 tokens can only be minted once an ERC-20 token has been issued for this project.':
		'ERC-20 tokens can only be minted once an ERC-20 token has been issued for this project.',
	"Each project has its own <0>ERC-20 tokens</0>. Anyone who contributes funds to a project receives that project's tokens in return. Token balances will be tracked by the protocol until ERC-20 tokens are optionally issued by the project owner.":
		"Her projenin kendi <0>ERC-20 token'ları</0> vardır. Bir projeye fon sağlayan herkes, karşılığında o projenin token'larını alır. Proje sahibi isteğe bağlı olarak ERC-20 token'ı çıkarana kadar, token bakiyeleri protokol tarafından izlenecektir.",
	'Edit existing split': 'Edit existing split',
	'Edit project': 'Projeyi düzenle',
	'Edit project details': 'Proje ayrıntılarını düzenle',
	'Edit reserved token allocation': 'Ayrılmış token tahsisini düzenle',
	'Edit token allocation': 'Token tahsisini düzenle',
	'Edit token receiver': 'Token alıcısını düzenle',
	'Edit tracked assets': 'İzlenen varlıkları düzenleyin',
	'Enable Juicebox V2': 'Enable Juicebox V2',
	Enabled: 'Etkin',
	'Enabling this allows the project owner to manually mint any amount of tokens to any address.':
		"Bunun etkinleştirilmesi, proje sahibine, herhangi bir miktarda token'ı herhangi bir adrese manuel olarak basma izni verir.",
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
	End: 'Son',
	'Error loading holders': 'Sahipler yüklenirken hata oluştu',
	'Error loading payments': 'Ödemeler yüklenirken hata oluştu',
	'Ethereum protocols and DAOs': "Ethereum protokolleri ve DAO'lar",
	'Ethereum provides a public environment where internet apps like Juicebox can run in a permission-less, trustless, and unstoppable fashion.':
		'Ethereum, Juicebox gibi internet uygulamalarının izine ve güvene dayalı olmadan, kesintisiz bir şekilde çalışabileceği herkesin kullanımına açık bir ortam sağlar.',
	FAQ: 'SSS',
	FAQs: 'SSS',
	'For example, with a bonding curve of 70%, redeeming 10% of the token supply at any given time will claim around 7% of the total overflow.':
		"Örnek olarak, %70'lik bir bağlanma eğrisi ile herhangi bir zamanda token arzının %10'u talep edildiğinde, toplam taşmanın yaklaşık %7'sine denk düşecektir.",
	'For more info, check out this <0>short video</0> on bonding curves.':
		"Bağlanma eğirileri hakkında daha falza bilgi için bu <0>kısa video</0>'yu izleyin.",
	'For more info, check out this <0>short video</0>.':
		"Daha fazla bilgi için bu <0>kısa video</0>'yu izleyin.",
	'For users paying through your app, you should route those funds through the Juicebox smart contracts so they receive tokens in return.':
		'Uygulamanız aracılığıyla ödeme yapan kullanıcıların, karşılığında token almaları için bu fonları Juicebox akıllı sözleşmeleri aracılığıyla yönlendirmelisiniz.',
	Funding: 'Funding',
	'Funding Distribution': 'Finansman Dağılımı',
	'Funding cycle': 'Finansman döngüsü',
	'Funding cycle details': 'Finansman döngüsü detayları',
	'Funding cycle duration': 'Finansman döngüsü süresi',
	'Funding cycle target': 'Finansman döngüsü hedefi',
	'Funding cycles': 'Funding cycles',
	'Funding cycles can be reconfigured moments before a new cycle begins, without notifying contributors.':
		'Finansman döngüleri, katkı sahiplerini bilgilendirmeden, yeni bir döngü başlangıcından dakikalar önce yeniden yapılandırılabilir.',
	'Funding distribution': 'Finansman dağılımı',
	'Funding target': 'Finansman hedefi',
	'Funds will be distributed to:': 'Fonlar şunlara dağıtılacaktır:',
	'Give feedback': 'Geribildirim verin',
	'Give us your feedback': 'Geri bildirim verin',
	'Go to Etherscan': "Etherscan'e git",
	Handle: 'Tanıtıcı',
	'Heads up': 'Dikkat',
	History: 'Geçmiş',
	Holders: 'Sahipler',
	'Holding these tokens entitles a project to a portion of its own overflow.':
		'Holding these tokens grants a project access to some of its own overflow.',
	Holdings: "Token'larınız",
	Hours: 'Hours',
	'How decentralized is Juicebox?': 'Juicebox ne kadar merkeziyetsiz?',
	"How did we do? We'd love to get your feedback so we can make creating Juicebox projects as juicy as possible!":
		'Deneyiminizi nasıl buldunuz? Juicebox projeleri oluşturmayı olabildiğince kıyak bir deneyim haline getirmek için sizin de düşüncelerinizi öğrenmek isteriz!',
	'How do I archive a project?': 'Bir projeyi nasıl arşivlerim?',
	'How do I create a project?': 'Nasıl proje oluştururum?',
	'How have the contracts been tested?': 'Sözleşmeler nasıl test edildi?',
	'How long one funding cycle will last. Funding cycle <0>reconfigurations</0> will only take effect for <1>upcoming</1> funding cycles, i.e. once a current funding cycle has ended.':
		'Bir finansman döngüsünün ne kadar süreceğini ifade eder. Finansman döngüsü <0>yeniden yapılandırmaları</0> yalnızca <1>yaklaşan</1> finansman döngüleri için, yani mevcut bir finansman döngüsü sona erdikten sonra geçerli olacaktır.',
	'How your project will distribute funds.': 'Projenizin fonları nasıl dağıtacağı.',
	'However, Juicebox is still experimental software. Although the Juicebox contract team have done their part to shape the smart contracts for public use and have tested the code thoroughly, the risk of exploits is never 0%.':
		'Ancak, Juicebox hala deneysel bir yazılımdır. Her ne kadar Juicebox sözleşme ekibi akıllı sözleşmelerin herkese açık kullanımı için şekillendirilmesi konusunda üzerine düşeni yapmış ve kodu kapsamlı bir biçimde test etmiş olsa da kötüye kullanım riski hiçbir zaman %0 değildir.',
	'I understand': 'Anladım',
	ID: 'ID',
	'ID: {0}': ['Kimlik: ', ['0']],
	"If locked, this can't be edited or removed until the lock expires or the funding cycle is reconfigured.":
		'Kilitliyse kilidin süresi dolana veya finansman döngüsü yeniden yapılandırılana kadar düzenlenemez veya kaldırılamaz.',
	"If locked, this split can't be edited or removed until the lock expires or the funding cycle is reconfigured.":
		"If locked, this split can't be edited or removed until the lock expires or the funding cycle is reconfigured.",
	"If you know how much your project needs to earn over some period of time to be sustainable, you can set a funding target with that amount. If your project earns more than that, the surplus funds are locked in an overflow pool. Anyone holding your project's tokens can claim a portion of the overflow pool in exchange for redeeming their tokens.":
		"If you know how much your project needs to earn over some period of time to be sustainable, you can set a funding target with that amount. If your project earns more than that, the surplus funds are locked in an overflow pool. Anyone holding your project's tokens can claim a portion of the overflow pool in exchange for redeeming their tokens.",
	"If you're interested in creating a project but still confused on how to get started, consider watching this <0>instructional video</0>. Also feel free to reach out in the <1>Juicebox Discord</1> where our team will be happy to help bring your project idea to life!":
		"If you're interested in creating a project but still confused on how to get started, consider watching this <0>instructional video</0>. Also feel free to reach out in the <1>Juicebox Discord</1> where our team will be happy to help bring your project idea to life!",
	"If you're unsure if you need to claim, you probably don't.":
		'Hak talebinde bulunmanız gerekip gerekmediğinden emin değilseniz muhtemelen gerekli değildir.',
	'In Juicebox': "Juicebox'da",
	'In wallet': 'Cüzdanda',
	Incentives: 'Teşvikler',
	'Indie artists, devs, creators': 'Bağımsız sanatçılar, geliştiriciler, yaratıcılar',
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
	'Issue ERC-20 token': "ERC-20 token'ı çıkart",
	"Issue an ERC-20 to be used as this project's token. Once issued, anyone can claim their existing token balance in the new token.":
		"Issue an ERC-20 to be used as this project's token. Once issued, anyone can claim their existing token balance in the new token.",
	'Issue token': 'Token çıkar',
	"It isn't possible to remove a project's data from the blockchain, but we can hide it in the app if you'd like to prevent people from seeing or interacting with it — just let us know in <0>Discord</0>. Keep in mind people will still be able to use your project by interacting directly with the contract.":
		"It isn't possible to remove a project's data from the blockchain, but we can hide it in the app if you'd like to prevent people from seeing or interacting with it — just let us know in <0>Discord</0>. Keep in mind people will still be able to use your project by interacting directly with the contract.",
	"It'd be a lot cooler if you did": 'Yapsan çok kıyak olur',
	'JBX Fee ({0}%):': ['JBX Ücreti (%', ['0'], '):'],
	'JBX Fee ({feePercentage}%):': ['JBX Ücreti (%', ['feePercentage'], '):'],
	'Juicebox Project ID': 'Juicebox Project ID',
	"Juicebox V2 on {0} isn't enabled.": ['Juicebox V2 on ', ['0'], " isn't enabled."],
	'Juicebox has handled tens of thousands of ETH through its protocol, and has so far had 0 security mishaps.':
		'Juicebox protokolü şimdiye kadar 10 binlerce ETH yönetti ve hiç bir güvenlik sorunu yaşamadı.',
	'Juicebox is a governance-minimal protocol. There are only a few levers that can be tuned, none of which impose changes for users without their consent. The Juicebox governance smart contract can adjust these levers.':
		'Juicebox, yönetişim açısından minimal bir protokoldür. Ayarlanabilecek yalnızca birkaç kol vardır ve bunların hiçbirinde kullanıcıların rızası olmadan değişiklik yapılamaz. Juicebox yönetişim akıllı sözleşmesi bu kolları ayarlayabilir.',
	'Juicebox is an open protocol on Ethereum that is funded using Juicebox itself. You can check out the contractualized budget specs <0>here</0>.':
		'Juicebox is an open protocol on Ethereum that is funded using Juicebox itself. You can check out the contractualized budget specs <0>here</0>.',
	'Juicebox loading animation': 'Juicebox loading animation',
	'Juicebox project': 'Juicebox project',
	'Juicebox was built to allow people and projects to get paid for creating public art and infrastructure, as much as or more than they would working towards corporate ends. No more shady business.':
		'Juicebox, insanların ve projelerin kamusal sanat ve altyapı oluşturmak için kurumsal amaçlara yönelik çalıştıkları kadar veya daha fazla para almalarına izin vermek için inşa edildi. Artık karanlık iş yok.',
	'Last paid': 'Son ödeme',
	'Last paid timestamp': 'Son ödeme zaman damgası',
	Later: 'Later',
	Latest: 'En son',
	'Latest Payments': 'Son ödemeler',
	'Light theme': 'Aydınlık tema',
	'Load more': 'Daha fazla yükle',
	'Lock until': 'Lock until',
	'Locked:': 'Locked:',
	Logo: 'Logo',
	MAX: 'MAKS',
	Manage: 'Yönet',
	'Manage {0}': ['Manage ', ['0']],
	'Manage {tokenText}': ['Manage ', ['tokenText']],
	Memo: 'Not',
	'Migrate to Juicebox V1.1': "Juicebox V1.1'e geçiş yapın",
	'Mint as ERC-20': 'Mint as ERC-20',
	"Mint new {tokensLabel} into an account. Only a project's owner, a designated operator, or one of its terminal's delegates can mint its tokens.":
		[
			'Bir hesaba yeni ',
			['tokensLabel'],
			" token'ı basın. Bir projenin token'larını sadece o prejenin sahibi, belirlenmiş bir operatör veya terminallerinden birinin delegesi basabilir."
		],
	'Mint project tokens on demand': 'Mint project tokens on demand',
	'Mint tokens to a custom address.': 'Mint tokens to a custom address.',
	'Mint {tokensLabel}': ['Mint ', ['tokensLabel']],
	'Mint {tokensTokenLower}': ['Mint ', ['tokensTokenLower']],
	Minutes: 'Minutes',
	'More trending projects': 'Daha fazla ilgi gören proje',
	'Move your {tokensLabel} from the Juicebox contract to your wallet.': [
		['tokensLabel'],
		" token'larınızı Juicebox sözleşmesinden cüzdanınıza taşıyın."
	],
	'NO LIMIT': 'NO LIMIT',
	Name: 'İsim',
	New: 'Yeni',
	'Next: Funding cycle': 'Next: Funding cycle',
	'Next: Review and deploy': 'Next: Review and deploy',
	No: 'Hayır',
	'No activity yet': 'Henüz etkinlik yok',
	'No funding target: The project will control how all funds are distributed, and none can be redeemed by token holders.':
		'Finansman hedefi yok: Proje, tüm fonların nasıl dağıtılacağını kontrol eder ve hiçbiri token sahipleri tarafından talep edilemez.',
	'No limit': 'No limit',
	'No limit (infinite)': 'No limit (infinite)',
	'No more than the funding cycle target can be distributed by the project in a single funding cycle.':
		'Tek bir finansman döngüsünde proje, finansman döngüsü hedefinden daha fazlasını dağıtamaz.',
	'No past funding cycles': 'Geçmiş finansman döngüsü yok',
	'No strategy': 'Strateji yok',
	'No target': 'Hedef yok',
	'No target set.': 'Hedef belirlenmedi.',
	'Not set': 'Ayarlanmadı',
	Note: 'Not',
	'Note:': 'Not:',
	'Note: Juicebox is new, unaudited, and not guaranteed to work perfectly. Before spending money, do your own research: <0>ask questions</0>, <1>check out the code</1>, and understand the risks!':
		'Not: Juicebox yenidir, denetlenmemiştir ve kusursuz çalışması garanti edilmez. Para harcamadan önce kendi araştırmanızı yapın: sorular sorun, kodu inceleyin ve riskleri anlayın!',
	'Note: Tokens can be minted manually when allowed in the current funding cycle. This can be changed by the project owner for upcoming cycles.':
		'Note: Tokens can be minted manually when allowed in the current funding cycle. This can be changed by the project owner for upcoming cycles.',
	'Notice from {0}:': [['0'], ' tarafından yapılan bildirim:'],
	'Open source businesses': 'Açık kaynak işletmeleri',
	"Other assets in this project's owner's wallet.":
		'Bu projenin sahibinin cüzdanındaki diğer varlıklar.',
	"Overflow is created if your project's balance exceeds your funding cycle target. Overflow can be redeemed by your project's token holders.":
		'Projenizin bakiyesi finansman döngüsü hedefinizi aşarsa taşma oluşur. Taşma, projenizin token sahipleri tarafından talep edilerek kullanılabilir.',
	'Paid as <0/>': '<0/> olarak ödendi',
	'Pause payments': 'Ödemeleri duraklat',
	'Pause received payments': 'Alınan ödemeleri duraklat',
	Paused: 'Duraklatıldı',
	Pay: 'Ödeme',
	'Pay amount': 'Ödeme miktarı',
	'Pay button': 'Ödeme butonu',
	'Pay button text': 'Ödeme butonu metni',
	'Pay disclosure': 'Ödeme açıklaması',
	'Pay {0}': [['0'], ' Öde'],
	Payer: 'Ödeyen',
	"Paying <0>{0}</0> is not an investment — it's a way to support the project. Any value or utility of the tokens you receive is determined by {1}.":
		[
			'Paying <0>',
			['0'],
			"</0> is not an investment — it's a way to support the project. Any value or utility of the tokens you receive is determined by ",
			['1'],
			'.'
		],
	'Paying this project is currently disabled, because the token reserved rate is 100% and no tokens will be earned by making a payment.':
		'Bu projeye ödeme şu anda devredışı çünkü ayrılmış token oranı %100 ve ödeme yaparak token kazanılamaz.',
	'Paying this project is currently disabled.': 'Bu projeye ödeme şu anda devredışı.',
	Payments: 'Ödemeler',
	'Payments are paused for the current funding cycle.':
		'Mevcut finansman döngüsü için ödemeler duraklatıldı.',
	'Payments paused': 'Ödemeler duraklatıldı',
	'Payout amount': 'Payout amount',
	'Payout recipients': 'Ödeme alıcıları',
	'Payout splits': 'Payout splits',
	"Payout splits can't be scheduled when the distribution limit is Zero.":
		"Payout splits can't be scheduled when the distribution limit is Zero.",
	'Payouts (optional)': 'Ödemeler (isteğe bağlı)',
	'Payouts to Ethereum addresses incur a {feePercentage}% fee. Your project will receive JBX in return at the current issuance rate.':
		[
			'Payouts to Ethereum addresses incur a ',
			['feePercentage'],
			'% fee. Your project will receive JBX in return at the current issuance rate.'
		],
	"Peach's Juicebox Stand": "Peach'in Juicebox standı",
	Peel: 'Peel',
	'People using Juicebox are interacting with each other through public infrastructure—not a private, profit-seeking corporate service that brokers the exchange.':
		"Juicebox'ı kullanan kişiler, borsaya aracılık eden özel, kâr amaçlı kurumsal bir hizmet değil, kamu altyapısı aracılığıyla birbirleriyle etkileşime giriyor.",
	Percent: 'Percent',
	'Percent allocation': 'Yüzde tahsisi',
	'Percent of distribution limit': 'Percent of distribution limit',
	'Percentage of the distribution limit this payee will receive.':
		'Percentage of the distribution limit this payee will receive.',
	'Percentage this payee will receive of all funds raised.':
		'Percentage this payee will receive of all funds raised.',
	'Percentages must add up to 100% or less': 'Yüzdelerin toplamı %100 veya daha az olmalıdır',
	'Please contact the Juicebox dev team through our <0>Discord</0> to have your project archived.':
		'Please contact the Juicebox dev team through our <0>Discord</0> to have your project archived.',
	Podcast: 'Podcast',
	'Potential risks': 'Potential risks',
	'Powered by public smart contracts on':
		"'daki halka açık akıllı sözleşmelerle desteklenmektedir.",
	'Preview:': 'Preview:',
	'Programmable spending': 'Programlanabilir harcama',
	Project: 'Proje',
	'Project ID is a number.': 'Project ID is a number.',
	'Project ID:': 'Project ID:',
	'Project Token': "Proje Token'ı",
	'Project configuration': 'Proje proje yapılandırması',
	'Project description': 'Proje açıklaması',
	'Project details': 'Proje ayrıntıları',
	'Project details reconfigurations will create a separate transaction.':
		'Project details reconfigurations will create a separate transaction.',
	'Project for {ensName} not found': ['Project for ', ['ensName'], ' not found'],
	'Project handle': 'Proje tanıtıcısı',
	'Project handle must be unique.': 'Proje tanıtıcısı eşsiz olmalıdır.',
	'Project name': 'Proje adı',
	'Project name, handle, links, and other details.':
		'Proje adı, tanıtıcı, bağlantılar ve diğer ayrıntılar.',
	'Project owner': 'Proje sahibi',
	'Project owner (you)': 'Project owner (you)',
	'Project owners can configure a delay period, meaning reconfigurations to an upcoming funding cycle must be submitted a certain number of days before it starts. For example, a 3-day delay period means reconfigurations must be submitted at least 3 days before the next funding cycle starts. This gives token holders time to react to the decision and reduces the chance of rug-pulls.':
		'Project owners can configure a delay period, meaning reconfigurations to an upcoming funding cycle must be submitted a certain number of days before it starts. For example, a 3-day delay period means reconfigurations must be submitted at least 3 days before the next funding cycle starts. This gives token holders time to react to the decision and reduces the chance of rug-pulls.',
	'Project token': 'Project token',
	'Project {projectId} not found': ['Proje ', ['projectId'], ' bulunamadı'],
	Projects: 'Projeler',
	'Projects building on Juicebox pay a {JB_FEE}% JBX membership fee from withdrawn funds into the JuiceboxDAO treasury. Projects can then use their JBX to participate in the governance of JuiceboxDAO and its collective treasury, as well as redeem from its growing <0>overflow</0>. The fee is also subject to change via JBX member votes.':
		[
			'Projects building on Juicebox pay a ',
			['JB_FEE'],
			'% JBX membership fee from withdrawn funds into the JuiceboxDAO treasury. Projects can then use their JBX to participate in the governance of JuiceboxDAO and its collective treasury, as well as redeem from its growing <0>overflow</0>. The fee is also subject to change via JBX member votes.'
		],
	'Projects can be created with an optional discount rate designed to incentivize supporters to contribute earlier rather than later. The amount of tokens rewarded per amount paid to your project will decrease by the discount rate with each new funding cycle. A higher discount rate will incentivize supporters to pay your project earlier rather than later.':
		'Projects can be created with an optional discount rate designed to incentivize supporters to contribute earlier rather than later. The amount of tokens rewarded per amount paid to your project will decrease by the discount rate with each new funding cycle. A higher discount rate will incentivize supporters to pay your project earlier rather than later.',
	'Projects on Juicebox': "Juicebox'taki projeler",
	'Projects using Juicebox': 'Juicebox kullanan projeler',
	'Projects using a reserved rate of {reservedRateRiskyMin}% or more will appear risky to contributors, as a relatively small number of tokens will be received in exchange for paying your project.':
		[
			'%',
			['reservedRateRiskyMin'],
			' veya daha fazla ayrılmış oran kullanan projeler, projenizin ödenmesi karşılığında nispeten az sayıda token alınacağından, katkıda bulunanlar açısından riskli görünecektir.'
		],
	'Public goods and services': 'Kamu malları ve hizmetleri',
	'Rankings based on number of contributions and volume gained in the last {trendingWindow} days. <0>See code</0>':
		[
			'Katkı sayısına ve son ',
			['trendingWindow'],
			' gün içinde kazanılan hacme dayalı sıralamalar. <0>Kodu gör</0>'
		],
	'Receive ERC-20': 'ERC-20 al',
	'Receive {receiveText}': [['receiveText'], ' alın'],
	'Recipients will receive payouts in ETH.': 'Recipients will receive payouts in ETH.',
	Reconfiguration: 'Yeniden yapılandırma',
	'Reconfiguration rules': 'Reconfiguration rules',
	'Reconfiguration strategy': 'Yeniden yapılandırma stratejisi',
	Reconfigure: 'Yeniden yapılandır',
	'Reconfigure funding': 'Finansmanı yeniden yapılandır',
	'Reconfigure project details': 'Proje detaylarını yeniden yapılandır',
	'Reconfigure rules': 'Kuralları yeniden yapılandır',
	'Reconfigure token': 'Reconfigure token',
	'Reconfigure upcoming': 'Yaklaşanları yeniden yapılandır',
	'Reconfigure upcoming funding': 'Yaklaşan finansmanı yeniden yapılandır',
	'Reconfigure upcoming funding cycles': 'Reconfigure upcoming funding cycles',
	Redeem: 'Talep edin',
	"Redeem your {tokensLabel} for a portion of the project's overflow. Any {tokensLabel} you redeem will be burned.":
		[
			'Redeem your ',
			['tokensLabel'],
			" for a portion of the project's overflow. Any ",
			['tokensLabel'],
			' you redeem will be burned.'
		],
	'Redeem {0} {tokensTextShort} for ETH': ['Redeem ', ['0'], ' ', ['tokensTextShort'], ' for ETH'],
	'Redeem {tokensLabel} for ETH': [['tokensLabel'], " token'larını ETH için kullan"],
	'Redeem {tokensTextLong} for ETH': ['Redeem ', ['tokensTextLong'], ' for ETH'],
	'Redemption rate': 'Kullanım oranı',
	'Redemption rate: <0>{0}%</0>': ['Redemption rate: <0>', ['0'], '%</0>'],
	'Redistributable surplus': 'Yeniden dağıtılabilir fazlalık',
	Refresh: 'Yenile',
	Required: 'Gerekli',
	'Reserved rate': 'Ayrılmış oran',
	'Reserved token allocation (optional)': 'Ayrılmış token tahsisi (isteğe bağlı)',
	'Reserved token allocations': 'Ayrılmış token tahsisleri',
	'Reserved tokens': "Ayrılmış token'lar",
	'Reserved {0}': ['Ayrılmış ', ['0']],
	'Reserved {tokenSymbolPlural}': ['Ayrılmış ', ['tokenSymbolPlural']],
	'Reserved {tokenTextPlural}: <0>{reservedTokensFormatted} {tokenTextPlural}</0>': [
		'Ayrılmış ',
		['tokenTextPlural'],
		': <0>',
		['reservedTokensFormatted'],
		' ',
		['tokenTextPlural'],
		'</0>'
	],
	'Reserved {tokensText}': ['Ayrılmış ', ['tokensText']],
	Reserves: 'Ayrılanlar',
	Resources: 'Kaynaklar',
	'Restrict how the owner can reconfigure upcoming funding cycles to mitigate abuse of power. <0>Learn more.</0>':
		'Restrict how the owner can reconfigure upcoming funding cycles to mitigate abuse of power. <0>Learn more.</0>',
	'Restrict payments and printing tokens.': 'Ödemeleri ve token basımını kısıtlayın.',
	'Restricted actions': 'Kısıtlanmış eylemler',
	'Review & Deploy': 'İncele ve Dağıt',
	'Review project': 'Projeyi gözden geçir',
	'Review project configuration': 'Review project configuration',
	'Reward specific community members with tokens.':
		"Belirli topluluk üyelerini token'larla ödüllendirin.",
	Rules: 'Kurallar',
	'Rules for determining how funding cycles can be reconfigured':
		'Finansman döngülerinin nasıl yeniden yapılandırılabileceğini belirleyen kurallar',
	'Rules for how changes can be made to your project.':
		'Projenizde nasıl değişiklik yapılabileceğine ilişkin kurallar.',
	"Rules for how this project's funding cycles can be reconfigured.":
		'Bu projenin finansman döngülerinin nasıl yeniden yapılandırılabileceğine ilişkin kurallar.',
	Save: 'Kaydet',
	'Save changes': 'Değişiklikleri kaydet',
	'Save funding configuration': 'Finansman yapılandırmasını kaydet',
	'Save handle': 'Tanıtıcıyı kaydet',
	'Save payouts': 'Ödemeleri kaydet',
	'Save project details': 'Proje ayrıntılarını kaydet',
	'Save reconfiguration': 'Yeniden yapılandırmayı kaydet',
	'Save rules': 'Save rules',
	'Save split': 'Save split',
	'Save token allocation': 'Token tahsisini kaydet',
	'Save token configuration': 'Save token configuration',
	'Save token receiver': 'Token alıcısını kaydet',
	'Save tracked assets': 'İzlenen varlıkları kaydet',
	'Search projects by handle': 'Tanıtıcıya göre proje ara',
	Seconds: 'Seconds',
	'See transaction': 'İşlemi gör',
	'Set a funding cycle duration': 'Bir finansman döngüsü süresi belirleyin',
	'Set a funding cycle target': 'Bir finansman döngüsü hedefi belirleyin',
	"Set a funding target to cover predictable expenses. Any extra funds (<0>overflow</0>) can be claimed by anyone holding your project's tokens alongside you.":
		"Öngörülebilir masrafları karşılamak için bir finansman hedefi belirleyin. Tüm ekstra fonlar (<0>taşma</0>), sizinle beraber projenizin token'larını tutan herhangi biri tarafından talep edilebilir.",
	"Set the amount of funds you'd like to distribute from your treasury each funding cycle.":
		"Set the amount of funds you'd like to distribute from your treasury each funding cycle.",
	"Set the amount of funds you'd like to raise each funding cycle. Any funds raised within the funding cycle target can be distributed by the project, and can't be redeemed by your project's token holders.":
		'Her finansman döngüsünde toplamak istediğiniz fon miktarını belirleyin. Finansman döngüsü hedefi dahilinde toplanan fonlar proje tarafından dağıtılabilir ve projenizin token sahipleri tarafından talep edilemez.',
	'Set the length of your funding cycles, which can enable:':
		'Set the length of your funding cycles, which can enable:',
	'Set the length of your funding cycles.': 'Finansman döngülerinizin süresini belirleyin.',
	'Should you Juicebox?': 'Juicebox’a katılmalı mısın?',
	'Since you have not set a funding duration, changes to these settings will be applied immediately.':
		'Bir finansman süresi belirlemediğiniz için bu ayarlarda yapılan değişiklikler hemen uygulanacaktır.',
	'Some funding cycle properties may indicate risk for project contributors.':
		'Bazı finansman döngüsü özellikleri projeye katkıda bulunanlar için risk oluşturabilir.',
	"Some properties of the project's current funding cycle may indicate risk for contributors.":
		"Some properties of the project's current funding cycle may indicate risk for contributors.",
	'Specific limit': 'Specific limit',
	Spending: 'Harcama',
	'Staked balance': 'Stake edilen bakiye',
	Start: 'Başlangıç',
	'Start Over': 'Baştan Başla',
	'Sum of percentages cannot exceed 100%': "Yüzdelerin toplamı %100'ü aşamaz",
	'Sum of percentages cannot exceed 100%.': "Yüzdelerin toplamı %100'ü aşamaz.",
	Target: 'Hedef',
	'Target is 0: All funds will be considered overflow and can be redeemed by burning project tokens.':
		"Hedef 0: Tüm fonlar taşma olarak kabul edilecek ve proje token'ları yakılarak kullanılabilecektir.",
	'Text displayed on your project\'s "pay" button. Leave this blank to use the default.':
		'Projenizin "Ödeme" butonunda görüntülenen metin. Varsayılanı kullanmak için boş bırakın.',
	"That's the plan, but the core Juicebox contracts will first be deployed to Ethereum Mainnet.":
		"Plan bu, ancak çekirdek Juicebox sözleşmeleri önce Ethereum Mainnet'e dağıtılacak.",
	'The JBX protocol is unaudited, and projects built on it may be vulnerable to bugs or exploits. Be smart!':
		'JBX protokolü denetlenmez ve bunun üzerine inşa edilen projeler hatalara veya açıklardan yararlanmaya karşı savunmasız olabilir. Dikkatli olunmalıdır!',
	'The Juicebox V2 frontend is still in development. It is <0>not recommended</0> for use on mainnet. Some features are missing and there are known bugs. <1>Use with caution.</1>':
		'The Juicebox V2 frontend is still in development. It is <0>not recommended</0> for use on mainnet. Some features are missing and there are known bugs. <1>Use with caution.</1>',
	'The Juicebox V2 frontend is still in development. Some features are missing and there are known bugs.':
		'The Juicebox V2 frontend is still in development. Some features are missing and there are known bugs.',
	'The Juicebox protocol is governed by a community of JBX token holders who vote on proposals fortnightly.':
		'Juicebox protokolü, iki haftada bir tekliflere oy veren JBX token sahipleri topluluğu tarafından yönetilir.',
	'The address of any smart contract deployed on {signerNetwork} that implements': [
		'Bu arayüzü uygulayan ',
		['signerNetwork'],
		' üzerinde dağıtılmış herhangi bir akıllı sözleşmenin adresi'
	],
	'The address that should receive the tokens minted from paying this project.':
		"Bu projeye ödeme yaparak basılan token'ları alması gereken adres.",
	'The amount of tokens this project has reserved. These tokens can be distributed to reserved token beneficiaries.':
		'The amount of tokens this project has reserved. These tokens can be distributed to reserved token beneficiaries.',
	'The amount of tokens to mint to the receiver.': 'The amount of tokens to mint to the receiver.',
	'The amount that has been distributed from the Juicebox balance in this funding cycle, out of the current distribution limit. No more than the distribution limit can be distributed in a single funding cycle—any remaining ETH in Juicebox is overflow, until the next cycle begins.':
		'The amount that has been distributed from the Juicebox balance in this funding cycle, out of the current distribution limit. No more than the distribution limit can be distributed in a single funding cycle—any remaining ETH in Juicebox is overflow, until the next cycle begins.',
	'The amount that has been distributed from the Juicebox balance in this funding cycle, out of the current funding target. No more than the funding target can be distributed in a single funding cycle—any remaining ETH in Juicebox is overflow, until the next cycle begins.':
		"Mevcut finansman hedefinin dışında, bu finansman döngüsünde Juicebox bakiyesinden dağıtılan miktar. Tek bir finansman döngüsünde finansman hedefinden daha fazlası dağıtılamaz; Juicebox'ta kalan ETH, bir sonraki döngü başlayana kadar taşma durumundadır.",
	"The balance of the project owner's wallet.": 'Proje sahibinin cüzdan bakiyesi.',
	'The balance of this project in the Juicebox contract.':
		'Bu projenin Juicebox sözleşmesindeki bakiyesi.',
	"The code could always use more eyes and more critique to further the community's confidence. Join our <0>Discord</0> and check out the code on <1>GitHub</1> to work with us.":
		"Kod, topluluğun güvenini artırmak için her zaman daha fazla göz ve daha fazla eleştiriden faydalabilir. <0>Discord</0>'umuza katılın ve bizimle çalışmak için <1>Github</1>'daki kodu inceleyin.",
	'The contract team will soon start working on L2 payment terminals for Juicebox projects.':
		'Sözleşme ekibi yakında, Juicebox projeleri için L2 ödeme terminalleri üzerinde çalışmaya başlayacak.',
	'The distribution limit for this funding cycle is 0, meaning all funds in Juicebox are currently considered overflow. Overflow can be redeemed by token holders, but not distributed.':
		'The distribution limit for this funding cycle is 0, meaning all funds in Juicebox are currently considered overflow. Overflow can be redeemed by token holders, but not distributed.',
	"The funds available to distribution for this funding cycle (before the {feePercentage}% JBX fee is subtracted). This number won't roll over to the next funding cycle, so funds should be distributed before this funding cycle ends.":
		[
			'The funds available to distribution for this funding cycle (before the ',
			['feePercentage'],
			"% JBX fee is subtracted). This number won't roll over to the next funding cycle, so funds should be distributed before this funding cycle ends."
		],
	'The future will be led by creators, and owned by communities.':
		'Gelecek, içerik üreticileri tarafından yönetilecek ve topluluklara ait olacak.',
	'The issuance rate will decrease by this percentage with each new funding cycle. A higher discount rate will incentivize supporters to pay your project earlier than later.':
		'The issuance rate will decrease by this percentage with each new funding cycle. A higher discount rate will incentivize supporters to pay your project earlier than later.',
	'The maximum amount of funds that can be distributed from this project in one funding cycle. Funds will be withdrawn in ETH no matter the currency you choose.':
		'Bir finansman döngüsü içinde bu projeden dağıtılabilecek maksimum fon miktarı. Fonlar, hangi para birimini seçerseniz seçin ETH olarak çekilecektir.',
	'The percent this individual receives of the overall {reservedRate}% reserved token allocation': [
		'Bu kişinin toplam %',
		['reservedRate'],
		' ayrılmış token tahsisinden aldığı yüzde'
	],
	'The project owner may mint any supply of tokens at any time, diluting the token share of all existing contributors.':
		'Proje sahibi, herhangi bir zamanda herhangi bir miktarda token basarak tüm mevcut katkı sahiplerinin token payını azaltabilir.',
	'The project owner may reconfigure this funding cycle at any time, without notice.':
		'Proje sahibi, bu finansman döngüsünü, herhangi bir zamanda, bildirimde bulunmadan yeniden yapılandırabilir.',
	"The project's tokens that are minted and distributed as a result of a received payment are ERC-20's. The amount of tokens minted and distributed are proportional to the volume of payments received, weighted by the project's discount rate over time.":
		"Alınan bir ödeme sonucunda basılan ve dağıtılan proje token'ları ERC-20 tipi token'lardır. Basılan ve dağıtılan token miktarı, alınan ödeme hacmiyle orantılıdır ve projenin zaman içindeki indirim oranıyla ağırlıklandırılır.",
	'The ratio of tokens rewarded per payment amount will decrease by this percentage with each new funding cycle. A higher discount rate will incentivize supporters to pay your project earlier than later.':
		"Ödeme tutarı başına verilen token'ların oranı, her yeni finansman döngüsünde bu yüzde oranında azalacaktır. Daha yüksek bir indirim oranı, destekçileri projenizi daha erken ödemeye teşvik edecektir.",
	'The rest is left to share between token holders.':
		'The rest is left to share between token holders.',
	'The target for this funding cycle is 0, meaning all funds in Juicebox are currently considered overflow. Overflow can be redeemed by token holders, but not distributed.':
		"Bu finansman döngüsü için hedef 0'dır, yani Juicebox'taki tüm fonlar şu anda taşma olarak kabul edilir. Taşma, token sahipleri tarafından talep edilerek kullanılabilir, ancak dağıtılamaz.",
	'The total amount received by this project through Juicebox since it was created.':
		'Oluşturulma tarihinden bu yana, bu proje tarafından Juicebox aracılığıyla alınan toplam miktar.',
	'There are no payouts defined for this funding cycle. The project owner will recieve all available funds.':
		'Bu finansman döngüsü için tanımlı ödeme yok. Mevcut tüm fonları proje sahibi alacak.',
	'There are no reserved token recipients defined for this funding cycle. The project owner will receive all available tokens.':
		'There are no reserved token recipients defined for this funding cycle. The project owner will receive all available tokens.',
	'There are unit tests written for every condition of every function in the contracts, and integration tests for every workflow that the protocol supports.':
		'Sözleşmelerdeki her fonksiyonun her koşulu için yazılmış birim testleri ve protokolün desteklediği her iş akışı için entegrasyon testleri vardır.',
	'There was also a script written to iteratively run the integration tests using a random input generator, prioritizing edge cases. The code has successfully passed over 1 million test cases through this stress-testing script.':
		'Ayrıca, uç senaryolara öncelik vererek, rastgele bir girdi oluşturucu aracılığıyla entegrasyon testlerini yinelemeli olarak çalıştırmak için yazılmış bir komut dosyası da vardı. Kod, bu stres testi komut dosyası aracılığıyla 1 milyondan fazla test senaryosunu başarıyla geçti.',
	'These attributes can be changed at any time.':
		'Bu nitelikler herhangi bir zamanda değiştirilebilir.',
	'These settings will <0>not</0> be editable immediately within a funding cycle. They can only be changed for <1>upcoming</1> funding cycles.':
		'Bu ayarlar, bir finansman döngüsü içinde hemen <0>düzenlenemez</0>. Yalnızca <1>yaklaşan</1> finansman döngüleri için değiştirilebilirler.',
	'This address is an unrecognized strategy contract. Make sure it is correct!':
		'Bu adres, tanınmayan bir strateji sözleşmesine aittir. Doğru olduğundan emin olun!',
	'This address will receive any tokens minted when the recipient project gets paid.':
		"Bu adres, alıcı projeye ödeme yapıldığında basılan tüm token'ları alacaktır.",
	'This address will receive the tokens minted from paying this project.':
		'This address will receive the tokens minted from paying this project.',
	'This funding cycle may pose risks to contributors. Check the funding cycle details before paying this project.':
		'Bu finansman döngüsü katkı sahipleri için risk oluşturabilir. Bu projeye ödeme yapmadan önce finansman döngüsü detaylarını kontrol edin.',
	'This list is using an experimental data index and may be inaccurate for some projects.':
		'Bu liste deneysel bir veri dizini kullanıyor ve bazı projeler için doğru olmayabilir.',
	"This means that anyone can see the code that they're using, anyone can use the code without asking for permission, and no one can mess with the code or take it down.":
		'Bu, herkesin kullandığı kodu görebileceği, herkesin izin istemeden kodu kullanabileceği ve hiç kimsenin kodu bozamayacağı veya kodu kaldıramayacağı anlamına gelir.',
	'This project has been archived and cannot be paid.': 'Bu proje arşivlendi ve ödeme yapılamaz.',
	'This project is currently using the Juicebox V1 terminal contract. New features introduced in V1.1 allow the project owner to:':
		"Bu proje şu anda Juicebox V1 terminal sözleşmesini kullanıyor. V1.1'de tanıtılan yeni özellikler, proje sahibinin şunları yapmasına olanak tanır:",
	'This project uses the V2 version of the Juicebox contracts.':
		'Bu proje, Juicebox sözleşmelerinin V2 sürümünü kullanır.',
	'This rate determines the amount of overflow that each token can be redeemed for at any given time. On a lower bonding curve, redeeming a token increases the value of each remaining token, creating an incentive to hold tokens longer than others. A bonding curve of 100% means all tokens will have equal value regardless of when they are redeemed.':
		'This rate determines the amount of overflow that each token can be redeemed for at any given time. On a lower bonding curve, redeeming a token increases the value of each remaining token, creating an incentive to hold tokens longer than others. A bonding curve of 100% means all tokens will have equal value regardless of when they are redeemed.',
	'This rate determines the amount of overflow that each token can be redeemed for at any given time. On a lower bonding curve, redeeming a token increases the value of each remaining token, creating an incentive to hold tokens longer than others. A redemption rate of 100% means all tokens will have equal value regardless of when they are redeemed.':
		'This rate determines the amount of overflow that each token can be redeemed for at any given time. On a lower bonding curve, redeeming a token increases the value of each remaining token, creating an incentive to hold tokens longer than others. A redemption rate of 100% means all tokens will have equal value regardless of when they are redeemed.',
	'This rate determines the amount of overflow that each token can be redeemed for at any given time. On a lower redemption rate, redeeming a token increases the value of each remaining token, creating an incentive to hold tokens longer than others. The default redemption rate of 100% means all tokens will have equal value regardless of when they are redeemed. Learn more in this <0>short video</0>.':
		'This rate determines the amount of overflow that each token can be redeemed for at any given time. On a lower redemption rate, redeeming a token increases the value of each remaining token, creating an incentive to hold tokens longer than others. The default redemption rate of 100% means all tokens will have equal value regardless of when they are redeemed. Learn more in this <0>short video</0>.',
	'This text will be displayed to your supporters before they complete their payment.':
		'Bu metin, ödemelerini tamamlamadan önce destekçilerinize gösterilecektir.',
	"This website (juicebox.money) connects to the Juicebox protocol's smart contracts, deployed on the Ethereum network. (note: anyone else can make a website that also connects to these same smart contracts. For now, don't trust any site other than this one to access the Juicebox protocol).":
		'Bu web sitesi (juicebox.money), Juicebox protokolünün Ethereum ağına dağıtılmış akıllı sözleşmelerine bağlanır. (Not: Aynı akıllı sözleşmelere bağlanan bir web sitesini herkes yapabilir. Juicebox protokolüne erişmek için şimdilik bundan başka bir siteye güvenmeyin.)',
	'This will erase all of your changes.': 'Yaptığınız tüm değişiklikler silinecektir.',
	'To: <0/>': 'Kime: <0/>',
	Token: 'Token',
	'Token address: <0/>': 'Token adresi: <0/>',
	'Token beneficiary address': 'Token beneficiary address',
	'Token beneficiary:': 'Token beneficiary:',
	'Token minting': 'Token basımı',
	'Token minting allows the project owner to mint project tokens at any time.':
		'Token minting allows the project owner to mint project tokens at any time.',
	"Token minting is only available for V1.1 projects. Token minting can be enabled or disabled by reconfiguring the project's funding cycle.":
		'Token basma seçeneği yalnızca V1.1 projelerinde kullanılabilir. Token basma seçeneği, projenin finansman döngüsü yeniden yapılandırılarak etkinleştirilebilir veya devre dışı bırakılabilir.',
	'Token name': 'Token adı',
	'Token redeem value': 'Token kullanma değeri',
	'Token symbol': 'Token sembolü',
	Tokens: "Token'lar",
	'Tokens are earned by anyone who pays your project, and can be redeemed for overflow if your project has set a funding target.':
		"Token'lar, projenize ödeme yapan herkes tarafından kazanılır ve projenizde bir finansman hedefi belirlendiyse taşma için kullanılabilir.",
	"Tokens can be redeemed for a portion of a project's <0>overflow</0>, letting you benefit from its success. After all, you helped it get there. The token may also give you exclusive member-only privledges, and allow you to contribute to the governance of the community.":
		"Token'lar, bir projenin <0>taşmasının</0> bir kısmı için kullanılarak projenin başarısından yararlanmanıza izin verir. Sonuçta, oraya ulaşmasına yardım eden sizsiniz. Token'lar, size yalnızca üyelere özel ayrıcalıklar tanıyarak topluluk yönetişimine katkıda bulunmanıza olanak da tanıyabilir.",
	"Tokens can be redeemed for a portion of this project's ETH overflow, according to the bonding curve rate of the current funding cycle. <0>Tokens are burned when they are redeemed.</0>":
		"Token'lar, mevcut finansman döngüsünün bağlanma eğrisi oranına göre bu projenin ETH taşmasının bir kısmı için kullanılabilir. <0>Token'lar, kullanıldıklarında yakılır.</0>",
	"Tokens can be redeemed for a portion of this project's ETH overflow, according to the redemption rate of the current funding cycle. <0>Tokens are burned when they are redeemed.</0>":
		"Tokens can be redeemed for a portion of this project's ETH overflow, according to the redemption rate of the current funding cycle. <0>Tokens are burned when they are redeemed.</0>",
	'Tokens cannot be claimed because no ERC-20 token has been issued for this project. ERC-20 tokens must be issued by the project owner.':
		'Tokens cannot be claimed because no ERC-20 token has been issued for this project. ERC-20 tokens must be issued by the project owner.',
	'Tokens receiver': 'Tokens receiver',
	'Tokens:': "Token'lar:",
	Tools: 'Araçlar',
	'Total ETH paid': 'Ödenen toplam ETH',
	'Total funds:': 'Toplam fon:',
	'Total raised': 'Total raised',
	'Total supply': 'Toplam arz',
	'Total: {0}%': ['Toplam: %', ['0']],
	'Transaction pending...': 'İşlem beklemede...',
	'Transfer ownership': 'Mülkiyeti aktar',
	'Transfer unclaimed {tokenSymbolShort}': [
		'Talep edilmemiş ',
		['tokenSymbolShort'],
		" token'larını aktar"
	],
	'Transfer {tokenSymbolShort}': [['tokenSymbolShort'], " token'larını aktar"],
	'Transparency & accountability': 'Şeffaflık ve hesap verebilirlik',
	Trending: 'Trending',
	Twitter: 'Twitter',
	'Unarchive project': 'Projeyi arşivden kaldır',
	Unavailable: 'Mevcut değil',
	'Unless payments are paused in your funding cycle settings, your project will still be able to receive payments directly through the Juicebox protocol contracts.':
		'Ödemeler finansman döngüsü ayarlarınızdan duraklatılmadıkça projeniz, doğrudan Juicebox protokolü sözleşmeleri aracılığıyla ödeme almaya devam edebilecektir.',
	'Unstaked balance': "Stake'den kaldırılan bakiye",
	'Untitled project': 'İsimsiz proje',
	Upcoming: 'Yaklaşan',
	'Updates you make to this section will only be applied to <0>upcoming</0> funding cycles.':
		'Bu bölümde yaptığınız güncellemeler yalnızca <0>gelecek</0> finansman döngülerine uygulanacaktır.',
	Upload: 'Yükle',
	'Uploaded to: <0>{url}</0>': ['Şuraya yüklendi: <0>', ['url'], '</0>'],
	"Users fund your project by paying to use your app or service, or as a patron or investor by making a payment directly to your project's smart contract (like on this app).":
		'Kullanıcılar, uygulamanızı veya hizmetinizi kullanmak için ödeme yaparak veya doğrudan projenizin akıllı sözleşmesine (bu uygulamadaki gibi) ödeme yaparak bir kullanıcı veya yatırımcı olarak projenizi finanse eder.',
	'Using a duration is recommended. Allowing funding cycles to be reconfigured at any time will appear risky to contributors.':
		'Bir süre kullanılması önerilir. Finansman döngülerinin herhangi bir zamanda yeniden yapılandırılmasına izin vermek, katkıda bulunanlar açısından riskli görünecektir.',
	'Using a reconfiguration strategy is recommended. Projects with no strategy will appear risky to contributors.':
		'Yeniden yapılandırma stratejisi kullanılması önerilir. Stratejisi olmayan projeler, katkıda bulunanlar açısından riskli görünecektir.',
	V1: 'V1',
	'V1.1': 'V1.1',
	'Version of the terminal contract used by this project.':
		'Bu proje tarafından kullanılan terminal sözleşmesinin sürümü.',
	Volume: 'Hacim',
	'Wallet address': 'Cüzdan adresi',
	Website: 'Web sitesi',
	'What are community tokens?': 'Topluluk tokenleri nedir?',
	'What are the risks?': 'Riskler nelerdir?',
	'What does Juicebox cost?': "Juicebox'ın maliyeti nedir?",
	'What is overflow?': 'Taşma nedir?',
	"What's a bonding curve?": 'Bağlanma eğrisi nedir?',
	"What's a discount rate?": 'İndirim oranı nedir?',
	"What's going on under the hood?": 'Kaputun altında neler oluyor?',
	'When enabled, the project owner can manually mint any amount of tokens to any address.':
		'When enabled, the project owner can manually mint any amount of tokens to any address.',
	'When enabled, your project cannot receive direct payments.':
		'When enabled, your project cannot receive direct payments.',
	"When someone pays your project, they'll receive your project's tokens in return. Tokens can be redeemed for a portion of your project's overflow funds; when you win, your community wins with you. Leverage your project's token to grant governance rights, community access, or other membership perks.":
		"When someone pays your project, they'll receive your project's tokens in return. Tokens can be redeemed for a portion of your project's overflow funds; when you win, your community wins with you. Leverage your project's token to grant governance rights, community access, or other membership perks.",
	"When token minting is allowed, the owner of this project has permission to mint any number of tokens to any address at their discretion. This has the effect of diluting all current token holders, without increasing the project's treasury balance. The project owner can reconfigure this along with all other properties of the funding cycle.":
		'Token basımına izin verildiğinde bu projenin sahibi, kararı kendisine ait olmak üzere, herhangi bir adrese, herhangi bir sayıda token basma iznine sahip olacaktır. Bu, projenin hazine bakiyesini artırmadan tüm mevcut token sahiplerinin etkisini azaltabilir. Proje sahibi bunu, finansman döngüsünün diğer tüm özellikleriyle birlikte yapılandırabilir.',
	'Whenever someone pays your project, this percentage of tokens will be reserved and the rest will go to the payer.':
		'Whenever someone pays your project, this percentage of tokens will be reserved and the rest will go to the payer.',
	'Whenever someone pays your project, this percentage of tokens will be reserved and the rest will go to the payer. Reserve tokens are reserved for the project owner by default, but can also be allocated to other wallet addresses by the owner. Once tokens are reserved, anyone can "mint" them, which distributes them to their intended receivers.':
		'Birisi projenize ödeme yaptığında bu token yüzdesi ayrılacak ve geri kalanı ödeme yapan kişiye gidecektir. Ayrılmış token\'lar, varsayılan olarak proje sahibi için ayrılır ancak proje sahibi tarafından diğer cüzdan adreslerine de tahsis edilebilir. Token\'lar ayrıldıktan sonra herkes onları "basabilir" ve bu işlem, onları amaçlanan alıcılarına dağıtır.',
	'Who funds Juicebox projects?': 'Juicebox projelerini kim finanse ediyor?',
	'Who is Peel?': 'Peel kimdir?',
	'Why Ethereum?': 'Neden Ethereum?',
	"Why should I want to own a project's tokens?":
		'Neden bir projenin tokenlerine sahip olmak isteyeyim?',
	'Will be rounded to <0/>{0}': ['Will be rounded to <0/>', ['0']],
	'Will it work on L2s?': "L2'lerde çalışacak mı?",
	'With Juicebox, projects are built and maintained by motivated punks getting paid transparently, and funded by a community of users and patrons who are rewarded as the projects they support succeed.':
		'Juicebox ile projeler, motive olmuş punklar tarafından şeffaf bir şekilde ödenir ve destekledikleri projeler başarılı oldukça ödüllendirilen bir kullanıcı ve kullanıcı topluluğu tarafından finanse edilir ve sürdürülür.',
	'With a distribution limit of Zero, no funds can be distributed by the project. All funds belong to token holders as overflow.':
		'With a distribution limit of Zero, no funds can be distributed by the project. All funds belong to token holders as overflow.',
	"With an infinite distribution limit, all funds can be distributed by the project. The project will have no overflow, meaning token holders won't be able to redeem their tokens for treasury funds.":
		"With an infinite distribution limit, all funds can be distributed by the project. The project will have no overflow, meaning token holders won't be able to redeem their tokens for treasury funds.",
	Withdraw: 'Çek',
	'Withdraw funds': 'Fonları çek',
	Workspace: 'Çalışma Alan',
	"Would you like to issue an ERC-20 token to be used as this project's token?":
		"Would you like to issue an ERC-20 token to be used as this project's token?",
	Yes: 'Evet',
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
			['tokenSymbol'],
			" token'larınızı taşma için talep etmeden de kullanabilir ve talep edilmemiş ",
			['tokenSymbol'],
			" token'larınızı, bu projenin sağ üst köşesindeki anahtar simgesiyle erişebileceğiniz Araçlar menüsünden başka bir adrese aktarabilirsiniz."
		],
	'You have set a funding cycle target.': 'Bir finansman döngüsü hedefi belirlediniz.',
	'You will receive minimum {minReturnedTokensFormatted} ETH': [
		'You will receive minimum ',
		['minReturnedTokensFormatted'],
		' ETH'
	],
	'You will receive {0}{1} ETH': [['0'], ['1'], ' ETH alacaksınız'],
	'You will receive {minReturnedTokensFormatted} ETH': [
		'You will receive ',
		['minReturnedTokensFormatted'],
		' ETH'
	],
	"You'll be able to issue ERC-20 tokens once your project contract has been deployed. Until then, the protocol will track token balances, allowing your supporters to earn tokens and redeem for overflow in the meantime.":
		"Proje sözleşmeniz dağıtıldıktan sonra ERC-20 token'larını çıkarabileceksiniz. O zamana kadar protokol, token bakiyelerini takip ederek destekçilerinizin bu arada token kazanmasına ve onları taşma için kullanmasına izin verecektir.",
	'Your balance': 'Bakiyeniz',
	'Your balance: {0}': ['Bakiyeniz: ', ['0']],
	'Your feedback will be sent to a <0>public Discord channel </0>for our development team to consider.':
		'Geri bildiriminiz, geliştirme ekibimizin dikkate alması için <0>herkese açık bir Discord kanalına </0>gönderilecektir.',
	'Your project cannot receive direct payments while paused.':
		'Projeniz duraklatıldığında doğrudan ödeme alamaz.',
	"Your project is funded across funding cycles. A funding cycle has a funding target and a duration. Your project's funding cycle configuration will depend on the kind of project you're starting.":
		'Projeniz finansman döngüleri boyunca finanse edilir. Bir finansman döngüsü, bir finansman hedefine ve süreye sahiptir. Projenizin finansman döngüsü yapılandırması, başlattığınız projenin türüne bağlı olacaktır.',
	'Your project will appear archived, and will not be able to receive payments through the juicebox.money app. You can unarchive a project at any time. Please allow a few days for your project to appear under the "archived" filter on the Projects page.':
		'Your project will appear archived, and will not be able to receive payments through the juicebox.money app. You can unarchive a project at any time. Please allow a few days for your project to appear under the "archived" filter on the Projects page.',
	'Your project will be created on the Juicebox V2 contracts. <0>Learn more.</0>':
		'Your project will be created on the Juicebox V2 contracts. <0>Learn more.</0>',
	'Your project will immediately appear active on the juicebox.money app. Please allow a few days for it to appear in the "active" projects list on the Projects page.':
		'Projeniz juicebox.money uygulamasında hemen aktif olarak görünecektir. Projenizin projeler sayfasında, "aktif projeler" listesinde görünmesi için lütfen birkaç gün bekleyin.',
	'Your project will still be able to receive payments directly through the Juicebox protocol contracts.':
		'Your project will still be able to receive payments directly through the Juicebox protocol contracts.',
	"Your project's Twitter handle.": 'Projenizin Twitter hesabı.',
	"Your project's funding cycle target and duration.":
		'Projenizin finansman döngüsü hedefi ve süresi.',
	"Your project's website.": 'Projenizin web sitesi.',
	'Your transaction has been submitted and is awaiting confirmation.':
		'Your transaction has been submitted and is awaiting confirmation.',
	'Your unclaimed {tokenTextLong}': ['Your unclaimed ', ['tokenTextLong']],
	'Zero, no funds can be distributed': 'Zero, no funds can be distributed',
	'after {0}% JBX fee': ['%', ['0'], ' JBX ücretinden sonra'],
	'characters max': 'maks karakter',
	days: 'gün',
	handle: 'tanıtıcı',
	'https://discord.gg/abcdefgh': 'https://discord.gg/abcdefgh',
	'https://your-project.com': 'https://your-project.com',
	juiceboxETH: 'juiceboxETH',
	'last {trendingWindowDays} days': ['son ', ['trendingWindowDays'], ' gün'],
	loading: 'yükleniyor',
	'locked until {lockedUntilFormatted}': ['locked until ', ['lockedUntilFormatted']],
	'matching "{searchText}"': ['"', ['searchText'], '" ile eşleşen'],
	'or <0><1>buy {tokenText} on exchange<2/></1></0>': [
		'veya <0><1>borsada ',
		['tokenText'],
		' satın alın<2/></1></0>'
	],
	project: 'proje',
	'project owner': 'proje sahibi',
	projects: 'projeler',
	token: 'token',
	tokens: "token'lar",
	'tokens redeemed': "kullanılan token'lar",
	until: 'sonra',
	'{0} after JBX fee': ['JBX ücreti sonrası ', ['0']],
	'{0} ago': [['0'], ' önce'],
	"{0} are distributed to anyone who pays this project. If the project has set a funding target, tokens can be redeemed for a portion of the project's overflow whether or not they have been claimed yet.":
		[
			['0'],
			" token'ları bu projeye ödeme yapan herkese dağıtılır. Proje için bir finansman hedefi belirlenmişse token'lar, talep edilmiş olup olmadıklarına bakılmaksızın proje taşmasının bir miktarı için kullanılabilir."
		],
	'{0} balance': [['0'], ' bakiyesi'],
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
	'{0} contributed': [['0'], ' katkı'],
	'{0} days': [['0'], ' gün'],
	'{0} for you': ['Size ait ', ['0']],
	'{0} holders': [['0'], ' sahipleri'],
	'{0} reserved': ['Ayrılan ', ['0']],
	'{0} staked': ['stake edilen ', ['0']],
	'{0} total': ['Toplam ', ['0']],
	'{0} will go to the project owner: <0/>': [['0'], ' proje sahibine gidecek: <0/>'],
	'{0} withdrawn': [['0'], ' çekildi'],
	'{0} {1} reserved': [['0'], ['1'], ' ayrıldı'],
	'{0}% of supply': ['%', ['0'], ' arz'],
	'{0}% to <0/>': [['0'], '% to <0/>'],
	'{0}% to {1}': [['0'], '% to ', ['1']],
	'{0}/{1} withdrawn': [['0'], '/', ['1'], ' çekildi'],
	'{0}{1}': [['0'], ['1']],
	'{count} total': ['toplam ', ['count']],
	'{exchangeName} has no market for {tokenSymbol}.': [
		['exchangeName'],
		', ',
		['tokenSymbol'],
		' için piyasaya sahip değildir.'
	],
	'{formattedTimeLeft} left': [['formattedTimeLeft'], ' kaldı'],
	'{formattedTimeLeft} until #{0}': ['#', ['0'], "'a kadar kalan ", ['formattedTimeLeft']],
	'{handle} not found': [['handle'], ' bulunamadı'],
	'{handle} will be available soon! Try refreshing the page shortly.': [
		['handle'],
		' yakında burada olacak! Kısa bir süre sonra sayfayı yenilemeyi deneyin.'
	],
	'{label}': [['label']],
	'{payerRate} (+ {reservedRate} reserved) {tokenSymbolPlural}/ETH': [
		['payerRate'],
		' (+ ayrılmış ',
		['reservedRate'],
		') ',
		['tokenSymbolPlural'],
		'/ETH'
	],
	'{payerRate} {tokenSymbolPlural}/ETH': [['payerRate'], ' ', ['tokenSymbolPlural'], '/ETH'],
	'{paymentCount, plural, one {# payment} other {# payments}}': [
		['paymentCount', 'plural', { one: ['#', ' ödeme'], other: ['#', ' ödeme'] }]
	],
	'{tokenSymbolPlural} received per ETH paid to the treasury. This can change over time according to the discount rate and reserved tokens amount of future funding cycles.':
		[
			['tokenSymbolPlural'],
			' received per ETH paid to the treasury. This can change over time according to the discount rate and reserved tokens amount of future funding cycles.'
		],
	'{tokenSymbol} ERC-20 address': [['tokenSymbol'], ' ERC-20 address'],
	'{tokenSymbol}/ETH exchange rate on {exchangeName}.': [
		['exchangeName'],
		' üzerinde ',
		['tokenSymbol'],
		'/ETH kuru.'
	],
	'{tokenTextSingular} recipients': [['tokenTextSingular'], " token'ı alıcıları"],
	"{tokensLabel} are distributed to anyone who pays this project. If the project has set a funding target, tokens can be redeemed for a portion of the project's overflow whether or not they have been claimed yet.":
		[
			['tokensLabel'],
			" are distributed to anyone who pays this project. If the project has set a funding target, tokens can be redeemed for a portion of the project's overflow whether or not they have been claimed yet."
		],
	'{tokensText} reserved': ['Ayrılmış ', ['tokensText'], " token'ları"],
	'{tokensTokenUpper} amount': [['tokensTokenUpper'], ' amount'],
	'{unclaimedBalanceFormatted} {tokenText} claimable': [
		'talep edilebilir ',
		['unclaimedBalanceFormatted'],
		' ',
		['tokenText']
	],
	'{userOwnershipPercentage}% of total supply': [
		'Toplam arzın %',
		['userOwnershipPercentage'],
		' kadarı'
	]
};
