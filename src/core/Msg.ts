import { BankMsg, MsgMultiSend, MsgSend } from './bank/msgs';
import {
  DistributionMsg,
  MsgSetWithdrawAddress,
  MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommission,
  MsgFundCommunityPool,
} from './distribution/msgs';
import {
  MsgGrantAllowance,
  MsgRevokeAllowance,
  FeeGrantMsg,
} from './feegrant/msgs';
import {
  GovMsg,
  MsgDeposit,
  MsgSubmitProposal,
  MsgVote,
  MsgVoteWeighted,
} from './gov/msgs';
import {
  MsgGrantAuthorization,
  MsgRevokeAuthorization,
  MsgExecAuthorized,
  MsgAuthMsg,
} from './authz/msgs';
import { MsgUnjail, SlashingMsg } from './slashing/msgs';
import {
  MsgBeginRedelegate,
  MsgCreateValidator,
  MsgCancelUnbondingDelegation,
  MsgDelegate,
  MsgEditValidator,
  MsgUndelegate,
  StakingMsg,
} from './staking/msgs';
import {
  MsgCreatePeriodicVestingAccount,
  MsgCreateVestingAccount,
  MsgDonateAllVestingTokens,
  VestingMsg,
} from './vesting/msgs';
import {
  AllianceMsg,
  MsgClaimDelegationRewards as AMsgClaimDelegationRewards,
  MsgDelegate as AMsgDelegate,
  MsgRedelegate as AMsgRedelegate,
  MsgUndelegate as AMsgUndelegate,
} from './alliance/msgs';
import { CustomMsg, MsgAminoCustom } from './custom/msgs';
import {
  MsgStoreCode,
  MsgMigrateCode,
  MsgInstantiateContract,
  MsgExecuteContract,
  MsgMigrateContract,
  MsgUpdateContractAdmin,
  MsgClearContractAdmin,
  WasmMsg,
} from './wasm/msgs';

import { JAXMsgExecuteContract, JaxExecuteMessage } from './jax/msgs';
import { MsgTransfer, IbcTransferMsg } from './ibc/applications/transfer';
import {
  MsgCreateClient,
  MsgUpdateClient,
  MsgUpgradeClient,
  MsgSubmitMisbehaviour,
  IbcClientMsg,
} from './ibc/msgs/client';
import {
  MsgConnectionOpenInit,
  MsgConnectionOpenTry,
  MsgConnectionOpenConfirm,
  MsgConnectionOpenAck,
  IbcConnectionMsg,
} from './ibc/msgs/connection';
import {
  MsgChannelOpenInit,
  MsgChannelOpenTry,
  MsgChannelOpenConfirm,
  MsgChannelOpenAck,
  MsgChannelCloseInit,
  MsgChannelCloseConfirm,
  MsgRecvPacket,
  MsgAcknowledgement,
  MsgTimeout,
  MsgTimeoutOnClose,
  IbcChannelMsg,
} from './ibc/msgs/channel';
import { MsgVerifyInvariant, CrisisMsg } from './crisis';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgLiquidStake, MsgRedeemStake } from './stride/msgs';
import { MsgCreateDenom } from './wasm/msgs/tokenfactory/MsgCreateDenom';
import { MsgBurn } from './wasm/msgs/tokenfactory/MsgBurn';
import { MsgChangeAdmin } from './wasm/msgs/tokenfactory/MsgChangeAdmin';
import { MsgMint } from './wasm/msgs/tokenfactory/MsgMint';

export type Msg =
  | BankMsg
  | DistributionMsg
  | FeeGrantMsg
  | GovMsg
  | MsgAuthMsg
  | SlashingMsg
  | StakingMsg
  | VestingMsg
  | WasmMsg
  | IbcTransferMsg
  | IbcClientMsg
  | IbcConnectionMsg
  | IbcChannelMsg
  | AllianceMsg
  | CustomMsg
  | MsgLiquidStake
  | MsgRedeemStake
  | JaxExecuteMessage
  | CrisisMsg;

