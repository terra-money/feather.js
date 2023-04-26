import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgClaimDelegationRewards as MsgClaimDelegationRewards_pb } from '@terra-money/terra.proto/alliance/tx';

/**
 * A delegator can withdraw currently outstanding rewards accrued
 * from their delegation toward a validator by submitting the following message
 * to te x/alliance module.
 *
 * The rewards will be deposited to their Withdraw Address.
 */
export class MsgClaimDelegationRewards extends JSONSerializable<
  MsgClaimDelegationRewards.Amino,
  MsgClaimDelegationRewards.Data,
  MsgClaimDelegationRewards.Proto
> {
  /**
   *
   * @param delegator_address delegator's account address
   * @param validator_address validator's operator address
   * @param denom alliance denom to claim rewards for (e.g. ibc/AAE7E4 or uluna...)
   */
  constructor(
    public delegator_address: AccAddress,
    public validator_address: ValAddress,
    public denom: string
  ) {
    super();
  }

  public static fromAmino(
    data: MsgClaimDelegationRewards.Amino,
    _?: boolean
  ): MsgClaimDelegationRewards {
    _;
    const {
      value: { delegator_address, validator_address, denom },
    } = data;

    return new MsgClaimDelegationRewards(
      delegator_address,
      validator_address,
      denom
    );
  }

  public toAmino(_?: boolean): MsgClaimDelegationRewards.Amino {
    _;
    const { delegator_address, validator_address, denom } = this;

    return {
      type: 'alliance/MsgClaimDelegationRewards',
      value: {
        delegator_address,
        validator_address,
        denom,
      },
    };
  }

  public static fromData(
    proto: MsgClaimDelegationRewards.Data,
    _?: boolean
  ): MsgClaimDelegationRewards {
    _;
    const { delegator_address, validator_address, denom } = proto;
    return new MsgClaimDelegationRewards(
      delegator_address,
      validator_address,
      denom
    );
  }

  public toData(_?: boolean): MsgClaimDelegationRewards.Data {
    _;
    const { delegator_address, validator_address, denom } = this;
    return {
      '@type': '/alliance.alliance.MsgClaimDelegationRewards',
      delegator_address,
      validator_address,
      denom,
    };
  }

  public static fromProto(
    proto: MsgClaimDelegationRewards.Proto,
    _?: boolean
  ): MsgClaimDelegationRewards {
    _;
    return new MsgClaimDelegationRewards(
      proto.delegatorAddress,
      proto.validatorAddress,
      proto.denom
    );
  }

  public toProto(_?: boolean): MsgClaimDelegationRewards.Proto {
    _;
    const { delegator_address, validator_address, denom } = this;
    return MsgClaimDelegationRewards_pb.fromPartial({
      delegatorAddress: delegator_address,
      validatorAddress: validator_address,
      denom: denom,
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/alliance.alliance.MsgClaimDelegationRewards',
      value: MsgClaimDelegationRewards_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgClaimDelegationRewards {
    _;
    return MsgClaimDelegationRewards.fromProto(
      MsgClaimDelegationRewards_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgClaimDelegationRewards {
  export interface Amino {
    type: 'alliance/MsgClaimDelegationRewards';
    value: {
      delegator_address: AccAddress;
      validator_address: ValAddress;
      denom: string;
    };
  }

  export interface Data {
    '@type': '/alliance.alliance.MsgClaimDelegationRewards';
    delegator_address: AccAddress;
    validator_address: ValAddress;
    denom: string;
  }

  export type Proto = MsgClaimDelegationRewards_pb;
}
