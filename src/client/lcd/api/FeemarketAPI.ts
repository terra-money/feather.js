import { Params } from '@terra-money/terra.proto/feemarket/feemarket/v1/params';
import {
  BaseFeeResponse,
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
    return this.getReqFromChainID(chainId).get<{ params: Params }>(
      `/feemarket/v1/params`,
      params
    );
  }

  /**
   * Query all paginated feemarket states. When fee_denom is not specified, it returns all states,
   * otherwise it returns the state of the specific fee_denom.
   *
   * @tags Query
   * @name state
   * @summary Query all paginated states of feemarket fee_denoms.
   * @request GET:/feemarket/v1/state or GET:/feemarket/v1/state?fee_denom=${feeDenom}
   */
  public async state(
    chainId: string,
    feeDenom?: string,
    params?: Partial<PaginationOptions & APIParams>
  ) {
    const url = feeDenom
      ? `/feemarket/v1/state?fee_denom=${feeDenom}`
      : `/feemarket/v1/state`;

    return this.getReqFromChainID(chainId).get<StateResponse>(url, params);
  }

  /**
   * Query the current basefee for fee_denom.
   *
   * @tags Query
   * @name baseFee
   * @summary Query the current basefee for fee_denom.
   * @request GET:/feemarket/v1/base_fee?fee_denom=${feeDenom}
   */
  public async baseFee(
    chainId: string,
    feeDenom: string,
    params?: Partial<PaginationOptions & APIParams>
  ) {
    const url = `/feemarket/v1/base_fee?fee_denom=${feeDenom}`;

    return this.getReqFromChainID(chainId).get<BaseFeeResponse>(url, params);
  }
}
