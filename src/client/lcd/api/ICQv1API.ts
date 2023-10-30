import { Params } from '@terra-money/terra.proto/icq/v1/icq';
import { APIParams } from '../APIRequester';
import { LCDClient } from '../LCDClient';
import { BaseAPI } from './BaseAPI';

export class ICQv1API extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequesters, lcd.config);
  }

  /**
   * Query all parameters associated with the icq module.
   *
   * @tags Query
   * @name params
   * @summary Query icq module params
   * @request GET:/async-icq/v1/params
   */
  public async params(chainId: string, params: Partial<APIParams> = {}) {
    return this.getReqFromChainID(chainId).get<{ params: Params }>(
      `/async-icq/v1/params`,
      params
    );
  }
}
