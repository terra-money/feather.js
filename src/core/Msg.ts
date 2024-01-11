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
  MsgExecLegacyContent,
} from './gov/v1/msgs';
import {
  GovMsg as LegacyGovMsg,
  MsgDeposit as LegacyMsgDeposit,
  MsgSubmitProposal as LegacyMsgSubmitProposal,
  MsgVote as LegacyMsgVote,
  MsgVoteWeighted as LegacyMsgVoteWeighted,
} from './gov/v1beta1/msgs';
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
  MsgClaimDelegationRewards as MsgClaimAllianceDelegationRewards,
  MsgDelegate as MsgAllianceDelegate,
  MsgRedelegate as MsgAllianceRedelegate,
  MsgUndelegate as MsgAllianceUndelegate,
  MsgCreateAlliance,
  MsgUpdateAlliance,
  MsgDeleteAlliance,
} from './alliance';
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
import {
  MsgBurn,
  MsgChangeAdmin,
  MsgCreateDenom,
  MsgMint,
  MsgSetBeforeSendHook,
  TokenFactoryMsg,
} from './tokenfactory';
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
import { MsgAuctionBid } from './pob/MsgAuctionBid';
import {
  FeeshareMsg,
  MsgCancelFeeShare,
  MsgRegisterFeeShare,
  MsgUpdateFeeShare,
} from './feeshare';
import {
  ICAMsg,
  MsgRegisterInterchainAccount,
  MsgSendTx,
} from './ica/controller/v1/msgs';
import { MsgForceTransfer } from './tokenfactory/MsgForceTransfer';
import { MsgSetDenomMetadata } from './tokenfactory/MsgSetDenomMetadata';
import { FeemarketMsg, MsgParams } from './feemarket/msgs';
import { MsgState } from './feemarket/msgs/MsgState';

export type Msg =
  | BankMsg
  | DistributionMsg
  | FeeGrantMsg
  | GovMsg
  | LegacyGovMsg
  | MsgAuthMsg
  | SlashingMsg
  | StakingMsg
  | VestingMsg
  | WasmMsg
  | IbcTransferMsg
  | IbcClientMsg
  | IbcConnectionMsg
  | IbcChannelMsg
  | ICAMsg
  | AllianceMsg
  | CustomMsg
  | CrisisMsg
  | MsgAuctionBid
  | FeeshareMsg
  | FeemarketMsg
  | TokenFactoryMsg;

export namespace Msg {
  export type Amino =
    | BankMsg.Amino
    | DistributionMsg.Amino
    | FeeGrantMsg.Amino
    | GovMsg.Amino
    | LegacyGovMsg.Amino
    | MsgAuthMsg.Amino
    | SlashingMsg.Amino
    | StakingMsg.Amino
    | VestingMsg.Amino
    | WasmMsg.Amino
    | IbcTransferMsg.Amino
    | AllianceMsg.Amino
    | CustomMsg.Amino
    | CrisisMsg.Amino
    | MsgAuctionBid.Amino
    | FeeshareMsg.Amino
    | FeemarketMsg.Amino
    | TokenFactoryMsg.Amino;

  export type Data =
    | BankMsg.Data
    | DistributionMsg.Data
    | FeeGrantMsg.Data
    | GovMsg.Data
    | LegacyGovMsg.Data
    | MsgAuthMsg.Data
    | SlashingMsg.Data
    | StakingMsg.Data
    | VestingMsg.Data
    | WasmMsg.Data
    | IbcTransferMsg.Data
    | IbcClientMsg.Data
    | IbcConnectionMsg.Data
    | IbcChannelMsg.Data
    | ICAMsg.Data
    | AllianceMsg.Data
    | CustomMsg.Data
    | CrisisMsg.Data
    | MsgAuctionBid.Data
    | FeeshareMsg.Data
    | FeemarketMsg.Data
    | TokenFactoryMsg.Data;

  export type Proto =
    | BankMsg.Proto
    | DistributionMsg.Proto
    | FeeGrantMsg.Proto
    | GovMsg.Proto
    | LegacyGovMsg.Proto
    | MsgAuthMsg.Proto
    | SlashingMsg.Proto
    | StakingMsg.Proto
    | VestingMsg.Proto
    | WasmMsg.Proto
    | IbcTransferMsg.Proto
    | ICAMsg.Proto
    | IbcClientMsg.Proto
    | IbcConnectionMsg.Proto
    | IbcChannelMsg.Proto
    | AllianceMsg.Proto
    | CrisisMsg.Proto
    | MsgAuctionBid.Proto
    | FeeshareMsg.Proto
    | FeemarketMsg.Proto
    | TokenFactoryMsg.Proto;

