import { JSONSerializable } from '../../util/json';
import { AccAddress } from '../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgChangeAdmin as MsgChangeAdmin_pb } from '@terra-money/terra.proto/osmosis/tokenfactory/v1beta1/tx';

// MsgChangeAdmin is the sdk.Msg type for allowing an admin account to reassign
// adminship of a denom to a new account
export class MsgChangeAdmin extends JSONSerializable<
  MsgChangeAdmin.Amino,
  MsgChangeAdmin.Data,
  MsgChangeAdmin.Proto
> {
  /**
   *
   * @param sender current admin
   * @param newAdmin new admin
   * @param denom denom to change its admin
   */
  constructor(
    public sender: AccAddress,
    public newAdmin: AccAddress,
    public denom: string
  ) {
    super();
  }

  public toAmino(_?: boolean): MsgChangeAdmin.Amino {
    _;
    const { sender, newAdmin, denom } = this;

    return {
      type: 'osmosis/tokenfactory/change-admin',
      value: {
        sender,
        newAdmin,
        denom,
      },
    };
  }

  public static fromProto(
    proto: MsgChangeAdmin.Proto,
    _?: boolean
  ): MsgChangeAdmin {
    _;
    return new MsgChangeAdmin(proto.sender, proto.denom, proto.newAdmin);
  }

  public toProto(_?: boolean): MsgChangeAdmin.Proto {
    _;
    const { sender, newAdmin, denom } = this;
    return MsgChangeAdmin_pb.fromPartial({
      sender,
      newAdmin,
      denom,
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/osmosis.tokenfactory.v1beta1.MsgChangeAdmin',
      value: MsgChangeAdmin_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgChangeAdmin {
    _;
    return MsgChangeAdmin.fromProto(MsgChangeAdmin_pb.decode(msgAny.value));
  }

  public static fromData(
    data: MsgChangeAdmin.Data,
    _?: boolean
  ): MsgChangeAdmin {
    _;
    const { sender, newAdmin, denom } = data;
    return new MsgChangeAdmin(sender, newAdmin, denom);
  }

  public toData(_?: boolean): MsgChangeAdmin.Data {
    _;
    const { sender, newAdmin, denom } = this;
    return {
      '@type': '/osmosis.tokenfactory.v1beta1.MsgChangeAdmin',
      sender,
      newAdmin,
      denom,
    };
  }

  public static fromAmino(data: MsgChangeAdmin.Amino): MsgChangeAdmin {
    const {
      value: { sender, newAdmin, denom },
    } = data;

    return new MsgChangeAdmin(sender, newAdmin, denom);
  }
}

export namespace MsgChangeAdmin {
  export interface Amino {
    type: 'osmosis/tokenfactory/change-admin';
    value: {
      sender: AccAddress;
      newAdmin: AccAddress;
      denom: string;
    };
  }

  export interface Data {
    '@type': '/osmosis.tokenfactory.v1beta1.MsgChangeAdmin';
    sender: AccAddress;
    newAdmin: AccAddress;
    denom: string;
  }

  export type Proto = MsgChangeAdmin_pb;
}
