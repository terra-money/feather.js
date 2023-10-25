import { Any } from '@terra-money/legacy.proto/google/protobuf/any';
import { JSONSerializable } from '../../../../util/json';
import {
  InterchainAccountPacketData as InterchainAccountPacketData_pb,
  Type,
} from '@terra-money/terra.proto/ibc/applications/interchain_accounts/v1/packet';

/**
 * Message to execute actions on host chain of the interchain account.
 */
export class InterchainAccountPacketData extends JSONSerializable<
  {},
  InterchainAccountPacketData.Data,
  InterchainAccountPacketData.Proto
> {
  /**
   * @param data base64 encoded proto message of the data e.g.: MsgSend_pb.encode(msgSend.toProto()).string("base64").finish()
   * @param connectionId memo field data that will be passed to the message
   * @param version of the message TYPE_UNSPECIFIED, TYPE_EXECUTE_TX or UNRECOGNIZED
   */
  constructor(
    public data: Uint8Array,
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
    inputData: InterchainAccountPacketData.Data,
    _?: boolean
  ): InterchainAccountPacketData {
    _;
    const { data, type, memo } = inputData;

    return new InterchainAccountPacketData(data, memo, type);
  }

  public toData(_?: boolean): InterchainAccountPacketData.Data {
    _;
    const { data, type, memo } = this;
    return {
      data,
      type,
      memo,
    };
  }

  public static fromProto(
    proto: InterchainAccountPacketData.Proto,
    _?: boolean
  ): InterchainAccountPacketData {
    _;
    return new InterchainAccountPacketData(
      proto.data as any,
      proto.memo,
      proto.type
    );
  }

  public toProto(_?: boolean): InterchainAccountPacketData.Proto {
    _;
    const { data, type, memo } = this;
    return InterchainAccountPacketData_pb.fromPartial({
      data: data as any,
      type,
      memo,
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

  export interface Data {
    data: Uint8Array;
    type: Type;
    memo: string;
  }

  export type Proto = InterchainAccountPacketData_pb;
}
