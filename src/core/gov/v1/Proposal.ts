import { Coins } from '../../Coins';
import { Int } from '../../numeric';
import { JSONSerializable } from '../../../util/json';
import { CommunityPoolSpendProposal } from '../../distribution/proposals';
import { ParameterChangeProposal } from '../../params/proposals';
import { ClientUpdateProposal } from '../../ibc/proposals';
import { TextProposal } from './../v1beta1/proposals';
import {
  SoftwareUpgradeProposal,
  CancelSoftwareUpgradeProposal,
} from '../../upgrade/proposals';
import {
  ClearAdminProposal,
  ExecuteContractProposal,
  InstantiateContractProposal,
  MigrateContractProposal,
  PinCodesProposal,
  StoreCodeProposal,
  SudoContractProposal,
  UnpinCodesProposal,
  UpdateAdminProposal,
  UpdateInstantiateConfigProposal,
} from '../../wasm/proposals';
import {
  Proposal as Proposal_pb,
  ProposalStatus,
  TallyResult,
  proposalStatusFromJSON,
  proposalStatusToJSON,
} from '@terra-money/terra.proto/cosmos/gov/v1/gov';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import Long from 'long';
import {
  MsgCreateAllianceProposal,
  MsgDeleteAllianceProposal,
  MsgUpdateAllianceProposal,
  MsgUpdateAlliance,
  MsgCreateAlliance,
  MsgDeleteAlliance,
} from '../../../core/alliance/proposals';
import {
  MsgParams,
  MsgFeeDenomParam,
  MsgRemoveFeeDenomParam,
} from '../../../core/feemarket';
import { AccAddress } from '../../../core/bech32';

/**
 * Stores information pertaining to a submitted proposal, such as its status and time of
 * the voting period
 */
export class Proposal extends JSONSerializable<
  Proposal.Amino,
  Proposal.Data,
  Proposal.Proto
