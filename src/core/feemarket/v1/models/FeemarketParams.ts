import Long from 'long';
import { JSONSerializable } from '../../../../util/json';
import { Params as Params_pb } from '@terra-money/terra.proto/feemarket/feemarket/v1/params';
import Decimal from 'decimal.js';

export class FeemarketParams extends JSONSerializable<
  FeemarketParams.Amino,
  FeemarketParams.Data,
  FeemarketParams.Proto
> {
  constructor(
    public alpha: Decimal,
    public beta: Decimal,
    public theta: Decimal,
    public minLearningRate: Decimal,
    public maxLearningRate: Decimal,
    public targetBlockUtilization: Decimal,
    public maxBlockUtilization: Decimal,
    public window: Decimal,
    public enabled: boolean,
    public defaultFeeDenom: string
  ) {
    super();
  }

  public static fromAmino(data: FeemarketParams.Amino): FeemarketParams {
    const {
      value: {
        alpha,
        beta,
        theta,
        min_learning_rate,
        max_learning_rate,
        target_block_utilization,
        max_block_utilization,
        window,
        enabled,
        default_fee_denom,
      },
    } = data;

    return new FeemarketParams(
      new Decimal(alpha),
      new Decimal(beta),
      new Decimal(theta),
      new Decimal(min_learning_rate),
      new Decimal(max_learning_rate),
      new Decimal(target_block_utilization),
      new Decimal(max_block_utilization),
      new Decimal(window),
      enabled,
      default_fee_denom
    );
  }

  public toAmino(): FeemarketParams.Amino {
    const {
      alpha,
      beta,
      theta,
      minLearningRate,
      maxLearningRate,
      targetBlockUtilization,
      maxBlockUtilization,
      window,
      enabled,
      defaultFeeDenom,
    } = this;
    return {
      value: {
        alpha: alpha.toString(),
        beta: beta.toString(),
        theta: theta.toString(),
        min_learning_rate: minLearningRate.toString(),
        max_learning_rate: maxLearningRate.toString(),
        target_block_utilization: targetBlockUtilization.toString(),
        max_block_utilization: maxBlockUtilization.toString(),
        window: window.toString(),
        enabled,
        default_fee_denom: defaultFeeDenom,
      },
    };
  }

  public static fromData(
    proto: FeemarketParams.Data,
    _?: boolean
  ): FeemarketParams {
    _;
    const {
      alpha,
      beta,
      theta,
      min_learning_rate,
      max_learning_rate,
      target_block_utilization,
      max_block_utilization,
      window,
      enabled,
      default_fee_denom,
    } = proto;
    return new FeemarketParams(
      new Decimal(alpha),
      new Decimal(beta),
      new Decimal(theta),
      new Decimal(min_learning_rate),
      new Decimal(max_learning_rate),
      new Decimal(target_block_utilization),
      new Decimal(max_block_utilization),
      new Decimal(window),
      enabled,
      default_fee_denom
    );
  }

  public toData(_?: boolean): FeemarketParams.Data {
    _;
    const {
      alpha,
      beta,
      theta,
      minLearningRate,
      maxLearningRate,
      targetBlockUtilization,
      maxBlockUtilization,
      window,
      enabled,
      defaultFeeDenom,
    } = this;
    return {
      alpha: alpha.toString(),
      beta: beta.toString(),
      theta: theta.toString(),
      min_learning_rate: minLearningRate.toString(),
      max_learning_rate: maxLearningRate.toString(),
      target_block_utilization: targetBlockUtilization.toString(),
      max_block_utilization: maxBlockUtilization.toString(),
      window: window.toString(),
      enabled: enabled,
      default_fee_denom: defaultFeeDenom,
    };
  }

  public static fromProto(proto: FeemarketParams.Proto): FeemarketParams {
    return new FeemarketParams(
      new Decimal(proto.alpha),
      new Decimal(proto.beta),
      new Decimal(proto.theta),
      new Decimal(proto.minLearningRate),
      new Decimal(proto.maxLearningRate),
      new Decimal(proto.targetBlockUtilization.toString()),
      new Decimal(proto.maxBlockUtilization.toString()),
      new Decimal(proto.window.toString()),
      proto.enabled,
      proto.defaultFeeDenom
    );
  }

  public toProto(): FeemarketParams.Proto {
    const {
      alpha,
      beta,
      theta,
      minLearningRate,
      maxLearningRate,
      targetBlockUtilization,
      maxBlockUtilization,
      window,
      enabled,
      defaultFeeDenom,
    } = this;
    return Params_pb.fromPartial({
      alpha: alpha.toString(),
      beta: beta.toString(),
      theta: theta.toString(),
      minLearningRate: minLearningRate.toString(),
      maxLearningRate: maxLearningRate.toString(),
      targetBlockUtilization: Long.fromString(
        targetBlockUtilization.toString()
      ),
      maxBlockUtilization: Long.fromString(maxBlockUtilization.toString()),
      window: Long.fromString(window.toString()),
      enabled,
      defaultFeeDenom,
    });
  }
}

export namespace FeemarketParams {
  export interface Amino {
    value: {
      alpha: string;
      beta: string;
      theta: string;
      min_learning_rate: string;
      max_learning_rate: string;
      target_block_utilization: string;
      max_block_utilization: string;
      window: string;
      enabled: boolean;
      default_fee_denom: string;
    };
  }

  export interface Data {
    alpha: string;
    beta: string;
    theta: string;
    min_learning_rate: string;
    max_learning_rate: string;
    target_block_utilization: string;
    max_block_utilization: string;
    window: string;
    enabled: boolean;
    default_fee_denom: string;
  }
  export type Proto = Params_pb;
}
