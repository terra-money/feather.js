import { JSONSerializable, removeNull } from '../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgSudoContract as MsgSudoContract_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/tx';

export class MsgSudoContract extends JSONSerializable<
  MsgSudoContract.Amino,
  MsgSudoContract.Data,
  MsgSudoContract.Proto
> {
  /**
   * @param title a short summary
   * @param description a human readable text
   * @param contract contract address to be migrated from
   * @param msg JSON message to configure the migrate state of the contract
   */
  constructor(
    public authority: string,
    public contract: string,
    public msg: object
  ) {
    super();
  }

  public static fromAmino(
    data: MsgSudoContract.Amino,
    isClassic?: boolean
  ): MsgSudoContract {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const {
      value: { authority, contract, msg },
    } = data as MsgSudoContract.Amino;
    return new MsgSudoContract(authority, contract, msg);
  }

  public toAmino(isClassic?: boolean): MsgSudoContract.Amino {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { authority, contract, msg } = this;
    return {
      type: 'wasm/MsgSudoContract',
      value: {
        authority,
        contract,
        msg,
      },
    };
  }

  public static fromProto(
    proto: MsgSudoContract.Proto,
    isClassic?: boolean
  ): MsgSudoContract {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return new MsgSudoContract(proto.authority, proto.contract, proto.msg);
  }

  public toProto(isClassic?: boolean): MsgSudoContract.Proto {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { authority, contract, msg } = this;
    return MsgSudoContract_pb.fromPartial({
      authority,
      contract,
      msg: Buffer.from(JSON.stringify(removeNull(msg)), 'utf-8'),
    });
  }
  public packAny(isClassic?: boolean): Any {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgSudoContract',
      value: MsgSudoContract_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgSudoContract {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return MsgSudoContract.fromProto(
      MsgSudoContract_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgSudoContract.Data,
    isClassic?: boolean
  ): MsgSudoContract {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { authority, contract, msg } = data as MsgSudoContract.Data;
    return new MsgSudoContract(authority, contract, msg);
  }

  public toData(isClassic?: boolean): MsgSudoContract.Data {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { authority, contract, msg } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgSudoContract',
      authority,
      contract,
      msg,
    };
  }
}

export namespace MsgSudoContract {
  export interface Amino {
    type: 'wasm/MsgSudoContract';
    value: {
      authority: string;
      contract: string;
      msg: any;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.MsgSudoContract';
    authority: string;
    contract: string;
    msg: any;
  }

  export type Proto = MsgSudoContract_pb;
}
