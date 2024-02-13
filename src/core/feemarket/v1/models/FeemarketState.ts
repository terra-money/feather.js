import Long from 'long';
import { JSONSerializable } from '../../../../util/json';
import { State as State_pb } from '@terra-money/terra.proto/feemarket/feemarket/v1/genesis';
import Decimal from 'decimal.js';

export class FeemarketState extends JSONSerializable<
  FeemarketState.Amino,
  FeemarketState.Data,
  FeemarketState.Proto
> {
  constructor(
    public learningRate: Decimal,
    public window: Decimal[],
    public index: Decimal
  ) {
    super();
  }

  public static fromAmino(data: FeemarketState.Amino): FeemarketState {
    const {
      value: { learning_rate, window, index },
    } = data;

    return new FeemarketState(
      new Decimal(learning_rate),
      window.map(w => new Decimal(w)),
      new Decimal(index)
    );
  }

  public toAmino(): FeemarketState.Amino {
    const { learningRate, window, index } = this;
    return {
      value: {
        learning_rate: learningRate.toString(),
        window: window.map(w => w.toString()),
        index: index.toString(),
      },
    };
  }

  public static fromData(
    proto: FeemarketState.Data,
    _?: boolean
  ): FeemarketState {
    _;
    const { learning_rate, window, index } = proto;
    return new FeemarketState(
      new Decimal(learning_rate),
      window.map(w => new Decimal(w)),
      new Decimal(index)
    );
  }

  public toData(_?: boolean): FeemarketState.Data {
    _;
    const { learningRate, window, index } = this;
    return {
      learning_rate: learningRate.toString(),
      window: window.map(w => w.toString()),
      index: index.toString(),
    };
  }

  public static fromProto(proto: FeemarketState.Proto): FeemarketState {
    return new FeemarketState(
      new Decimal(proto.learningRate),
      proto.window.map(x => new Decimal(x.toString())),
      new Decimal(proto.index.toString())
    );
  }

  public toProto(): FeemarketState.Proto {
    const { learningRate, window, index } = this;
    return State_pb.fromPartial({
      learningRate: learningRate.toString(),
      window: window.map(x => Long.fromString(x.toString())),
      index: Long.fromString(index.toString()),
    });
  }
}

export namespace FeemarketState {
  export interface Amino {
    value: {
      learning_rate: string;
      window: string[];
      index: string;
    };
  }

  export interface Data {
    learning_rate: string;
    window: string[];
    index: string;
  }
  export type Proto = State_pb;
}
