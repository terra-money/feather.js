import Long from 'long';
import { JSONSerializable } from '../../../util/json';
import { State as State_pb } from '@terra-money/terra.proto/feemarket/feemarket/v1/genesis';

export class State extends JSONSerializable<
  State.Amino,
  State.Data,
  State.Proto
> {
  constructor(
    public learningRate: string,
    public window: string[],
    public index: string
  ) {
    super();
  }

  public static fromAmino(data: State.Amino): State {
    const {
      value: { learningRate, window, index },
    } = data;

    return new State(learningRate, window, index);
  }

  public toAmino(): State.Amino {
    const { learningRate, window, index } = this;
    return {
      type: 'feemarket/State',
      value: {
        learningRate,
        window,
        index,
      },
    };
  }

  public static fromData(proto: State.Data, _?: boolean): State {
    _;
    const { learningRate, window, index } = proto;
    return new State(learningRate, window, index);
  }

  public toData(_?: boolean): State.Data {
    _;
    const { learningRate, window, index } = this;
    return {
      '@type': '/feemarket.feemarket.v1.State',
      learningRate,
      window,
      index,
    };
  }

  public static fromProto(proto: State.Proto): State {
    return new State(
      proto.learningRate,
      proto.window.map(x => x.toString()),
      proto.index.toString()
    );
  }

  public toProto(): State.Proto {
    const { learningRate, window, index } = this;
    return State_pb.fromPartial({
      learningRate,
      window: window.map(x => Long.fromString(x)),
      index: Long.fromString(index),
    });
  }
}

export namespace State {
  export interface Amino {
    type: 'feemarket/State';
    value: {
      learningRate: string;
      window: string[];
      index: string;
    };
  }

  export interface Data {
    '@type': '/feemarket.feemarket.v1.State';
    learningRate: string;
    window: string[];
    index: string;
  }
  export type Proto = State_pb;
}
