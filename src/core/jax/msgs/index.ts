import { MsgExecuteContract } from './MsgExecuteContract';
import { MsgStoreCode } from './MsgStoreCode';

// These messages are similar to the wasm module so prefix with JAX.
export { MsgExecuteContract as JAXMsgExecuteContract };
export { MsgStoreCode as JAXMsgStoreCode };

export type JaxMsg = MsgExecuteContract | MsgStoreCode;

export namespace JaxMsg {
  export type Data = MsgExecuteContract.Data | MsgStoreCode.Data;

  export type Amino = MsgExecuteContract.Amino | MsgStoreCode.Amino;

  export type Proto = MsgExecuteContract.Proto | MsgStoreCode.Proto;
}
