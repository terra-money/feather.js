import { APIRequester } from './APIRequester';
import {
  AuthAPI,
  BankAPI,
  DistributionAPI,
  FeeGrantAPI,
  LegacyGovAPI,
  MintAPI,
  AuthzAPI,
  SlashingAPI,
  StakingAPI,
  TendermintAPI,
  TxAPI,
  WasmAPI,
  IbcTransferAPI,
  IbcAPI,
  TokenFactory,
  FeemarketAPI,
  SmartaccountAPI,
} from './api';
import { LCDUtils } from './LCDUtils';
import { Wallet } from './Wallet';
import { Numeric } from '../../core/numeric';
import { Coins } from '../../core/Coins';
import { Key } from '../../key';
import { AllianceAPI } from './api/AllianceAPI';
import { PobAPI } from './api/PobAPI';
import { FeeshareAPI } from './api/FeeshareAPI';
import { GovV1API } from './api/GovV1API';
import { ICAv1API } from './api/ICAv1API';
import { ICQv1API } from './api/ICQv1API';

export type AxiosConfig = {
  /**
   * The API key to be included in requests sent to the LCD.
   */
  apiToken?: string;
};

export interface LCDClientConfig {
  /**
   * The Axios configuration to use when making requests to the LCD.
   */
  axiosConfig?: AxiosConfig;

  /**
   * The base URL to which LCD requests will be made.
   */
  lcd: string;

  /**
   * Chain ID of the blockchain to connect to.
   */
  chainID: string;

  /**
   * Coins representing the default gas prices to use for fee estimation.
   */
  gasPrices: Coins.Input;

  /**
   * Number presenting the default gas adjustment value to use for fee estimation.
   */
  gasAdjustment: Numeric.Input;

  /**
   * Bech32 prefix for wallet and contract addresses.
   */
  prefix: string;

  isClassic?: boolean;
}

const DEFAULT_NETWORK_CONFIG: Record<
  'mainnet' | 'testnet',
  Record<string, LCDClientConfig>
> = {
  mainnet: {
    'phoenix-1': {
      chainID: 'phoenix-1',
      lcd: 'https://phoenix-lcd.terra.dev',
      gasAdjustment: 1.75,
      gasPrices: { uluna: 0.015 },
      prefix: 'terra',
    },
  },
  testnet: {
    'pisco-1': {
      chainID: 'pisco-1',
      lcd: 'https://pisco-lcd.terra.dev',
      gasAdjustment: 1.75,
      gasPrices: { uluna: 0.015 },
      prefix: 'terra',
    },
  },
};

/**
 * An object repesenting a connection to a terrad node running the Lite Client Daemon (LCD)
 * server, a REST server providing access to a node.
 *
 * ### Example
 *
 * ```ts
 * import { LCDClient } from '@terra-money/feather.js';
 *
 * const lcd = LCDClient.fromDefaultConfig('mainnet');
 *
 * const balance = await lcd.bank.balance('terra1...'):
 * console.log(balance);
 * ```
 */

export class LCDClient {
  public config: Record<string, LCDClientConfig>;
  public apiRequesters: Record<string, APIRequester>;

  // API access
  public alliance: AllianceAPI;
  public auth: AuthAPI;
  public bank: BankAPI;
  public distribution: DistributionAPI;
  public feeGrant: FeeGrantAPI;
  public gov: GovV1API;
  public legacyGov: LegacyGovAPI;
  public mint: MintAPI;
  public authz: AuthzAPI;
  public slashing: SlashingAPI;
  public staking: StakingAPI;
  public tendermint: TendermintAPI;
  public tokenfactory: TokenFactory;
  public wasm: WasmAPI;
  public tx: TxAPI;
  public ibc: IbcAPI;
  public icaV1: ICAv1API;
  public icqV1: ICQv1API;
  public ibcTransfer: IbcTransferAPI;
  public pob: PobAPI;
  public feeshare: FeeshareAPI;
  public feemarket: FeemarketAPI;
  public utils: LCDUtils;
  public smartaccount: SmartaccountAPI;

  /**
   * Creates a new LCD client with the specified configuration.
   *
   * @param chains network configuration
   *
   */
  constructor(chains: Record<string, LCDClientConfig>) {
    // check for duplicate prefixes
    const prefixes = Object.values(chains).map(c => c.prefix);
    if (new Set(prefixes).size !== prefixes.length) {
      throw new Error('Every chain must have an unique bech32 prefix');
    }

    this.config = chains;

    this.apiRequesters = Object.keys(chains).reduce(
      (result: Record<string, APIRequester>, chainID) => {
        result[chainID] = new APIRequester(
          chains[chainID].lcd,
          chains[chainID].axiosConfig
        );
        return result;
      },
      {}
    );

    // instantiate APIs
    this.alliance = new AllianceAPI(this);
    this.auth = new AuthAPI(this);
    this.bank = new BankAPI(this);
    this.distribution = new DistributionAPI(this);
    this.feeGrant = new FeeGrantAPI(this);
    this.gov = new GovV1API(this);
    this.legacyGov = new LegacyGovAPI(this);
    this.mint = new MintAPI(this);
    this.authz = new AuthzAPI(this);
    this.slashing = new SlashingAPI(this);
    this.staking = new StakingAPI(this);
    this.tendermint = new TendermintAPI(this);
    this.tokenfactory = new TokenFactory(this);
    this.wasm = new WasmAPI(this);
    this.ibc = new IbcAPI(this);
    this.icaV1 = new ICAv1API(this);
    this.icqV1 = new ICQv1API(this);
    this.ibcTransfer = new IbcTransferAPI(this);
    this.tx = new TxAPI(this);
    this.pob = new PobAPI(this);
    this.feeshare = new FeeshareAPI(this);
    this.feemarket = new FeemarketAPI(this);
    this.utils = new LCDUtils(this);
    this.smartaccount = new SmartaccountAPI(this);
  }

  public static fromDefaultConfig(network: 'mainnet' | 'testnet') {
    // TODO: fetch config from assets.terra.money
    return new LCDClient(DEFAULT_NETWORK_CONFIG[network]);
  }

  /** Creates a new wallet with the Key. */
  public wallet(key: Key): Wallet {
    return new Wallet(this, key);
  }
}
