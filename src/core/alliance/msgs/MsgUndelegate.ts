import { Coin } from '../../Coin';
import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgUndelegate as MsgUndelegate_pb } from '@terra-money/terra.proto/alliance/tx';

/**
 * A delegator can undelegate an amount of bonded alliance tokens
 * form the x/alliance module, and will begin the unbonding process
 * for those funds. The unbonding process takes 21 days to complete,
 * during which the Luna cannot be transacted or swapped.
 */
export class MsgUndelegate extends JSONSerializable<
  {},
  MsgUndelegate.Data,
  MsgUndelegate.Proto
> {
  /**
   * @param delegatorAddress delegator's account address
   * @param validatorAddress validator's operator address
   * @param amount alliance assets to be undelegated
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
      'Legacy Amino not supported for MsgUndelegate from x/alliance module'
    );
  }

  public static fromProto(
    proto: MsgUndelegate.Proto,
    _?: boolean
  ): MsgUndelegate {
    _;
    return new MsgUndelegate(
      proto.delegatorAddress,
      proto.validatorAddress,
      Coin.fromProto(proto.amount as Coin.Proto)
    );
  }

  public toProto(_?: boolean): MsgUndelegate.Proto {
    _;
    const { delegatorAddress, validatorAddress, amount } = this;
    return MsgUndelegate_pb.fromPartial({
      amount: amount.toProto(),
      delegatorAddress: delegatorAddress,
      validatorAddress: validatorAddress,
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/alliance.alliance.MsgUndelegate',
      value: MsgUndelegate_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgUndelegate {
    _;
    return MsgUndelegate.fromProto(MsgUndelegate_pb.decode(msgAny.value));
  }

  public static fromData(data: MsgUndelegate.Data, _?: boolean): MsgUndelegate {
    _;
    const { delegatorAddress, validatorAddress, amount } = data;
    return new MsgUndelegate(
      delegatorAddress,
      validatorAddress,
      Coin.fromData(amount)
    );
  }

  public toData(_?: boolean): MsgUndelegate.Data {
    _;
    const { delegatorAddress, validatorAddress, amount } = this;
    return {
      '@type': '/alliance.alliance.MsgUndelegate',
      delegatorAddress,
      validatorAddress,
      amount: amount.toData(),
    };
  }
}

export namespace MsgUndelegate {
  export interface Data {
    '@type': '/alliance.alliance.MsgUndelegate';
    delegatorAddress: AccAddress;
    validatorAddress: ValAddress;
    amount: Coin.Data;
  }

  export type Proto = MsgUndelegate_pb;
}
