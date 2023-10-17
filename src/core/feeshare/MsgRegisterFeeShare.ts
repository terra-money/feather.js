import { JSONSerializable } from '../../util/json';
import { AccAddress } from '../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgRegisterFeeShare as MsgRegisterFeeShare_pb } from '@terra-money/terra.proto/juno/feeshare/v1/tx';

export class MsgRegisterFeeShare extends JSONSerializable<
  MsgRegisterFeeShare.Amino,
  MsgRegisterFeeShare.Data,
  MsgRegisterFeeShare.Proto
> {
  constructor(
    public contract_address: AccAddress,
    public deployer_address: AccAddress,
    public withdrawer_address: AccAddress
  ) {
    super();
  }

  public static fromAmino(
    data: MsgRegisterFeeShare.Amino,
    _?: boolean
  ): MsgRegisterFeeShare {
    _;
    const {
      value: { contract_address, deployer_address, withdrawer_address },
    } = data;

    return new MsgRegisterFeeShare(
      contract_address,
      deployer_address,
      withdrawer_address
    );
  }

  public toAmino(_?: boolean): MsgRegisterFeeShare.Amino {
    _;
    const { contract_address, deployer_address, withdrawer_address } = this;

    return {
      type: 'juno/MsgRegisterFeeShare',
      value: {
        contract_address,
        deployer_address,
        withdrawer_address,
      },
    };
  }

  public static fromData(
    proto: MsgRegisterFeeShare.Data,
    _?: boolean
  ): MsgRegisterFeeShare {
    _;
    const { contract_address, deployer_address, withdrawer_address } = proto;
    return new MsgRegisterFeeShare(
      contract_address,
      deployer_address,
      withdrawer_address
    );
  }

  public toData(_?: boolean): MsgRegisterFeeShare.Data {
    _;
    const { contract_address, deployer_address, withdrawer_address } = this;
    return {
      '@type': '/juno.feeshare.v1.MsgRegisterFeeShare',
      contract_address,
      deployer_address,
      withdrawer_address,
    };
  }

  public static fromProto(
    proto: MsgRegisterFeeShare.Proto,
    _?: boolean
  ): MsgRegisterFeeShare {
    _;
    return new MsgRegisterFeeShare(
      proto.contractAddress,
      proto.deployerAddress,
      proto.withdrawerAddress
    );
  }

  public toProto(_?: boolean): MsgRegisterFeeShare.Proto {
    _;
    const { contract_address, deployer_address, withdrawer_address } = this;
    return MsgRegisterFeeShare_pb.fromPartial({
      contractAddress: contract_address,
      deployerAddress: deployer_address,
      withdrawerAddress: withdrawer_address,
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/juno.feeshare.v1.MsgRegisterFeeShare',
      value: MsgRegisterFeeShare_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgRegisterFeeShare {
    _;
    return MsgRegisterFeeShare.fromProto(
      MsgRegisterFeeShare_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgRegisterFeeShare {
  export interface Amino {
    type: 'juno/MsgRegisterFeeShare';
    value: {
      contract_address: AccAddress;
      deployer_address: AccAddress;
      withdrawer_address: AccAddress;
    };
  }

  export interface Data {
    '@type': '/juno.feeshare.v1.MsgRegisterFeeShare';
    contract_address: AccAddress;
    deployer_address: AccAddress;
    withdrawer_address: AccAddress;
  }

  export type Proto = MsgRegisterFeeShare_pb;
}
