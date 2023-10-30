import { AccAddress } from '../../../../bech32';
import { Any } from '@terra-money/legacy.proto/google/protobuf/any';
import { JSONSerializable } from '../../../../../util/json';
import { MsgSendTx as MsgSendTx_pb } from '@terra-money/terra.proto/ibc/applications/interchain_accounts/controller/v1/tx';
import Long from 'long';
import { InterchainAccountPacketData } from '../InterchainAccountPacketData';

/**
 * Transaction message to wrap the packet data and execute actions on host chain.
 */
export class MsgSendTx extends JSONSerializable<
  {},
  MsgSendTx.Data,
  MsgSendTx.Proto
> {
  /**
   * @param owner sender's address
   * @param connectionId ibc connection id
   * @param version of the interchain account
   */
  constructor(
    public owner: AccAddress,
    public connectionId: string,
    public relativeTimeout: Long,
    public packetData?: InterchainAccountPacketData
  ) {
    super();
  }

  public static fromAmino(data: MsgSendTx.Amino, _?: boolean): MsgSendTx {
    _;
    data;
    throw new Error('Amino not supported on MsgSendTx');
  }

  public toAmino(_?: boolean): MsgSendTx.Amino {
    _;
    throw new Error('Amino not supported on MsgSendTx');
  }

  public static fromData(data: MsgSendTx.Data, _?: boolean): MsgSendTx {
    _;
    const { owner, connection_id, relative_timeout, packet_data } = data;

    return new MsgSendTx(
      owner,
      connection_id,
      Long.fromString(relative_timeout.toString()),
      packet_data
        ? InterchainAccountPacketData.fromData(packet_data)
        : undefined
    );
  }

  public toData(_?: boolean): MsgSendTx.Data {
    _;
    const { owner, connectionId, relativeTimeout, packetData } = this;
    return {
      '@type': '/ibc.applications.interchain_accounts.controller.v1.MsgSendTx',
      owner: owner,
      connection_id: connectionId,
      relative_timeout: relativeTimeout.toString(),
      packet_data: packetData ? packetData.toData() : undefined,
    };
  }

  public static fromProto(proto: MsgSendTx.Proto, _?: boolean): MsgSendTx {
    _;

    return new MsgSendTx(
      proto.owner,
      proto.connectionId,
      proto.relativeTimeout,
      proto.packetData
        ? InterchainAccountPacketData.fromProto(proto.packetData)
        : undefined
    );
  }

  public toProto(_?: boolean): MsgSendTx.Proto {
    _;
    const { owner, connectionId, relativeTimeout, packetData } = this;

    return MsgSendTx_pb.fromPartial({
      owner,
      connectionId,
      relativeTimeout,
      packetData: packetData?.toProto(),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.applications.interchain_accounts.controller.v1.MsgSendTx',
      value: MsgSendTx_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgSendTx {
    return MsgSendTx.fromProto(MsgSendTx_pb.decode(msgAny.value), isClassic);
  }
}

export namespace MsgSendTx {
  export interface Amino {
    value: {};
  }

  export interface Data {
    '@type': '/ibc.applications.interchain_accounts.controller.v1.MsgSendTx';
    owner: AccAddress;
    connection_id: string;
    relative_timeout: string;
    packet_data?: InterchainAccountPacketData.Data;
  }

  export type Proto = MsgSendTx_pb;
}
