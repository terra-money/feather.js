import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgBurn as MsgBurn_pb } from '@terra-money/terra.proto/cosmwasm/tokenfactory/v1beta1/tx';
import { Coin } from '../../../Coin';

/**
 * MsgBurn is the sdk.Msg type for allowing an admin account to burn
 * a token.  For now, we only support burning from the sender account.
 */
export class MsgBurn extends JSONSerializable<
  MsgBurn.Amino,
  MsgBurn.Data,
  MsgBurn.Proto
> {
  /**
   *
   * @param sender internal account or external sender address
   * @param amount amount of coins to burn
   */
  constructor(public sender: AccAddress, public amount?: Coin) {
    super();
  }

  public toAmino(_?: boolean): MsgBurn.Amino {
    _;
    const { sender, amount } = this;

    return {
      type: 'osmosis/tokenfactory/burn',
      value: {
        sender,
        amount,
      },
    };
  }

  public static fromProto(proto: MsgBurn.Proto, _?: boolean): MsgBurn {
    _;
    return new MsgBurn(
      proto.sender,
      Coin.fromProto(proto.amount as Coin.Proto)
    );
  }

  public toProto(_?: boolean): MsgBurn.Proto {
    _;
    const { sender, amount } = this;
    return MsgBurn_pb.fromPartial({
      sender,
      amount: amount?.toProto(),
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/osmosis.tokenfactory.v1beta1.MsgBurn',
      value: MsgBurn_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgBurn {
    _;
    return MsgBurn.fromProto(MsgBurn_pb.decode(msgAny.value));
  }

  public static fromData(data: MsgBurn.Data, _?: boolean): MsgBurn {
    _;
    const { sender, amount } = data;
    return new MsgBurn(sender, amount);
  }

  public toData(_?: boolean): MsgBurn.Data {
    _;
    const { sender, amount } = this;
    return {
      '@type': '/osmosis.tokenfactory.v1beta1.MsgBurn',
      sender,
      amount,
    };
  }

  public static fromAmino(data: MsgBurn.Amino): MsgBurn {
    const {
      value: { sender, amount },
    } = data;

    return new MsgBurn(sender, amount);
  }
}

export namespace MsgBurn {
  export interface Amino {
    type: 'osmosis/tokenfactory/burn';
    value: {
      sender: AccAddress;
      amount?: Coin;
    };
  }

  export interface Data {
    '@type': '/osmosis.tokenfactory.v1beta1.MsgBurn';
    sender: AccAddress;
    amount?: Coin;
  }

  export type Proto = MsgBurn_pb;
}
