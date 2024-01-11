import Long from 'long';
import { JSONSerializable } from '../../../util/json';
import { State as State_pb } from '@terra-money/terra.proto/feemarket/feemarket/v1/genesis';

export class State extends JSONSerializable<
  State.Amino,
  State.Data,
  State.Proto
> {
  constructor(
    public feeDenom: string,
    public minBaseFee: string,
    public baseFee: string,
    public learningRate: string,
    public window: string[],
    public index: string
  ) {
    super();
  }

  public static fromAmino(data: State.Amino): State {
    const {
      value: { feeDenom, minBaseFee, baseFee, learningRate, window, index },
    } = data;

    return new State(
      feeDenom,
      minBaseFee,
      baseFee,
      learningRate,
      window,
      index
    );
  }

  public toAmino(): State.Amino {
    const { feeDenom, minBaseFee, baseFee, learningRate, window, index } = this;
    return {
      type: 'feemarket/State',
      value: {
        feeDenom,
        minBaseFee,
        baseFee,
        learningRate,
        window,
        index,
      },
    };
  }

  public static fromData(proto: State.Data, _?: boolean): State {
    _;
    const { feeDenom, minBaseFee, baseFee, learningRate, window, index } =
      proto;
    return new State(
      feeDenom,
      minBaseFee,
      baseFee,
      learningRate,
      window,
      index
    );
  }

  public toData(_?: boolean): State.Data {
    _;
    const { feeDenom, minBaseFee, baseFee, learningRate, window, index } = this;
    return {
      '@type': '/feemarket.feemarket.v1.State',
      feeDenom,
      minBaseFee,
      baseFee,
      learningRate,
      window,
      index,
    };
  }

  public static fromProto(proto: State.Proto): State {
    return new State(
      proto.feeDenom,
      proto.minBaseFee,
      proto.baseFee,
      proto.learningRate,
      proto.window.map(x => x.toString()),
      proto.index.toString()
    );
  }

  public toProto(): State.Proto {
    const { feeDenom, minBaseFee, baseFee, learningRate, window, index } = this;
    return State_pb.fromPartial({
      feeDenom,
      minBaseFee,
      baseFee,
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
      feeDenom: string;
      minBaseFee: string;
      baseFee: string;
      learningRate: string;
      window: string[];
      index: string;
    };
  }

  export interface Data {
    '@type': '/feemarket.feemarket.v1.State';
    feeDenom: string;
    minBaseFee: string;
    baseFee: string;
    learningRate: string;
    window: string[];
    index: string;
  }
  export type Proto = State_pb;
}
