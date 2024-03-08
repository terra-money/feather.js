import { RewardWeightRange } from './RewardWeightRange';
import { Dec } from '../../../core/numeric';

export class AllianceAsset {
  constructor(
    /** Denom of the asset. It could either be a native token or an IBC token */
    public denom: string,
    /** The reward weight specifies the ratio of rewards that will be given to each alliance asset
        It does not need to sum to 1. rate = weight / total_weight Native asset is always assumed to have a weight of 1.s */
    public rewardWeight: Dec,
    /** A positive take rate is used for liquid staking derivatives. It defines an rate that is 
         applied per take_rate_interval that will be redirected to the distribution rewards pool  */
    public takeRate: Dec,
    // The total amount of tokens that are bonded to the alliance
    public totalTokens: Dec,
    // The total amount of validator shares that are bonded to the alliance
    public totalValidatorShares: Dec,
    // The time when the reward distribution starts
    public rewardStartTime: Date,
    // The rate at which the reward changes
    public rewardChangeRate: Dec,
    // The interval at which the reward changes when rewardWeightRange and rewardChangeRate are set
    public rewardChangeInterval: string,
    // The time when the last reward change occurred
    public lastRewardChangeTime: Date,
    /** set a bound of weight range to limit how much reward weights can scale. */
    public rewardWeightRange: RewardWeightRange,
    /** flag to check if an asset has completed the initialization process after the reward delay */
    public isInitialized: boolean
  ) {}

  public static fromData(data: AllianceAsset.Data, _?: boolean): AllianceAsset {
    _;
    const {
      denom,
      reward_weight,
      take_rate,
      total_tokens,
      total_validator_shares,
      reward_start_time,
      reward_change_rate,
      reward_change_interval,
      last_reward_change_time,
      reward_weight_range,
      is_initialized,
    } = data;

    return new AllianceAsset(
      denom,
      new Dec(reward_weight),
      new Dec(take_rate),
      new Dec(total_tokens),
      new Dec(total_validator_shares),
      new Date(reward_start_time),
      new Dec(reward_change_rate),
      reward_change_interval,
      new Date(last_reward_change_time),
      RewardWeightRange.fromData(reward_weight_range),
      is_initialized
    );
  }

  public toData(_?: boolean): AllianceAsset.Data {
    _;
    const {
      denom,
      rewardWeight,
      takeRate,
      totalTokens,
      totalValidatorShares,
      rewardStartTime,
      rewardChangeRate,
      rewardChangeInterval,
      lastRewardChangeTime,
      rewardWeightRange,
      isInitialized,
    } = this;

    return {
      denom: denom,
      reward_weight: rewardWeight.toString(),
      take_rate: takeRate.toString(),
      total_tokens: totalTokens.toString(),
      total_validator_shares: totalValidatorShares.toString(),
      reward_start_time: rewardStartTime.toString(),
      reward_change_rate: rewardChangeRate.toString(),
      reward_change_interval: rewardChangeInterval,
      last_reward_change_time: lastRewardChangeTime.toString(),
      reward_weight_range: rewardWeightRange.toData(),
      is_initialized: isInitialized,
    };
  }
}

export namespace AllianceAsset {
  export interface Data {
    denom: string;
    reward_weight: string;
    take_rate: string;
    total_tokens: string;
    total_validator_shares: string;
    reward_start_time: string;
    reward_change_rate: string;
    reward_change_interval: string;
    last_reward_change_time: string;
    reward_weight_range: RewardWeightRange.Data;
    is_initialized: boolean;
  }
}
