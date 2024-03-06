import { Setting } from '../../../core/smartaccount';
import { AccAddress } from '../../../core';
import { LCDClient } from '../LCDClient';
import { BaseAPI } from './BaseAPI';
import { SmartaccountParams } from '../../../core/smartaccount';

export class SmartaccountAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequesters, lcd.config);
  }

  /**
   * Query the feemarket module params.
   *
   * @tags Query
   * @name params
   * @request GET:/terra/smartaccount/v1/params
   */
  public async params(chainId: string): Promise<SmartaccountParams> {
    const res = await this.getReqFromChainID(chainId).get<{
      params: SmartaccountParams.Data;
    }>(`/terra/smartaccount/v1/params`);

    return SmartaccountParams.fromData(res.params);
  }

  /**
   * Query the feemarket module setting for account.
   *
   * @tags Query
   * @name setting
   * @request GET:/terra/smartaccount/v1/setting/{account}
   */
  public async setting(account: AccAddress): Promise<Setting> {
    const res = await this.getReqFromAddress(account).get<{
      setting: Setting.Data;
    }>(`/terra/smartaccount/v1/setting/${account}`);

    return Setting.fromData(res.setting);
  }
}
