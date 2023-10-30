import { JSONSerializable } from '../../../../util/json';
import { Any } from '@terra-money/legacy.proto/google/protobuf/any';
import { MsgUpdateAlliance as MsgUpdateAlliance_pb } from '@terra-money/terra.proto/alliance/alliance/tx';
import { Duration } from '@terra-money/terra.proto/google/protobuf/duration';

/**
 *  MsgUpdateAlliance is gov content type to create a new alliance
 */
export class MsgUpdateAlliance extends JSONSerializable<
  MsgUpdateAlliance.Amino,
  MsgUpdateAlliance.Data,
  MsgUpdateAlliance.Proto
> {
  /**
   * @description Update an existent alliance using the gov module
   * @param authority of the proposal
   * @param denom of the asset. It could either be a native token or an IBC token
   * @param rewardWeight specifies the ratio of rewards that will be given to each alliance asset it does not need to sum to 1. rate = weight / total_weight Native asset is always assumed to have a weight of 1.
   * @param takeRate positive take rate is used for liquid staking derivatives. It defines an annualized reward rate that will be redirected to the distribution rewards pool
   * @param rewardChangeRate how much the reward weight will change every rewardChangeInterval
   * @param rewardChangeInterval how often the reward weight will change
   */
  constructor(
    public authority: string,
    public denom: string,
    public rewardWeight: string,
    public takeRate: string,
    public rewardChangeRate: string,
    public rewardChangeInterval?: Duration
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateAlliance.Amino,
    _?: boolean
  ): MsgUpdateAlliance {
    _;
    data;
    throw new Error('not implemented');
  }

  public toAmino(_?: boolean): MsgUpdateAlliance.Amino {
    _;
    throw new Error('not implemented');
  }

  public static fromData(
    data: MsgUpdateAlliance.Data,
    _?: boolean
  ): MsgUpdateAlliance {
    _;
    const {
      authority,
      denom,
      rewardWeight,
      takeRate,
      rewardChangeRate,
      rewardChangeInterval,
    } = data;
    return new MsgUpdateAlliance(
      authority,
      denom,
      rewardWeight,
      takeRate,
      rewardChangeRate,
      rewardChangeInterval
    );
  }

  public toData(_?: boolean): MsgUpdateAlliance.Data {
    _;
    const {
      authority,
      denom,
      rewardWeight,
      takeRate,
      rewardChangeRate,
      rewardChangeInterval,
    } = this;

    return {
      '@type': '/alliance.alliance.MsgUpdateAlliance',
      authority,
      denom,
      rewardWeight,
      takeRate,
      rewardChangeRate,
      rewardChangeInterval,
    };
  }

  public static fromProto(
    proto: MsgUpdateAlliance.Proto,
    _?: boolean
  ): MsgUpdateAlliance {
    _;
    return new MsgUpdateAlliance(
      proto.authority,
      proto.denom,
      proto.rewardWeight,
      proto.takeRate,
      proto.rewardChangeRate,
      proto.rewardChangeInterval
    );
  }

  public toProto(_?: boolean): MsgUpdateAlliance.Proto {
    _;
    const {
      authority,
      denom,
      rewardWeight,
      takeRate,
      rewardChangeRate,
      rewardChangeInterval,
    } = this;
    return MsgUpdateAlliance_pb.fromPartial({
      authority,
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
      typeUrl: '/alliance.alliance.MsgUpdateAlliance',
      value: MsgUpdateAlliance_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgUpdateAlliance {
    _;
    return MsgUpdateAlliance.fromProto(
      MsgUpdateAlliance_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgUpdateAlliance {
  export interface Amino {
    type: 'alliance/MsgUpdateAlliance';
    authority: string;
    denom: string;
    rewardWeight: string;
    takeRate: string;
    rewardChangeRate: string;
    rewardChangeInterval?: Duration;
  }

  export interface Data {
    '@type': '/alliance.alliance.MsgUpdateAlliance';
    authority: string;
    denom: string;
    rewardWeight: string;
    takeRate: string;
    rewardChangeRate: string;
    rewardChangeInterval?: Duration;
  }

  export type Proto = MsgUpdateAlliance_pb;
}
