import { MsgRegisterInterchainAccount } from './MsgRegisterInterchainAccount';
import { MsgSendTx } from './MsgSendTx';

export * from './MsgRegisterInterchainAccount';
export * from './MsgSendTx';

export type ICAMsg = MsgRegisterInterchainAccount | MsgSendTx;
export namespace ICAMsg {
  export type Amino = MsgRegisterInterchainAccount.Amino | MsgSendTx.Amino;
  export type Data = MsgRegisterInterchainAccount.Data | MsgSendTx.Data;
  export type Proto = MsgRegisterInterchainAccount.Proto | MsgSendTx.Proto;
}