export namespace Msg {
  export type Amino =
    | BankMsg.Amino
    | DistributionMsg.Amino
    | FeeGrantMsg.Amino
    | GovMsg.Amino
    | MsgAuthMsg.Amino
    | SlashingMsg.Amino
    | StakingMsg.Amino
    | VestingMsg.Amino
    | WasmMsg.Amino
    | IbcTransferMsg.Amino
    | CustomMsg.Amino
    | JaxExecuteMessage.Amino
    | CrisisMsg.Amino;

  export type Data =
    | BankMsg.Data
    | DistributionMsg.Data
    | FeeGrantMsg.Data
    | GovMsg.Data
    | MsgAuthMsg.Data
    | SlashingMsg.Data
    | StakingMsg.Data
    | VestingMsg.Data
    | WasmMsg.Data
    | IbcTransferMsg.Data
    | IbcClientMsg.Data
    | IbcConnectionMsg.Data
    | IbcChannelMsg.Data
    | AMsgClaimDelegationRewards.Data
    | AMsgDelegate.Data
    | AMsgRedelegate.Data
    | AMsgUndelegate.Data
    | CustomMsg.Data
    | MsgLiquidStake.Data
    | MsgRedeemStake.Data
    | JaxExecuteMessage.Data
    | CrisisMsg.Data;

  export type Proto =
    | BankMsg.Proto
    | DistributionMsg.Proto
    | FeeGrantMsg.Proto
    | GovMsg.Proto
    | MsgAuthMsg.Proto
    | SlashingMsg.Proto
    | StakingMsg.Proto
    | VestingMsg.Proto
    | WasmMsg.Proto
    | IbcTransferMsg.Proto
    | IbcClientMsg.Proto
    | IbcConnectionMsg.Proto
    | IbcChannelMsg.Proto
    | AMsgClaimDelegationRewards.Proto
    | AMsgDelegate.Proto
    | AMsgRedelegate.Proto
    | AMsgUndelegate.Proto
    | MsgLiquidStake.Proto
    | MsgRedeemStake.Proto
    | JaxExecuteMessage.Proto
    | CrisisMsg.Proto;

