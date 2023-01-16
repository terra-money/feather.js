import { getChainIDFromAddress, getAddressPrefix } from '../../../util/bech32';
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

  public getReqFromAddress(address: string): APIRequester {
    const chainID = getChainIDFromAddress(address, this.chains);

    if (!chainID)
      throw new Error(
        `There is no chain configured with the '${getAddressPrefix(
          address
        )}' prefix.`
      );

    return this.req[chainID];
  }
}