> {
  /**
   *
   * @param id proposal's ID
   * @param messages content of the proposal
   * @param status proposal's status
   * @param final_tally_result tally result
   * @param submit_time time proposal was submitted and deposit period started
   * @param deposit_end_time time deposit period will end
   * @param total_deposit amount of coins deposited by all users
   * @param voting_start_time time voting period will start
   * @param voting_end_time time voting period will end
   */
  constructor(
    public id: number,
    public messages: Proposal.Message[],
    public status: ProposalStatus,
    public final_tally_result: Proposal.FinalTallyResult,
    public submit_time: Date,
    public deposit_end_time: Date,
    public total_deposit: Coins,
    public metadata: string,
    public title: string,
    public summary: string,
    public proposer: AccAddress,
    public voting_start_time?: Date,
    public voting_end_time?: Date
  ) {
    super();
  }

  public static fromAmino(data: Proposal.Amino, isClassic?: boolean): Proposal {
    const {
      id,
      messages,
      status,
      final_tally_result,
      submit_time,
      deposit_end_time,
      total_deposit,
      metadata,
      title,
      summary,
      proposer,
      voting_start_time,
      voting_end_time,
    } = data;

    const _messages = messages.map(m =>
      Proposal.Message.fromAmino(m, isClassic)
    );

    return new Proposal(
      Number.parseInt(id),
      _messages,
      status,
      {
        yes_count: new Int(final_tally_result.yes_count || 0),
        no_count: new Int(final_tally_result.no_count || 0),
        abstain_count: new Int(final_tally_result.abstain_count || 0),
        no_with_veto_count: new Int(final_tally_result.no_with_veto_count || 0),
      },
      new Date(submit_time),
      new Date(deposit_end_time),
      Coins.fromAmino(total_deposit),
      metadata,
      title,
      summary,
      proposer,
      voting_start_time ? new Date(voting_start_time) : undefined,
      voting_end_time ? new Date(voting_end_time) : undefined
    );
  }

  public toAmino(isClassic?: boolean): Proposal.Amino {
    const { status, final_tally_result } = this;

    const _messages = this.messages.map(msg => msg.toAmino(isClassic));

    return {
      id: this.id.toFixed(),
      messages: _messages,
      status: status,
      final_tally_result: {
        yes_count: final_tally_result.yes_count.toFixed(),
        no_count: final_tally_result.no_count.toFixed(),
        abstain_count: final_tally_result.abstain_count.toFixed(),
        no_with_veto_count: final_tally_result.no_with_veto_count.toFixed(),
      },
      submit_time: this.submit_time.toISOString(),
      deposit_end_time: this.deposit_end_time.toISOString(),
      total_deposit: this.total_deposit.toAmino(),
      metadata: this.metadata,
      title: this.title,
      summary: this.summary,
      proposer: this.proposer,
      voting_start_time: this.voting_start_time?.toISOString(),
      voting_end_time: this.voting_end_time?.toISOString(),
    };
  }

  public static fromData(data: Proposal.Data, isClassic?: boolean): Proposal {
    const {
      id,
      messages,
      status,
      final_tally_result,
      submit_time,
      deposit_end_time,
      total_deposit,
      metadata,
      title,
      summary,
      proposer,
      voting_start_time,
      voting_end_time,
    } = data;
    const _mesages = messages.map(message =>
      Proposal.Message.fromData(message, isClassic)
    );

    return new Proposal(
      Number.parseInt(id),
      _mesages,
      proposalStatusFromJSON(status),
      {
        yes_count: new Int(final_tally_result?.yes_count || 0),
        no_count: new Int(final_tally_result?.no_count || 0),
        abstain_count: new Int(final_tally_result?.abstain_count || 0),
        no_with_veto_count: new Int(
          final_tally_result?.no_with_veto_count || 0
        ),
      },
      new Date(submit_time),
      new Date(deposit_end_time),
      Coins.fromData(total_deposit),
      metadata,
      title,
      summary,
      proposer,
      voting_start_time ? new Date(voting_start_time) : undefined,
      voting_end_time ? new Date(voting_end_time) : undefined
    );
  }

  public toData(isClassic?: boolean): Proposal.Data {
    const { status, final_tally_result } = this;
    const _mesages = this.messages.map(message => message.toData(isClassic));

    return {
      id: this.id.toFixed(),
      messages: _mesages,
      status: proposalStatusToJSON(status),
      final_tally_result: {
        yes_count: final_tally_result.yes_count.toString(),
        abstain_count: final_tally_result.abstain_count.toString(),
        no_count: final_tally_result.no_count.toString(),
        no_with_veto_count: final_tally_result.no_with_veto_count.toString(),
      },
      submit_time: this.submit_time.toISOString(),
      deposit_end_time: this.deposit_end_time.toISOString(),
      total_deposit: this.total_deposit.toData(),
      metadata: this.metadata,
      title: this.title,
      summary: this.summary,
      proposer: this.proposer,
      voting_start_time: this.voting_start_time?.toISOString(),
      voting_end_time: this.voting_end_time?.toISOString(),
    };
  }

  public static fromProto(data: Proposal.Proto, isClassic?: boolean): Proposal {
    const id = data.id;
    const status = data.status;
    const final_tally_result = data.finalTallyResult;
    const submit_time = data.submitTime;
    const deposit_end_time = data.depositEndTime;
    const total_deposit = data.totalDeposit;
    const voting_start_time = data.votingStartTime;
    const voting_end_time = data.votingEndTime;

    const _messages = new Array<Proposal.Message>();
    for (const _msg of data.messages) {
      const _message = Proposal.Message.fromProto(_msg, isClassic);

      if (_message != undefined) {
        _messages.push(_message);
      } else {
        console.warn('[GOV V1] IMPLEMENT THE PROTO INTERFACE FOR', _msg);
      }
    }

    return new Proposal(
      id.toNumber(),
      _messages,
      status,
      {
        yes_count: new Int(final_tally_result?.yesCount || 0),
        abstain_count: new Int(final_tally_result?.abstainCount || 0),
        no_count: new Int(final_tally_result?.noCount || 0),
        no_with_veto_count: new Int(final_tally_result?.noWithVetoCount || 0),
      },
      submit_time as Date,
      deposit_end_time as Date,
      Coins.fromProto(total_deposit),
      data.metadata,
      data.title,
      data.summary,
      data.proposer,
      voting_start_time,
      voting_end_time
    );
  }

  public toProto(isClassic?: boolean): Proposal.Proto {
    const { status, final_tally_result } = this;

    let ftr: TallyResult | undefined;
    if (final_tally_result) {
      ftr = TallyResult.fromPartial({
        yesCount: final_tally_result.yes_count.toString(),
        abstainCount: final_tally_result.abstain_count.toString(),
        noCount: final_tally_result.no_count.toString(),
        noWithVetoCount: final_tally_result.no_with_veto_count.toString(),
      });
    }

    return Proposal_pb.fromPartial({
      id: Long.fromNumber(this.id),
      messages: this.messages.map(msg => msg.packAny(isClassic)),
      status,
      finalTallyResult: ftr,
      submitTime: this.submit_time,
      depositEndTime: this.deposit_end_time,
      totalDeposit: this.total_deposit.toProto(),
      metadata: this.metadata,
      title: this.title,
      summary: this.summary,
      proposer: this.proposer,
      votingEndTime: this.voting_end_time,
      votingStartTime: this.voting_start_time,
    });
  }
}

