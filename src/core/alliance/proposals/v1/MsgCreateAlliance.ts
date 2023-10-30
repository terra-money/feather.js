import { JSONSerializable } from '../../../../util/json';
import { Any } from '@terra-money/legacy.proto/google/protobuf/any';
import { RewardWeightRange } from '@terra-money/terra.proto/alliance/alliance';
import { MsgCreateAlliance as MsgCreateAlliance_pb } from '@terra-money/terra.proto/alliance/alliance/tx';
import { Duration } from '@terra-money/terra.proto/google/protobuf/duration';

/**
 *  MsgCreateAlliance is gov content type to create a new alliance
 */
export class MsgCreateAlliance extends JSONSerializable<
  MsgCreateAlliance.Amino,
  MsgCreateAlliance.Data,
  MsgCreateAlliance.Proto
> {
  /**
   * @description Create a new alliance using the gov module
   * @param authority of the proposal
   * @param denom of the asset. It could either be a native token or an IBC token
   * @param rewardWeight specifies the ratio of rewards that will be given to each alliance asset it does not need to sum to 1. rate = weight / total_weight Native asset is always assumed to have a weight of 1.
   * @param takeRate positive take rate is used for liquid staking derivatives. It defines an annualized reward rate that will be redirected to the distribution rewards pool
   * @param rewardChangeRate how much the reward weight will change every rewardChangeInterval
   * @param rewardChangeInterval how often the reward weight will change
   * @param rewardWeightRange set a bound of weight range to limit how much reward weights can scale.
   */
  constructor(
    public authority: string,
    public denom: string,
    public rewardWeight: string,
    public takeRate: string,
    public rewardChangeRate: string,
    public rewardChangeInterval?: Duration,
    public rewardWeightRange?: RewardWeightRange
  ) {
    super();
  }

  public static fromAmino(
    data: MsgCreateAlliance.Amino,
    _?: boolean
  ): MsgCreateAlliance {
    _;
    data;
    throw new Error('not implemented');
  }

  public toAmino(_?: boolean): MsgCreateAlliance.Amino {
    _;
    throw new Error('not implemented');
  }

  public static fromData(
    data: MsgCreateAlliance.Data,
    _?: boolean
  ): MsgCreateAlliance {
    _;
    const {
      authority,
      denom,
      rewardWeight,
      takeRate,
      rewardChangeRate,
      rewardChangeInterval,
      rewardWeightRange,
    } = data;
    return new MsgCreateAlliance(
      authority,
      denom,
      rewardWeight,
      takeRate,
      rewardChangeRate,
      rewardChangeInterval,
      rewardWeightRange
    );
  }

  public toData(_?: boolean): MsgCreateAlliance.Data {
    _;
    const {
      authority,
      denom,
      rewardWeight,
      takeRate,
      rewardChangeRate,
      rewardChangeInterval,
      rewardWeightRange,
    } = this;

    return {
      '@type': '/alliance.alliance.MsgCreateAlliance',
      authority,
      denom,
      rewardWeight,
      takeRate,
      rewardChangeRate,
      rewardChangeInterval,
      rewardWeightRange,
    };
  }

  public static fromProto(
    proto: MsgCreateAlliance.Proto,
    _?: boolean
  ): MsgCreateAlliance {
    _;
    return new MsgCreateAlliance(
      proto.authority,
      proto.denom,
      proto.rewardWeight,
      proto.takeRate,
      proto.rewardChangeRate,
      proto.rewardChangeInterval,
      proto.rewardWeightRange
    );
  }

  public toProto(_?: boolean): MsgCreateAlliance.Proto {
    _;
    const {
      authority,
      denom,
      rewardWeight,
      takeRate,
      rewardChangeRate,
      rewardChangeInterval,
      rewardWeightRange,
    } = this;
    return MsgCreateAlliance_pb.fromPartial({
      authority,
      denom,
      rewardWeight,
      takeRate,
      rewardChangeRate,
      rewardChangeInterval,
      rewardWeightRange,
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/alliance.alliance.MsgCreateAlliance',
      value: MsgCreateAlliance_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgCreateAlliance {
    _;
    return MsgCreateAlliance.fromProto(
      MsgCreateAlliance_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgCreateAlliance {
  export interface Amino {
    type: 'alliance/MsgCreateAlliance';
    authority: string;
    denom: string;
    rewardWeight: string;
    takeRate: string;
    rewardChangeRate: string;
    rewardChangeInterval?: Duration;
    rewardWeightRange?: RewardWeightRange;
  }

  export interface Data {
    '@type': '/alliance.alliance.MsgCreateAlliance';
    authority: string;
    denom: string;
    rewardWeight: string;
    takeRate: string;
    rewardChangeRate: string;
    rewardChangeInterval?: Duration;
    rewardWeightRange?: RewardWeightRange;
  }

  export type Proto = MsgCreateAlliance_pb;
}
