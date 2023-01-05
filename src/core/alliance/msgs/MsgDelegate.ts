import { Coin } from '../../Coin';
import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
// TODO: Replace with the correct protobuf
import { MsgDelegate as MsgDelegate_pb } from '@terra-money/terra.proto/cosmos/staking/v1beta1/tx';

/**
 * A delegator can submit this message to send more Luna to be staked through a
 * validator delegate.
 */
export class MsgDelegate extends JSONSerializable<
  {},
  MsgDelegate.Data,
  MsgDelegate.Proto
> {
  /**
   *
   * @param delegatorAddress delegator's account address
   * @param validatorAddress validator's operator address
   * @param amount amount of alliance coin to be sent for delegation
   */
  constructor(
    public delegatorAddress: AccAddress,
    public validatorAddress: ValAddress,
    public amount: Coin
  ) {
    super();
  }

  public toAmino(_?: boolean): {} {
    _;
    throw Error(
      'Legacy Amino not supported for MsgDelegate from x/alliance module'
    );
  }

  public static fromProto(proto: MsgDelegate.Proto, _?: boolean): MsgDelegate {
    _;
    return new MsgDelegate(
      proto.delegatorAddress,
      proto.validatorAddress,
      Coin.fromProto(proto.amount as Coin.Proto)
    );
  }

  public toProto(_?: boolean): MsgDelegate.Proto {
    _;
    const { delegatorAddress, validatorAddress, amount } = this;
    return MsgDelegate_pb.fromPartial({
      amount: amount.toProto(),
      delegatorAddress: delegatorAddress,
      validatorAddress: validatorAddress,
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/alliance.alliance.MsgDelegate',
      value: MsgDelegate_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgDelegate {
    _;
    return MsgDelegate.fromProto(MsgDelegate_pb.decode(msgAny.value));
  }

  public static fromData(data: MsgDelegate.Data, _?: boolean): MsgDelegate {
    _;
    const { delegatorAddress, validatorAddress, amount } = data;
    return new MsgDelegate(
      delegatorAddress,
      validatorAddress,
      Coin.fromData(amount)
    );
  }

  public toData(_?: boolean): MsgDelegate.Data {
    _;
    const { delegatorAddress, validatorAddress, amount } = this;
    return {
      '@type': '/alliance.alliance.MsgDelegate',
      delegatorAddress,
      validatorAddress,
      amount: amount.toData(),
    };
  }
}

export namespace MsgDelegate {
  export interface Data {
    '@type': '/alliance.alliance.MsgDelegate';
    delegatorAddress: AccAddress;
    validatorAddress: ValAddress;
    amount: Coin.Data;
  }

  export type Proto = MsgDelegate_pb;
}
