import { TxInfo } from './TxInfo';
const data = require('./TxInfo.data.json');

const instantiateContractTxAmino = {
  height: '301435',
  txhash: '69CA62F1328A3FBC810A3E370A186BC2A5FAED2739848CA3336580DD17C58F7E',
  raw_log:
    '[{"msg_index":0,"log":"","events":[{"type":"instantiate_contract","attributes":[{"key":"owner","value":"terra1t72mplryz3n2y953w44fc3rj0yp4m82qvkhrz3"},{"key":"code_id","value":"118"},{"key":"contract_address","value":"terra1emf0rwa3nfljdn6mq0mycy8vxcdaklgmzwam2s"}]},{"type":"message","attributes":[{"key":"action","value":"instantiate_contract"},{"key":"module","value":"wasm"}]}]}]',
  logs: [
    {
      msg_index: 0,
      log: '',
      events: [
        {
          type: 'instantiate_contract',
          attributes: [
            {
              key: 'creator',
              value: 'terra1t72mplryz3n2y953w44fc3rj0yp4m82qvkhrz3',
            },
            {
              key: 'admin',
              value: '',
            },
            {
              key: 'code_id',
              value: '118',
            },
            {
              key: 'contract_address',
              value: 'terra1emf0rwa3nfljdn6mq0mycy8vxcdaklgmzwam2s',
            },
          ],
        },
        {
          type: 'message',
          attributes: [
            {
              key: 'action',
              value: 'instantiate_contract',
            },
            {
              key: 'module',
              value: 'wasm',
            },
          ],
        },
      ],
    },
  ],
  gas_wanted: '136830',
  gas_used: '113019',
  data: '',
  info: '',
  code: 0,
  codespace: '',
  tx: {
    '@type': '/cosmos.tx.v1beta1.Tx',
    body: {
      messages: [
        {
          '@type': '/cosmos.bank.v1beta1.MsgSend',
          from_address: 'terra1t72mplryz3n2y953w44fc3rj0yp4m82qvkhrz3',
          to_address: 'terra1t72mplryz3n2y953w44fc3rj0yp4m82qvkhrz3',
          amount: [
            {
              denom: 'uluna',
              amount: '100',
            },
          ],
        },
        {
          '@type': '/cosmos.staking.v1beta1.MsgDelegate',
          delegator_address: 'terra1t72mplryz3n2y953w44fc3rj0yp4m82qvkhrz3',
          validator_address:
            'terravaloper1vk20anceu6h9s00d27pjlvslz3avetkvnwmr35',
          amount: {
            denom: 'uluna',
            amount: '100',
          },
        },
      ],
      memo: '',
      timeout_height: '0',
      extension_options: [],
      non_critical_extension_options: [],
    },
    auth_info: {
      signer_infos: [
        {
          public_key: {
            '@type': '/cosmos.crypto.secp256k1.PubKey',
            key: 'A6/5zM6Vo11e3aepClYLVn4rsHdXOnFsDccXYiuvSeeJ',
          },
          mode_info: {
            single: {
              mode: 'SIGN_MODE_LEGACY_AMINO_JSON',
            },
          },
          sequence: '0',
        },
      ],
      fee: {
        amount: [],
        gas_limit: '150000',
        payer: '',
        granter: '',
      },
    },
    signatures: [
      'AnnNlVkWB5Kk9wPtikUXpjkfYKdaXulUQ0262quoc9EU1nDkC64rjS7sabJV2mnIFYMeHFJlxsxmnAMrJqkppQ==',
    ],
  },
  timestamp: '2020-09-23T13:17:22Z',
};

describe('TxInfo', () => {
  it('deserializes', () => {
    data.tx_responses.forEach((txInfo: TxInfo.Data) => {
      expect(TxInfo.fromData(txInfo, true)).toBeTruthy();
    });
  });

  it('parses events correctly', () => {
    const tx = TxInfo.fromData(
      instantiateContractTxAmino as TxInfo.Data,
      false
    );

    if (!tx.logs) {
      throw new Error('logs undefined');
    }

    const {
      message: { action, module },
      instantiate_contract: { creator, admin, code_id, contract_address },
    } = tx.logs[0].eventsByType;

    expect({
      action: action[0],
      module: module[0],
      creator: creator[0],
      admin: admin[0],
      code_id: code_id[0],
      contract_address: contract_address[0],
    }).toMatchObject({
      action: 'instantiate_contract',
      module: 'wasm',
      creator: 'terra1t72mplryz3n2y953w44fc3rj0yp4m82qvkhrz3',
      admin: '',
      code_id: '118',
      contract_address: 'terra1emf0rwa3nfljdn6mq0mycy8vxcdaklgmzwam2s',
    });
  });
});