export namespace Proposal {
  export const Status = ProposalStatus;
  export type Status = ProposalStatus;

  export interface FinalTallyResult {
    yes_count: Int;
    abstain_count: Int;
    no_count: Int;
    no_with_veto_count: Int;
  }

  export type Message =
    | TextProposal
    | CommunityPoolSpendProposal
    | ParameterChangeProposal
    | SoftwareUpgradeProposal
    | CancelSoftwareUpgradeProposal
    | MsgCreateAllianceProposal
    | MsgUpdateAllianceProposal
    | MsgDeleteAllianceProposal
    | MsgCreateAlliance
    | MsgUpdateAlliance
    | MsgDeleteAlliance
    | ClientUpdateProposal
    | ClearAdminProposal
    | ExecuteContractProposal
    | InstantiateContractProposal
    | MigrateContractProposal
    | PinCodesProposal
    | StoreCodeProposal
    | SudoContractProposal
    | UnpinCodesProposal
    | UpdateAdminProposal
    | UpdateInstantiateConfigProposal
    | MsgParams
    | MsgFeeDenomParam
    | MsgRemoveFeeDenomParam;

  export namespace Message {
    export type Amino =
      | TextProposal.Amino
      | CommunityPoolSpendProposal.Amino
      | ParameterChangeProposal.Amino
      | SoftwareUpgradeProposal.Amino
      | CancelSoftwareUpgradeProposal.Amino
      | MsgCreateAllianceProposal.Amino
      | MsgUpdateAllianceProposal.Amino
      | MsgDeleteAllianceProposal.Amino
      | MsgCreateAlliance.Amino
      | MsgUpdateAlliance.Amino
      | MsgDeleteAlliance.Amino
      | ClientUpdateProposal.Amino
      | ClearAdminProposal.Amino
      | ExecuteContractProposal.Amino
      | InstantiateContractProposal.Amino
      | MigrateContractProposal.Amino
      | PinCodesProposal.Amino
      | StoreCodeProposal.Amino
      | SudoContractProposal.Amino
      | UnpinCodesProposal.Amino
      | UpdateAdminProposal.Amino
      | UpdateInstantiateConfigProposal.Amino
      | MsgParams.Amino
      | MsgFeeDenomParam.Amino
      | MsgRemoveFeeDenomParam.Amino
      | any;

    export type Data =
      | TextProposal.Data
      | CommunityPoolSpendProposal.Data
      | ParameterChangeProposal.Data
      | SoftwareUpgradeProposal.Data
      | CancelSoftwareUpgradeProposal.Data
      | MsgCreateAllianceProposal.Data
      | MsgUpdateAllianceProposal.Data
      | MsgDeleteAllianceProposal.Data
      | MsgCreateAlliance.Data
      | MsgUpdateAlliance.Data
      | MsgDeleteAlliance.Data
      | ClientUpdateProposal.Data
      | ClearAdminProposal.Data
      | ExecuteContractProposal.Data
      | InstantiateContractProposal.Data
      | MigrateContractProposal.Data
      | PinCodesProposal.Data
      | StoreCodeProposal.Data
      | SudoContractProposal.Data
      | UnpinCodesProposal.Data
      | UpdateAdminProposal.Data
      | UpdateInstantiateConfigProposal.Data
      | MsgParams.Data
      | MsgFeeDenomParam.Data
      | MsgRemoveFeeDenomParam.Data
      | any;

