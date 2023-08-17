import { APIParams } from '../APIRequester';
import { LCDClient } from '../LCDClient';
import { BaseAPI } from './BaseAPI';
import { QueryParamsResponse } from '@terra-money/terra.proto/cosmwasm/wasm/v1/query';
import { AccAddress } from '../../../core';

export interface DenomsFromCreatorResponse {
  denoms: string[];
}

export interface AuthorityMetadataResponse {
  authority_metadata: {
    admin: AccAddress;
  };
}

export class TokenFactory extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequesters, lcd.config);
  }

  public params(
    chainID: string,
    params: APIParams = {}
  ): Promise<QueryParamsResponse> {
    return this.getReqFromChainID(chainID).get<QueryParamsResponse>(
      `/osmosis/tokenfactory/v1beta1/params`,
      params
    );
  }

  public denomsFromCreator(
    creator: AccAddress,
    params: APIParams = {}
  ): Promise<DenomsFromCreatorResponse> {
    const req = this.getReqFromAddress(creator);

    return req.get<DenomsFromCreatorResponse>(
      `/osmosis/tokenfactory/v1beta1/denoms_from_creator/${creator}`,
      params
    );
  }

  /*
    The following request does not work yet because the endpoint 
    does recognize the url encoded denom.

    public authorityMetadata(chainID: string, denom: string, params: APIParams = {}): Promise<AuthorityMetadataResponse> {
        return this.getReqFromChainID(chainID)
            .get<AuthorityMetadataResponse>(`/osmosis/tokenfactory/v1beta1/denoms/${denom}/authority_metadata`, params);
    }
    */
}
