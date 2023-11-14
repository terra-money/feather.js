import { LCDClient } from '../LCDClient';
import { BaseAPI } from './BaseAPI';
import { QueryParamsResponse } from '@terra-money/terra.proto/osmosis/tokenfactory/v1beta1/query';
import { AccAddress } from '../../../core';

export interface DenomsFromCreatorResponse {
  denoms: string[];
}

export interface AuthorityMetadataResponse {
  authority_metadata: {
    admin: AccAddress;
  };
}

export interface BeforeSendHookResponse {
  before_send_hook: {
    cosmwasm_address: AccAddress;
  };
}

export class TokenFactory extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequesters, lcd.config);
  }

  public params(chainID: string): Promise<QueryParamsResponse> {
    return this.getReqFromChainID(chainID).get<QueryParamsResponse>(
      `/osmosis/tokenfactory/v1beta1/params`
    );
  }

  public denomsFromCreator(
    creator: AccAddress
  ): Promise<DenomsFromCreatorResponse> {
    const req = this.getReqFromAddress(creator);

    return req.get<DenomsFromCreatorResponse>(
      `/osmosis/tokenfactory/v1beta1/denoms_from_creator/${creator}`
    );
  }

  public authorityMetadata(
    chainID: string,
    denom: string
  ): Promise<AuthorityMetadataResponse> {
    return this.getReqFromChainID(chainID).get<AuthorityMetadataResponse>(
      `/osmosis/tokenfactory/v1beta1/denoms/${denom}/authority_metadata`
    );
  }

  public beforeSendHook(
    chainID: string,
    denom: string
  ): Promise<BeforeSendHookResponse> {
    return this.getReqFromChainID(chainID).get<BeforeSendHookResponse>(
      `/osmosis/tokenfactory/v1beta1/denoms/${denom}/before_send_hook`
    );
  }
}
