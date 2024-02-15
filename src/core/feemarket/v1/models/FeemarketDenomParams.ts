import { FeeDenomParam as FeeDenomParam_pb } from '@terra-money/terra.proto/feemarket/feemarket/v1/genesis';
import { Denom } from 'core/Denom';
import Decimal from 'decimal.js';
import { JSONSerializable } from '../../../../util/json';

export class FeemarketDenomParams extends JSONSerializable<
  FeemarketDenomParams.Amino,
  FeemarketDenomParams.Data,
  FeemarketDenomParams.Proto
> {
  constructor(
    public feeDenom: Denom,
    public minBaseFee: Decimal,
    public baseFee: Decimal
  ) {
    super();
  }

  public static fromAmino(
    data: FeemarketDenomParams.Amino
  ): FeemarketDenomParams {
    const {
      value: { fee_denom, min_base_fee, base_fee },
    } = data;

    return new FeemarketDenomParams(
      fee_denom,
      new Decimal(min_base_fee),
      new Decimal(base_fee)
    );
  }

  public toAmino(): FeemarketDenomParams.Amino {
    const { feeDenom, minBaseFee, baseFee } = this;

    return {
      value: {
        fee_denom: feeDenom,
        min_base_fee: minBaseFee.toString(),
        base_fee: baseFee.toString(),
      },
    };
  }

  public static fromData(
    data: FeemarketDenomParams.Data,
    _?: boolean
  ): FeemarketDenomParams {
    _;
    const { fee_denom, min_base_fee, base_fee } = data;
    return new FeemarketDenomParams(
      fee_denom,
      new Decimal(min_base_fee),
      new Decimal(base_fee)
    );
  }

  public toData(_?: boolean): FeemarketDenomParams.Data {
    _;
    const { feeDenom, minBaseFee, baseFee } = this;
    return {
      fee_denom: feeDenom,
      min_base_fee: minBaseFee.toString(),
      base_fee: baseFee.toString(),
    };
  }

  public static fromProto(
    proto: FeemarketDenomParams.Proto
  ): FeemarketDenomParams {
    return new FeemarketDenomParams(
      proto.feeDenom,
      new Decimal(proto.minBaseFee),
      new Decimal(proto.baseFee)
    );
  }

  public toProto(): FeemarketDenomParams.Proto {
    const { feeDenom, minBaseFee, baseFee } = this;
    return {
      feeDenom,
      minBaseFee: minBaseFee.toString(),
      baseFee: baseFee.toString(),
    };
  }
}

export namespace FeemarketDenomParams {
  export interface Amino {
    value: {
      fee_denom: string;
      min_base_fee: string;
      base_fee: string;
    };
  }

  export interface Data {
    fee_denom: string;
    min_base_fee: string;
    base_fee: string;
  }
  export type Proto = FeeDenomParam_pb;
}
