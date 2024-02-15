import {
  FeemarketDenomParams,
  FeemarketParams,
  FeemarketState,
} from '../../../core/feemarket';
import { APIParams, PaginationOptions } from '../APIRequester';
import { LCDClient } from '../LCDClient';
import { BaseAPI } from './BaseAPI';

export class FeemarketAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequesters, lcd.config);
  }

  /**
   * Query the feemarket module params.
   *
   * @tags Query
   * @name params
   * @request GET:/feemarket/v1/params
   */
  public async params(
    chainId: string,
    params: Partial<APIParams> = {}
  ): Promise<FeemarketParams> {
    const res = await this.getReqFromChainID(chainId).get<{
      params: FeemarketParams.Data;
    }>(`/feemarket/v1/params`, params);

    return FeemarketParams.fromData(res.params);
  }

  /**
   * Query feemarket state.
   *
   * @tags Query
   * @name state
   * @request GET:/feemarket/v1/state
   */
  public async state(chainId: string, params: Partial<APIParams> = {}) {
    const res = await this.getReqFromChainID(chainId).get<{
      state: FeemarketState.Data;
    }>(`/feemarket/v1/state`, params);

    return FeemarketState.fromData(res.state);
  }

  /**
   * Query the current feeDenomParam for fee_denom.
   *
   * @tags Query
   * @name feeDenomParam
   * @summary Query the current feeDenomParam for fee_denom.
   * @request GET:/feemarket/v1/fee_denom_param/${feeDenom} or GET:/feemarket/v1/fee_denom_param/
   */
  public async feeDenomParam(
    chainId: string,
    feeDenom: string,
    params?: Partial<PaginationOptions & APIParams>
  ): Promise<Array<FeemarketDenomParams>> {
    const res = await this.getReqFromChainID(chainId).get<{
      fee_denom_params: Array<FeemarketDenomParams.Data>;
    }>(`/feemarket/v1/fee_denom_param/${feeDenom}`, params);

    return res.fee_denom_params.map(x => FeemarketDenomParams.fromData(x));
  }
}
