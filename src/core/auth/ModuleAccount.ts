import { PublicKey } from '../PublicKey';
import { JSONSerializable } from '../../util/json';
import { AccAddress } from '../bech32';
import { ModuleAccount as ModuleAccount_pb } from '@terra-money/terra.proto/cosmos/auth/v1beta1/auth';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import Long from 'long';
import { BaseAccount } from './BaseAccount';

/**
 * Stores information about an account fetched from the blockchain.
 */
export class ModuleAccount extends JSONSerializable<
  ModuleAccount.Amino,
  ModuleAccount.Data,
  ModuleAccount.Proto
> {
  /**
   * Creates a new Module accout object, holding information about a module account.
   *
   * @param name name of the module e.g 'alliance', 'bank', 'distribution'...
   * @param permissions permissions of the module to operate 'burner', 'staking'...
   * @param baseAccount basic account information of the module
   */
  constructor(
    public name: string,
    public permissions: string[],
    public baseAccount?: BaseAccount
  ) {
    super();
  }

  public getAccountNumber(): number {
    return this.baseAccount?.account_number
      ? this.baseAccount.account_number
      : 0;
  }

  public getSequenceNumber(): number {
    return this.baseAccount?.sequence ? this.baseAccount?.sequence : 0;
  }

  public getPublicKey(): PublicKey | null {
    return this.baseAccount?.public_key ? this.baseAccount?.public_key : null;
  }

  public toAmino(_: boolean): ModuleAccount.Amino {
    _;
    const { name, permissions, baseAccount } = this;

    return {
      type: 'cosmos-sdk/ModuleAccount',
      value: {
        name,
        permissions,
        base_account: baseAccount?.toAmino(_),
      },
    };
  }

  public static fromAmino(
    data: ModuleAccount.Amino,
    _?: boolean
  ): ModuleAccount {
    _;
    const {
      value: { name, permissions, base_account },
    } = data;

    return new ModuleAccount(
      name,
      permissions,
      base_account ? BaseAccount.fromAmino(base_account, _) : undefined
    );
  }

  public static fromData(data: ModuleAccount.Data, _?: boolean): ModuleAccount {
    _;
    const { name, permissions, base_account } = data;

    return new ModuleAccount(
      name,
      permissions,
      base_account ? BaseAccount.fromData(base_account, _) : undefined
    );
  }

  public toData(_?: boolean): ModuleAccount.Data {
    _;
    const { name, permissions, baseAccount } = this;
    return {
      '@type': '/cosmos.auth.v1beta1.ModuleAccount',
      name,
      permissions,
      base_account: baseAccount?.toData(_),
    };
  }

  public toProto(_?: boolean): ModuleAccount.Proto {
    _;
    const { name, permissions, baseAccount } = this;
    return ModuleAccount_pb.fromPartial({
      name,
      permissions,
      baseAccount: baseAccount?.toProto(_),
    });
  }

  public static fromProto(
    moduleAccountProto: ModuleAccount.Proto,
    _?: boolean
  ): ModuleAccount {
    _;
    return new ModuleAccount(
      moduleAccountProto.name,
      moduleAccountProto.permissions,
      moduleAccountProto.baseAccount
        ? BaseAccount.fromProto(moduleAccountProto.baseAccount, _)
        : undefined
    );
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.auth.v1beta1.ModuleAccount',
      value: ModuleAccount_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(pubkeyAny: Any, _?: boolean): ModuleAccount {
    _;
    return ModuleAccount.fromProto(ModuleAccount_pb.decode(pubkeyAny.value), _);
  }
}

export namespace ModuleAccount {
  export interface AminoValue {
    name: string;
    base_account?: BaseAccount.Amino;
    permissions: string[];
  }

  export interface Amino {
    type: 'cosmos-sdk/ModuleAccount';
    value: AminoValue;
  }

  export interface DataValue {
    name: string;
    base_account?: BaseAccount.Data;
    permissions: string[];
  }

  export interface Data extends DataValue {
    '@type': '/cosmos.auth.v1beta1.ModuleAccount';
  }

  export type Proto = ModuleAccount_pb;
}
