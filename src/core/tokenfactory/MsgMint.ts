import { JSONSerializable } from '../../util/json';
import { AccAddress } from '../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgMint as MsgMint_pb } from '@terra-money/terra.proto/osmosis/tokenfactory/v1beta1/tx';
import { Coin } from '../Coin';

/**
 * MsgMint is the sdk.Msg type for allowing an admin account to mint
 * more of a token.  For now, we only support minting to the sender account
 */
export class MsgMint extends JSONSerializable<
  MsgMint.Amino,
  MsgMint.Data,
  MsgMint.Proto
> {
  /**
   *
   * @param sender internal account or external sender address
   * @param amount amount of coins to mint
   */
  constructor(public sender: AccAddress, public amount?: Coin) {
    super();
  }

  public toAmino(_?: boolean): MsgMint.Amino {
    _;
    const { sender, amount } = this;

    return {
      type: 'osmosis/tokenfactory/mint',
      value: {
        sender,
        amount,
      },
    };
  }

  public static fromProto(proto: MsgMint.Proto, _?: boolean): MsgMint {
    _;
    return new MsgMint(
      proto.sender,
      Coin.fromProto(proto.amount as Coin.Proto)
    );
  }

  public toProto(_?: boolean): MsgMint.Proto {
    _;
    const { sender, amount } = this;
    return MsgMint_pb.fromPartial({
      sender,
      amount: amount?.toProto(),
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/osmosis.tokenfactory.v1beta1.MsgMint',
      value: MsgMint_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgMint {
    _;
    return MsgMint.fromProto(MsgMint_pb.decode(msgAny.value));
  }

  public static fromData(data: MsgMint.Data, _?: boolean): MsgMint {
    _;
    const { sender, amount } = data;
    return new MsgMint(sender, amount);
  }

  public toData(_?: boolean): MsgMint.Data {
    _;
    const { sender, amount } = this;
    return {
      '@type': '/osmosis.tokenfactory.v1beta1.MsgMint',
      sender,
      amount,
    };
  }

  public static fromAmino(data: MsgMint.Amino): MsgMint {
    const {
      value: { sender, amount },
    } = data;

    return new MsgMint(sender, amount);
  }
}

export namespace MsgMint {
  export interface Amino {
    type: 'osmosis/tokenfactory/mint';
    value: {
      sender: AccAddress;
      amount?: Coin;
    };
  }

  export interface Data {
    '@type': '/osmosis.tokenfactory.v1beta1.MsgMint';
    sender: AccAddress;
    amount?: Coin;
  }

  export type Proto = MsgMint_pb;
}
