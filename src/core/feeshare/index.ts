import { MsgRegisterFeeShare } from './MsgRegisterFeeShare';
import { MsgUpdateFeeShare } from './MsgUpdateFeeShare';
import { MsgCancelFeeShare } from './MsgCancelFeeShare';

export * from './MsgRegisterFeeShare';
export * from './MsgUpdateFeeShare';
export * from './MsgCancelFeeShare';

export type FeeshareMsg =
  | MsgRegisterFeeShare
  | MsgUpdateFeeShare
  | MsgCancelFeeShare;
export namespace FeeshareMsg {
  export type Amino =
    | MsgRegisterFeeShare.Amino
    | MsgUpdateFeeShare.Amino
    | MsgCancelFeeShare.Amino;
  export type Data =
    | MsgRegisterFeeShare.Data
    | MsgUpdateFeeShare.Data
    | MsgCancelFeeShare.Data;
  export type Proto =
    | MsgRegisterFeeShare.Proto
    | MsgUpdateFeeShare.Proto
    | MsgCancelFeeShare.Proto;
}
