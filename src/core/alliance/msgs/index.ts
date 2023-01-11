import { MsgClaimDelegationRewards } from './MsgClaimDelegationRewards';
import { MsgDelegate } from './MsgDelegate';
import { MsgRedelegate } from './MsgRedelegate';
import { MsgUndelegate } from './MsgUndelegate';

export * from './MsgClaimDelegationRewards';
export * from './MsgDelegate';
export * from './MsgRedelegate';
export * from './MsgUndelegate';

export type AllianceMsg =
  | MsgClaimDelegationRewards
  | MsgDelegate
  | MsgRedelegate
  | MsgUndelegate;

export namespace AllianceMsg {
  export type Data =
    | MsgClaimDelegationRewards.Data
    | MsgDelegate.Data
    | MsgRedelegate.Data
    | MsgUndelegate.Data;
}
