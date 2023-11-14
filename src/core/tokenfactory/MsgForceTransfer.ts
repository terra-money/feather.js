import { DenomUnit } from '@terra-money/terra.proto/cosmos/bank/v1beta1/bank';
import { JSONSerializable } from '../../util/json';
import { AccAddress } from '../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Metadata } from '@terra-money/terra.proto/cosmos/bank/v1beta1/bank';
import { MsgForceTransfer as MsgForceTransfer_pb } from '@terra-money/terra.proto/osmosis/tokenfactory/v1beta1/tx';
import { Coin } from '../Coin';

/**
 * MsgForceTransfer allows setting the metadata
 * for an already existing denom
 */
export class MsgForceTransfer extends JSONSerializable<
  MsgForceTransfer.Amino,
  MsgForceTransfer.Data,
  MsgForceTransfer.Proto
> {
  /**
   *
   * @param sender internal account or external sender address
   * @param metadata the cosmwasm contract address
   */
  constructor(
    public sender: AccAddress,
    public amount: Coin,
    public transferFromAddress: AccAddress,
    public transferToAddress: AccAddress
  ) {
    super();
  }

  public toAmino(_?: boolean): MsgForceTransfer.Amino {
    _;
    const { sender, amount, transferFromAddress, transferToAddress } = this;

    return {
      type: 'osmosis/tokenfactory/force-transfer',
      value: {
        sender,
        amount: amount.toAmino(),
        transferFromAddress,
        transferToAddress,
      },
    };
  }

  public static fromProto(
    proto: MsgForceTransfer.Proto,
    _?: boolean
  ): MsgForceTransfer {
    _;
    return new MsgForceTransfer(
      proto.sender,
      Coin.fromProto(proto.amount as Coin.Proto),
      proto.transferFromAddress,
      proto.transferToAddress
    );
  }

  public toProto(_?: boolean): MsgForceTransfer.Proto {
    _;
    const { sender, amount, transferFromAddress, transferToAddress } = this;
    return MsgForceTransfer_pb.fromPartial({
      sender,
      amount: amount?.toProto(),
      transferFromAddress,
      transferToAddress,
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/osmosis.tokenfactory.v1beta1.MsgForceTransfer',
      value: MsgForceTransfer_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgForceTransfer {
    _;
    return MsgForceTransfer.fromProto(MsgForceTransfer_pb.decode(msgAny.value));
  }

  public static fromData(
    data: MsgForceTransfer.Data,
    _?: boolean
  ): MsgForceTransfer {
    _;
    const { sender, amount, transferFromAddress, transferToAddress } = data;
    return new MsgForceTransfer(
      sender,
      Coin.fromData(amount),
      transferFromAddress,
      transferToAddress
    );
  }

  public toData(_?: boolean): MsgForceTransfer.Data {
    _;
    const { sender, amount, transferFromAddress, transferToAddress } = this;
    return {
      '@type': '/osmosis.tokenfactory.v1beta1.MsgForceTransfer',
      sender,
      amount: amount.toData(),
      transferFromAddress,
      transferToAddress,
    };
  }

  public static fromAmino(data: MsgForceTransfer.Amino): MsgForceTransfer {
    const {
      value: { sender, amount, transferFromAddress, transferToAddress },
    } = data;

    return new MsgForceTransfer(
      sender,
      Coin.fromAmino(amount),
      transferFromAddress,
      transferToAddress
    );
  }
}

export namespace MsgForceTransfer {
  export interface Amino {
    type: 'osmosis/tokenfactory/force-transfer';
    value: {
      sender: AccAddress;
      amount: Coin.Amino;
      transferFromAddress: AccAddress;
      transferToAddress: AccAddress;
    };
  }

  export interface Data {
    '@type': '/osmosis.tokenfactory.v1beta1.MsgForceTransfer';
    sender: AccAddress;
    amount: Coin.Data;
    transferFromAddress: AccAddress;
    transferToAddress: AccAddress;
  }

  export type Proto = MsgForceTransfer_pb;
}
