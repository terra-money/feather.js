import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Initialization as Initialization_pb } from '@terra-money/terra.proto/terra/smartaccount/v1/wasm';
import { JSONSerializable } from '../../../../util/json';

/**
 * Initialization holds the contract address and initial message
 * to be passed to the contract for custom authorization
 */
export class Initialization extends JSONSerializable<
  Initialization.Amino,
  Initialization.Data,
  Initialization.Proto
> {
  /**
   *
   * @param contractAddress contract address of authorization logic
   * @param initMsg initial message to be passed to the contract
   */
  constructor(public account: string, public msg: Uint8Array) {
    super();
  }

  public static fromAmino(data: Initialization.Amino): Initialization {
    const {
      value: { account, msg },
    } = data;
    const buf = Buffer.from(msg, 'ascii');
    const msgBs = new Uint8Array(buf);
    return new Initialization(account, msgBs);
  }

  public toAmino(): Initialization.Amino {
    const { account, msg } = this;
    const base64Str = Buffer.from(msg).toString('ascii');
    return {
      value: {
        account,
        msg: base64Str,
      },
    };
  }

  public static fromData(data: Initialization.Data): Initialization {
    const { account, msg } = data;
    const buf = Buffer.from(msg, 'ascii');
    const msgBs = new Uint8Array(buf);
    return new Initialization(account, msgBs);
  }

  public toData(): Initialization.Data {
    const { account, msg } = this;
    const base64Str = Buffer.from(msg).toString('ascii');
    return {
      account,
      msg: base64Str,
    };
  }

  public static fromProto(proto: Initialization.Proto): Initialization {
    return new Initialization(proto.account, proto.msg);
  }

  public toProto(): Initialization.Proto {
    const { account, msg } = this;
    return Initialization_pb.fromPartial({
      account,
      msg,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      value: Initialization_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): Initialization {
    return Initialization.fromProto(Initialization_pb.decode(msgAny.value));
  }
}

export namespace Initialization {
  export interface Amino {
    value: {
      account: string;
      msg: string;
    };
  }

  export interface Data {
    account: string;
    msg: string;
  }

  export type Proto = Initialization_pb;
}
