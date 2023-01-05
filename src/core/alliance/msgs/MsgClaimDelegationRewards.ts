import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
// TODO: Replace with the correct protobuf
import { MsgClaimDelegationRewards as MsgClaimDelegationRewards_pb } from '@terra-money/terra.proto/cosmos/distribution/v1beta1/tx';

/**
 * A delegator can withdraw currently outstanding rewards accrued from their delegation
 * toward a validator by submitting the following message.
 *
 * The rewards will be deposited to their Withdraw Address.
 */
export class MsgClaimDelegationRewards extends JSONSerializable<
  {},
  MsgClaimDelegationRewards.Data,
  MsgClaimDelegationRewards.Proto
> {
  /**
   *
   * @param delegatorAddress delegator's account address
   * @param validatorAddress validator's operator address
   */
  constructor(
    public delegatorAddress: AccAddress,
    public validatorAddress: ValAddress,
    public denom: string
  ) {
    super();
  }

  public toAmino(_?: boolean): {} {
    _;
    throw Error(
      'Legacy Amino not supported for MsgDelegate from x/alliance module'
    );
  }

  public static fromData(
    proto: MsgClaimDelegationRewards.Data,
    _?: boolean
  ): MsgClaimDelegationRewards {
    _;
    const { delegatorAddress, validatorAddress, denom } = proto;
    return new MsgClaimDelegationRewards(
      delegatorAddress,
      validatorAddress,
      denom
    );
  }

  public toData(_?: boolean): MsgClaimDelegationRewards.Data {
    _;
    const { delegatorAddress, validatorAddress, denom } = this;
    return {
      '@type': '/alliance.alliance.MsgClaimDelegationRewards',
      delegatorAddress,
      validatorAddress,
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
    const { delegatorAddress, validatorAddress, denom } = this;
    return MsgClaimDelegationRewards_pb.fromPartial({
      delegatorAddress: delegatorAddress,
      validatorAddress: validatorAddress,
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
  export interface Data {
    '@type': '/alliance.alliance.MsgClaimDelegationRewards';
    delegatorAddress: AccAddress;
    validatorAddress: ValAddress;
    denom: string;
  }

  export type Proto = MsgClaimDelegationRewards_pb;
}
