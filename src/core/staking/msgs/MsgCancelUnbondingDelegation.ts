import { JSONSerializable } from '../../../util/json';
import { Coin } from '../../Coin';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgCancelUnbondingDelegation as MsgCancelUnbondingDelegation_pb } from '@terra-money/terra.proto/cosmos/staking/v1beta1/tx';
import Long from 'long';

/**
 * When a user wants to cancel the unbonding this messaage can be used
 */
export class MsgCancelUnbondingDelegation extends JSONSerializable<
  MsgCancelUnbondingDelegation.Amino,
  MsgCancelUnbondingDelegation.Data,
  MsgCancelUnbondingDelegation.Proto
> {
  /**
   *
   * @param delegator_address delegator's account address
   * @param validator_src_address source validator to cancel the undelegation from
   * @param validator_dst_address destination validator to cancel the undelegation from
   * @param amount amount of luna to cancel the undelegation from
   */
  constructor(
    public delegator_address: string,
    public validator_address: string,
    public creation_height: Long,
    public amount?: Coin
  ) {
    super();
  }

  public static fromAmino(
    data: MsgCancelUnbondingDelegation.Amino,
    _?: boolean
  ): MsgCancelUnbondingDelegation {
    _;
    const {
      value: { delegator_address, validator_address, creation_height, amount },
    } = data;
    return new MsgCancelUnbondingDelegation(
      delegator_address,
      validator_address,
      creation_height,
      amount ? Coin.fromAmino(amount) : undefined
    );
  }

  public toAmino(isClassic?: boolean): MsgCancelUnbondingDelegation.Amino {
    const { delegator_address, validator_address, creation_height, amount } =
      this;
    return {
      type: isClassic
        ? 'staking/MsgCancelUnbondingDelegation'
        : 'cosmos-sdk/MsgCancelUnbondingDelegation',
      value: {
        delegator_address,
        validator_address,
        creation_height,
        amount: amount?.toAmino(),
      },
    };
  }

  public static fromData(
    data: MsgCancelUnbondingDelegation.Data,
    _?: boolean
  ): MsgCancelUnbondingDelegation {
    _;
    const { delegator_address, validator_address, creation_height, amount } =
      data;

    return new MsgCancelUnbondingDelegation(
      delegator_address,
      validator_address,
      creation_height,
      amount ? Coin.fromData(amount) : undefined
    );
  }

  public toData(_?: boolean): MsgCancelUnbondingDelegation.Data {
    _;
    const { delegator_address, validator_address, creation_height, amount } =
      this;
    return {
      '@type': '/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation',
      delegator_address,
      validator_address,
      creation_height,
      amount: amount?.toData(),
    };
  }

  public static fromProto(
    proto: MsgCancelUnbondingDelegation.Proto,
    _?: boolean
  ): MsgCancelUnbondingDelegation {
    _;
    return new MsgCancelUnbondingDelegation(
      proto.delegatorAddress,
      proto.validatorAddress,
      proto.creationHeight,
      Coin.fromProto(proto.amount as Coin.Proto)
    );
  }

  public toProto(_?: boolean): MsgCancelUnbondingDelegation.Proto {
    _;
    const { delegator_address, validator_address, creation_height, amount } =
      this;
    return MsgCancelUnbondingDelegation_pb.fromPartial({
      delegatorAddress: delegator_address,
      validatorAddress: validator_address,
      creationHeight: creation_height,
      amount: amount?.toProto(),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation',
      value: MsgCancelUnbondingDelegation_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgCancelUnbondingDelegation {
    return MsgCancelUnbondingDelegation.fromProto(
      MsgCancelUnbondingDelegation_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgCancelUnbondingDelegation {
  export interface Amino {
    type:
      | 'staking/MsgCancelUnbondingDelegation'
      | 'cosmos-sdk/MsgCancelUnbondingDelegation';
    value: {
      delegator_address: string;
      validator_address: string;
      creation_height: Long;
      amount?: Coin.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation';
    delegator_address: string;
    validator_address: string;
    creation_height: Long;
    amount?: Coin.Data;
  }

  export type Proto = MsgCancelUnbondingDelegation_pb;
}
