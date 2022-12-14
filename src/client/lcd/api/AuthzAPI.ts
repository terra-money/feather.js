import { AccAddress } from '../../../core';
import { BaseAPI } from './BaseAPI';
import { AuthorizationGrant } from '../../../core/authz/authorizations';
import { APIParams, Pagination } from '../APIRequester';
import { LCDClient } from '../LCDClient';

export class AuthzAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequesters, lcd.config);
  }

  /**
   * Get the message authorization grants for a specific granter and grantee
   */
  public async grants(
    granter: AccAddress,
    grantee: AccAddress,
    msgTypeUrl?: string,
    params: APIParams = {}
  ): Promise<[AuthorizationGrant[], Pagination]> {
    return this.getReqFromAddress(granter)
      .get<{ grants: AuthorizationGrant.Data[]; pagination: Pagination }>(
        `/cosmos/authz/v1beta1/grants`,
        Object.assign(
          {
            granter,
            grantee,
            msg_type_url: msgTypeUrl,
          },
          params
        )
      )
      .then(d => [
        d.grants.map(grant => AuthorizationGrant.fromData(grant)),
        d.pagination,
      ]);
  }

  /**
   * get list of `GrantAuthorization`, granted by granter.
   */
  public async granter(
    granter: AccAddress,
    params: APIParams = {}
  ): Promise<[AuthorizationGrant[], Pagination]> {
    return this.getReqFromAddress(granter)
      .get<{ grants: AuthorizationGrant.Data[]; pagination: Pagination }>(
        `/cosmos/authz/v1beta1/grants/granter/${granter}`,
        params
      )
      .then(d => [
        d.grants.map(g => AuthorizationGrant.fromData(g)),
        d.pagination,
      ]);
  }

  /**
   * get list of `GrantAuthorization`, by grantee.
   */
  public async grantee(
    grantee: AccAddress,
    params: APIParams = {}
  ): Promise<[AuthorizationGrant[], Pagination]> {
    return this.getReqFromAddress(grantee)
      .get<{ grants: AuthorizationGrant.Data[]; pagination: Pagination }>(
        `/cosmos/authz/v1beta1/grants/grantee/${grantee}`,
        params
      )
      .then(d => [
        d.grants.map(g => AuthorizationGrant.fromData(g)),
        d.pagination,
      ]);
  }
}
