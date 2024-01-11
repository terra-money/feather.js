import { MsgParams } from './MsgParams';

export * from './MsgParams';

export type FeemarketMsg = MsgParams;
export namespace FeeshareMsg {
  export type Amino = MsgParams.Amino;
  export type Data = MsgParams.Data;
  export type Proto = MsgParams.Proto;
}
