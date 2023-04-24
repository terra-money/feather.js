import { JSONSerializable } from '../../../util/json';
import { Coin } from '../../Coin';
import { AccAddress, ValAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgRedelegate as MsgRedelegate_pb } from '@terra-money/terra.proto/alliance/tx';

/**
 * A delegator can choose to redelegate their bonded alliance assets
 * and transfer a delegation from one validator to another. Unlike
 * undelegating, redelegations do not incur a 21-day unbonding period
 * and happen immediately.
 */
export class MsgRedelegate extends JSONSerializable<
  MsgRedelegate.Amino,
  MsgRedelegate.Data,
  MsgRedelegate.Proto
> {
  /**
   *
   * @param delegatorAddress delegator's account address
   * @param validatorSrcAddress validator to undelegate from
   * @param validatorDstAddress validator to delegate to
   * @param amount amount of alliance assets to be redelegated
   */
  constructor(
    public delegatorAddress: AccAddress,
    public validatorSrcAddress: ValAddress,
    public validatorDstAddress: ValAddress,
    public amount: Coin
  ) {
    super();
  }

  public static fromAmino(
    data: MsgRedelegate.Amino,
    _?: boolean
  ): MsgRedelegate {
    _;
    const {
      value: {
        delegatorAddress,
        validatorSrcAddress,
        validatorDstAddress,
        amount,
      },
    } = data;

    return new MsgRedelegate(
      delegatorAddress,
      validatorSrcAddress,
      validatorDstAddress,
      Coin.fromAmino(amount)
    );
  }

  public toAmino(_?: boolean): MsgRedelegate.Amino {
    _;
    const {
      delegatorAddress,
      validatorSrcAddress,
      validatorDstAddress,
      amount,
    } = this;
    return {
      type: 'alliance/MsgRedelegate',
      value: {
        delegatorAddress,
        validatorSrcAddress,
        validatorDstAddress,
        amount: amount.toAmino(),
      },
    };
  }

  public static fromData(data: MsgRedelegate.Data, _?: boolean): MsgRedelegate {
    _;
    const {
      delegatorAddress,
      validatorSrcAddress,
      validatorDstAddress,
      amount,
    } = data;
    return new MsgRedelegate(
      delegatorAddress,
      validatorSrcAddress,
      validatorDstAddress,
      Coin.fromData(amount)
    );
  }

  public toData(_?: boolean): MsgRedelegate.Data {
    _;
    const {
      delegatorAddress,
      validatorSrcAddress,
      validatorDstAddress,
      amount,
    } = this;
    return {
      '@type': '/alliance.alliance.MsgRedelegate',
      delegatorAddress,
      validatorSrcAddress,
      validatorDstAddress,
      amount: amount.toData(),
    };
  }

  public static fromProto(
    proto: MsgRedelegate.Proto,
    _?: boolean
  ): MsgRedelegate {
    _;
    return new MsgRedelegate(
      proto.delegatorAddress,
      proto.validatorSrcAddress,
      proto.validatorDstAddress,
      Coin.fromProto(proto.amount as Coin.Proto)
    );
  }

  public toProto(_?: boolean): MsgRedelegate.Proto {
    _;
    const {
      delegatorAddress,
      validatorSrcAddress,
      validatorDstAddress,
      amount,
    } = this;
    return MsgRedelegate_pb.fromPartial({
      amount: amount.toProto(),
      delegatorAddress: delegatorAddress,
      validatorDstAddress: validatorSrcAddress,
      validatorSrcAddress: validatorDstAddress,
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/alliance.alliance.MsgRedelegate',
      value: MsgRedelegate_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgRedelegate {
    _;
    return MsgRedelegate.fromProto(MsgRedelegate_pb.decode(msgAny.value));
  }
}

export namespace MsgRedelegate {
  export interface Amino {
    type: 'alliance/MsgRedelegate';
    value: {
      delegatorAddress: AccAddress;
      validatorSrcAddress: ValAddress;
      validatorDstAddress: ValAddress;
      amount: Coin.Amino;
    };
  }

  export interface Data {
    '@type': '/alliance.alliance.MsgRedelegate';
    delegatorAddress: AccAddress;
    validatorSrcAddress: ValAddress;
    validatorDstAddress: ValAddress;
    amount: Coin.Data;
  }

  export type Proto = MsgRedelegate_pb;
}