    export type Proto =
      | TextProposal.Proto
      | CommunityPoolSpendProposal.Proto
      | ParameterChangeProposal.Proto
      | SoftwareUpgradeProposal.Proto
      | CancelSoftwareUpgradeProposal.Proto
      | MsgCreateAllianceProposal.Proto
      | MsgUpdateAllianceProposal.Proto
      | MsgDeleteAllianceProposal.Proto
      | MsgCreateAlliance.Proto
      | MsgUpdateAlliance.Proto
      | MsgDeleteAlliance.Proto
      | ClientUpdateProposal.Proto
      | ClearAdminProposal.Proto
      | ExecuteContractProposal.Proto
      | InstantiateContractProposal.Proto
      | MigrateContractProposal.Proto
      | PinCodesProposal.Proto
      | StoreCodeProposal.Proto
      | SudoContractProposal.Proto
      | UnpinCodesProposal.Proto
      | UpdateAdminProposal.Proto
      | UpdateInstantiateConfigProposal.Proto
      | MsgParams.Proto
      | MsgFeeDenomParam.Proto
      | MsgRemoveFeeDenomParam.Proto
      | undefined;

    export function fromAmino(
      amino: Message.Amino,
      isClassic?: boolean
    ): Message {
      switch (amino.type) {
        case 'gov/TextProposal':
        case 'cosmos-sdk/TextProposal':
          return TextProposal.fromAmino(amino, isClassic);
        case 'distribution/CommunityPoolSpendProposal':
        case 'cosmos-sdk/CommunityPoolSpendProposal':
          return CommunityPoolSpendProposal.fromAmino(amino, isClassic);
        case 'params/ParameterChangeProposal':
        case 'cosmos-sdk/ParameterChangeProposal':
          return ParameterChangeProposal.fromAmino(amino, isClassic);
        case 'upgrade/SoftwareUpgradeProposal':
        case 'cosmos-sdk/SoftwareUpgradeProposal':
          return SoftwareUpgradeProposal.fromAmino(amino, isClassic);
        case 'upgrade/CancelSoftwareUpgradeProposal':
        case 'cosmos-sdk/CancelSoftwareUpgradeProposal':
          return CancelSoftwareUpgradeProposal.fromAmino(amino, isClassic);
        case 'ibc/ClientUpdateProposal':
          return ClientUpdateProposal.fromAmino(amino, isClassic);
        case 'wasm/ClearAdminProposal':
          return ClearAdminProposal.fromAmino(amino, isClassic);
        case 'wasm/ExecuteContractProposal':
          return ExecuteContractProposal.fromAmino(amino, isClassic);
        case 'wasm/InstantiateContractProposal':
          return InstantiateContractProposal.fromAmino(amino, isClassic);
        case 'wasm/MigrateContractProposal':
          return MigrateContractProposal.fromAmino(amino, isClassic);
        case 'wasm/PinCodesProposal':
          return PinCodesProposal.fromAmino(amino, isClassic);
        case 'wasm/StoreCodeProposal':
          return StoreCodeProposal.fromAmino(amino, isClassic);
        case 'wasm/SudoContractProposal':
          return SudoContractProposal.fromAmino(amino, isClassic);
        case 'wasm/UnpinCodesProposal':
          return UnpinCodesProposal.fromAmino(amino, isClassic);
        case 'wasm/UpdateAdminProposal':
          return UpdateAdminProposal.fromAmino(amino, isClassic);
        case 'wasm/UpdateInstantiateConfigProposal':
          return UpdateInstantiateConfigProposal.fromAmino(amino, isClassic);
        case 'alliance/MsgCreateAllianceProposal':
          return MsgCreateAllianceProposal.fromAmino(amino, isClassic);
        case 'alliance/MsgUpdateAllianceProposal':
          return MsgUpdateAllianceProposal.fromAmino(amino, isClassic);
        case 'alliance/MsgDeleteAllianceProposal':
          return MsgDeleteAllianceProposal.fromAmino(amino, isClassic);
        case 'alliance/MsgCreateAlliance':
          return MsgCreateAlliance.fromAmino(amino, isClassic);
        case 'alliance/MsgUpdateAlliance':
          return MsgUpdateAlliance.fromAmino(amino, isClassic);
        case 'alliance/MsgDeleteAlliance':
          return MsgDeleteAlliance.fromAmino(amino, isClassic);
        case 'feemarket/MsgParams':
          return MsgParams.fromAmino(amino);
        case 'feemarket/MsgFeeDenomParam':
          return MsgFeeDenomParam.fromAmino(amino);
        case 'feemarket/MsgRemoveFeeDenomParam':
          return MsgRemoveFeeDenomParam.fromAmino(amino);
        default:
          return amino;
      }
    }

