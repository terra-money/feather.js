import { AccAddress } from '../../../core';
import { BaseAPI } from './BaseAPI';
import { Allowance } from '../../../core/feegrant/allowances';
import { Pagination, PaginationOptions } from '../APIRequester';
import { LCDClient } from '../LCDClient';

export class FeeGrantAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequesters, lcd.config);
  }

  public async allowances(
    grantee: AccAddress,
    params: Partial<PaginationOptions> = {}
  ): Promise<{
    allowances: {
      granter: AccAddress;
      grantee: AccAddress;
      allowance: Allowance;
    }[];
    pagination: Pagination;
  }> {
    return this.getReqFromAddress(grantee)
      .get<{
        allowances: {
          granter: AccAddress;
          grantee: AccAddress;
          allowance: Allowance.Data;
        }[];
        pagination: Pagination;
      }>(`/cosmos/feegrant/v1beta1/allowances/${grantee}`, params)
      .then(d => ({
        allowances: d.allowances.map(allowance => ({
          granter: allowance.granter,
          grantee: allowance.grantee,
          allowance: Allowance.fromData(allowance.allowance),
        })),
        pagination: d.pagination,
      }));
  }

  public async allowance(
    granter: AccAddress,
    grantee: AccAddress
  ): Promise<Allowance> {
    return this.getReqFromAddress(grantee)
      .get<{
        allowance: {
          granter: AccAddress;
          grantee: AccAddress;
          allowance: Allowance.Data;
        };
      }>(`/cosmos/feegrant/v1beta1/allowance/${granter}/${grantee}`)
      .then(d => Allowance.fromData(d.allowance.allowance));
  }

  public async allowancesByGranter(
    granter: AccAddress,
    params: Partial<PaginationOptions> = {}
  ): Promise<{
    allowances: {
      granter: AccAddress;
      grantee: AccAddress;
      allowance: Allowance;
    }[];
    pagination: Pagination;
  }> {
    return this.getReqFromAddress(granter)
      .get<{
        allowances: {
          granter: AccAddress;
          grantee: AccAddress;
          allowance: Allowance.Data;
        }[];
        pagination: Pagination;
      }>(`/cosmos/feegrant/v1beta1/issued/${granter}`, params)
      .then(d => ({
        allowances: d.allowances.map(allowance => ({
          granter: allowance.granter,
          grantee: allowance.grantee,
          allowance: Allowance.fromData(allowance.allowance),
        })),
        pagination: d.pagination,
      }));
  }
}
