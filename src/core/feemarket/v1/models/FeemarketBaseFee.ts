import { JSONSerializable } from '../../../../util/json';
import { BaseFeeResponse as BaseFeeResponse_pb } from '@terra-money/terra.proto/feemarket/feemarket/v1/query';
import { Coin } from '../../../Coin';

export class BaseFee extends JSONSerializable<
  BaseFee.Amino,
  BaseFee.Data,
  BaseFee.Proto
> {
  constructor(public fee?: Coin) {
    super();
  }

  public static fromAmino(data: BaseFee.Amino): BaseFee {
    const {
      value: { fee },
    } = data;

    return new BaseFee(fee ? new Coin(fee.denom, fee.amount) : undefined);
  }

  public toAmino(): BaseFee.Amino {
    const { fee } = this;
    return {
      value: {
        fee: fee?.toAmino(),
      },
    };
  }

  public static fromData(proto: BaseFee.Data, _?: boolean): BaseFee {
    _;
    const { fee } = proto;
    return new BaseFee(fee ? Coin.fromData(fee) : undefined);
  }

  public toData(_?: boolean): BaseFee.Data {
    _;
    const { fee } = this;
    return {
      fee: fee?.toData(),
    };
  }

  public static fromProto(proto: BaseFee.Proto): BaseFee {
    if (!proto.fee) {
      return new BaseFee();
    }

    return new BaseFee(new Coin(proto.fee.denom, proto.fee.amount));
  }

  public toProto(): BaseFee.Proto {
    const { fee } = this;
    return BaseFeeResponse_pb.fromPartial({ fee: fee?.toProto() });
  }
}

export namespace BaseFee {
  export interface Amino {
    value: {
      fee?: Coin.Amino;
    };
  }

  export interface Data {
    fee?: Coin.Data;
  }
  export type Proto = BaseFeeResponse_pb;
}
