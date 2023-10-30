import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgExecLegacyContent as MsgExecLegacyContent_pb } from '@terra-money/terra.proto/cosmos/gov/v1/tx';

/**
 * Proposals submited throught the legacy governance module v1beta1
 */
export class MsgExecLegacyContent extends JSONSerializable<
  MsgExecLegacyContent.Amino,
  MsgExecLegacyContent.Data,
  MsgExecLegacyContent.Proto
> {
  /**
   * @param content Any content type being the proto
   * @param authority the authority to execute the content (e.g. normally the governance module)
   */
  constructor(public authority: AccAddress, public content?: Any) {
    super();
  }

  public static fromAmino(
    data: MsgExecLegacyContent.Amino,
    _?: boolean
  ): MsgExecLegacyContent {
    _;
    const {
      value: { content, authority },
    } = data;
    return new MsgExecLegacyContent(authority, content);
  }

  public toAmino(_?: boolean): MsgExecLegacyContent.Amino {
    const { content, authority } = this;
    return {
      type: 'cosmos-sdk/v1/MsgExecLegacyContent',
      value: {
        content,
        authority,
      },
    };
  }

  public static fromData(
    data: MsgExecLegacyContent.Data,
    _?: boolean
  ): MsgExecLegacyContent {
    _;
    const { content, authority } = data;
    return new MsgExecLegacyContent(authority, content);
  }

  public toData(_?: boolean): MsgExecLegacyContent.Data {
    _;
    const { content, authority } = this;
    return {
      '@type': '/cosmos.gov.v1.MsgExecLegacyContent',
      content,
      authority,
    };
  }

  public static fromProto(
    proto: MsgExecLegacyContent.Proto,
    _?: boolean
  ): MsgExecLegacyContent {
    _;
    return new MsgExecLegacyContent(proto.authority, proto.content);
  }

  public toProto(_?: boolean): MsgExecLegacyContent.Proto {
    _;
    const { content, authority } = this;
    return MsgExecLegacyContent_pb.fromPartial({
      content,
      authority,
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/cosmos.gov.v1.MsgExecLegacyContent',
      value: MsgExecLegacyContent_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgExecLegacyContent {
    _;
    return MsgExecLegacyContent.fromProto(
      MsgExecLegacyContent_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgExecLegacyContent {
  export interface Amino {
    type: 'cosmos-sdk/v1/MsgExecLegacyContent';
    value: {
      content?: Any;
      authority: AccAddress;
    };
  }

  export interface Data {
    '@type': '/cosmos.gov.v1.MsgExecLegacyContent';
    content?: any;
    authority: AccAddress;
  }

  export type Proto = MsgExecLegacyContent_pb;
}
