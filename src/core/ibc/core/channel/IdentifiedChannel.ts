import {
  State,
  Order,
  IdentifiedChannel as IdentifiedChannel_pb,
} from '@terra-money/terra.proto/ibc/core/channel/v1/channel';
import { JSONSerializable } from '../../../../util/json';
import { Counterparty } from './Counterparty';

/**
 * IdentifiedChannel is a monotonically increasing data type
 * that can be compared against another IdentifiedChannel for the purposes of updating and
 * freezing clients
 *
 * Normally the RevisionChannel is incremented at each height while keeping
 * RevisionNumber the same. However some consensus algorithms may choose to
 * reset the height in certain conditions e.g. hard forks, state-machine
 * breaking changes In these cases, the RevisionNumber is incremented so that
 * height continues to be monitonically increasing even as the RevisionChannel
 * gets reset
 */
export class IdentifiedChannel extends JSONSerializable<
  IdentifiedChannel.Amino,
  IdentifiedChannel.Data,
  IdentifiedChannel.Proto
> {
  /**
   * @param state current state of the channel end
   * @param ordering  whether the channel is ordered or unordered
   * @param counterparty counterparty channel end
   * @param connection_hops list of connection identifiers, in order, along which packets sent on this channel will travel
   * @param version opaque channel version, which is agreed upon during the handshake
   * @param port_id the
   * @param channel_id
   */
  constructor(
    public state: State,
    public ordering: Order,
    public counterparty: Counterparty | undefined,
    public connection_hops: string[],
    public version: string,
    public port_id: string,
    public channel_id: string
  ) {
    super();
  }

  public static fromAmino(data: IdentifiedChannel.Amino): IdentifiedChannel {
    const {
      state,
      ordering,
      counterparty,
      connection_hops,
      version,
      port_id,
      channel_id,
    } = data;
    return new IdentifiedChannel(
      state,
      ordering,
      counterparty ? Counterparty.fromAmino(counterparty) : undefined,
      connection_hops,
      version,
      port_id,
      channel_id
    );
  }

  public toAmino(): IdentifiedChannel.Amino {
    const {
      state,
      ordering,
      counterparty,
      connection_hops,
      version,
      port_id,
      channel_id,
    } = this;
    const res: IdentifiedChannel.Amino = {
      state,
      ordering,
      counterparty: counterparty ? counterparty.toAmino() : undefined,
      connection_hops,
      version,
      port_id,
      channel_id,
    };
    return res;
  }

  public static fromData(data: IdentifiedChannel.Data): IdentifiedChannel {
    const {
      state,
      ordering,
      counterparty,
      connection_hops,
      version,
      port_id,
      channel_id,
    } = data;
    return new IdentifiedChannel(
      state,
      ordering,
      counterparty ? Counterparty.fromData(counterparty) : undefined,
      connection_hops,
      version,
      port_id,
      channel_id
    );
  }

  public toData(): IdentifiedChannel.Data {
    const {
      state,
      ordering,
      counterparty,
      connection_hops,
      version,
      port_id,
      channel_id,
    } = this;
    const res: IdentifiedChannel.Data = {
      state,
      ordering,
      counterparty: counterparty ? counterparty.toData() : undefined,
      connection_hops,
      version,
      port_id,
      channel_id,
    };
    return res;
  }

  public static fromProto(proto: IdentifiedChannel.Proto): IdentifiedChannel {
    return new IdentifiedChannel(
      proto.state,
      proto.ordering,
      proto.counterparty
        ? Counterparty.fromProto(proto.counterparty)
        : undefined,
      proto.connectionHops,
      proto.version,
      proto.portId,
      proto.channelId
    );
  }

  public toProto(): IdentifiedChannel.Proto {
    const {
      state,
      ordering,
      counterparty,
      connection_hops,
      version,
      port_id,
      channel_id,
    } = this;
    return IdentifiedChannel_pb.fromPartial({
      state,
      ordering,
      counterparty: counterparty ? counterparty.toProto() : undefined,
      connectionHops: connection_hops,
      version,
      portId: port_id,
      channelId: channel_id,
    });
  }
}

export namespace IdentifiedChannel {
  export interface Amino {
    state: State;
    ordering: Order;
    counterparty?: Counterparty.Amino;
    connection_hops: string[];
    version: string;
    port_id: string;
    channel_id: string;
  }

  export interface Data {
    state: State;
    ordering: Order;
    counterparty?: Counterparty.Data;
    connection_hops: string[];
    version: string;
    port_id: string;
    channel_id: string;
  }

  export type Proto = IdentifiedChannel_pb;
}
