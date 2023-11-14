import { MsgCreateDenom } from './MsgCreateDenom';
import { MsgBurn } from './MsgBurn';
import { MsgChangeAdmin } from './MsgChangeAdmin';
import { MsgMint } from './MsgMint';
import { MsgSetBeforeSendHook } from './MsgSetBeforeSendHook';
import { MsgSetDenomMetadata } from './MsgSetDenomMetadata';
import { MsgForceTransfer } from './MsgForceTransfer';

export * from './MsgCreateDenom';
export * from './MsgBurn';
export * from './MsgChangeAdmin';
export * from './MsgMint';
export * from './MsgSetBeforeSendHook';

export type TokenFactoryMsg =
  | MsgCreateDenom
  | MsgBurn
  | MsgChangeAdmin
  | MsgMint
  | MsgSetBeforeSendHook
  | MsgSetDenomMetadata
  | MsgForceTransfer
  | MsgSetDenomMetadata;

export namespace TokenFactoryMsg {
  export type Amino =
    | MsgCreateDenom.Amino
    | MsgBurn.Amino
    | MsgChangeAdmin.Amino
    | MsgMint.Amino
    | MsgSetBeforeSendHook.Amino
    | MsgSetDenomMetadata.Amino
    | MsgForceTransfer.Amino
    | MsgSetDenomMetadata.Amino;

  export type Data =
    | MsgCreateDenom.Data
    | MsgBurn.Data
    | MsgChangeAdmin.Data
    | MsgMint.Data
    | MsgSetBeforeSendHook.Data
    | MsgSetDenomMetadata.Data
    | MsgForceTransfer.Data
    | MsgSetDenomMetadata.Data;

  export type Proto =
    | MsgCreateDenom.Proto
    | MsgBurn.Proto
    | MsgChangeAdmin.Proto
    | MsgMint.Proto
    | MsgSetBeforeSendHook.Proto
    | MsgSetDenomMetadata.Proto
    | MsgForceTransfer.Proto
    | MsgSetDenomMetadata.Proto;
}
