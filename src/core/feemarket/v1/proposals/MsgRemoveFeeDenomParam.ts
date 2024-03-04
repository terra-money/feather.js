import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgRemoveFeeDenomParam as MsgRemoveFeeDenomParam_pb } from '@terra-money/terra.proto/feemarket/feemarket/v1/tx';

export class MsgRemoveFeeDenomParam extends JSONSerializable<
  MsgRemoveFeeDenomParam.Amino,
  MsgRemoveFeeDenomParam.Data,
  MsgRemoveFeeDenomParam.Proto
> {
  constructor(public feeDenom: string, public authority: AccAddress) {
    super();
  }

  public static fromAmino(
    data: MsgRemoveFeeDenomParam.Amino
  ): MsgRemoveFeeDenomParam {
    data;
    throw new Error('not implemented');
  }

  public toAmino(): MsgRemoveFeeDenomParam.Amino {
    throw new Error('not implemented');
  }

  public static fromData(
    proto: MsgRemoveFeeDenomParam.Data
  ): MsgRemoveFeeDenomParam {
    const { fee_denom, authority } = proto;
    return new MsgRemoveFeeDenomParam(fee_denom, authority);
  }

  public toData(): MsgRemoveFeeDenomParam.Data {
    const { feeDenom, authority } = this;
    return {
      '@type': '/feemarket.feemarket.v1.MsgRemoveFeeDenomParam',
      fee_denom: feeDenom,
      authority: authority,
    };
  }

  public static fromProto(
    proto: MsgRemoveFeeDenomParam.Proto
  ): MsgRemoveFeeDenomParam {
    return new MsgRemoveFeeDenomParam(proto.feeDenom, proto.authority);
  }

  public toProto(): MsgRemoveFeeDenomParam.Proto {
    const { feeDenom, authority } = this;
    return MsgRemoveFeeDenomParam_pb.fromPartial({
      feeDenom,
      authority,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/feemarket.feemarket.v1.MsgRemoveFeeDenomParam',
      value: MsgRemoveFeeDenomParam_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgRemoveFeeDenomParam {
    return MsgRemoveFeeDenomParam.fromProto(
      MsgRemoveFeeDenomParam_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgRemoveFeeDenomParam {
  export interface Amino {
    type: 'feemarket/MsgRemoveFeeDenomParam';
    value: {
      fee_denom: string;
      authority: AccAddress;
    };
  }

  export interface Data {
    '@type': '/feemarket.feemarket.v1.MsgRemoveFeeDenomParam';
    fee_denom: string;
    authority: AccAddress;
  }
  export type Proto = MsgRemoveFeeDenomParam_pb;
}
