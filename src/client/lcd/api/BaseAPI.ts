import {
  AccAddress,
  AccPubKey,
  ValAddress,
  ValConsAddress,
  ValPubKey,
} from '../../../core';
import { APIRequester } from '../APIRequester';
import { LCDClientConfig } from '../LCDClient';

export abstract class BaseAPI {
  private req: Record<string, APIRequester>;
  private chains: Record<string, LCDClientConfig>;
  constructor(
    req: Record<string, APIRequester>,
    chains: Record<string, LCDClientConfig>
  ) {
    this.req = req;
    this.chains = chains;
  }

  public getReqFromChainID(chainID: string): APIRequester {
    return this.req[chainID];
  }

  private getPrefix(address: string): string {
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

  public getReqFromAddress(address: string): APIRequester {
    const prefix = this.getPrefix(address);

    const chain = Object.values(this.chains).filter(
      chain => prefix === chain.prefix
    )[0];

    if (!chain)
      throw new Error(
        `There is no chain configured with the '${prefix}' prefix.`
      );

    return this.req[chain.chainID];
  }
}
