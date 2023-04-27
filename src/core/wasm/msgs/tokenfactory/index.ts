import { MsgCreateDenom } from './MsgCreateDenom';
import { MsgBurn } from './MsgBurn';
import { MsgChangeAdmin } from './MsgChangeAdmin';
import { MsgMint } from './MsgMint';

export type WasmTokenFactory =
  | MsgCreateDenom
  | MsgBurn
  | MsgChangeAdmin
  | MsgMint;
