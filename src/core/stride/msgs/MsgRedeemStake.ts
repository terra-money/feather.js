import { JSONSerializable } from '../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgRedeemStake as MsgRedeemStake_pb } from '@terra-money/terra.proto/build/stride/stakeibc/tx';

// Used on Stride to redeem the staked assets
export class MsgRedeemStake extends JSONSerializable<
  {},
  MsgRedeemStake.Data,
  MsgRedeemStake.Proto
> {
  /**
   * @param creator the address of user who wants to redeem the staked assets
   * @param amount amount of alliance assets to be sent for delegation
   * @param hostZone the denomination of the asset to be sent to delegate
   * @param receiver the address of user to receive the unstaked assets
   */
  constructor(
    public creator: string,
    public amount: string,
    public hostZone: string,
    public receiver: string
  ) {
    super();
  }

  public toAmino(_?: boolean): {} {
    _;
    throw Error(
      'Legacy Amino not supported for MsgRedeemStake messages. Use Protobuf instead.'
    );
  }

  public static fromProto(
    proto: MsgRedeemStake.Proto,
    _?: boolean
  ): MsgRedeemStake {
    _;
    return new MsgRedeemStake(
      proto.creator,
      proto.amount,
      proto.hostZone,
      proto.receiver
    );
  }

  public toProto(_?: boolean): MsgRedeemStake.Proto {
    _;
    const { creator, amount, hostZone, receiver } = this;
    return MsgRedeemStake_pb.fromPartial({
      creator,
      amount,
      hostZone,
      receiver,
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/stride.stakeibc.MsgRedeemStake',
      value: MsgRedeemStake_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgRedeemStake {
    _;
    return MsgRedeemStake.fromProto(MsgRedeemStake_pb.decode(msgAny.value));
  }

  public static fromData(
    data: MsgRedeemStake.Data,
    _?: boolean
  ): MsgRedeemStake {
    _;
    const { creator, amount, hostZone, receiver } = data;
    return new MsgRedeemStake(creator, amount, hostZone, receiver);
  }

  public toData(_?: boolean): MsgRedeemStake.Data {
    _;
    const { creator, amount, hostZone, receiver } = this;
    return {
      '@type': '/stride.stakeibc.MsgRedeemStake',
      creator,
      amount,
      hostZone,
      receiver,
    };
  }
}

export namespace MsgRedeemStake {
  export interface Data {
    '@type': '/stride.stakeibc.MsgRedeemStake';
    creator: string;
    amount: string;
    hostZone: string;
    receiver: string;
  }

  export type Proto = MsgRedeemStake_pb;
}
