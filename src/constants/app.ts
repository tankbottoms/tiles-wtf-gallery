import { BigNumber, utils } from 'ethers';

export const APP_CONFIG = {
	contract_mainnet: '0x4ddeF8Fc8EEE89848b4A802CEF9FC9E72B8674A4',
	contract_tiles_content_provider: '0x4F0Fba0652E61cD1Ec62E65e58c053F93b2D079F',
	contract_base_price: BigNumber.from(utils.parseEther('0.0001')),
	contract_tile_multiplier: 2,
	contract_tile_tier_size: 16,
	contract_rinkeby: '0x08214180E91b03340e759f98f8AC8dc92C0bf2de',
	project_mainnet: 175,
	project_rinkeby: 98,
	gnosis_mainnet: '0x4493287882f75dFFcdB40FD41d38d6308Fb8c181',
	contract_mainnet_v1: '0x64931F06d3266049Bf0195346973762E6996D764'
};