  export function fromAmino(data: Msg.Amino, isClassic?: boolean): Msg {
    console.log(data.type);
    switch (data.type) {
      case '/jax.MsgExecuteContract':
        return JAXMsgExecuteContract.fromAmino(
          data as JAXMsgExecuteContract.Amino,
          isClassic
        );
      // bank
      case 'bank/MsgSend':
      case 'cosmos-sdk/MsgSend':
        return MsgSend.fromAmino(data as MsgSend.Amino, isClassic);
      case 'bank/MsgMultiSend':
      case 'cosmos-sdk/MsgMultiSend':
        return MsgMultiSend.fromAmino(data as MsgMultiSend.Amino, isClassic);

      // distribution
      case 'distribution/MsgModifyWithdrawAddress':
      case 'cosmos-sdk/MsgModifyWithdrawAddress':
        return MsgSetWithdrawAddress.fromAmino(
          data as MsgSetWithdrawAddress.Amino,
          isClassic
        );
      case 'distribution/MsgWithdrawDelegationReward':
      case 'cosmos-sdk/MsgWithdrawDelegationReward':
        return MsgWithdrawDelegatorReward.fromAmino(
          data as MsgWithdrawDelegatorReward.Amino,
          isClassic
        );
      case 'distribution/MsgWithdrawValidatorCommission':
      case 'cosmos-sdk/MsgWithdrawValidatorCommission':
        return MsgWithdrawValidatorCommission.fromAmino(
          data as MsgWithdrawValidatorCommission.Amino,
          isClassic
        );
      case 'distribution/MsgFundCommunityPool':
      case 'cosmos-sdk/MsgFundCommunityPool':
        return MsgFundCommunityPool.fromAmino(
          data as MsgFundCommunityPool.Amino,
          isClassic
        );

      // feegrant
      case 'feegrant/MsgGrantAllowance':
      case 'cosmos-sdk/MsgGrantAllowance':
        return MsgGrantAllowance.fromAmino(
          data as MsgGrantAllowance.Amino,
          isClassic
        );
      case 'feegrant/MsgRevokeAllowance':
      case 'cosmos-sdk/MsgRevokeAllowance':
        return MsgRevokeAllowance.fromAmino(
          data as MsgRevokeAllowance.Amino,
          isClassic
        );
      // gov
      case 'gov/MsgDeposit':
      case 'cosmos-sdk/MsgDeposit':
        return MsgDeposit.fromAmino(data as MsgDeposit.Amino, isClassic);
      case 'gov/MsgSubmitProposal':
      case 'cosmos-sdk/MsgSubmitProposal':
        return MsgSubmitProposal.fromAmino(
          data as MsgSubmitProposal.Amino,
          isClassic
        );
      case 'gov/MsgVote':
      case 'cosmos-sdk/MsgVote':
        return MsgVote.fromAmino(data as MsgVote.Amino, isClassic);
      case 'gov/MsgVoteWeighted':
      case 'cosmos-sdk/MsgVoteWeighted':
        return MsgVoteWeighted.fromAmino(
          data as MsgVoteWeighted.Amino,
          isClassic
        );

      // msgauth
      case 'msgauth/MsgGrantAuthorization':
      case 'cosmos-sdk/MsgGrant':
        return MsgGrantAuthorization.fromAmino(
          data as MsgGrantAuthorization.Amino,
          isClassic
        );
      case 'msgauth/MsgRevokeAuthorization':
      case 'cosmos-sdk/MsgRevoke':
        return MsgRevokeAuthorization.fromAmino(
          data as MsgRevokeAuthorization.Amino,
          isClassic
        );
      case 'msgauth/MsgExecAuthorized':
      case 'cosmos-sdk/MsgExec':
        return MsgExecAuthorized.fromAmino(
          data as MsgExecAuthorized.Amino,
          isClassic
        );

      // slashing
      case 'slashing/MsgUnjail':
      case 'cosmos-sdk/MsgUnjail':
        return MsgUnjail.fromAmino(data as MsgUnjail.Amino, isClassic);

      // staking
      case 'staking/MsgDelegate':
      case 'cosmos-sdk/MsgDelegate':
        return MsgDelegate.fromAmino(data as MsgDelegate.Amino, isClassic);
      case 'staking/MsgUndelegate':
      case 'cosmos-sdk/MsgUndelegate':
        return MsgUndelegate.fromAmino(data as MsgUndelegate.Amino, isClassic);
      case 'staking/MsgBeginRedelegate':
      case 'cosmos-sdk/MsgBeginRedelegate':
        return MsgBeginRedelegate.fromAmino(
          data as MsgBeginRedelegate.Amino,
          isClassic
        );
      case 'staking/MsgCreateValidator':
      case 'cosmos-sdk/MsgCreateValidator':
        return MsgCreateValidator.fromAmino(
          data as MsgCreateValidator.Amino,
          isClassic
        );
      case 'staking/MsgEditValidator':
      case 'cosmos-sdk/MsgEditValidator':
        return MsgEditValidator.fromAmino(
          data as MsgEditValidator.Amino,
          isClassic
        );
      case 'staking/MsgCancelUnbondingDelegation':
      case 'cosmos-sdk/MsgCancelUnbondingDelegation':
        return MsgCancelUnbondingDelegation.fromAmino(
          data as MsgCancelUnbondingDelegation.Amino,
          isClassic
        );

      // vesting
      case 'cosmos-sdk/MsgCreatePeriodicVestingAccount':
        return MsgCreatePeriodicVestingAccount.fromAmino(
          data as MsgCreatePeriodicVestingAccount.Amino,
          isClassic
        );
      case 'cosmos-sdk/MsgCreateVestingAccount':
        return MsgCreateVestingAccount.fromAmino(
          data as MsgCreateVestingAccount.Amino,
          isClassic
        );
      case 'cosmos-sdk/MsgDonateAllVestingTokens':
        return MsgDonateAllVestingTokens.fromAmino(
          data as MsgDonateAllVestingTokens.Amino,
          isClassic
        );

      // wasm
      case 'wasm/MsgStoreCode':
        return MsgStoreCode.fromAmino(data as MsgStoreCode.Amino, isClassic);
      case 'wasm/MsgMigrateCode':
        return MsgMigrateCode.fromAmino(
          data as MsgMigrateCode.Amino,
          isClassic
        );
      case 'wasm/MsgInstantiateContract':
        return MsgInstantiateContract.fromAmino(
          data as MsgInstantiateContract.Amino,
          isClassic
        );
      case 'wasm/MsgExecuteContract':
        return MsgExecuteContract.fromAmino(
          data as MsgExecuteContract.Amino,
          isClassic
        );
      case 'wasm/MsgMigrateContract':
        return MsgMigrateContract.fromAmino(
          data as MsgMigrateContract.Amino,
          isClassic
        );
      case 'wasm/MsgUpdateContractAdmin':
      case 'wasm/MsgUpdateAdmin':
        return MsgUpdateContractAdmin.fromAmino(
          data as MsgUpdateContractAdmin.Amino,
          isClassic
        );
      case 'wasm/MsgClearContractAdmin':
      case 'wasm/MsgClearAdmin':
        return MsgClearContractAdmin.fromAmino(
          data as MsgClearContractAdmin.Amino,
          isClassic
        );
      case 'osmosis/tokenfactory/create-denom':
        return MsgCreateDenom.fromAmino(data as MsgCreateDenom.Amino);
      case 'osmosis/tokenfactory/burn':
        return MsgBurn.fromAmino(data as MsgBurn.Amino);
      case 'osmosis/tokenfactory/change-admin':
        return MsgChangeAdmin.fromAmino(data as MsgChangeAdmin.Amino);
      case 'osmosis/tokenfactory/mint':
        return MsgMint.fromAmino(data as MsgMint.Amino);
      // ibc-transfer
      case 'cosmos-sdk/MsgTransfer':
        return MsgTransfer.fromAmino(data as MsgTransfer.Amino, isClassic);
      // crisis
      case 'crisis/MsgVerifyInvariant':
      case 'cosmos-sdk/MsgVerifyInvariant':
        return MsgVerifyInvariant.fromAmino(
          data as MsgVerifyInvariant.Amino,
          isClassic
        );

      // custom
      default:
        return MsgAminoCustom.fromAmino(data, isClassic);
    }
  }
  export function fromData(data: Msg.Data, isClassic?: boolean): Msg {
    console.log(data['@type']);
    switch (data['@type']) {
      case '/stride.stakeibc.MsgLiquidStake':
        return MsgLiquidStake.fromData(data, isClassic);
      case '/stride.stakeibc.MsgRedeemStake':
        return MsgRedeemStake.fromData(data, isClassic);
      // alliance
      case '/alliance.alliance.MsgDelegate':
        return AMsgDelegate.fromData(data, isClassic);
      case '/alliance.alliance.MsgRedelegate':
        return AMsgRedelegate.fromData(data, isClassic);
      case '/alliance.alliance.MsgUndelegate':
        return AMsgUndelegate.fromData(data, isClassic);
      case '/alliance.alliance.MsgClaimDelegationRewards':
        return AMsgClaimDelegationRewards.fromData(data, isClassic);

      // bank
      case '/cosmos.bank.v1beta1.MsgSend':
        return MsgSend.fromData(data, isClassic);
      case '/cosmos.bank.v1beta1.MsgMultiSend':
        return MsgMultiSend.fromData(data, isClassic);

      // distribution
      case '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress':
        return MsgSetWithdrawAddress.fromData(data, isClassic);
      case '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward':
        return MsgWithdrawDelegatorReward.fromData(data, isClassic);
      case '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission':
        return MsgWithdrawValidatorCommission.fromData(data, isClassic);
      case '/cosmos.distribution.v1beta1.MsgFundCommunityPool':
        return MsgFundCommunityPool.fromData(data, isClassic);

      // feegrant
      case '/cosmos.feegrant.v1beta1.MsgGrantAllowance':
        return MsgGrantAllowance.fromData(data, isClassic);
      case '/cosmos.feegrant.v1beta1.MsgRevokeAllowance':
        return MsgRevokeAllowance.fromData(data, isClassic);

      // gov
      case '/cosmos.gov.v1beta1.MsgDeposit':
        return MsgDeposit.fromData(data, isClassic);
      case '/cosmos.gov.v1beta1.MsgSubmitProposal':
        return MsgSubmitProposal.fromData(data, isClassic);
      case '/cosmos.gov.v1beta1.MsgVote':
        return MsgVote.fromData(data, isClassic);
      case '/cosmos.gov.v1beta1.MsgVoteWeighted':
        return MsgVoteWeighted.fromData(data, isClassic);

      // authz
      case '/cosmos.authz.v1beta1.MsgGrant':
        return MsgGrantAuthorization.fromData(data, isClassic);
      case '/cosmos.authz.v1beta1.MsgRevoke':
        return MsgRevokeAuthorization.fromData(data, isClassic);
      case '/cosmos.authz.v1beta1.MsgExec':
        return MsgExecAuthorized.fromData(data, isClassic);

      // slashing
      case '/cosmos.slashing.v1beta1.MsgUnjail':
        return MsgUnjail.fromData(data, isClassic);

      // staking
      case '/cosmos.staking.v1beta1.MsgDelegate':
        return MsgDelegate.fromData(data, isClassic);
      case '/cosmos.staking.v1beta1.MsgUndelegate':
        return MsgUndelegate.fromData(data, isClassic);
      case '/cosmos.staking.v1beta1.MsgBeginRedelegate':
        return MsgBeginRedelegate.fromData(data, isClassic);
      case '/cosmos.staking.v1beta1.MsgCreateValidator':
        return MsgCreateValidator.fromData(data, isClassic);
      case '/cosmos.staking.v1beta1.MsgEditValidator':
        return MsgEditValidator.fromData(data, isClassic);
      case '/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation':
        return MsgCancelUnbondingDelegation.fromData(data, isClassic);

      // vesting
      case '/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount':
        return MsgCreatePeriodicVestingAccount.fromData(data, isClassic);
      case '/cosmos.vesting.v1beta1.MsgCreateVestingAccount':
        return MsgCreateVestingAccount.fromData(data, isClassic);
      case '/cosmos.vesting.v1beta1.MsgDonateAllVestingTokens':
        return MsgDonateAllVestingTokens.fromData(data, isClassic);

      case '/jax.MsgExecuteContract':
        return JAXMsgExecuteContract.fromData(data, isClassic);

      // wasm
      case '/terra.wasm.v1beta1.MsgStoreCode':
      case '/cosmwasm.wasm.v1.MsgStoreCode':
        return MsgStoreCode.fromData(data, isClassic);
      case '/terra.wasm.v1beta1.MsgMigrateCode': // isClassic only
        return MsgMigrateCode.fromData(data, isClassic);
      case '/terra.wasm.v1beta1.MsgInstantiateContract':
      case '/cosmwasm.wasm.v1.MsgInstantiateContract':
        return MsgInstantiateContract.fromData(data, isClassic);
      case '/terra.wasm.v1beta1.MsgExecuteContract':
      case '/cosmwasm.wasm.v1.MsgExecuteContract':
        return MsgExecuteContract.fromData(data, isClassic);
      case '/terra.wasm.v1beta1.MsgMigrateContract':
      case '/cosmwasm.wasm.v1.MsgMigrateContract':
        return MsgMigrateContract.fromData(data, isClassic);
      case '/terra.wasm.v1beta1.MsgUpdateContractAdmin':
      case '/cosmwasm.wasm.v1.MsgUpdateAdmin':
        return MsgUpdateContractAdmin.fromData(data, isClassic);
      case '/terra.wasm.v1beta1.MsgClearContractAdmin':
      case '/cosmwasm.wasm.v1.MsgClearAdmin':
        return MsgClearContractAdmin.fromData(data, isClassic);
      case '/cosmwasm.tokenfactory.v1beta1.MsgCreateDenom':
        return MsgCreateDenom.fromData(data);
      case '/cosmwasm.tokenfactory.v1beta1.MsgBurn':
        return MsgBurn.fromData(data);
      case '/cosmwasm.tokenfactory.v1beta1.MsgChangeAdmin':
        return MsgChangeAdmin.fromData(data);
      case '/cosmwasm.tokenfactory.v1beta1.MsgMint':
        return MsgMint.fromData(data);

      // ibc-transfer
      case '/ibc.applications.transfer.v1.MsgTransfer':
        return MsgTransfer.fromData(data, isClassic);

      // ibc-client
      case '/ibc.core.client.v1.MsgCreateClient':
        return MsgCreateClient.fromData(data, isClassic);
      case '/ibc.core.client.v1.MsgUpdateClient':
        return MsgUpdateClient.fromData(data, isClassic);
      case '/ibc.core.client.v1.MsgUpgradeClient':
        return MsgUpgradeClient.fromData(data, isClassic);
      case '/ibc.core.client.v1.MsgSubmitMisbehaviour':
        return MsgSubmitMisbehaviour.fromData(data, isClassic);

      // ibc-connection
      case '/ibc.core.connection.v1.MsgConnectionOpenInit':
        return MsgConnectionOpenInit.fromData(data, isClassic);
      case '/ibc.core.connection.v1.MsgConnectionOpenTry':
        return MsgConnectionOpenTry.fromData(data, isClassic);
      case '/ibc.core.connection.v1.MsgConnectionOpenConfirm':
        return MsgConnectionOpenConfirm.fromData(data, isClassic);
      case '/ibc.core.connection.v1.MsgConnectionOpenAck':
        return MsgConnectionOpenAck.fromData(data, isClassic);

      // ibc-channel
      case '/ibc.core.channel.v1.MsgChannelOpenInit':
        return MsgChannelOpenInit.fromData(data, isClassic);
      case '/ibc.core.channel.v1.MsgChannelOpenTry':
        return MsgChannelOpenTry.fromData(data, isClassic);
      case '/ibc.core.channel.v1.MsgChannelOpenConfirm':
        return MsgChannelOpenConfirm.fromData(data, isClassic);
      case '/ibc.core.channel.v1.MsgChannelOpenAck':
        return MsgChannelOpenAck.fromData(data, isClassic);
      case '/ibc.core.channel.v1.MsgChannelCloseInit':
        return MsgChannelCloseInit.fromData(data, isClassic);
      case '/ibc.core.channel.v1.MsgChannelCloseConfirm':
        return MsgChannelCloseConfirm.fromData(data, isClassic);
      case '/ibc.core.channel.v1.MsgRecvPacket':
        return MsgRecvPacket.fromData(data, isClassic);
      case '/ibc.core.channel.v1.MsgAcknowledgement':
        return MsgAcknowledgement.fromData(data, isClassic);
      case '/ibc.core.channel.v1.MsgTimeout':
        return MsgTimeout.fromData(data, isClassic);
      case '/ibc.core.channel.v1.MsgTimeoutOnClose':
        return MsgTimeoutOnClose.fromData(data, isClassic);

      // crisis
      case '/cosmos.crisis.v1beta1.MsgVerifyInvariant':
        return MsgVerifyInvariant.fromData(data, isClassic);

      // custom
      default:
        return MsgAminoCustom.fromData(data, isClassic);
    }
  }

