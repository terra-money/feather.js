import {
  MsgClaimDelegationRewards,
  MsgDelegate,
  MsgRedelegate,
  MsgUndelegate,
} from './msgs';
import {
  MsgCreateAlliance,
  MsgDeleteAlliance,
  MsgUpdateAlliance,
} from './proposals';

export * from './models';
export * from './msgs';
export * from './proposals';

export type AllianceMsg =
  | MsgClaimDelegationRewards
  | MsgDelegate
  | MsgRedelegate
  | MsgUndelegate
  | MsgCreateAlliance
  | MsgDeleteAlliance
  | MsgUpdateAlliance;

export namespace AllianceMsg {
  export type Data =
    | MsgClaimDelegationRewards.Data
    | MsgDelegate.Data
    | MsgRedelegate.Data
    | MsgUndelegate.Data
    | MsgCreateAlliance.Data
    | MsgDeleteAlliance.Data
    | MsgUpdateAlliance.Data;

  export type Proto =
    | MsgClaimDelegationRewards.Proto
    | MsgDelegate.Proto
    | MsgRedelegate.Proto
    | MsgUndelegate.Proto
    | MsgCreateAlliance.Proto
    | MsgDeleteAlliance.Proto
    | MsgUpdateAlliance.Proto;

  export type Amino =
    | MsgClaimDelegationRewards.Amino
    | MsgDelegate.Amino
    | MsgRedelegate.Amino
    | MsgUndelegate.Amino
    | MsgCreateAlliance.Amino
    | MsgDeleteAlliance.Amino
    | MsgUpdateAlliance.Amino;
}
