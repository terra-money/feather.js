import { JSONSerializable } from '../../../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgRegisterCounterpartyPayee as MsgRegisterCounterpartyPayee_pb } from '@terra-money/terra.proto/ibc/applications/fee/v1/tx';

/** MsgRegisterCounterpartyPayee defines the request type for the RegisterCounterpartyPayee rpc */
export class MsgRegisterCounterpartyPayee extends JSONSerializable<
  any,
  MsgRegisterCounterpartyPayee.Data,
  MsgRegisterCounterpartyPayee.Proto
> {
  /**
   * @param portId unique port identifier
   * @param channelId unique channel identifier
   * @param relayer the relayer address
   * @param counterpartyPayee the counterparty payee address
   */
  constructor(
    public portId: string,
    public channelId: string,
    public relayer: string,
    public counterpartyPayee: string
  ) {
    super();
  }

  public static fromAmino(
    _: any,
    isClassic?: boolean
  ): MsgRegisterCounterpartyPayee {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(isClassic?: boolean): any {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgRegisterCounterpartyPayee.Data,
    isClassic?: boolean
  ): MsgRegisterCounterpartyPayee {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { portId, channelId, relayer, counterpartyPayee } = data;

    return new MsgRegisterCounterpartyPayee(
      portId,
      channelId,
      relayer,
      counterpartyPayee
    );
  }

  public toData(isClassic?: boolean): MsgRegisterCounterpartyPayee.Data {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { portId, channelId, relayer, counterpartyPayee } = this;
    return {
      '@type': '/ibc.applications.fee.v1.MsgRegisterCounterpartyPayee',
      portId,
      channelId,
      relayer,
      counterpartyPayee,
    };
  }

  public static fromProto(
    proto: MsgRegisterCounterpartyPayee.Proto,
    isClassic?: boolean
  ): MsgRegisterCounterpartyPayee {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return new MsgRegisterCounterpartyPayee(
      proto.portId,
      proto.channelId,
      proto.relayer,
      proto.counterpartyPayee
    );
  }

  public toProto(isClassic?: boolean): MsgRegisterCounterpartyPayee.Proto {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { portId, channelId, relayer, counterpartyPayee } = this;

    return MsgRegisterCounterpartyPayee_pb.fromPartial({
      portId,
      channelId,
      relayer,
      counterpartyPayee,
    });
  }

  public packAny(isClassic?: boolean): Any {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return Any.fromPartial({
      typeUrl: '/ibc.applications.fee.v1.MsgRegisterCounterpartyPayee',
      value: MsgRegisterCounterpartyPayee_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgRegisterCounterpartyPayee {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return MsgRegisterCounterpartyPayee.fromProto(
      MsgRegisterCounterpartyPayee_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgRegisterCounterpartyPayee {
  export interface Data {
    '@type': '/ibc.applications.fee.v1.MsgRegisterCounterpartyPayee';
    portId: string;
    channelId: string;
    relayer: string;
    counterpartyPayee: string;
  }

  export type Proto = MsgRegisterCounterpartyPayee_pb;
}
