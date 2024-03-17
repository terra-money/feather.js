import { Dec } from '../../../core/numeric';
import { AccAddress, ValAddress } from 'core/bech32';
import { RewardHistory } from './RewardHistory';
import Long from 'long';
import { Coin } from '../../../core/Coin';

export class AllianceDelegation {
  constructor(
    /** delegator_address is the bech32-encoded address of the delegator. */
    public delegatorAddress: AccAddress,
    /** validator_address is the bech32-encoded address of the validator. */
    public validatorAddress: ValAddress,
    /** denom of token staked */
    public denom: string,
    /** shares define the Alliancedelegation shares received. */
    public shares: Dec,
    public rewardHistory: RewardHistory[],
    public lastRewardClaimHeight: Long,
    public balance: Coin
  ) {}

  public static fromData(
    data: AllianceDelegation.Data,
    _?: boolean
  ): AllianceDelegation {
    _;
    const {
      delegation: {
        delegator_address,
        validator_address,
        denom,
        shares,
        reward_history,
        last_reward_claim_height,
      },
      balance,
    } = data;

    return new AllianceDelegation(
      delegator_address,
      validator_address,
      denom,
      new Dec(shares),
      reward_history?.map(r => RewardHistory.fromData(r)),
      last_reward_claim_height,
      Coin.fromData(balance)
    );
  }

  public toData(_?: boolean): AllianceDelegation.Data {
    _;
    const {
      delegatorAddress,
      validatorAddress,
      denom,
      shares,
      rewardHistory,
      lastRewardClaimHeight,
      balance,
    } = this;

    return {
      delegation: {
        delegator_address: delegatorAddress,
        validator_address: validatorAddress,
        denom: denom,
        shares: shares.toString(),
        reward_history: rewardHistory,
        last_reward_claim_height: lastRewardClaimHeight,
      },
      balance: balance.toData(),
    };
  }
}

export namespace AllianceDelegation {
  export interface Data {
    delegation: {
      /** delegator_address is the bech32-encoded address of the delegator. */
      delegator_address: AccAddress;
      /** validator_address is the bech32-encoded address of the validator. */
      validator_address: ValAddress;
      /** denom of token staked */
      denom: string;
      /** shares define the Alliancedelegation shares received. */
      shares: string;
      reward_history: RewardHistory.Data[];
      last_reward_claim_height: Long;
    };
    balance: Coin.Data;
  }
}
