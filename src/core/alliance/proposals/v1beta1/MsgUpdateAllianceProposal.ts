import { JSONSerializable } from '../../../../util/json';
import { Any } from '@terra-money/legacy.proto/google/protobuf/any';
import { MsgUpdateAllianceProposal as MsgUpdateAllianceProposal_pb } from '@terra-money/terra.proto/alliance/gov';
import { Duration } from '@terra-money/terra.proto/google/protobuf/duration';

/**
 *  MsgUpdateAllianceProposal is gov content type to create a new alliance
 */
export class MsgUpdateAllianceProposal extends JSONSerializable<
  MsgUpdateAllianceProposal.Amino,
  MsgUpdateAllianceProposal.Data,
  MsgUpdateAllianceProposal.Proto
> {
  /**
   * @description Update an existent alliance using the gov module
   * @param title of the proposal
   * @param description of the proposal
   * @param denom of the asset. It could either be a native token or an IBC token
   * @param rewardWeight specifies the ratio of rewards that will be given to each alliance asset it does not need to sum to 1. rate = weight / total_weight Native asset is always assumed to have a weight of 1.
   * @param takeRate positive take rate is used for liquid staking derivatives. It defines an annualized reward rate that will be redirected to the distribution rewards pool
   * @param rewardChangeRate how much the reward weight will change every rewardChangeInterval
   * @param rewardChangeInterval how often the reward weight will change
   */
  constructor(
    public title: string,
    public description: string,
    public denom: string,
    public rewardWeight: string,
    public takeRate: string,
    public rewardChangeRate: string,
    public rewardChangeInterval?: Duration
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateAllianceProposal.Amino,
    _?: boolean
  ): MsgUpdateAllianceProposal {
    _;
    data;
    throw new Error('not implemented');
  }

  public toAmino(_?: boolean): MsgUpdateAllianceProposal.Amino {
    _;
    throw new Error('not implemented');
  }

  public static fromData(
    data: MsgUpdateAllianceProposal.Data,
    _?: boolean
  ): MsgUpdateAllianceProposal {
    _;
    const {
      title,
      description,
      denom,
      rewardWeight,
      takeRate,
      rewardChangeRate,
      rewardChangeInterval,
    } = data;
    return new MsgUpdateAllianceProposal(
      title,
      description,
      denom,
      rewardWeight,
      takeRate,
      rewardChangeRate,
      rewardChangeInterval
    );
  }

  public toData(_?: boolean): MsgUpdateAllianceProposal.Data {
    _;
    const {
      title,
      description,
      denom,
      rewardWeight,
      takeRate,
      rewardChangeRate,
      rewardChangeInterval,
    } = this;

    return {
      '@type': '/alliance.alliance.MsgUpdateAllianceProposal',
      title,
      description,
      denom,
      rewardWeight,
      takeRate,
      rewardChangeRate,
      rewardChangeInterval,
    };
  }

  public static fromProto(
    proto: MsgUpdateAllianceProposal.Proto,
    _?: boolean
  ): MsgUpdateAllianceProposal {
    _;
    return new MsgUpdateAllianceProposal(
      proto.title,
      proto.description,
      proto.denom,
      proto.rewardWeight,
      proto.takeRate,
      proto.rewardChangeRate,
      proto.rewardChangeInterval
    );
  }

  public toProto(_?: boolean): MsgUpdateAllianceProposal.Proto {
    _;
    const {
      title,
      description,
      denom,
      rewardWeight,
      takeRate,
      rewardChangeRate,
      rewardChangeInterval,
    } = this;
    return MsgUpdateAllianceProposal_pb.fromPartial({
      title,
      description,
      denom,
      rewardWeight,
      takeRate,
      rewardChangeRate,
      rewardChangeInterval,
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/alliance.alliance.MsgUpdateAllianceProposal',
      value: MsgUpdateAllianceProposal_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgUpdateAllianceProposal {
    _;
    return MsgUpdateAllianceProposal.fromProto(
      MsgUpdateAllianceProposal_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgUpdateAllianceProposal {
  export interface Amino {
    type: 'alliance/MsgUpdateAllianceProposal';
    title: string;
    description: string;
    denom: string;
    rewardWeight: string;
    takeRate: string;
    rewardChangeRate: string;
    rewardChangeInterval?: Duration;
  }

  export interface Data {
    '@type': '/alliance.alliance.MsgUpdateAllianceProposal';
    title: string;
    description: string;
    denom: string;
    rewardWeight: string;
    takeRate: string;
    rewardChangeRate: string;
    rewardChangeInterval?: Duration;
  }

  export type Proto = MsgUpdateAllianceProposal_pb;
}
