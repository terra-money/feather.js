import {
  AccAddress,
  Account,
  LazyGradedVestingAccount,
  DelayedVestingAccount,
  PeriodicVestingAccount,
  ContinuousVestingAccount,
  BaseAccount,
  ModuleAccount,
} from '../../../core';
import { BaseAPI } from './BaseAPI';
import { APIParams } from '../APIRequester';
import { LCDClient } from '../LCDClient';

export interface AuthParams {
  max_memo_characters: number;
  tx_sig_limit: number;
  tx_size_cost_per_byte: number;
  sig_verify_cost_ed25519: number;
  sig_verify_cost_secp256k1: number;
}

export namespace AuthParams {
  export interface Data {
    max_memo_characters: string;
    tx_sig_limit: string;
    tx_size_cost_per_byte: string;
    sig_verify_cost_ed25519: string;
    sig_verify_cost_secp256k1: string;
  }
}

export class AuthAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequesters, lcd.config);
  }
  /**
   * Query the modules acccounts information
   *
   * @param address address of account to look up
   */
  public async moduleAccountInfo(
    chainID: string,
    params: APIParams = {}
  ): Promise<Array<Account>> {
    const { accounts } = await this.getReqFromChainID(chainID).get<{
      accounts: Array<ModuleAccount.Data>;
    }>(`/cosmos/auth/v1beta1/module_accounts`, params);

    return accounts.map((account: any) => Account.fromData(account));
  }
  /**
   * Looks up the account information using its Terra account address. If the account has
   * vesting, it will be one of [LazyGradedVestingAccount, DelayedVestingAccount, PeriodicVestingAccount, ContinuousVestingAccount]
   *
   * @param address address of account to look up
   */
  public async accountInfo(
    address: AccAddress,
    params: APIParams = {}
  ): Promise<Account> {
    const { account } = await this.getReqFromAddress(address).get<{
      account:
        | BaseAccount.Data
        | LazyGradedVestingAccount.Data
        | DelayedVestingAccount.Data
        | PeriodicVestingAccount.Data
        | ContinuousVestingAccount.Data;
    }>(`/cosmos/auth/v1beta1/accounts/${address}`, params);

    return Account.fromData(account);
  }

  public async parameters(
    chainID: string,
    params: APIParams = {}
  ): Promise<AuthParams> {
    return this.getReqFromChainID(chainID)
      .get<{ params: AuthParams.Data }>(`/cosmos/auth/v1beta1/params`, params)
      .then(({ params: d }) => ({
        max_memo_characters: Number.parseInt(d.max_memo_characters),
        tx_sig_limit: Number.parseInt(d.tx_sig_limit),
        tx_size_cost_per_byte: Number.parseInt(d.tx_size_cost_per_byte),
        sig_verify_cost_ed25519: Number.parseInt(d.sig_verify_cost_ed25519),
        sig_verify_cost_secp256k1: Number.parseInt(d.sig_verify_cost_secp256k1),
      }));
  }
}
