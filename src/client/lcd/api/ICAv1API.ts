import { Params as HostParams } from '@terra-money/terra.proto/ibc/applications/interchain_accounts/host/v1/host';
import { Params as ControllerParams } from '@terra-money/terra.proto/ibc/applications/interchain_accounts/controller/v1/controller';
import { QueryInterchainAccountResponse } from '@terra-money/terra.proto/ibc/applications/interchain_accounts/controller/v1/query';
import { APIParams } from '../APIRequester';
import { LCDClient } from '../LCDClient';
import { BaseAPI } from './BaseAPI';
import { AccAddress } from '../../../core';

export class ICAv1API extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequesters, lcd.config);
  }

  /**
   * Query interchain account host module params
   *
   * @tags Query
   * @name params
   * @request GET:/ibc/apps/interchain_accounts/host/v1/params
   */
  public async hostParams(chainId: string, params: Partial<APIParams> = {}) {
    return this.getReqFromChainID(chainId).get<{ params: HostParams }>(
      `/ibc/apps/interchain_accounts/host/v1/params`,
      params
    );
  }

  /**
   * Query interchain account controller module params
   *
   * @tags Query
   * @name params
   * @request GET:/ibc/apps/interchain_accounts/controller/v1/params
   */
  public async controllerParams(
    chainId: string,
    params: Partial<APIParams> = {}
  ) {
    return this.getReqFromChainID(chainId).get<{ params: ControllerParams }>(
      `/ibc/apps/interchain_accounts/controller/v1/params`,
      params
    );
  }

  /**
   * Returns the interchain account address for a given owner address on a given connection
   *
   * @tags Query
   * @name params
   * @request GET:/ibc/apps/interchain_accounts/controller/v1/owners/${ownerAddr}/connections/${connectionId}
   */
  public async controllerAccountAddress(
    ownerAddr: AccAddress,
    connectionId: string,
    params: Partial<APIParams> = {}
  ) {
    return this.getReqFromAddress(
      ownerAddr
    ).get<QueryInterchainAccountResponse>(
      `/ibc/apps/interchain_accounts/controller/v1/owners/${ownerAddr}/connections/${connectionId}`,
      params
    );
  }
}
