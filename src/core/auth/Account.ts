import { Any } from '@terra-money/legacy.proto/google/protobuf/any';
import { BaseAccount } from './BaseAccount';
import { LazyGradedVestingAccount } from './LazyGradedVestingAccount';
import { ContinuousVestingAccount } from './ContinuousVestingAccount';
import { DelayedVestingAccount } from './DelayedVestingAccount';
import { PeriodicVestingAccount } from './PeriodicVestingAccount';
import { BaseVestingAccount } from './BaseVestingAccount';
import { ModuleAccount } from './ModuleAccount';
import { EthAccount } from './EthAccount';

export type Account =
  | BaseAccount
  | BaseVestingAccount
  | LazyGradedVestingAccount
  | ContinuousVestingAccount
  | DelayedVestingAccount
  | PeriodicVestingAccount
  | ModuleAccount
  | EthAccount;
/**
 * Stores information about an account fetched from the blockchain.
 */
export namespace Account {
  export type Amino =
    | BaseAccount.Amino
    | BaseVestingAccount.Amino
    | LazyGradedVestingAccount.Amino
    | ContinuousVestingAccount.Amino
    | DelayedVestingAccount.Amino
    | PeriodicVestingAccount.Amino
    | ModuleAccount.Amino
    | EthAccount.Amino;

  export type Data =
    | BaseAccount.Data
    | BaseVestingAccount.Data
    | LazyGradedVestingAccount.Data
    | ContinuousVestingAccount.Data
    | DelayedVestingAccount.Data
    | PeriodicVestingAccount.Data
    | ModuleAccount.Data
    | EthAccount.Data;

  export type Proto = Any;

  export function fromAmino(
    amino: Account.Amino,
    isClassic?: boolean
  ): Account {
    switch (amino.type) {
      case 'core/Account':
      case 'cosmos-sdk/BaseAccount':
        return BaseAccount.fromAmino(amino, isClassic);
      case 'core/BaseVestingAccount':
      case 'cosmos-sdk/BaseVestingAccount':
        return BaseVestingAccount.fromAmino(amino, isClassic);
      case 'core/LazyGradedVestingAccount':
        return LazyGradedVestingAccount.fromAmino(amino, isClassic);
      case 'cosmos-sdk/ContinuousVestingAccount':
        return ContinuousVestingAccount.fromAmino(amino, isClassic);
      case 'cosmos-sdk/DelayedVestingAccount':
        return DelayedVestingAccount.fromAmino(amino, isClassic);
      case 'cosmos-sdk/PeriodicVestingAccount':
        return PeriodicVestingAccount.fromAmino(amino, isClassic);
      case 'cosmos-sdk/ModuleAccount':
        return ModuleAccount.fromAmino(amino, isClassic);
      case 'injective/EthAccount':
        return EthAccount.fromAmino(amino, isClassic);
    }
  }

  export function fromData(data: Account.Data, isClassic?: boolean): Account {
    switch (data['@type']) {
      case '/cosmos.auth.v1beta1.BaseAccount':
        return BaseAccount.fromData(data, isClassic);
      case '/cosmos.vesting.v1beta1.BaseVestingAccount':
        return BaseVestingAccount.fromData(data, isClassic);
      case '/terra.vesting.v1beta1.LazyGradedVestingAccount':
        return LazyGradedVestingAccount.fromData(data, isClassic);
      case '/cosmos.vesting.v1beta1.ContinuousVestingAccount':
        return ContinuousVestingAccount.fromData(data, isClassic);
      case '/cosmos.vesting.v1beta1.DelayedVestingAccount':
        return DelayedVestingAccount.fromData(data, isClassic);
      case '/cosmos.vesting.v1beta1.PeriodicVestingAccount':
        return PeriodicVestingAccount.fromData(data, isClassic);
      case '/cosmos.auth.v1beta1.ModuleAccount':
        return ModuleAccount.fromData(data, isClassic);
      case '/injective.types.v1beta1.EthAccount':
        return EthAccount.fromData(data, isClassic);
    }
  }

  export function fromProto(
    accountAny: Account.Proto,
    isClassic?: boolean
  ): Account {
    const typeUrl = accountAny.typeUrl;
    if (typeUrl === '/cosmos.auth.v1beta1.BaseAccount') {
      return BaseAccount.unpackAny(accountAny, isClassic);
    } else if (typeUrl === '/terra.vesting.v1beta1.LazyGradedVestingAccount') {
      return LazyGradedVestingAccount.unpackAny(accountAny, isClassic);
    } else if (typeUrl === '/cosmos.vesting.v1beta1.ContinuousVestingAccount') {
      return ContinuousVestingAccount.unpackAny(accountAny, isClassic);
    } else if (typeUrl === '/cosmos.vesting.v1beta1.DelayedVestingAccount') {
      return DelayedVestingAccount.unpackAny(accountAny, isClassic);
    } else if (typeUrl === '/cosmos.vesting.v1beta1.PeriodicVestingAccount') {
      return PeriodicVestingAccount.unpackAny(accountAny, isClassic);
    } else if (typeUrl === '/cosmos.auth.v1beta1.ModuleAccount') {
      return ModuleAccount.unpackAny(accountAny, isClassic);
    }

    throw new Error(`Account type ${typeUrl} not recognized`);
  }
}
