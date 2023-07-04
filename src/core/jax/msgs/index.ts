import { MsgExecuteContract } from './MsgExecuteContract';

export { MsgExecuteContract as JAXMsgExecuteContract };

export type JaxExecuteMessage = MsgExecuteContract;
export namespace JaxExecuteMessage {
  export type Data = MsgExecuteContract.Data;
  export type Amino = MsgExecuteContract.Amino;
  export type Proto = MsgExecuteContract.Proto;
}
