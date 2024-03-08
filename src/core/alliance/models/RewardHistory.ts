export class RewardHistory {
  constructor(
    public denom: string,
    public index: string,
    public alliance: string
  ) {}

  public static fromData(
    proto: RewardHistory.Data,
    _?: boolean
  ): RewardHistory {
    _;
    const { denom, index, alliance } = proto;

    return new RewardHistory(denom, index, alliance);
  }

  public toData(_?: boolean): RewardHistory.Data {
    _;
    const { denom, index, alliance } = this;

    return { denom, index, alliance };
  }
}

export namespace RewardHistory {
  export interface Data {
    denom: string;
    index: string;
    alliance: string;
  }
}
