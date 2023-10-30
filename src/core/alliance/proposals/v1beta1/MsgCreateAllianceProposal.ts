import { JSONSerializable } from '../../../../util/json';
import { Any } from '@terra-money/legacy.proto/google/protobuf/any';
import { RewardWeightRange } from '@terra-money/terra.proto/alliance/alliance';
import { MsgCreateAllianceProposal as MsgCreateAllianceProposal_pb } from '@terra-money/terra.proto/alliance/gov';
import { Duration } from '@terra-money/terra.proto/google/protobuf/duration';

/**
 *  MsgCreateAllianceProposal is gov content type to create a new alliance
 */
export class MsgCreateAllianceProposal extends JSONSerializable<
  MsgCreateAllianceProposal.Amino,
  MsgCreateAllianceProposal.Data,
  MsgCreateAllianceProposal.Proto
> {
  /**
   * @description Create a new alliance using the gov module
   * @param title of the proposal
   * @param description of the proposal
   * @param denom of the asset. It could either be a native token or an IBC token
   * @param rewardWeight specifies the ratio of rewards that will be given to each alliance asset it does not need to sum to 1. rate = weight / total_weight Native asset is always assumed to have a weight of 1.
   * @param takeRate positive take rate is used for liquid staking derivatives. It defines an annualized reward rate that will be redirected to the distribution rewards pool
   * @param rewardChangeRate how much the reward weight will change every rewardChangeInterval
   * @param rewardChangeInterval how often the reward weight will change
   * @param rewardWeightRange set a bound of weight range to limit how much reward weights can scale.
   */
  constructor(
    public title: string,
    public description: string,
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
    data: MsgCreateAllianceProposal.Amino,
    _?: boolean
  ): MsgCreateAllianceProposal {
    _;
    data;
    throw new Error('not implemented');
  }

  public toAmino(_?: boolean): MsgCreateAllianceProposal.Amino {
    _;
    throw new Error('not implemented');
  }

  public static fromData(
    data: MsgCreateAllianceProposal.Data,
    _?: boolean
  ): MsgCreateAllianceProposal {
    _;
    const {
      title,
      description,
      denom,
      rewardWeight,
      takeRate,
      rewardChangeRate,
      rewardChangeInterval,
      rewardWeightRange,
    } = data;
    return new MsgCreateAllianceProposal(
      title,
      description,
      denom,
      rewardWeight,
      takeRate,
      rewardChangeRate,
      rewardChangeInterval,
      rewardWeightRange
    );
  }

  public toData(_?: boolean): MsgCreateAllianceProposal.Data {
    _;
    const {
      title,
      description,
      denom,
      rewardWeight,
      takeRate,
      rewardChangeRate,
      rewardChangeInterval,
      rewardWeightRange,
    } = this;

    return {
      '@type': '/alliance.alliance.MsgCreateAllianceProposal',
      title,
      description,
      denom,
      rewardWeight,
      takeRate,
      rewardChangeRate,
      rewardChangeInterval,
      rewardWeightRange,
    };
  }

  public static fromProto(
    proto: MsgCreateAllianceProposal.Proto,
    _?: boolean
  ): MsgCreateAllianceProposal {
    _;
    return new MsgCreateAllianceProposal(
      proto.title,
      proto.description,
      proto.denom,
      proto.rewardWeight,
      proto.takeRate,
      proto.rewardChangeRate,
      proto.rewardChangeInterval,
      proto.rewardWeightRange
    );
  }

  public toProto(_?: boolean): MsgCreateAllianceProposal.Proto {
    _;
    const {
      title,
      description,
      denom,
      rewardWeight,
      takeRate,
      rewardChangeRate,
      rewardChangeInterval,
      rewardWeightRange,
    } = this;
    return MsgCreateAllianceProposal_pb.fromPartial({
      title,
      description,
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
      typeUrl: '/alliance.alliance.MsgCreateAllianceProposal',
      value: MsgCreateAllianceProposal_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgCreateAllianceProposal {
    _;
    return MsgCreateAllianceProposal.fromProto(
      MsgCreateAllianceProposal_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgCreateAllianceProposal {
  export interface Amino {
    type: 'alliance/MsgCreateAllianceProposal';
    title: string;
    description: string;
    denom: string;
    rewardWeight: string;
    takeRate: string;
    rewardChangeRate: string;
    rewardChangeInterval?: Duration;
    rewardWeightRange?: RewardWeightRange;
  }

  export interface Data {
    '@type': '/alliance.alliance.MsgCreateAllianceProposal';
    title: string;
    description: string;
    denom: string;
    rewardWeight: string;
    takeRate: string;
    rewardChangeRate: string;
    rewardChangeInterval?: Duration;
    rewardWeightRange?: RewardWeightRange;
  }

  export type Proto = MsgCreateAllianceProposal_pb;
}
