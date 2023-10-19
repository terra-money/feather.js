import { BaseAPI } from './BaseAPI';
import {
  Proposal,
  AccAddress,
  Coins,
  Dec,
  Int,
  Deposit,
  Vote,
  WeightedVoteOption,
  Tx,
} from '../../../core';

import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
import { TxSearchResult } from './TxAPI';
import { ProposalStatus } from '@terra-money/legacy.proto/cosmos/gov/v1beta1/gov';
import { LCDClient } from '../LCDClient';

export interface GovParams {
  /**
   * Current deposit parameters
   */
  deposit_params: DepositParams;

  /**
   * current voting parameters
   */
  voting_params: VotingParams;

  /**
   * current tally paramaters
   */
  tally_params: TallyParams;
}

export namespace GovParams {
  export interface Data {
    deposit_params: DepositParams.Data;
    voting_params: VotingParams.Data;
    tally_params: TallyParams.Data;
  }
}

export interface DepositParams {
  /** Minimum deposit to enter voting. */
  min_deposit: Coins;

  /** Amount of time (in seconds) a proposal can take to acquire the necessary deposits to enter voting stage, after being submitted. */
  max_deposit_period: number;
}

export namespace DepositParams {
  export interface Data {
    min_deposit: Coins.Data;
    max_deposit_period: string;
  }
}

export interface VotingParams {
  /** Amount of time (in seconds) a proposal can take to get votes once voting has begun. */
  voting_period: number;
}

export namespace VotingParams {
  export interface Data {
    voting_period: string;
  }
}

export interface TallyParams {
  /** Ratio of total staked tokens that need to have participated in the vote. */
  quorum: Dec;

  /** Ratio of participating tokens that have voted in favor of the proposal. */
  threshold: Dec;

  /** Ratio of participating votes with `NoWithVeto` (after excluding `Abstain` votes) to veto the proposal. */
  veto_threshold: Dec;
}

export namespace TallyParams {
  export interface Data {
    quorum: string;
    threshold: string;
    veto_threshold: string;
  }
}

export interface Tally {
  yes: Int;
  no: Int;
  abstain: Int;
  no_with_veto: Int;
}

export namespace Tally {
  export interface Data {
    yes: string;
    no: string;
    abstain: string;
    no_with_veto: string;
  }
}