  export function fromProto(proto: Any, isClassic?: boolean): Msg {
    console.log(proto.typeUrl);
    switch (proto.typeUrl) {
      case '/jax.MsgExecuteContract':
        return JAXMsgExecuteContract.unpackAny(proto, isClassic);
      case '/stride.stakeibc.MsgLiquidStake':
        return MsgLiquidStake.unpackAny(proto, isClassic);
      case '/stride.stakeibc.MsgRedeemStake':
        return MsgRedeemStake.unpackAny(proto, isClassic);
      // alliance
      case '/alliance.alliance.MsgDelegate':
        return AMsgDelegate.unpackAny(proto, isClassic);
      case '/alliance.alliance.MsgRedelegate':
        return AMsgRedelegate.unpackAny(proto, isClassic);
      case '/alliance.alliance.MsgUndelegate':
        return AMsgUndelegate.unpackAny(proto, isClassic);
      case '/alliance.alliance.MsgClaimDelegationRewards':
        return AMsgClaimDelegationRewards.unpackAny(proto, isClassic);

      // bank
      case '/cosmos.bank.v1beta1.MsgSend':
        return MsgSend.unpackAny(proto, isClassic);
      case '/cosmos.bank.v1beta1.MsgMultiSend':
        return MsgMultiSend.unpackAny(proto, isClassic);

      // distribution
      case '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress':
        return MsgSetWithdrawAddress.unpackAny(proto, isClassic);
      case '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward':
        return MsgWithdrawDelegatorReward.unpackAny(proto, isClassic);
      case '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission':
        return MsgWithdrawValidatorCommission.unpackAny(proto, isClassic);
      case '/cosmos.distribution.v1beta1.MsgFundCommunityPool':
        return MsgFundCommunityPool.unpackAny(proto, isClassic);

      // feegrant
      case '/cosmos.feegrant.v1beta1.MsgGrantAllowance':
        return MsgGrantAllowance.unpackAny(proto, isClassic);
      case '/cosmos.feegrant.v1beta1.MsgRevokeAllowance':
        return MsgRevokeAllowance.unpackAny(proto, isClassic);

      // gov
      case '/cosmos.gov.v1beta1.MsgDeposit':
        return MsgDeposit.unpackAny(proto, isClassic);
      case '/cosmos.gov.v1beta1.MsgSubmitProposal':
        return MsgSubmitProposal.unpackAny(proto, isClassic);
      case '/cosmos.gov.v1beta1.MsgVote':
        return MsgVote.unpackAny(proto, isClassic);

      // authz
      case '/cosmos.authz.v1beta1.MsgGrant':
        return MsgGrantAuthorization.unpackAny(proto, isClassic);
      case '/cosmos.authz.v1beta1.MsgRevoke':
        return MsgRevokeAuthorization.unpackAny(proto, isClassic);
      case '/cosmos.authz.v1beta1.MsgExec':
        return MsgExecAuthorized.unpackAny(proto, isClassic);

      // slashing
      case '/cosmos.slashing.v1beta1.MsgUnjail':
        return MsgUnjail.unpackAny(proto, isClassic);

      // staking
      case '/cosmos.staking.v1beta1.MsgDelegate':
        return MsgDelegate.unpackAny(proto, isClassic);
      case '/cosmos.staking.v1beta1.MsgUndelegate':
        return MsgUndelegate.unpackAny(proto, isClassic);
      case '/cosmos.staking.v1beta1.MsgBeginRedelegate':
        return MsgBeginRedelegate.unpackAny(proto, isClassic);
      case '/cosmos.staking.v1beta1.MsgCreateValidator':
        return MsgCreateValidator.unpackAny(proto, isClassic);
      case '/cosmos.staking.v1beta1.MsgEditValidator':
        return MsgEditValidator.unpackAny(proto, isClassic);
      case '/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation':
        return MsgCancelUnbondingDelegation.unpackAny(proto, isClassic);

      // vesting
      case '/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount':
        return MsgCreatePeriodicVestingAccount.unpackAny(proto, isClassic);
      case '/cosmos.vesting.v1beta1.MsgCreateVestingAccount':
        return MsgCreateVestingAccount.unpackAny(proto, isClassic);
      case '/cosmos.vesting.v1beta1.MsgDonateAllVestingTokens':
        return MsgDonateAllVestingTokens.unpackAny(proto, isClassic);

      // wasm
      case '/terra.wasm.v1beta1.MsgStoreCode':
      case '/cosmwasm.wasm.v1.MsgStoreCode':
        return MsgStoreCode.unpackAny(proto, isClassic);
      case '/terra.wasm.v1beta1.MsgMigrateCode': // isClassic only
        return MsgMigrateCode.unpackAny(proto, isClassic);
      case '/terra.wasm.v1beta1.MsgInstantiateContract':
      case '/cosmwasm.wasm.v1.MsgInstantiateContract':
        return MsgInstantiateContract.unpackAny(proto, isClassic);
      case '/terra.wasm.v1beta1.MsgExecuteContract':
      case '/cosmwasm.wasm.v1.MsgExecuteContract':
        return MsgExecuteContract.unpackAny(proto, isClassic);
      case '/terra.wasm.v1beta1.MsgMigrateContract':
      case '/cosmwasm.wasm.v1beta1.MsgMigrateContract':
        return MsgMigrateContract.unpackAny(proto, isClassic);
      case '/terra.wasm.v1beta1.MsgUpdateContractAdmin':
      case '/cosmwasm.wasm.v1beta1.MsgUpdateAdmin':
        return MsgUpdateContractAdmin.unpackAny(proto, isClassic);
      case '/terra.wasm.v1beta1.MsgClearContractAdmin':
      case '/cosmwasm.wasm.v1.MsgClearAdmin':
        return MsgClearContractAdmin.unpackAny(proto, isClassic);
      case '/cosmwasm.tokenfactory.v1beta1.MsgCreateDenom':
        return MsgCreateDenom.unpackAny(proto, isClassic);
      case '/cosmwasm.tokenfactory.v1beta1.MsgBurn':
        return MsgBurn.unpackAny(proto, isClassic);
      case '/cosmwasm.tokenfactory.v1beta1.MsgChangeAdmin':
        return MsgChangeAdmin.unpackAny(proto, isClassic);
      case '/cosmwasm.tokenfactory.v1beta1.MsgMint':
        return MsgMint.unpackAny(proto, isClassic);

      // ibc-transfer
      case '/ibc.applications.transfer.v1.MsgTransfer':
        return MsgTransfer.unpackAny(proto, isClassic);

      // ibc-client
      case '/ibc.core.client.v1.MsgCreateClient':
        return MsgCreateClient.unpackAny(proto, isClassic);
      case '/ibc.core.client.v1.MsgUpdateClient':
        return MsgUpdateClient.unpackAny(proto, isClassic);
      case '/ibc.core.client.v1.MsgUpgradeClient':
        return MsgUpgradeClient.unpackAny(proto, isClassic);
      case '/ibc.core.client.v1.MsgSubmitMisbehaviour':
        return MsgSubmitMisbehaviour.unpackAny(proto, isClassic);

      // ibc-connection
      case '/ibc.core.connection.v1.MsgConnectionOpenInit':
        return MsgConnectionOpenInit.unpackAny(proto, isClassic);
      case '/ibc.core.connection.v1.MsgConnectionOpenTry':
        return MsgConnectionOpenTry.unpackAny(proto, isClassic);
      case '/ibc.core.connection.v1.MsgConnectionOpenConfirm':
        return MsgConnectionOpenConfirm.unpackAny(proto, isClassic);
      case '/ibc.core.connection.v1.MsgConnectionOpenAck':
        return MsgConnectionOpenAck.unpackAny(proto, isClassic);

      // ibc-channel
      case '/ibc.core.channel.v1.MsgChannelOpenInit':
        return MsgChannelOpenInit.unpackAny(proto, isClassic);
      case '/ibc.core.channel.v1.MsgChannelOpenTry':
        return MsgChannelOpenTry.unpackAny(proto, isClassic);
      case '/ibc.core.channel.v1.MsgChannelOpenConfirm':
        return MsgChannelOpenConfirm.unpackAny(proto, isClassic);
      case '/ibc.core.channel.v1.MsgChannelOpenAck':
        return MsgChannelOpenAck.unpackAny(proto, isClassic);
      case '/ibc.core.channel.v1.MsgChannelCloseInit':
        return MsgChannelCloseInit.unpackAny(proto, isClassic);
      case '/ibc.core.channel.v1.MsgChannelCloseConfirm':
        return MsgChannelCloseConfirm.unpackAny(proto, isClassic);
      case '/ibc.core.channel.v1.MsgRecvPacket':
        return MsgRecvPacket.unpackAny(proto, isClassic);
      case '/ibc.core.channel.v1.MsgAcknowledgement':
        return MsgAcknowledgement.unpackAny(proto, isClassic);
      case '/ibc.core.channel.v1.MsgTimeout':
        return MsgTimeout.unpackAny(proto, isClassic);
      case '/ibc.core.channel.v1.MsgTimeoutOnClose':
        return MsgTimeoutOnClose.unpackAny(proto, isClassic);

      // crisis
      case '/cosmos.crisis.v1beta1.MsgVerifyInvariant':
        return MsgVerifyInvariant.unpackAny(proto, isClassic);
      default:
        throw Error(`not supported msg ${proto.typeUrl}`);
    }
  }
}
