import { Msg } from '../../../Msg';
import { JSONSerializable } from '../../../../util/json';
import { CosmosTx as CosmosTx_pb } from '@terra-money/terra.proto/ibc/applications/interchain_accounts/v1/packet';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';

/**
 * CosmosTx represents the encoded transaction
 */
export class CosmosTx extends JSONSerializable<
  {},
  CosmosTx.Data,
  CosmosTx.Proto
> {
  /**
   * @param messages all proto messages that are part of the transaction
   */
  constructor(public messages: Msg[]) {
    super();
  }

  public static fromAmino(data: CosmosTx.Amino, _?: boolean): CosmosTx {
    _;
    data;
    throw new Error('Amino not supported on CosmosTx');
  }

  public toAmino(_?: boolean): CosmosTx.Amino {
    _;
    throw new Error('Amino not supported on CosmosTx');
  }

  public static fromData(data: CosmosTx.Data, _?: boolean): CosmosTx {
    _;
    console.log('CosmosTx#fromData', data);
    const parsedData = Buffer.from(data, 'base64');
    const { messages } = CosmosTx_pb.decode(parsedData);
    return new CosmosTx(messages.map(msg => Msg.fromProto(msg)));
  }

  public toData(_?: boolean): CosmosTx.Data {
    _;
    console.log('CosmosTx#toData', this.messages);
    const { messages } = this;

    const ct = CosmosTx_pb.encode({
      messages: messages.map(msg => msg.packAny()) as Any[],
    });

    return Buffer.from(ct.finish()).toString('base64');
  }

  public static fromProto(proto: CosmosTx.Proto, _?: boolean): CosmosTx {
    _;
    console.log('CosmosTx#fromProto', proto);
    return new CosmosTx(proto.messages.map(msg => Msg.fromProto(msg)));
  }

  public toProto(_?: boolean): CosmosTx.Proto {
    _;
    console.log('CosmosTx#toProto', this.messages);
    const { messages } = this;

    const ct = CosmosTx_pb.encode({
      messages: messages.map(msg => msg.packAny()) as Any[],
    });

    return Buffer.from(ct.finish()).toString('base64') as any;
  }

  public packAny(isClassic?: boolean): Any {
    console.log('CosmosTx#packAny', this.messages);
    return Any.fromPartial({
      value: this.toProto(isClassic) as any,
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): CosmosTx {
    console.log('CosmosTx#unpackAny', msgAny);
    return CosmosTx.fromProto(CosmosTx_pb.decode(msgAny.value), isClassic);
  }
}

export namespace CosmosTx {
  export interface Amino {
    value: {};
  }
  type Base64String = string;
  export type Data = Base64String;

  export type Proto = CosmosTx_pb;
}