export class LegacyGovAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequesters, lcd.config);
  }

  /**
   * Gets all proposals.
   * @param chainID chain id
   */
  public async proposals(
    chainID: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[Proposal[], Pagination]> {
    return this.getReqFromChainID(chainID)
      .get<{
        proposals: Proposal.Data[];
        pagination: Pagination;
      }>(`/cosmos/gov/v1beta1/proposals`, params)
      .then(d => [
        d.proposals.map(prop => Proposal.fromData(prop)),
        d.pagination,
      ]);
  }

  /**
   * Get a specific proposal by its ID
   * @param proposalId proposal's ID
   * @param chainID chain id
   */
  public async proposal(
    proposalId: number,
    chainID: string,
    params: APIParams = {}
  ): Promise<Proposal> {
    return this.getReqFromChainID(chainID)
      .get<{ proposal: Proposal.Data }>(
        `/cosmos/gov/v1beta1/proposals/${proposalId}`,
        params
      )
      .then(d => Proposal.fromData(d.proposal));
  }

  /**
   * Get the proposal's proposer
   * @param proposalId proposal's ID
   * @param chainID chain id
   */
  public async proposer(
    proposalId: number,
    chainID: string
  ): Promise<AccAddress> {
    proposalId;
    const creationTx = await this.searchProposalCreationTx(proposalId, chainID);
    const msg = creationTx.body.messages.find(
      msg => msg['@type'] === '/cosmos.gov.v1beta1.MsgSubmitProposal'
    );

    if (msg && msg['@type'] === '/cosmos.gov.v1beta1.MsgSubmitProposal') {
      return msg.proposer;
    }

    throw Error('failed to fetch submit_proposer tx');
  }

  /**
   * Get the proposal's initial deposit
   * @param proposalId proposal's ID
   * @param chainID chain id
   */
  public async initialDeposit(
    proposalId: number,
    chainID: string
  ): Promise<Coins> {
    proposalId;
    const creationTx = await this.searchProposalCreationTx(proposalId, chainID);
    const msg = creationTx.body.messages.find(
      msg => msg['@type'] === '/cosmos.gov.v1beta1.MsgSubmitProposal'
    );

    if (msg && msg['@type'] === '/cosmos.gov.v1beta1.MsgSubmitProposal') {
      return Coins.fromData(msg.initial_deposit);
    }

    throw Error('failed to fetch submit_proposer tx');
  }

  /**
   * Get the deposits for a proposal
   * @param proposalId proposal's ID
   * @param chainID chain id
   */
  public async deposits(
    proposalId: number,
    chainID: string,
    _params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[Deposit[], Pagination]> {
    proposalId;
    _params;
    const proposal = await this.proposal(proposalId, chainID);
    if (
      proposal.status === ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD ||
      proposal.status === ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD
    ) {
      return this.getReqFromChainID(chainID)
        .get<{ deposits: Deposit.Data[]; pagination: Pagination }>(
          `/cosmos/gov/v1beta1/proposals/${proposalId}/deposits`,
          _params
        )
        .then(d => [
          d.deposits.map(deposit => Deposit.fromData(deposit)),
          d.pagination,
        ]);
    }

    // build search params
    const params = new URLSearchParams();
    params.append('events', `message.action='/cosmos.gov.v1beta1.MsgDeposit'`);
    params.append('events', `proposal_deposit.proposal_id=${proposalId}`);

    Object.entries(_params).forEach(v => {
      params.append(v[0], v[1] as string);
    });

    return this.getReqFromChainID(chainID)
      .get<TxSearchResult.Data>(`/cosmos/tx/v1beta1/txs`, params)
      .then(d => {
        const deposits: Deposit[] = [];
        d.txs.map(tx =>
          tx.body.messages.forEach(msg => {
            if (
              msg['@type'] === '/cosmos.gov.v1beta1.MsgDeposit' &&
              Number.parseInt(msg.proposal_id) == proposalId
            ) {
              deposits.push(
                new Deposit(
                  proposalId,
                  msg.depositor,
                  Coins.fromData(msg.amount)
                )
              );
            }
          }, deposits)
        );
        return [deposits, d.pagination];
      });
  }

  public async searchProposalCreationTx(
    proposalId: number,
    chainID: string
  ): Promise<Tx.Data> {
    // build search params
    const params = new URLSearchParams();
    params.append(
      'events',
      `message.action='/cosmos.gov.v1beta1.MsgSubmitProposal'`
    );
    params.append('events', `submit_proposal.proposal_id=${proposalId}`);

    return this.getReqFromChainID(chainID)
      .get<TxSearchResult.Data>(`/cosmos/tx/v1beta1/txs`, params)
      .then(d => {
        if (d.tx_responses.length === 0) {
          throw Error('failed to fetch submit_proposer tx');
        }
        return d.txs[0];
      });
  }

  /**
   * Get the current votes for a proposal
   * @param proposalId proposal's ID
   * @param chainID chain id
   */
  public async votes(
    proposalId: number,
    chainID: string,
    _params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[Vote[], Pagination]> {
    proposalId;
    _params;
    const proposal = await this.proposal(proposalId, chainID);
    if (proposal.status === ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD) {
      return this.getReqFromChainID(chainID)
        .get<{ votes: Vote.Data[]; pagination: Pagination }>(
          `/cosmos/gov/v1beta1/proposals/${proposalId}/votes`,
          _params
        )
        .then(d => [d.votes.map(v => Vote.fromData(v)), d.pagination]);
    }

    // build search params
    const params = new URLSearchParams();
    params.append('events', `message.action='/cosmos.gov.v1beta1.MsgVote'`);
    params.append('events', `proposal_vote.proposal_id=${proposalId}`);

    Object.entries(_params).forEach(v => {
      params.append(v[0], v[1] as string);
    });

    return this.getReqFromChainID(chainID)
      .get<TxSearchResult.Data>(`/cosmos/tx/v1beta1/txs`, params)
      .then(d => {
        const votes: Vote[] = [];
        d.txs.map(tx =>
          tx.body.messages.forEach(msg => {
            if (
              msg['@type'] === '/cosmos.gov.v1beta1.MsgVote' &&
              Number.parseInt(msg.proposal_id) == proposalId
            ) {
              votes.push(
                new Vote(proposalId, msg.voter, [
                  new WeightedVoteOption(msg.option, '1'),
                ])
              );
            } else if (
              msg['@type'] === '/cosmos.gov.v1beta1.MsgVoteWeighted' &&
              Number.parseInt(msg.proposal_id) == proposalId
            ) {
              votes.push(
                new Vote(
                  proposalId,
                  msg.voter,
                  msg.options.map(o => WeightedVoteOption.fromData(o))
                )
              );
            }
          }, votes)
        );

        return [votes, d.pagination];
      });
    throw Error('temp error: remove me');
  }

  /**
   * Gets the current tally for a proposal.
   * @param proposalId proposal's ID
   * @param chainID chain id
   */
  public async tally(
    proposalId: number,
    chainID: string,
    params: APIParams = {}
  ): Promise<Tally> {
    return this.getReqFromChainID(chainID)
      .get<{ tally: Tally.Data }>(
        `/cosmos/gov/v1beta1/proposals/${proposalId}/tally`,
        params
      )
      .then(({ tally: d }) => ({
        yes: new Int(d.yes),
        no: new Int(d.no),
        no_with_veto: new Int(d.no_with_veto),
        abstain: new Int(d.abstain),
      }));
  }

  /** Gets the Gov module's deposit parameters */
  public async depositParameters(
    chainID: string,
    params: APIParams = {}
  ): Promise<DepositParams> {
    return this.getReqFromChainID(chainID)
      .get<{ deposit_params: DepositParams.Data }>(
        `/cosmos/gov/v1beta1/params/deposit`,
        params
      )
      .then(({ deposit_params: d }) => ({
        max_deposit_period: Number.parseInt(d.max_deposit_period),
        min_deposit: Coins.fromData(d.min_deposit),
      }));
  }

  /** Gets the Gov module's voting parameters */
  public async votingParameters(
    chainID: string,
    params: APIParams = {}
  ): Promise<VotingParams> {
    return this.getReqFromChainID(chainID)
      .get<{ voting_params: VotingParams.Data }>(
        `/cosmos/gov/v1beta1/params/voting`,
        params
      )
      .then(({ voting_params: d }) => ({
        voting_period: Number.parseInt(d.voting_period),
      }));
  }

  /** Gets teh Gov module's tally parameters */
  public async tallyParameters(
    chainID: string,
    params: APIParams = {}
  ): Promise<TallyParams> {
    return this.getReqFromChainID(chainID)
      .get<{ tally_params: TallyParams.Data }>(
        `/cosmos/gov/v1beta1/params/tallying`,
        params
      )
      .then(({ tally_params: d }) => ({
        quorum: new Dec(d.quorum),
        veto_threshold: new Dec(d.veto_threshold),
        threshold: new Dec(d.threshold),
      }));
  }

  /** Gets the Gov module's current parameters  */
  public async parameters(
    chainID: string,
    params: APIParams = {}
  ): Promise<GovParams> {
    const [deposit_params, voting_params, tally_params] = await Promise.all([
      this.depositParameters(chainID, params),
      this.votingParameters(chainID, params),
      this.tallyParameters(chainID, params),
    ]);
    return {
      deposit_params,
      voting_params,
      tally_params,
    };
  }
}
