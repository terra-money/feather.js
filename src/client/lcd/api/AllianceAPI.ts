import { BaseAPI } from './BaseAPI';
import { Coins } from '../../../core';
import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
import { LCDClient } from '../LCDClient';

export interface AllianceParams {
  reward_delay_time?: string;

  /** Time interval between consecutive applications of `take_rate` */
  take_rate_claim_interval?: string;

  /**
   * Last application of `take_rate` on assets
   * @format date-time from golang
   */
  last_take_rate_claim_time?: string;
}

export interface AllianceValidator {
  validator_addr?: string;
  total_delegation_shares?: V1Beta1DecCoin[];
  validator_shares?: V1Beta1DecCoin[];
  total_staked?: V1Beta1DecCoin[];
}

export interface V1Beta1DecCoin {
  denom?: string;
  amount?: string;
}

/**
* DelegationResponse is equivalent to Delegation except that it contains a
balance in addition to shares which is more suitable for client responses.
*/
export interface AllianceDelegationResponse {
  delegation: AllianceDelegation;

  /**
   * Coin defines a token with a denomination and an amount.
   *
   * NOTE: The amount field is an Int which implements the custom method
   * signatures required by gogoproto.
   */
  balance: {
    denom: string;
    amount: string;
  };
}

export interface AllianceRewardHistory {
  denom: string;
  index: string;
}

export interface AllianceDelegation {
  /** delegator_address is the bech32-encoded address of the delegator. */
  delegator_address: string;

  /** validator_address is the bech32-encoded address of the validator. */
  validator_address: string;

  /** denom of token staked */
  denom: string;

  /** shares define the delegation shares received. */
  shares: string;
  reward_history: AllianceRewardHistory[];

  /** @format uint64 */
  last_reward_claim_height: string;
}
export interface RewardWeightRange {
  min: string;
  max: string;
}
export interface AllianceAsset {
  /** Denom of the asset. It could either be a native token or an IBC token */
  denom: string;

  /**
   * The reward weight specifies the ratio of rewards that will be given to each alliance asset
   * It does not need to sum to 1. rate = weight / total_weight
   * Native asset is always assumed to have a weight of 1.s
   */
  reward_weight: string;

  /**
   * A positive take rate is used for liquid staking derivatives. It defines an rate that is applied per take_rate_interval
   * that will be redirected to the distribution rewards pool
   */
  take_rate: string;
  total_tokens: string;
  total_validator_shares: string;

  /** @format date-time */
  reward_start_time: string;
  reward_change_rate: string;
  reward_change_interval: string;

  /** @format date-time */
  last_reward_change_time: string;
  /** set a bound of weight range to limit how much reward weights can scale. */
  reward_weight_range?: RewardWeightRange;
  /** flag to check if an asset has completed the initialization process after the reward delay */
  is_initialized: boolean;
}

