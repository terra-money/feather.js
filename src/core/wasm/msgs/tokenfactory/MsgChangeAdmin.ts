import { JSONSerializable } from '../../../../util/json';
import { AccAddress, ValAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgChangeAdmin as MsgChangeAdmin_pb } from '@terra-money/terra.proto/cosmwasm/tokenfactory/v1beta1/tx';
import { Coin } from '@terra-money/terra.proto/cosmos/base/v1beta1/coin';

/**
 * A delegator can submit this message to send more alliance assets
 * to be staked through the alliance module in a validator.
 */
export class MsgChangeAdmin extends JSONSerializable<
  MsgChangeAdmin.Amino,
  MsgChangeAdmin.Data,
  MsgChangeAdmin.Proto
> {
  /**
   *
   * @param delegatorAddress delegator's account address
   * @param validatorAddress validator's operator address
   * @param amount amount of alliance assets to be sent for delegation
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
      type: 'osmosis/tokenfactory/create-denom',
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
      typeUrl: '/cosmwasm.tokenfactory.v1beta1.MsgChangeAdmin',
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
      '@type': '/cosmwasm.tokenfactory.v1beta1.MsgChangeAdmin',
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
    type: 'osmosis/tokenfactory/create-denom';
    value: {
      sender: AccAddress;
      newAdmin: AccAddress;
      denom: string;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.tokenfactory.v1beta1.MsgChangeAdmin';
    sender: AccAddress;
    newAdmin: AccAddress;
    denom: string;
  }

  export type Proto = MsgChangeAdmin_pb;
}