    export function fromData(data: Message.Data, isClassic?: boolean): Message {
      switch (data['@type']) {
        case '/cosmos.gov.v1beta1.TextProposal':
          return TextProposal.fromData(data, isClassic);
        case '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal':
          return CommunityPoolSpendProposal.fromData(data, isClassic);
        case '/cosmos.params.v1beta1.ParameterChangeProposal':
          return ParameterChangeProposal.fromData(data, isClassic);
        case '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal':
          return SoftwareUpgradeProposal.fromData(data, isClassic);
        case '/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal':
          return CancelSoftwareUpgradeProposal.fromData(data, isClassic);
        case '/ibc.core.client.v1.ClientUpdateProposal':
          return ClientUpdateProposal.fromData(data, isClassic);
        case '/cosmwasm.wasm.v1.ClearAdminProposal':
          return ClearAdminProposal.fromData(data, isClassic);
        case '/cosmwasm.wasm.v1.ExecuteContractProposal':
          return ExecuteContractProposal.fromData(data, isClassic);
        case '/cosmwasm.wasm.v1.InstantiateContractProposal':
          return InstantiateContractProposal.fromData(data, isClassic);
        case '/cosmwasm.wasm.v1.MigrateContractProposal':
          return MigrateContractProposal.fromData(data, isClassic);
        case '/cosmwasm.wasm.v1.PinCodesProposal':
          return PinCodesProposal.fromData(data, isClassic);
        case '/cosmwasm.wasm.v1.StoreCodeProposal':
          return StoreCodeProposal.fromData(data, isClassic);
        case '/cosmwasm.wasm.v1.SudoContractProposal':
          return SudoContractProposal.fromData(data, isClassic);
        case '/cosmwasm.wasm.v1.UnpinCodesProposal':
          return UnpinCodesProposal.fromData(data, isClassic);
        case '/cosmwasm.wasm.v1.UpdateAdminProposal':
          return UpdateAdminProposal.fromData(data, isClassic);
        case '/cosmwasm.wasm.v1.UpdateInstantiateConfigProposal':
          return UpdateInstantiateConfigProposal.fromData(data, isClassic);
        case '/alliance.alliance.MsgCreateAllianceProposal':
          return MsgCreateAllianceProposal.fromData(data, isClassic);
        case '/alliance.alliance.MsgUpdateAllianceProposal':
          return MsgUpdateAllianceProposal.fromData(data, isClassic);
        case '/alliance.alliance.MsgDeleteAllianceProposal':
          return MsgDeleteAllianceProposal.fromData(data, isClassic);
        case '/alliance.alliance.MsgCreateAlliance':
          return MsgCreateAlliance.fromData(data, isClassic);
        case '/alliance.alliance.MsgUpdateAlliance':
          return MsgUpdateAlliance.fromData(data, isClassic);
        case '/alliance.alliance.MsgDeleteAlliance':
          return MsgDeleteAlliance.fromData(data, isClassic);
        case '/feemarket.feemarket.v1.MsgParams':
          return MsgParams.fromData(data);
        case '/feemarket.feemarket.v1.MsgFeeDenomParam':
          return MsgFeeDenomParam.fromData(data);
        case '/feemarket.feemarket.v1.MsgRemoveFeeDenomParam':
          return MsgRemoveFeeDenomParam.fromData(data);
        default:
          return data;
      }
    }

