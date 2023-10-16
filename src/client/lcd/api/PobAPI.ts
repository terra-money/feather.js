import { BaseAPI } from './BaseAPI';
import { LCDClient } from '../LCDClient';
import { Params } from '@terra-money/terra.proto/pob/builder/v1/genesis';

export class PobAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequesters, lcd.config);
  }
  /**
   * Query POB parameters
   *
   * @tags Query POB module params
   * @name params
   * @summary
   * @request GET:/terra/alliances/params
   */
  public async params(chainId: string) {
    return this.getReqFromChainID(chainId).get<{ params: Params }>(
      `/pob/builder/v1/params`
    );
  }
}
