import type { NFTTokenType, TokenType } from 'types/api/token';

import config from 'configs/app';

const tokenStandardName = config.chain.tokenStandard;

export const NFT_TOKEN_TYPES: Record<NFTTokenType, string > = {
  'DRC-721': `${ tokenStandardName }-721`,
  'DRC-1155': `${ tokenStandardName }-1155`,
  'DRC-404': `${ tokenStandardName }-404`,
};

export const TOKEN_TYPES: Record<TokenType, string > = {
  'DRC-20': `${ tokenStandardName }-20`,
  ...NFT_TOKEN_TYPES,
};

export const NFT_TOKEN_TYPE_IDS: Array<NFTTokenType> = [ 'DRC-721', 'DRC-1155', 'DRC-404' ];
export const TOKEN_TYPE_IDS: Array<TokenType> = [ 'DRC-20', ...NFT_TOKEN_TYPE_IDS ];

export function getTokenTypeName(typeId: TokenType) {
  return TOKEN_TYPES[typeId];
}
