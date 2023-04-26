import { MsgStoreCode } from './MsgStoreCode';
import { MsgMigrateCode } from './MsgMigrateCode';
import { MsgInstantiateContract } from './MsgInstantiateContract';
import { MsgExecuteContract } from './MsgExecuteContract';
import { MsgMigrateContract } from './MsgMigrateContract';
import { MsgUpdateContractAdmin } from './MsgUpdateContractAdmin';
import { MsgClearContractAdmin } from './MsgClearContractAdmin';
import { WasmTokenFactory } from './tokenfactory';
import { MsgCreateDenom } from './tokenfactory/MsgCreateDenom';

export * from './MsgStoreCode';
export * from './MsgMigrateCode';
export * from './MsgInstantiateContract';
export * from './MsgExecuteContract';
export * from './MsgMigrateContract';
export * from './MsgUpdateContractAdmin';
export * from './MsgClearContractAdmin';
export * from './tokenfactory';

export type WasmMsg =
  | MsgStoreCode
  | MsgMigrateCode
  | MsgInstantiateContract
  | MsgExecuteContract
  | MsgMigrateContract
  | MsgUpdateContractAdmin
  | MsgClearContractAdmin
  | WasmTokenFactory;

export namespace WasmMsg {
  export type Amino =
    | MsgStoreCode.Amino
    | MsgMigrateCode.Amino
    | MsgInstantiateContract.Amino
    | MsgExecuteContract.Amino
    | MsgMigrateContract.Amino
    | MsgUpdateContractAdmin.Amino
    | MsgClearContractAdmin.Amino
    | MsgCreateDenom.Amino;
  export type Data =
    | MsgStoreCode.Data
    | MsgMigrateCode.Data
    | MsgInstantiateContract.Data
    | MsgExecuteContract.Data
    | MsgMigrateContract.Data
    | MsgUpdateContractAdmin.Data
    | MsgClearContractAdmin.Data
    | MsgCreateDenom.Data;
  export type Proto =
    | MsgStoreCode.Proto
    | MsgMigrateCode.Proto
    | MsgInstantiateContract.Proto
    | MsgExecuteContract.Proto
    | MsgMigrateContract.Proto
    | MsgUpdateContractAdmin.Proto
    | MsgClearContractAdmin.Proto
    | MsgCreateDenom.Proto;
}
