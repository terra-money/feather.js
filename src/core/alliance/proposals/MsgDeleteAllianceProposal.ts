import { JSONSerializable } from '../../../util/json';
import { Any } from '@terra-money/legacy.proto/google/protobuf/any';
import { MsgDeleteAllianceProposal as MsgDeleteAllianceProposal_pb } from '@terra-money/terra.proto/alliance/gov';

/**
 *  MsgDeleteAllianceProposal is gov content type to delete an existing alliance
 */
export class MsgDeleteAllianceProposal extends JSONSerializable<
  MsgDeleteAllianceProposal.Amino,
  MsgDeleteAllianceProposal.Data,
  MsgDeleteAllianceProposal.Proto
> {
  /**
   * @description Delete an existent alliance using the gov module
   * @param title of the proposal
   * @param description of the proposal
   * @param denom of the asset. It could either be a native token or an IBC token
   */
  constructor(
    public title: string,
    public description: string,
    public denom: string
  ) {
    super();
  }

  public static fromAmino(
    data: MsgDeleteAllianceProposal.Amino,
    _?: boolean
  ): MsgDeleteAllianceProposal {
    _;
    data;
    throw new Error('not implemented');
  }

  public toAmino(_?: boolean): MsgDeleteAllianceProposal.Amino {
    _;
    throw new Error('not implemented');
  }

  public static fromData(
    data: MsgDeleteAllianceProposal.Data,
    _?: boolean
  ): MsgDeleteAllianceProposal {
    _;
    const { title, description, denom } = data;
    return new MsgDeleteAllianceProposal(title, description, denom);
  }

  public toData(_?: boolean): MsgDeleteAllianceProposal.Data {
    _;
    const { title, description, denom } = this;

    return {
      '@type': '/alliance.alliance.MsgDeleteAllianceProposal',
      title,
      description,
      denom,
    };
  }

  public static fromProto(
    proto: MsgDeleteAllianceProposal.Proto,
    _?: boolean
  ): MsgDeleteAllianceProposal {
    _;
    return new MsgDeleteAllianceProposal(
      proto.title,
      proto.description,
      proto.denom
    );
  }

  public toProto(_?: boolean): MsgDeleteAllianceProposal.Proto {
    _;
    const { title, description, denom } = this;
    return MsgDeleteAllianceProposal_pb.fromPartial({
      title,
      description,
      denom,
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/alliance.alliance.MsgDeleteAllianceProposal',
      value: MsgDeleteAllianceProposal_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgDeleteAllianceProposal {
    return MsgDeleteAllianceProposal.fromProto(
      MsgDeleteAllianceProposal_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgDeleteAllianceProposal {
  export interface Amino {
    type: 'alliance/MsgDeleteAllianceProposal';
    title: string;
    description: string;
    denom: string;
  }

  export interface Data {
    '@type': '/alliance.alliance.MsgDeleteAllianceProposal';
    title: string;
    description: string;
    denom: string;
  }

  export type Proto = MsgDeleteAllianceProposal_pb;
}
