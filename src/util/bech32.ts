import { LCDClientConfig } from 'client';
import {
  AccAddress,
  AccPubKey,
  ValAddress,
  ValConsAddress,
  ValPubKey,
} from '../core/bech32';

export function getAddressPrefix(address: string): string {
  const addressTypes = [
    AccPubKey,
    ValAddress,
    ValConsAddress,
    ValPubKey,
    // this must be the last one
    AccAddress,
  ];
  for (const addressType of addressTypes) {
    if (addressType.validate(address)) {
      return addressType.getPrefix(address);
    }
  }
  throw new Error(`The provided address (${address}) is not valid.`);
}

export function getChainIDFromAddress(
  address: string,
  config: Record<string, LCDClientConfig>
): string | undefined {
  const prefix = getAddressPrefix(address);

  return Object.values(config).find(chain => prefix === chain.prefix)?.chainID;
}
