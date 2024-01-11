import { MsgParams } from './MsgParams';
import { MsgState } from './MsgState';

export * from './MsgParams';

export type FeemarketMsg = MsgParams | MsgState;
export namespace FeemarketMsg {
  export type Amino = MsgParams.Amino | MsgState.Amino;
  export type Data = MsgParams.Data | MsgState.Data;
  export type Proto = MsgParams.Proto | MsgState.Proto;
}