  export function fromAmino(data: Msg.Amino, isClassic?: boolean): Msg {
    switch (data.type) {
      // alliance
      case 'alliance/MsgCreateAlliance':
        return MsgCreateAlliance.fromAmino(
          data as MsgCreateAlliance.Amino,
          isClassic
        );
      case 'alliance/MsgUpdateAlliance':
        return MsgUpdateAlliance.fromAmino(
          data as MsgUpdateAlliance.Amino,
          isClassic
        );
      case 'alliance/MsgDeleteAlliance':
        return MsgDeleteAlliance.fromAmino(
          data as MsgDeleteAlliance.Amino,
          isClassic
        );
      case 'alliance/MsgDelegate':
        return MsgAllianceDelegate.fromAmino(
          data as MsgAllianceDelegate.Amino,
          isClassic
        );
      case 'alliance/MsgRedelegate':
        return MsgAllianceRedelegate.fromAmino(
          data as MsgAllianceRedelegate.Amino,
          isClassic
        );
      case 'alliance/MsgUndelegate':
        return MsgAllianceUndelegate.fromAmino(
          data as MsgAllianceUndelegate.Amino,
          isClassic
        );
      case 'alliance/MsgClaimDelegationRewards':
        return MsgClaimAllianceDelegationRewards.fromAmino(
          data as MsgClaimAllianceDelegationRewards.Amino,
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
        return LegacyMsgDeposit.fromAmino(
          data as LegacyMsgDeposit.Amino,
          isClassic
        );
      case 'gov/MsgSubmitProposal':
      case 'cosmos-sdk/MsgSubmitProposal':
        return LegacyMsgSubmitProposal.fromAmino(
          data as LegacyMsgSubmitProposal.Amino,
          isClassic
        );
      case 'gov/MsgVote':
      case 'cosmos-sdk/MsgVote':
        return LegacyMsgVote.fromAmino(data as LegacyMsgVote.Amino, isClassic);
      case 'gov/MsgVoteWeighted':
      case 'cosmos-sdk/MsgVoteWeighted':
        return LegacyMsgVoteWeighted.fromAmino(
          data as LegacyMsgVoteWeighted.Amino,
          isClassic
        );

      // gov
      case 'cosmos-sdk/v1/MsgDeposit':
        return MsgDeposit.fromAmino(data as MsgDeposit.Amino, isClassic);
      case 'cosmos-sdk/v1/MsgSubmitProposal':
        return MsgSubmitProposal.fromAmino(
          data as MsgSubmitProposal.Amino,
          isClassic
        );
      case 'cosmos-sdk/v1/MsgVote':
        return MsgVote.fromAmino(data as MsgVote.Amino, isClassic);
      case 'cosmos-sdk/v1/MsgVoteWeighted':
        return MsgVoteWeighted.fromAmino(
          data as MsgVoteWeighted.Amino,
          isClassic
        );
      case 'cosmos-sdk/v1/MsgExecLegacyContent':
        return MsgExecLegacyContent.fromAmino(
          data as MsgExecLegacyContent.Amino,
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

      //token-factory
      case 'osmosis/tokenfactory/create-denom':
        return MsgCreateDenom.fromAmino(data as MsgCreateDenom.Amino);
      case 'osmosis/tokenfactory/burn':
        return MsgBurn.fromAmino(data as MsgBurn.Amino);
      case 'osmosis/tokenfactory/change-admin':
        return MsgChangeAdmin.fromAmino(data as MsgChangeAdmin.Amino);
      case 'osmosis/tokenfactory/mint':
        return MsgMint.fromAmino(data as MsgMint.Amino);
      case 'osmosis/tokenfactory/set-beforesend-hook':
        return MsgSetBeforeSendHook.fromAmino(
          data as MsgSetBeforeSendHook.Amino
        );
      case 'osmosis/tokenfactory/force-transfer':
        return MsgForceTransfer.fromAmino(data as MsgForceTransfer.Amino);
      case 'osmosis/tokenfactory/set-metadata':
        return MsgSetDenomMetadata.fromAmino(data as MsgSetDenomMetadata.Amino);

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

      // Pob module
      case 'pob/MsgAuctionBid':
        return MsgAuctionBid.fromAmino(data as MsgAuctionBid.Amino, isClassic);

      // Feeshare module
      case 'juno/MsgRegisterFeeShare':
        return MsgRegisterFeeShare.fromAmino(
          data as MsgRegisterFeeShare.Amino,
          isClassic
        );
      case 'juno/MsgUpdateFeeShare':
        return MsgUpdateFeeShare.fromAmino(
          data as MsgUpdateFeeShare.Amino,
          isClassic
        );
      case 'juno/MsgCancelFeeShare':
        return MsgCancelFeeShare.fromAmino(
          data as MsgCancelFeeShare.Amino,
          isClassic
        );

      // Feemarket module
      case 'feemarket/MsgState':
        return MsgState.fromAmino(data as MsgState.Amino);
      case 'feemarket/MsgParams':
        return MsgParams.fromAmino(data as MsgParams.Amino);

      // custom
      default:
        return MsgAminoCustom.fromAmino(data as any, isClassic);
    }
  }

  export function fromData(data: Msg.Data, isClassic?: boolean): Msg {
    switch (data['@type']) {
      // alliance
      case '/alliance.alliance.MsgDelegate':
        return MsgAllianceDelegate.fromData(data, isClassic);
      case '/alliance.alliance.MsgRedelegate':
        return MsgAllianceRedelegate.fromData(data, isClassic);
      case '/alliance.alliance.MsgUndelegate':
        return MsgAllianceUndelegate.fromData(data, isClassic);
      case '/alliance.alliance.MsgClaimDelegationRewards':
        return MsgClaimAllianceDelegationRewards.fromData(data, isClassic);

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
        return LegacyMsgDeposit.fromData(data, isClassic);
      case '/cosmos.gov.v1beta1.MsgSubmitProposal':
        return LegacyMsgSubmitProposal.fromData(data, isClassic);
      case '/cosmos.gov.v1beta1.MsgVote':
        return LegacyMsgVote.fromData(data, isClassic);
      case '/cosmos.gov.v1beta1.MsgVoteWeighted':
        return LegacyMsgVoteWeighted.fromData(data, isClassic);

      // gov v1
      case '/cosmos.gov.v1.MsgDeposit':
        return MsgDeposit.fromData(data, isClassic);
      case '/cosmos.gov.v1.MsgSubmitProposal':
        return MsgSubmitProposal.fromData(data, isClassic);
      case '/cosmos.gov.v1.MsgVote':
        return MsgVote.fromData(data, isClassic);
      case '/cosmos.gov.v1.MsgVoteWeighted':
        return MsgVoteWeighted.fromData(data, isClassic);
      case '/cosmos.gov.v1.MsgExecLegacyContent':
        return MsgExecLegacyContent.fromData(data, isClassic);

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

      // token factory
      case '/osmosis.tokenfactory.v1beta1.MsgCreateDenom':
        return MsgCreateDenom.fromData(data);
      case '/osmosis.tokenfactory.v1beta1.MsgBurn':
        return MsgBurn.fromData(data);
      case '/osmosis.tokenfactory.v1beta1.MsgChangeAdmin':
        return MsgChangeAdmin.fromData(data);
      case '/osmosis.tokenfactory.v1beta1.MsgMint':
        return MsgMint.fromData(data);
      case '/osmosis.tokenfactory.v1beta1.MsgSetBeforeSendHook':
        return MsgSetBeforeSendHook.fromData(data);
      case '/osmosis.tokenfactory.v1beta1.MsgForceTransfer':
        return MsgForceTransfer.fromData(data);
      case '/osmosis.tokenfactory.v1beta1.MsgSetDenomMetadata':
        return MsgSetDenomMetadata.fromData(data);

      // ibc-transfer
      case '/ibc.applications.transfer.v1.MsgTransfer':
        return MsgTransfer.fromData(data, isClassic);

      // ibc ica
      case '/ibc.applications.interchain_accounts.controller.v1.MsgRegisterInterchainAccount':
        return MsgRegisterInterchainAccount.fromData(data, isClassic);
      case '/ibc.applications.interchain_accounts.controller.v1.MsgSendTx':
        return MsgSendTx.fromData(data, isClassic);

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

      // pob module
      case '/pob.builder.v1.MsgAuctionBid':
        return MsgAuctionBid.fromData(data, isClassic);

      // Feeshare
      case '/juno.feeshare.v1.MsgRegisterFeeShare':
        return MsgRegisterFeeShare.fromData(data, isClassic);
      case '/juno.feeshare.v1.MsgUpdateFeeShare':
        return MsgUpdateFeeShare.fromData(data, isClassic);
      case '/juno.feeshare.v1.MsgCancelFeeShare':
        return MsgCancelFeeShare.fromData(data, isClassic);

      // Feemarket
      case '/feemarket.feemarket.v1.MsgState':
        return MsgState.fromData(data);
      case '/feemarket.feemarket.v1.MsgParams':
        return MsgParams.fromData(data);

      // custom
      default:
        return MsgAminoCustom.fromData(data as any, isClassic);
    }
  }

  export function fromProto(proto: Any, isClassic?: boolean): Msg {
    switch (proto.typeUrl) {
      // alliance
      case '/alliance.alliance.MsgCreateAlliance':
        return MsgCreateAlliance.unpackAny(proto, isClassic);
      case '/alliance.alliance.MsgUpdateAlliance':
        return MsgUpdateAlliance.unpackAny(proto, isClassic);
      case '/alliance.alliance.MsgDeleteAlliance':
        return MsgDeleteAlliance.unpackAny(proto, isClassic);
      case '/alliance.alliance.MsgDelegate':
        return MsgAllianceDelegate.unpackAny(proto, isClassic);
      case '/alliance.alliance.MsgRedelegate':
        return MsgAllianceRedelegate.unpackAny(proto, isClassic);
      case '/alliance.alliance.MsgUndelegate':
        return MsgAllianceUndelegate.unpackAny(proto, isClassic);
      case '/alliance.alliance.MsgClaimDelegationRewards':
        return MsgClaimAllianceDelegationRewards.unpackAny(proto, isClassic);

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
        return LegacyMsgDeposit.unpackAny(proto, isClassic);
      case '/cosmos.gov.v1beta1.MsgSubmitProposal':
        return LegacyMsgSubmitProposal.unpackAny(proto, isClassic);
      case '/cosmos.gov.v1beta1.MsgVote':
        return LegacyMsgVote.unpackAny(proto, isClassic);

      // gov
      case '/cosmos.gov.v1.MsgDeposit':
        return MsgDeposit.unpackAny(proto, isClassic);
      case '/cosmos.gov.v1.MsgSubmitProposal':
        return MsgSubmitProposal.unpackAny(proto, isClassic);
      case '/cosmos.gov.v1.MsgVote':
        return MsgVote.unpackAny(proto, isClassic);
      case '/cosmos.gov.v1.MsgVoteWeighted':
        return MsgVoteWeighted.unpackAny(proto, isClassic);
      case '/cosmos.gov.v1.MsgExecLegacyContent':
        return MsgExecLegacyContent.unpackAny(proto, isClassic);

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

      // token factory
      case '/osmosis.tokenfactory.v1beta1.MsgCreateDenom':
        return MsgCreateDenom.unpackAny(proto, isClassic);
      case '/osmosis.tokenfactory.v1beta1.MsgBurn':
        return MsgBurn.unpackAny(proto, isClassic);
      case '/osmosis.tokenfactory.v1beta1.MsgChangeAdmin':
        return MsgChangeAdmin.unpackAny(proto, isClassic);
      case '/osmosis.tokenfactory.v1beta1.MsgMint':
        return MsgMint.unpackAny(proto, isClassic);
      case '/osmosis.tokenfactory.v1beta1.MsgSetBeforeSendHook':
        return MsgSetBeforeSendHook.unpackAny(proto);
      case '/osmosis.tokenfactory.v1beta1.MsgForceTransfer':
        return MsgForceTransfer.unpackAny(proto);
      case '/osmosis.tokenfactory.v1beta1.MsgSetDenomMetadata':
        return MsgSetDenomMetadata.unpackAny(proto);

      // ibc-transfer
      case '/ibc.applications.transfer.v1.MsgTransfer':
        return MsgTransfer.unpackAny(proto, isClassic);

      // ibc ica
      case '/ibc.applications.interchain_accounts.controller.v1.MsgRegisterInterchainAccount':
        return MsgRegisterInterchainAccount.unpackAny(proto, isClassic);
      case '/ibc.applications.interchain_accounts.controller.v1.MsgSendTx':
        return MsgSendTx.unpackAny(proto, isClassic);

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

      case '/pob.builder.v1.MsgAuctionBid':
        return MsgAuctionBid.unpackAny(proto, isClassic);

      // Feeshare
      case '/juno.feeshare.v1.MsgRegisterFeeShare':
        return MsgRegisterFeeShare.unpackAny(proto, isClassic);
      case '/juno.feeshare.v1.MsgUpdateFeeShare':
        return MsgUpdateFeeShare.unpackAny(proto, isClassic);
      case '/juno.feeshare.v1.MsgCancelFeeShare':
        return MsgCancelFeeShare.unpackAny(proto, isClassic);

      // Feemarket
      case '/feemarket.feemarket.v1.MsgState':
        return MsgState.unpackAny(proto);
      case '/feemarket.feemarket.v1.MsgParams':
        return MsgParams.unpackAny(proto);

      default:
        throw Error(`not supported msg ${proto.typeUrl}`);
    }
  }
}
