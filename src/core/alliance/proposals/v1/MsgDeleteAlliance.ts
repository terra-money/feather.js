import { JSONSerializable } from '../../../../util/json';
import { Any } from '@terra-money/legacy.proto/google/protobuf/any';
import { MsgDeleteAlliance as MsgDeleteAlliance_pb } from '@terra-money/terra.proto/alliance/alliance/tx';

/**
 *  MsgDeleteAlliance is gov content type to delete an existing alliance
 */
export class MsgDeleteAlliance extends JSONSerializable<
  MsgDeleteAlliance.Amino,
  MsgDeleteAlliance.Data,
  MsgDeleteAlliance.Proto
> {
  /**
   * @description Delete an existent alliance using the gov module
   * @param authority of the proposal
   * @param description of the proposal
   * @param denom of the asset. It could either be a native token or an IBC token
   */
  constructor(public authority: string, public denom: string) {
    super();
  }

  public static fromAmino(
    data: MsgDeleteAlliance.Amino,
    _?: boolean
  ): MsgDeleteAlliance {
    _;
    data;
    throw new Error('not implemented');
  }

  public toAmino(_?: boolean): MsgDeleteAlliance.Amino {
    _;
    throw new Error('not implemented');
  }

  public static fromData(
    data: MsgDeleteAlliance.Data,
    _?: boolean
  ): MsgDeleteAlliance {
    _;
    const { authority, denom } = data;
    return new MsgDeleteAlliance(authority, denom);
  }

  public toData(_?: boolean): MsgDeleteAlliance.Data {
    _;
    const { authority, denom } = this;

    return {
      '@type': '/alliance.alliance.MsgDeleteAlliance',
      authority,

      denom,
    };
  }

  public static fromProto(
    proto: MsgDeleteAlliance.Proto,
    _?: boolean
  ): MsgDeleteAlliance {
    _;
    return new MsgDeleteAlliance(proto.authority, proto.denom);
  }

  public toProto(_?: boolean): MsgDeleteAlliance.Proto {
    _;
    const { authority, denom } = this;
    return MsgDeleteAlliance_pb.fromPartial({
      authority,
      denom,
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/alliance.alliance.MsgDeleteAlliance',
      value: MsgDeleteAlliance_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgDeleteAlliance {
    _;
    return MsgDeleteAlliance.fromProto(
      MsgDeleteAlliance_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgDeleteAlliance {
  export interface Amino {
    type: 'alliance/MsgDeleteAlliance';
    authority: string;
    denom: string;
  }

  export interface Data {
    '@type': '/alliance.alliance.MsgDeleteAlliance';
    authority: string;
    denom: string;
  }

  export type Proto = MsgDeleteAlliance_pb;
}
