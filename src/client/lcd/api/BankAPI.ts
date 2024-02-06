import { BaseAPI } from './BaseAPI';
import { Coins, Coin, AccAddress } from '../../../core';
import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
import { LCDClient } from '../LCDClient';

export interface SendEnabled {
  denom: string;
  enabled: boolean;
}

export namespace SendEnabled {
  export interface Data {
    denom: string;
    enabled: boolean;
  }
}
export interface BankParams {
  send_enabled: SendEnabled[];
  default_send_enabled: boolean;
}

export namespace BankParams {
  export interface Data {
    send_enabled: SendEnabled.Data[];
    default_send_enabled: boolean;
  }
}

export class BankAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequesters, lcd.config);
  }

  /**
   * Query parameters of the bank module,
   * @param chainID chain id
   * @returns params of the bank module
   */
  public async params(
    chainID: string,
    params: APIParams = {}
  ): Promise<BankParams> {
    return this.getReqFromChainID(chainID)
      .get<{ params: BankParams.Data }>(`/cosmos/bank/v1beta1/params`, params)
      .then(({ params: d }) => ({
        send_enabled: d.send_enabled,
        default_send_enabled: d.default_send_enabled,
      }));
  }

  /**
   * Look up the balance of an account by its address.
   * @param address address of account to look up.
   */
  public async balance(
    address: AccAddress,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[Coins, Pagination]> {
    return this.getReqFromAddress(address)
      .get<{
        balances: Coins.Data;
        pagination: Pagination;
      }>(`/cosmos/bank/v1beta1/balances/${address}`, params)
      .then(d => [Coins.fromData(d.balances), d.pagination]);
  }

  /**
   * Lqueries the spenable balance of all coins for a single account.
   * @param address address of account to look up.
   */
  public async spendableBalances(
    address: AccAddress,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[Coins, Pagination]> {
    return this.getReqFromAddress(address)
      .get<{
        balances: Coins.Data;
        pagination: Pagination;
      }>(`/cosmos/bank/v1beta1/spendable_balances/${address}`, params)
      .then(d => [Coins.fromData(d.balances), d.pagination]);
  }

  /**
   * Get the total supply of tokens in circulation for all denominations.
   * @param chainID chain id
   */
  public async total(
    chainID: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[Coins, Pagination]> {
    return this.getReqFromChainID(chainID)
      .get<{ supply: Coins.Data; pagination: Pagination }>(
        `/cosmos/bank/v1beta1/supply`,
        params
      )
      .then(d => [Coins.fromData(d.supply), d.pagination]);
  }

  /**
   * Get the total supply of tokens in circulation for all denom.
   * @param chainID chain id
   * @param denom denom of the coin
   */
  public async supplyByDenom(chainID: string, denom: string): Promise<Coin> {
    return this.getReqFromChainID(chainID)
      .get<{ amount: Coin.Data }>(`/cosmos/bank/v1beta1/supply/by_denom`, {
        denom: denom,
      })
      .then(d => Coin.fromData(d.amount));
  }

  // TODO: TBD: implement denoms_medata?
}
