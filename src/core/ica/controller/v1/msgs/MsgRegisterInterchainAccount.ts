import { AccAddress } from '../../../../bech32';
import { Any } from '@terra-money/legacy.proto/google/protobuf/any';
import { JSONSerializable } from '../../../../../util/json';
import { MsgRegisterInterchainAccount as MsgRegisterInterchainAccount_pb } from '@terra-money/terra.proto/ibc/applications/interchain_accounts/controller/v1/tx';

/**
 * A basic message for sending [[Coins]] between Terra accounts.
 */
export class MsgRegisterInterchainAccount extends JSONSerializable<
  MsgRegisterInterchainAccount.Amino,
  MsgRegisterInterchainAccount.Data,
  MsgRegisterInterchainAccount.Proto
> {
  /**
   * @param owner sender's address
   * @param connectionId ibc connection id
   * @param version of the interchain account
   */
  constructor(
    public owner: AccAddress,
    public connectionId: string,
    public version: string
  ) {
    super();
  }

  public static fromAmino(
    data: MsgRegisterInterchainAccount.Amino,
    _?: boolean
  ): MsgRegisterInterchainAccount {
    _;
    data;
    throw new Error('Amino not supported on MsgRegisterInterchainAccount');
  }

  public toAmino(_?: boolean): MsgRegisterInterchainAccount.Amino {
    _;
    throw new Error('Amino not supported on MsgRegisterInterchainAccount');
  }

  public static fromData(
    data: MsgRegisterInterchainAccount.Data,
    _?: boolean
  ): MsgRegisterInterchainAccount {
    _;
    const { owner, connection_id, version } = data;

    return new MsgRegisterInterchainAccount(owner, connection_id, version);
  }

  public toData(_?: boolean): MsgRegisterInterchainAccount.Data {
    _;
    const { owner, connectionId, version } = this;
    return {
      '@type':
        '/ibc.applications.interchain_accounts.controller.v1.MsgRegisterInterchainAccount',
      owner: owner,
      connection_id: connectionId,
      version: version,
    };
  }

  public static fromProto(
    proto: MsgRegisterInterchainAccount.Proto,
    _?: boolean
  ): MsgRegisterInterchainAccount {
    _;
    return new MsgRegisterInterchainAccount(
      proto.owner,
      proto.connectionId,
      proto.version
    );
  }

  public toProto(_?: boolean): MsgRegisterInterchainAccount.Proto {
    _;
    const { owner, connectionId, version } = this;
    return MsgRegisterInterchainAccount_pb.fromPartial({
      owner,
      connectionId,
      version,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl:
        '/ibc.applications.interchain_accounts.controller.v1.MsgRegisterInterchainAccount',
      value: MsgRegisterInterchainAccount_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgRegisterInterchainAccount {
    return MsgRegisterInterchainAccount.fromProto(
      MsgRegisterInterchainAccount_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgRegisterInterchainAccount {
  export interface Amino {
    value: {};
  }

  export interface Data {
    '@type': '/ibc.applications.interchain_accounts.controller.v1.MsgRegisterInterchainAccount';
    owner: AccAddress;
    connection_id: string;
    version: string;
  }

  export type Proto = MsgRegisterInterchainAccount_pb;
}