    export function fromProto(
      anyProto: Any,
      isClassic?: boolean
    ): Message | undefined {
      const typeUrl = anyProto.typeUrl;
      switch (typeUrl) {
        case '/cosmos.gov.v1beta1.TextProposal':
          return TextProposal.unpackAny(anyProto, isClassic);
        case '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal':
          return CommunityPoolSpendProposal.unpackAny(anyProto, isClassic);
        case '/cosmos.params.v1beta1.ParameterChangeProposal':
          return ParameterChangeProposal.unpackAny(anyProto, isClassic);
        case '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal':
          return SoftwareUpgradeProposal.unpackAny(anyProto, isClassic);
        case '/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal':
          return CancelSoftwareUpgradeProposal.unpackAny(anyProto, isClassic);
        case '/ibc.core.client.v1.ClientUpdateProposal':
          return ClientUpdateProposal.unpackAny(anyProto, isClassic);
        case '/cosmwasm.wasm.v1.ClearAdminProposal':
          return ClearAdminProposal.unpackAny(anyProto, isClassic);
        case '/cosmwasm.wasm.v1.ExecuteContractProposal':
          return ExecuteContractProposal.unpackAny(anyProto, isClassic);
        case '/cosmwasm.wasm.v1.InstantiateContractProposal':
          return InstantiateContractProposal.unpackAny(anyProto, isClassic);
        case '/cosmwasm.wasm.v1.MigrateContractProposal':
          return MigrateContractProposal.unpackAny(anyProto, isClassic);
        case '/cosmwasm.wasm.v1.PinCodesProposal':
          return PinCodesProposal.unpackAny(anyProto, isClassic);
        case '/cosmwasm.wasm.v1.StoreCodeProposal':
          return StoreCodeProposal.unpackAny(anyProto, isClassic);
        case '/cosmwasm.wasm.v1.SudoContractProposal':
          return SudoContractProposal.unpackAny(anyProto, isClassic);
        case '/cosmwasm.wasm.v1.UnpinCodesProposal':
          return UnpinCodesProposal.unpackAny(anyProto, isClassic);
        case '/cosmwasm.wasm.v1.UpdateAdminProposal':
          return UpdateAdminProposal.unpackAny(anyProto, isClassic);
        case '/cosmwasm.wasm.v1.UpdateInstantiateConfigProposal':
          return UpdateInstantiateConfigProposal.unpackAny(anyProto, isClassic);
        case '/alliance.alliance.MsgCreateAllianceProposal':
          return MsgCreateAllianceProposal.unpackAny(anyProto, isClassic);
        case '/alliance.alliance.MsgUpdateAllianceProposal':
          return MsgUpdateAllianceProposal.unpackAny(anyProto, isClassic);
        case '/alliance.alliance.MsgDeleteAllianceProposal':
          return MsgDeleteAllianceProposal.unpackAny(anyProto, isClassic);
        case '/alliance.alliance.MsgCreateAlliance':
          return MsgCreateAlliance.unpackAny(anyProto, isClassic);
        case '/alliance.alliance.MsgUpdateAlliance':
          return MsgUpdateAlliance.unpackAny(anyProto, isClassic);
        case '/alliance.alliance.MsgDeleteAlliance':
          return MsgDeleteAlliance.unpackAny(anyProto, isClassic);
        case '/feemarket.feemarket.v1.MsgParams':
          return MsgParams.unpackAny(anyProto);
        case '/feemarket.feemarket.v1.MsgFeeDenomParam':
          return MsgFeeDenomParam.unpackAny(anyProto);
        case '/feemarket.feemarket.v1.MsgRemoveFeeDenomParam':
          return MsgRemoveFeeDenomParam.unpackAny(anyProto);
        default:
          return undefined;
      }
    }
  }

  export interface Amino {
    id: string;
    messages: Message.Amino[];
    status: number;
    final_tally_result: {
      yes_count: string;
      abstain_count: string;
      no_count: string;
      no_with_veto_count: string;
    };
    submit_time: string;
    deposit_end_time: string;
    total_deposit: Coins.Amino;
    metadata: string;
    title: string;
    summary: string;
    proposer: string;
    voting_start_time?: string;
    voting_end_time?: string;
  }

  export interface Data {
    id: string;
    messages: Message.Data[];
    status: string;
    final_tally_result: {
      yes_count: string;
      abstain_count: string;
      no_count: string;
      no_with_veto_count: string;
    };
    submit_time: string;
    deposit_end_time: string;
    total_deposit: Coins.Data;
    metadata: string;
    title: string;
    summary: string;
    proposer: string;
    voting_start_time?: string;
    voting_end_time?: string;
  }

  export type Proto = Proposal_pb;
}
