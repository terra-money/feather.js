import { Dec } from '../../../core/numeric';

export class RewardWeightRange {
  constructor(public min: Dec, public max: Dec) {}

  public static fromData(
    proto: RewardWeightRange.Data,
    _?: boolean
  ): RewardWeightRange {
    _;
    const { min, max } = proto;

    return new RewardWeightRange(new Dec(min), new Dec(max));
  }

  public toData(_?: boolean): RewardWeightRange.Data {
    _;
    const { min, max } = this;

    return {
      min: min.toString(),
      max: max.toString(),
    };
  }
}

export namespace RewardWeightRange {
  export interface Data {
    min: string;
    max: string;
  }
}
