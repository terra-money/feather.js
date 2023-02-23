import { MsgAminoCustom } from './MsgAminoCustom';

export * from './MsgAminoCustom';

export type CustomMsg = MsgAminoCustom;
export namespace CustomMsg {
  export type Amino = MsgAminoCustom.Amino;
  export type Data = MsgAminoCustom.Data;
}
