import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgUpdateAuthorization as MsgUpdateAuthorization_pb } from '@terra-money/terra.proto/terra/smartaccount/v1/tx';
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { AuthorizationMsg } from '../models/AuthorizationMsg';

/**
 * MsgUpdateAuthorization updates the list of custom authorization
 * for a smart account
 */
export class MsgUpdateAuthorization extends JSONSerializable<
  MsgUpdateAuthorization.Amino,
  MsgUpdateAuthorization.Data,
  MsgUpdateAuthorization.Proto
> {
  /**
   *
   * @param account sender's account address
   * @param fallback fallback if no custom authorization matches
   * @param authorizationMsgs list of custom authorization messages
   */
  constructor(
    public account: AccAddress,
    public fallback: boolean,
    public authorizationMsgs: AuthorizationMsg[]
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateAuthorization.Amino
  ): MsgUpdateAuthorization {
    const {
      value: { account, fallback, authorizationMsgs },
    } = data;
    return new MsgUpdateAuthorization(
      account,
      fallback,
      authorizationMsgs.map(msg => AuthorizationMsg.fromAmino(msg))
    );
  }

  public toAmino(): MsgUpdateAuthorization.Amino {
    const { account, fallback, authorizationMsgs } = this;
    return {
      type: 'terra/MsgUpdateAuthorization',
      value: {
        account,
        fallback,
        authorizationMsgs: authorizationMsgs.map(msg => msg.toAmino()),
      },
    };
  }

  public static fromData(
    data: MsgUpdateAuthorization.Data
  ): MsgUpdateAuthorization {
    const { account, fallback, authorizationMsgs } = data;
    const authMsgs = authorizationMsgs.map(msg =>
      AuthorizationMsg.fromData(msg)
    );
    return new MsgUpdateAuthorization(account, fallback, authMsgs);
  }

  public toData(): MsgUpdateAuthorization.Data {
    const { account, fallback, authorizationMsgs } = this;
    return {
      '@type': '/terra.smartaccount.v1.MsgUpdateAuthorization',
      account,
      fallback,
      authorizationMsgs: authorizationMsgs.map(msg => msg.toData()),
    };
  }

  public static fromProto(
    proto: MsgUpdateAuthorization.Proto
  ): MsgUpdateAuthorization {
    return new MsgUpdateAuthorization(
      proto.account,
      proto.fallback,
      proto.authorizationMsgs.map(AuthorizationMsg.fromProto)
    );
  }

  public toProto(): MsgUpdateAuthorization.Proto {
    const { account, fallback, authorizationMsgs } = this;
    return MsgUpdateAuthorization_pb.fromPartial({
      account,
      fallback,
      authorizationMsgs,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/terra.smartaccount.v1.MsgUpdateAuthorization',
      value: MsgUpdateAuthorization_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgUpdateAuthorization {
    return MsgUpdateAuthorization.fromProto(
      MsgUpdateAuthorization_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgUpdateAuthorization {
  export interface Amino {
    type: 'terra/MsgUpdateAuthorization';
    value: {
      account: AccAddress;
      fallback: boolean;
      authorizationMsgs: AuthorizationMsg.Amino[];
    };
  }

  export interface Data {
    '@type': '/terra.smartaccount.v1.MsgUpdateAuthorization';
    account: AccAddress;
    fallback: boolean;
    authorizationMsgs: AuthorizationMsg.Data[];
  }

  export type Proto = MsgUpdateAuthorization_pb;
}
