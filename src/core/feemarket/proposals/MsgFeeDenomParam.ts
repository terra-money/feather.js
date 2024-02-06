import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgFeeDenomParam as MsgFeeDenomParam_pb } from '@terra-money/terra.proto/feemarket/feemarket/v1/tx';

export class MsgFeeDenomParam extends JSONSerializable<
  MsgFeeDenomParam.Amino,
  MsgFeeDenomParam.Data,
  MsgFeeDenomParam.Proto
> {
  constructor(
    public feeDenom: string,
    public minBaseFee: string,
    public authority: AccAddress
  ) {
    super();
  }

  public static fromAmino(data: MsgFeeDenomParam.Amino): MsgFeeDenomParam {
    data;
    throw new Error('not implemented');
  }

  public toAmino(): MsgFeeDenomParam.Amino {
    throw new Error('not implemented');
  }

  public static fromData(proto: MsgFeeDenomParam.Data): MsgFeeDenomParam {
    const { feeDenom, minBaseFee, authority } = proto;
    return new MsgFeeDenomParam(feeDenom, minBaseFee, authority);
  }

  public toData(): MsgFeeDenomParam.Data {
    const { feeDenom, minBaseFee, authority } = this;
    return {
      '@type': '/feemarket.feemarket.v1.MsgFeeDenomParam',
      feeDenom: feeDenom,
      minBaseFee: minBaseFee,
      authority: authority,
    };
  }

  public static fromProto(proto: MsgFeeDenomParam.Proto): MsgFeeDenomParam {
    return new MsgFeeDenomParam(
      proto.feeDenom,
      proto.minBaseFee,
      proto.authority
    );
  }

  public toProto(): MsgFeeDenomParam.Proto {
    const { feeDenom, minBaseFee, authority } = this;
    return MsgFeeDenomParam_pb.fromPartial({
      feeDenom,
      minBaseFee,
      authority,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/feemarket.feemarket.v1.MsgFeeDenomParam',
      value: MsgFeeDenomParam_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgFeeDenomParam {
    return MsgFeeDenomParam.fromProto(MsgFeeDenomParam_pb.decode(msgAny.value));
  }
}

export namespace MsgFeeDenomParam {
  export interface Amino {
    type: 'feemarket/MsgFeeDenomParam';
    value: {
      feeDenom: string;
      minBaseFee: string;
      authority: AccAddress;
    };
  }

  export interface Data {
    '@type': '/feemarket.feemarket.v1.MsgFeeDenomParam';
    feeDenom: string;
    minBaseFee: string;
    authority: AccAddress;
  }
  export type Proto = MsgFeeDenomParam_pb;
}
