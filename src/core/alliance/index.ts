import {
  MsgClaimDelegationRewards,
  MsgDelegate,
  MsgRedelegate,
  MsgUndelegate,
} from './msgs';

export * from './msgs';
export * from './proposals';

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

  export type Proto =
    | MsgClaimDelegationRewards.Proto
    | MsgDelegate.Proto
    | MsgRedelegate.Proto
    | MsgUndelegate.Proto;

  export type Amino =
    | MsgClaimDelegationRewards.Amino
    | MsgDelegate.Amino
    | MsgRedelegate.Amino
    | MsgUndelegate.Amino;
}
