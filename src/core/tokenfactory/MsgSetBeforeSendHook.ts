import { JSONSerializable } from '../../util/json';
import { AccAddress } from '../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgSetBeforeSendHook as MsgSetBeforeSendHook_pb } from '@terra-money/terra.proto/osmosis/tokenfactory/v1beta1/tx';

/**
 * MsgSetBeforeSendHook allows setting a hook for a specific denom
 * to keep track of the token transfers or block specific transfers.
 */
export class MsgSetBeforeSendHook extends JSONSerializable<
  MsgSetBeforeSendHook.Amino,
  MsgSetBeforeSendHook.Data,
  MsgSetBeforeSendHook.Proto
> {
  /**
   *
   * @param sender internal account or external sender address
   * @param denom with the format factory/terra1address/subdenom
   * @param cosmwasmAddress the cosmwasm contract address
   */
  constructor(
    public sender: AccAddress,
    public denom: string,
    public cosmwasmAddress: string
  ) {
    super();
  }

  public toAmino(_?: boolean): MsgSetBeforeSendHook.Amino {
    _;
    const { sender, denom, cosmwasmAddress } = this;

    return {
      type: 'osmosis/tokenfactory/set-beforesend-hook',
      value: { sender, denom, cosmwasmAddress },
    };
  }

  public static fromProto(
    proto: MsgSetBeforeSendHook.Proto,
    _?: boolean
  ): MsgSetBeforeSendHook {
    _;
    return new MsgSetBeforeSendHook(
      proto.sender,
      proto.denom,
      proto.cosmwasmAddress
    );
  }

  public toProto(_?: boolean): MsgSetBeforeSendHook.Proto {
    _;
    const { sender, denom, cosmwasmAddress } = this;
    return MsgSetBeforeSendHook_pb.fromPartial({
      sender,
      denom,
      cosmwasmAddress,
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/osmosis.tokenfactory.v1beta1.MsgSetBeforeSendHook',
      value: MsgSetBeforeSendHook_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgSetBeforeSendHook {
    _;
    return MsgSetBeforeSendHook.fromProto(
      MsgSetBeforeSendHook_pb.decode(msgAny.value)
    );
  }

  public static fromData(
    data: MsgSetBeforeSendHook.Data,
    _?: boolean
  ): MsgSetBeforeSendHook {
    _;
    const { sender, denom, cosmwasmAddress } = data;
    return new MsgSetBeforeSendHook(sender, denom, cosmwasmAddress);
  }

  public toData(_?: boolean): MsgSetBeforeSendHook.Data {
    _;
    const { sender, denom, cosmwasmAddress } = this;
    return {
      '@type': '/osmosis.tokenfactory.v1beta1.MsgSetBeforeSendHook',
      sender,
      denom,
      cosmwasmAddress,
    };
  }

  public static fromAmino(
    data: MsgSetBeforeSendHook.Amino
  ): MsgSetBeforeSendHook {
    const {
      value: { sender, denom, cosmwasmAddress },
    } = data;

    return new MsgSetBeforeSendHook(sender, denom, cosmwasmAddress);
  }
}

export namespace MsgSetBeforeSendHook {
  export interface Amino {
    type: 'osmosis/tokenfactory/set-beforesend-hook';
    value: {
      sender: AccAddress;
      denom: string;
      cosmwasmAddress: string;
    };
  }

  export interface Data {
    '@type': '/osmosis.tokenfactory.v1beta1.MsgSetBeforeSendHook';
    sender: AccAddress;
    denom: string;
    cosmwasmAddress: string;
  }

  export type Proto = MsgSetBeforeSendHook_pb;
}
