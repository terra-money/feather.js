import { DenomUnit } from '@terra-money/terra.proto/cosmos/bank/v1beta1/bank';
import { JSONSerializable } from '../../util/json';
import { AccAddress } from '../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Metadata } from '@terra-money/terra.proto/cosmos/bank/v1beta1/bank';
import { MsgSetDenomMetadata as MsgSetDenomMetadata_pb } from '@terra-money/terra.proto/osmosis/tokenfactory/v1beta1/tx';

/**
 * MsgSetDenomMetadata allows setting the metadata
 * for an already existing denom
 */
export class MsgSetDenomMetadata extends JSONSerializable<
  MsgSetDenomMetadata.Amino,
  MsgSetDenomMetadata.Data,
  MsgSetDenomMetadata.Proto
> {
  /**
   *
   * @param sender internal account or external sender address
   * @param metadata the cosmwasm contract address
   */
  constructor(public sender: AccAddress, public metadata: Metadata) {
    super();
  }

  public toAmino(_?: boolean): MsgSetDenomMetadata.Amino {
    _;
    const { sender, metadata } = this;

    return {
      type: 'osmosis/tokenfactory/set-metadata',
      value: { sender, metadata },
    };
  }

  public static fromProto(
    proto: MsgSetDenomMetadata.Proto,
    _?: boolean
  ): MsgSetDenomMetadata {
    _;
    return new MsgSetDenomMetadata(proto.sender, proto.metadata as Metadata);
  }

  public toProto(_?: boolean): MsgSetDenomMetadata.Proto {
    _;
    const { sender, metadata } = this;
    return MsgSetDenomMetadata_pb.fromPartial({
      sender,
      metadata,
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/osmosis.tokenfactory.v1beta1.MsgSetDenomMetadata',
      value: MsgSetDenomMetadata_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgSetDenomMetadata {
    _;
    return MsgSetDenomMetadata.fromProto(
      MsgSetDenomMetadata_pb.decode(msgAny.value)
    );
  }

  public static fromData(
    data: MsgSetDenomMetadata.Data,
    _?: boolean
  ): MsgSetDenomMetadata {
    _;
    const { sender, metadata } = data;
    return new MsgSetDenomMetadata(sender, metadata);
  }

  public toData(_?: boolean): MsgSetDenomMetadata.Data {
    _;
    const { sender, metadata } = this;
    return {
      '@type': '/osmosis.tokenfactory.v1beta1.MsgSetDenomMetadata',
      sender,
      metadata,
    };
  }

  public static fromAmino(
    data: MsgSetDenomMetadata.Amino
  ): MsgSetDenomMetadata {
    const {
      value: { sender, metadata },
    } = data;

    return new MsgSetDenomMetadata(sender, metadata);
  }
}

export namespace MsgSetDenomMetadata {
  export interface Amino {
    type: 'osmosis/tokenfactory/set-metadata';
    value: {
      sender: AccAddress;
      metadata: Metadata;
    };
  }

  export interface Data {
    '@type': '/osmosis.tokenfactory.v1beta1.MsgSetDenomMetadata';
    sender: AccAddress;
    metadata: Metadata;
  }

  export type Proto = MsgSetDenomMetadata_pb;
}
