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
   * @param delegator_address delegator's account address
   * @param validator_src_address validator to undelegate from
   * @param validator_dst_address validator to delegate to
   * @param amount amount of alliance assets to be redelegated
   */
  constructor(
    public delegator_address: AccAddress,
    public validator_src_address: ValAddress,
    public validator_dst_address: ValAddress,
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
        delegator_address,
        validator_src_address,
        validator_dst_address,
        amount,
      },
    } = data;

    return new MsgRedelegate(
      delegator_address,
      validator_src_address,
      validator_dst_address,
      Coin.fromAmino(amount)
    );
  }

  public toAmino(_?: boolean): MsgRedelegate.Amino {
    _;
    const {
      delegator_address,
      validator_src_address,
      validator_dst_address,
      amount,
    } = this;
    return {
      type: 'alliance/MsgRedelegate',
      value: {
        delegator_address,
        validator_src_address,
        validator_dst_address,
        amount: amount.toAmino(),
      },
    };
  }

  public static fromData(data: MsgRedelegate.Data, _?: boolean): MsgRedelegate {
    _;
    const {
      delegator_address,
      validator_src_address,
      validator_dst_address,
      amount,
    } = data;
    return new MsgRedelegate(
      delegator_address,
      validator_src_address,
      validator_dst_address,
      Coin.fromData(amount)
    );
  }

  public toData(_?: boolean): MsgRedelegate.Data {
    _;
    const {
      delegator_address,
      validator_src_address,
      validator_dst_address,
      amount,
    } = this;
    return {
      '@type': '/alliance.alliance.MsgRedelegate',
      delegator_address,
      validator_src_address,
      validator_dst_address,
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
      delegator_address,
      validator_src_address,
      validator_dst_address,
      amount,
    } = this;
    return MsgRedelegate_pb.fromPartial({
      amount: amount.toProto(),
      delegatorAddress: delegator_address,
      validatorSrcAddress: validator_src_address,
      validatorDstAddress: validator_dst_address,
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
      delegator_address: AccAddress;
      validator_src_address: ValAddress;
      validator_dst_address: ValAddress;
      amount: Coin.Amino;
    };
  }

  export interface Data {
    '@type': '/alliance.alliance.MsgRedelegate';
    delegator_address: AccAddress;
    validator_src_address: ValAddress;
    validator_dst_address: ValAddress;
    amount: Coin.Data;
  }

  export type Proto = MsgRedelegate_pb;
}
