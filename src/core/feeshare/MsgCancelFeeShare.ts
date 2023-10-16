import { JSONSerializable } from '../../util/json';
import { AccAddress } from '../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgCancelFeeShare as MsgCancelFeeShare_pb } from '@terra-money/terra.proto/juno/feeshare/v1/tx';

export class MsgCancelFeeShare extends JSONSerializable<
  MsgCancelFeeShare.Amino,
  MsgCancelFeeShare.Data,
  MsgCancelFeeShare.Proto
> {
  constructor(
    public contract_address: AccAddress,
    public deployer_address: AccAddress
  ) {
    super();
  }

  public static fromAmino(
    data: MsgCancelFeeShare.Amino,
    _?: boolean
  ): MsgCancelFeeShare {
    _;
    const {
      value: { contract_address, deployer_address },
    } = data;

    return new MsgCancelFeeShare(contract_address, deployer_address);
  }

  public toAmino(_?: boolean): MsgCancelFeeShare.Amino {
    _;
    const { contract_address, deployer_address } = this;

    return {
      type: 'juno/MsgCancelFeeShare',
      value: {
        contract_address,
        deployer_address,
      },
    };
  }

  public static fromData(
    proto: MsgCancelFeeShare.Data,
    _?: boolean
  ): MsgCancelFeeShare {
    _;
    const { contract_address, deployer_address } = proto;
    return new MsgCancelFeeShare(contract_address, deployer_address);
  }

  public toData(_?: boolean): MsgCancelFeeShare.Data {
    _;
    const { contract_address, deployer_address } = this;
    return {
      '@type': '/juno.feeshare.v1.MsgCancelFeeShare',
      contract_address,
      deployer_address,
    };
  }

  public static fromProto(
    proto: MsgCancelFeeShare.Proto,
    _?: boolean
  ): MsgCancelFeeShare {
    _;
    return new MsgCancelFeeShare(proto.contractAddress, proto.deployerAddress);
  }

  public toProto(_?: boolean): MsgCancelFeeShare.Proto {
    _;
    const { contract_address, deployer_address } = this;
    return MsgCancelFeeShare_pb.fromPartial({
      contractAddress: contract_address,
      deployerAddress: deployer_address,
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/juno.feeshare.v1.MsgCancelFeeShare',
      value: MsgCancelFeeShare_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgCancelFeeShare {
    _;
    return MsgCancelFeeShare.fromProto(
      MsgCancelFeeShare_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgCancelFeeShare {
  export interface Amino {
    type: 'juno/MsgCancelFeeShare';
    value: {
      contract_address: AccAddress;
      deployer_address: AccAddress;
    };
  }

  export interface Data {
    '@type': '/juno.feeshare.v1.MsgCancelFeeShare';
    contract_address: AccAddress;
    deployer_address: AccAddress;
  }

  export type Proto = MsgCancelFeeShare_pb;
}
