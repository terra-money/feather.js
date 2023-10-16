import { JSONSerializable } from '../../util/json';
import { AccAddress, ValAddress } from '../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgUpdateFeeShare as MsgUpdateFeeShare_pb } from '@terra-money/terra.proto/juno/feeshare/v1/tx';

export class MsgUpdateFeeShare extends JSONSerializable<
  MsgUpdateFeeShare.Amino,
  MsgUpdateFeeShare.Data,
  MsgUpdateFeeShare.Proto
> {
  /**
   *
   * @param delegator_address delegator's account address
   * @param validator_address validator's operator address
   * @param denom alliance denom to claim rewards for (e.g. ibc/AAE7E4 or uluna...)
   */
  constructor(
    public contract_address: AccAddress,
    public deployer_address: AccAddress,
    public withdrawer_address: AccAddress
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateFeeShare.Amino,
    _?: boolean
  ): MsgUpdateFeeShare {
    _;
    const {
      value: { contract_address, deployer_address, withdrawer_address },
    } = data;

    return new MsgUpdateFeeShare(
      contract_address,
      deployer_address,
      withdrawer_address
    );
  }

  public toAmino(_?: boolean): MsgUpdateFeeShare.Amino {
    _;
    const { contract_address, deployer_address, withdrawer_address } = this;

    return {
      type: 'juno/MsgUpdateFeeShare',
      value: {
        contract_address,
        deployer_address,
        withdrawer_address,
      },
    };
  }

  public static fromData(
    proto: MsgUpdateFeeShare.Data,
    _?: boolean
  ): MsgUpdateFeeShare {
    _;
    const { contract_address, deployer_address, withdrawer_address } = proto;
    return new MsgUpdateFeeShare(
      contract_address,
      deployer_address,
      withdrawer_address
    );
  }

  public toData(_?: boolean): MsgUpdateFeeShare.Data {
    _;
    const { contract_address, deployer_address, withdrawer_address } = this;
    return {
      '@type': '/juno.feeshare.v1.MsgUpdateFeeShare',
      contract_address,
      deployer_address,
      withdrawer_address,
    };
  }

  public static fromProto(
    proto: MsgUpdateFeeShare.Proto,
    _?: boolean
  ): MsgUpdateFeeShare {
    _;
    return new MsgUpdateFeeShare(
      proto.contractAddress,
      proto.deployerAddress,
      proto.withdrawerAddress
    );
  }

  public toProto(_?: boolean): MsgUpdateFeeShare.Proto {
    _;
    const { contract_address, deployer_address, withdrawer_address } = this;
    return MsgUpdateFeeShare_pb.fromPartial({
      contractAddress: contract_address,
      deployerAddress: deployer_address,
      withdrawerAddress: withdrawer_address,
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/juno.feeshare.v1.MsgUpdateFeeShare',
      value: MsgUpdateFeeShare_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgUpdateFeeShare {
    _;
    return MsgUpdateFeeShare.fromProto(
      MsgUpdateFeeShare_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgUpdateFeeShare {
  export interface Amino {
    type: 'juno/MsgUpdateFeeShare';
    value: {
      contract_address: AccAddress;
      deployer_address: AccAddress;
      withdrawer_address: AccAddress;
    };
  }

  export interface Data {
    '@type': '/juno.feeshare.v1.MsgUpdateFeeShare';
    contract_address: AccAddress;
    deployer_address: AccAddress;
    withdrawer_address: AccAddress;
  }

  export type Proto = MsgUpdateFeeShare_pb;
}
