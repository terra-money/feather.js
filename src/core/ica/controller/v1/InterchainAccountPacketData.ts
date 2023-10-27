import { JSONSerializable } from '../../../../util/json';
import {
  InterchainAccountPacketData as InterchainAccountPacketData_pb,
  Type,
} from '@terra-money/terra.proto/ibc/applications/interchain_accounts/v1/packet';
import { CosmosTx } from './CosmosTx';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';

/**
 * PacketData represents the encoded data to be executed on
 * host chain by the intechain account.
 */
export class InterchainAccountPacketData extends JSONSerializable<
  {},
  InterchainAccountPacketData.Data,
  InterchainAccountPacketData.Proto
> {
  /**
   * @param data to be executed on host chain
   * @param memo for the transaction to be executed on host chain
   * @param type by default is **TYPE_EXECUTE_TX** which means that the Msg is converted from proto TYPE_UNSPECIFIED, TYPE_EXECUTE_TX or UNRECOGNIZED
   */
  constructor(
    public data: CosmosTx,
    public memo: string = '',
    public type: Type = Type.TYPE_EXECUTE_TX
  ) {
    super();
  }

  public static fromAmino(
    data: InterchainAccountPacketData.Amino,
    _?: boolean
  ): InterchainAccountPacketData {
    _;
    data;
    throw new Error('Amino not supported on InterchainAccountPacketData');
  }

  public toAmino(_?: boolean): InterchainAccountPacketData.Amino {
    _;
    throw new Error('Amino not supported on InterchainAccountPacketData');
  }

  public static fromData(
    packetData: InterchainAccountPacketData.Data,
    _?: boolean
  ): InterchainAccountPacketData {
    _;
    const { data, memo, type } = packetData;

    return new InterchainAccountPacketData(CosmosTx.fromData(data), memo, type);
  }

  public toData(_?: boolean): InterchainAccountPacketData.Data {
    _;
    const { data, memo, type } = this;
    return {
      data: data.toData(),
      memo,
      type,
    };
  }

  public static fromProto(
    proto: InterchainAccountPacketData.Proto,
    _?: boolean
  ): InterchainAccountPacketData {
    _;

    return new InterchainAccountPacketData(
      CosmosTx.unpackAny(proto.data as any),
      proto.memo,
      proto.type
    );
  }

  public toProto(_?: boolean): InterchainAccountPacketData.Proto {
    _;
    const { data, memo, type } = this;

    return InterchainAccountPacketData_pb.fromPartial({
      data: data.toProto() as any,
      memo,
      type,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      value: InterchainAccountPacketData_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): InterchainAccountPacketData {
    return InterchainAccountPacketData.fromProto(
      InterchainAccountPacketData_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace InterchainAccountPacketData {
  export interface Amino {
    value: {};
  }

  type Base64String = string;
  export interface Data {
    type: Type;
    data: Base64String;
    memo: string;
  }

  export type Proto = InterchainAccountPacketData_pb;
}
