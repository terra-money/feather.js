import {
  BaseFeeResponse,
  FeeDenomParamResponse,
  ParamsResponse,
  StateResponse,
} from '@terra-money/terra.proto/feemarket/feemarket/v1/query';
import { APIParams, PaginationOptions } from '../APIRequester';
import { LCDClient } from '../LCDClient';
import { BaseAPI } from './BaseAPI';

export class FeemarketAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequesters, lcd.config);
  }

  /**
   * Query the feemarket module params
   *
   * @tags Query
   * @name params
   * @request GET:/feemarket/v1/params
   */
  public async params(
    chainId: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ) {
    return this.getReqFromChainID(chainId).get<ParamsResponse>(
      `/feemarket/v1/params`,
      params
    );
  }

  /**
   * Query feemarket state.
   *
   * @tags Query
   * @name state
   * @summary Query all paginated states of feemarket fee_denoms.
   * @request GET:/feemarket/v1/state
   */
  public async state(
    chainId: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ) {
    return this.getReqFromChainID(chainId).get<StateResponse>(
      `/feemarket/v1/state`,
      params
    );
  }

  /**
   * Query the current basefee for fee_denom.
   *
   * @tags Query
   * @name baseFee
   * @summary Query the current basefee for fee_denom.
   * @request GET:/feemarket/v1/base_fee/${feeDenom}
   */
  public async baseFee(
    chainId: string,
    feeDenom: string,
    params?: Partial<PaginationOptions & APIParams>
  ) {
    const url = `/feemarket/v1/base_fee/${feeDenom}`;

    return this.getReqFromChainID(chainId).get<BaseFeeResponse>(url, params);
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
  ) {
    const url = feeDenom
      ? `/feemarket/v1/fee_denom_param/${feeDenom}`
      : `/feemarket/v1/fee_denom_param/`;

    return this.getReqFromChainID(chainId).get<FeeDenomParamResponse>(
      url,
      params
    );
  }
}
