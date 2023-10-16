import { BaseAPI } from './BaseAPI';
import { AccAddress } from '../../../core';
import { APIParams, PaginationOptions } from '../APIRequester';
import { LCDClient } from '../LCDClient';
import { Params } from '@terra-money/terra.proto/juno/feeshare/v1/genesis';
import { QueryFeeSharesResponse } from '@terra-money/terra.proto/juno/feeshare/v1/query';

export class FeeshareAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequesters, lcd.config);
  }

  /**
   * Query the feeshare module params
   *
   * @tags Query
   * @name params
   * @request GET:/juno/feeshare/v1/fee_shares
   */
  public async params(
    chainId: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ) {
    return this.getReqFromChainID(chainId).get<{ params: Params }>(
      `/juno/feeshare/v1/fee_shares`,
      params
    );
  }

  /**
   * Query all paginated feeshares. When address is not specified, it returns all feeshares,
   * otherwise it returns the feeshares of the specific address. The address can be either a
   * contract address, deployer address or withdrawer address.
   *
   * @tags Query
   * @name feeshares
   * @summary Query all paginated feeshares.
   * @request GET:/juno/feeshare/v1/fee_shares or GET:/juno/feeshare/v1/fee_shares/${address}
   */
  public async feeshares(
    chainId: string,
    address?: AccAddress,
    params?: Partial<PaginationOptions & APIParams>
  ) {
    const url = address
      ? `/juno/feeshare/v1/fee_shares/${address}`
      : `/juno/feeshare/v1/fee_shares`;

    return this.getReqFromChainID(chainId).get<QueryFeeSharesResponse>(
      url,
      params
    );
  }
}
