import { MsgCreateSmartAccount } from './MsgCreateSmartAccount';
import { MsgDisableSmartAccount } from './MsgDisableSmartAccount';
import { MsgUpdateAuthorization } from './MsgUpdateAuthorization';
import { MsgUpdateTransactionHooks } from './MsgUpdateTransactionHooks';

export * from './MsgCreateSmartAccount';
export * from './MsgDisableSmartAccount';
export * from './MsgUpdateAuthorization';
export * from './MsgUpdateTransactionHooks';

export type SmartAccountMsg =
  | MsgCreateSmartAccount
  | MsgDisableSmartAccount
  | MsgUpdateAuthorization
  | MsgUpdateTransactionHooks;

export namespace SmartAccountMsg {
  export type Amino =
    | MsgCreateSmartAccount.Amino
    | MsgDisableSmartAccount.Amino
    | MsgUpdateAuthorization.Amino
    | MsgUpdateTransactionHooks.Amino;
  export type Data =
    | MsgCreateSmartAccount.Data
    | MsgDisableSmartAccount.Data
    | MsgUpdateAuthorization.Data
    | MsgUpdateTransactionHooks.Data;
  export type Proto =
    | MsgCreateSmartAccount.Proto
    | MsgDisableSmartAccount.Proto
    | MsgUpdateAuthorization.Proto
    | MsgUpdateTransactionHooks.Proto;
}