export class AllianceAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequesters, lcd.config);
  }

  /**
   * Query the alliance module params
   *
   * @tags Query
   * @name params
   * @summary Query the alliance by denom
   * @request GET:/terra/alliances/params
   */
  public async params(
    chainId: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ) {
    return this.getReqFromChainID(chainId).get<{ params: AllianceParams }>(
      `/terra/alliances/params`,
      params
    );
  }

  /**
   * Query all available alliances with pagination
   *
   * @tags Query
   * @name alliances
   * @summary Query paginated alliances
   * @request GET:/terra/alliances
   */
  public async alliances(
    chainID: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ) {
    return this.getReqFromChainID(chainID).get<{
      pagination: Pagination;
      alliances: AllianceAsset[];
    }>(`/terra/alliances`, params);
  }

  /**
   * Query the alliance by denom where denom can be either the
   * ibc prefixed hash or any other native asset alliance denom
   *
   * @tags Query
   * @name alliance
   * @summary Query the alliance by denom
   * @request GET:/terra/alliances/{denom}
   */
  public async alliance(
    chainId: string,
    denom: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ) {
    return this.getReqFromChainID(chainId).get<{
      alliance: AllianceAsset;
      pagination: Pagination;
    }>(`/terra/alliances/${denom}`, params);
  }

  /**
   * Query all paginated alliance delegations
   *
   * @tags Query
   * @name alliancesDelegations
   * @summary Query all paginated alliance delegations
   * @request GET:/terra/alliances/delegations
   */
  public async alliancesDelegations(
    chainID: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ) {
    return this.getReqFromChainID(chainID).get<{
      delegations: AllianceDelegationResponse[];
      pagination: Pagination;
    }>(`/terra/alliances/delegations`, params);
  }

  /**
   * Query all paginated alliance delegations for a specific delegator address
   *
   * @tags Query
   * @name alliancesDelegation
   * @summary Query all paginated alliance delegations
   * @request GET:/terra/alliances/delegations/{delegatorAddr}
   */
  public async alliancesDelegation(
    delegatorAddr: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ) {
    return this.getReqFromAddress(delegatorAddr).get<{
      delegations: AllianceDelegationResponse[];
      pagination: Pagination;
    }>(`/terra/alliances/delegations/${delegatorAddr}`, params);
  }

  /**
   * Query all paginated alliance delegations for a delegator addr and validator_addr
   *
   * @tags Query
   * @name alliancesDelegationByValidator
   * @summary Query all paginated alliance delegations for a delegator addr and validator_addr
   * @request GET:/terra/alliances/delegations/{delegator_addr}/{validator_addr}
   */
  public async alliancesDelegationByValidator(
    delegatorAddr: string,
    validatorAddr: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ) {
    return this.getReqFromAddress(delegatorAddr).get<{
      delegations: AllianceDelegationResponse[];
      pagination: Pagination;
    }>(
      `/terra/alliances/delegations/${delegatorAddr}/${validatorAddr}`,
      params
    );
  }

  /**
   * Query a delegation to an alliance by delegator addr, validator_addr and denom
   * the denom can be both the ibc prefixed denom or any other alliance denom.
   *
   * @tags Query
   * @name allianceDelegation
   * @summary Query a delegation to an alliance by delegator addr, validator_addr and denom
   * @request GET:/terra/alliances/delegations/{delegator_addr}/{validator_addr}/{denom}
   */
  public async allianceDelegation(
    delegatorAddr: string,
    validatorAddr: string,
    denom: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ) {
    return this.getReqFromAddress(delegatorAddr).get<{
      delegation: AllianceDelegationResponse[];
      pagination: Pagination;
    }>(
      `/terra/alliances/delegations/${delegatorAddr}/${validatorAddr}/${denom}`,
      params
    );
  }

  /**
   * Query for rewards by delegator addr, validator_addr and denom
   * where denom can be either the ibc prefixed hash or any other native asset alliance denom
   *
   * @tags Query
   * @name delegatorRewards
   * @summary Query for rewards by delegator addr, validator_addr and denom
   * @request GET:/terra/alliances/params
   */
  public async delegatorRewards(
    delegatorAddr: string,
    validatorAddr: string,
    denom: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ) {
    return this.getReqFromAddress(delegatorAddr).get<{ rewards: Coins }>(
      `/terra/alliances/rewards/${delegatorAddr}/${validatorAddr}/${denom}`,
      params
    );
  }

  /**
   * Query all validators that has alliance assets delegated to them
   *
   * @tags Query
   * @name allianceValidators
   * @summary Query all paginated alliance validators
   * @request GET:/terra/alliances/validators
   */
  public async alliancesValidator(
    chainID: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ) {
    return this.getReqFromChainID(chainID).get<{
      validators: AllianceValidator;
      pagination: Pagination;
    }>(`/terra/alliances/validators`, params);
  }

  /**
   * Query an alliance validator that has alliance assets delegated to it
   *
   * @tags Query
   * @name allianceValidators
   * @summary Query alliance validator
   * @request GET:/terra/alliances/validators/{validatorAddr}
   */
  public async alliancesValidators(
    validatorAddr: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ) {
    return this.getReqFromAddress(validatorAddr).get<AllianceValidator>(
      `/terra/alliances/validators/${validatorAddr}`,
      params
    );
  }
}
