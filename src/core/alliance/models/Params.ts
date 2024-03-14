export class AllianceParams {
  // Model used to parse Alliance's module params from
  // the plain model to the corresponding interfaces.
  // rewardDelayTimee e.g. "604800s"
  // takeRateClaimInterval e.g. "300s"
  constructor(
    public rewardDelayTime: string,
    public takeRateClaimInterval: string,
    public lastTakeRateClaimTime: Date
  ) {}

  public static fromData(
    data: AllianceParams.Data,
    _?: boolean
  ): AllianceParams {
    _;
    const {
      reward_delay_time,
      take_rate_claim_interval,
      last_take_rate_claim_time,
    } = data;

    return new AllianceParams(
      reward_delay_time,
      take_rate_claim_interval,
      new Date(last_take_rate_claim_time)
    );
  }

  public toData(_?: boolean): AllianceParams.Data {
    _;
    const { rewardDelayTime, lastTakeRateClaimTime, takeRateClaimInterval } =
      this;

    return {
      reward_delay_time: rewardDelayTime.toString(),
      last_take_rate_claim_time: lastTakeRateClaimTime.toString(),
      take_rate_claim_interval: takeRateClaimInterval.toString(),
    };
  }
}

export namespace AllianceParams {
  export interface Data {
    reward_delay_time: string;
    take_rate_claim_interval: string;
    last_take_rate_claim_time: string;
  }
}
