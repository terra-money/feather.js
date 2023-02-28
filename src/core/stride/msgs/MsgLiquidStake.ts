import { JSONSerializable } from '../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgLiquidStake as MsgLiquidStake_pb } from '@terra-money/terra.proto/stride/stakeibc/tx';

// Used on Stride to create liquid staked asset from a native asset
export class MsgLiquidStake extends JSONSerializable<
  {},
  MsgLiquidStake.Data,
  MsgLiquidStake.Proto
> {
  /**
   * @param creator the address of user who wants to create the staked assets
   * @param amount amount of native assets to be staked
   * @param hostDenom the denomination of the asset to be sent to delegate (uluna, uosmo...)
   */
  constructor(
    public creator: string,
    public amount: string,
    public hostDenom: string
  ) {
    super();
  }

  public toAmino(_?: boolean): {} {
    _;
    throw Error(
      'Legacy Amino not supported for MsgLiquidStake messages. Use Protobuf instead.'
    );
  }

  public static fromProto(
    proto: MsgLiquidStake.Proto,
    _?: boolean
  ): MsgLiquidStake {
    _;
    return new MsgLiquidStake(proto.creator, proto.amount, proto.hostDenom);
  }

  public toProto(_?: boolean): MsgLiquidStake.Proto {
    _;
    const { creator, amount, hostDenom } = this;
    return MsgLiquidStake_pb.fromPartial({ creator, amount, hostDenom });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/stride.stakeibc.MsgLiquidStake',
      value: MsgLiquidStake_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgLiquidStake {
    _;
    return MsgLiquidStake.fromProto(MsgLiquidStake_pb.decode(msgAny.value));
  }

  public static fromData(
    data: MsgLiquidStake.Data,
    _?: boolean
  ): MsgLiquidStake {
    _;
    const { creator, amount, hostDenom } = data;
    return new MsgLiquidStake(creator, amount, hostDenom);
  }

  public toData(_?: boolean): MsgLiquidStake.Data {
    _;
    const { creator, amount, hostDenom } = this;
    return {
      '@type': '/stride.stakeibc.MsgLiquidStake',
      creator,
      amount,
      hostDenom,
    };
  }
}

export namespace MsgLiquidStake {
  export interface Data {
    '@type': '/stride.stakeibc.MsgLiquidStake';
    creator: string;
    amount: string;
    hostDenom: string;
  }

  export type Proto = MsgLiquidStake_pb;
}
