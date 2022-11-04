import { AccAddress } from 'core';
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

  public getReqFromAddress(address: AccAddress): APIRequester {
    const chain = Object.values(this.chains).filter(chain =>
      address.startsWith(chain.prefix)
    )[0];
    if (!chain) throw new Error(`Address ${address} is not valid.`);
    return this.req[chain.chainID];
  }
}
