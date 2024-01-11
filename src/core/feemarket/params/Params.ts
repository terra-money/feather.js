import Long from 'long';
import { JSONSerializable } from '../../../util/json';
import { Params as Params_pb } from '@terra-money/terra.proto/feemarket/feemarket/v1/params';

export class Params extends JSONSerializable<
  Params.Amino,
  Params.Data,
  Params.Proto
> {
  constructor(
    public alpha: string,
    public beta: string,
    public theta: string,
    public delta: string,
    public minLearningRate: string,
    public maxLearningRate: string,
    public targetBlockUtilization: string,
    public maxBlockUtilization: string,
    public window: string,
    public enabled: boolean
  ) {
    super();
  }

  public static fromAmino(data: Params.Amino): Params {
    const {
      value: {
        alpha,
        beta,
        theta,
        delta,
        minLearningRate,
        maxLearningRate,
        targetBlockUtilization,
        maxBlockUtilization,
        window,
        enabled,
      },
    } = data;

    return new Params(
      alpha,
      beta,
      theta,
      delta,
      minLearningRate,
      maxLearningRate,
      targetBlockUtilization,
      maxBlockUtilization,
      window,
      enabled || false
    );
  }

  public toAmino(): Params.Amino {
    const {
      alpha,
      beta,
      theta,
      delta,
      minLearningRate,
      maxLearningRate,
      targetBlockUtilization,
      maxBlockUtilization,
      window,
      enabled,
    } = this;
    return {
      type: 'feemarket/Params',
      value: {
        alpha,
        beta,
        theta,
        delta,
        minLearningRate,
        maxLearningRate,
        targetBlockUtilization,
        maxBlockUtilization,
        window,
        enabled: enabled || false,
      },
    };
  }

  public static fromData(proto: Params.Data, _?: boolean): Params {
    _;
    const {
      alpha,
      beta,
      theta,
      delta,
      minLearningRate,
      maxLearningRate,
      targetBlockUtilization,
      maxBlockUtilization,
      window,
      enabled,
    } = proto;
    return new Params(
      alpha,
      beta,
      theta,
      delta,
      minLearningRate,
      maxLearningRate,
      targetBlockUtilization,
      maxBlockUtilization,
      window,
      enabled || false
    );
  }

  public toData(_?: boolean): Params.Data {
    _;
    const {
      alpha,
      beta,
      theta,
      delta,
      minLearningRate,
      maxLearningRate,
      targetBlockUtilization,
      maxBlockUtilization,
      window,
      enabled,
    } = this;
    return {
      '@type': '/feemarket.feemarket.v1.Params',
      alpha,
      beta,
      theta,
      delta,
      minLearningRate,
      maxLearningRate,
      targetBlockUtilization,
      maxBlockUtilization,
      window,
      enabled: enabled || false,
    };
  }

  public static fromProto(proto: Params.Proto): Params {
    return new Params(
      proto.alpha,
      proto.beta,
      proto.theta,
      proto.delta,
      proto.minLearningRate,
      proto.maxLearningRate,
      proto.targetBlockUtilization.toString(),
      proto.maxBlockUtilization.toString(),
      proto.window.toString(),
      proto.enabled
    );
  }

  public toProto(): Params.Proto {
    const {
      alpha,
      beta,
      theta,
      delta,
      minLearningRate,
      maxLearningRate,
      targetBlockUtilization,
      maxBlockUtilization,
      window,
      enabled,
    } = this;
    return Params_pb.fromPartial({
      alpha,
      beta,
      theta,
      delta,
      minLearningRate,
      maxLearningRate,
      targetBlockUtilization: Long.fromString(targetBlockUtilization),
      maxBlockUtilization: Long.fromString(maxBlockUtilization),
      window: Long.fromString(window),
      enabled,
    });
  }
}

export namespace Params {
  export interface Amino {
    type: 'feemarket/Params';
    value: {
      alpha: string;
      beta: string;
      theta: string;
      delta: string;
      minLearningRate: string;
      maxLearningRate: string;
      targetBlockUtilization: string;
      maxBlockUtilization: string;
      window: string;
      enabled: boolean;
    };
  }

  export interface Data {
    '@type': '/feemarket.feemarket.v1.Params';
    alpha: string;
    beta: string;
    theta: string;
    delta: string;
    minLearningRate: string;
    maxLearningRate: string;
    targetBlockUtilization: string;
    maxBlockUtilization: string;
    window: string;
    enabled: boolean;
  }
  export type Proto = Params_pb;
}
