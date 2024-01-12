import { LCDClient } from '../LCDClient';
import { APIRequester } from '../APIRequester';
import {
  AuthInfo,
  Coin,
  Fee,
  MsgSend,
  MsgUndelegate,
  Tx,
  TxBody,
} from '../../../core';
import { TxAPI } from './TxAPI';
import { MnemonicKey } from '../../../key';
import { isTxError } from './TxAPI';

const mk = new MnemonicKey({
  mnemonic:
    'sound hour era feature bacon code drift deal raw toward soldier nation winter consider tissue jewel script result mean faculty water exist lunch betray',
});

const lcd = LCDClient.fromDefaultConfig('testnet');
const txAPI = new TxAPI(lcd);
const wallet = lcd.wallet(mk);

describe('TxAPI', () => {
  describe('decode', () => {
    it('pisco', async () => {
      lcd.tx.decode(
        'CsIBCp4BCiMvY29zbW9zLnN0YWtpbmcudjFiZXRhMS5Nc2dEZWxlZ2F0ZRJ3Cix0ZXJyYTF6ZHBnajhhbTVucXF2aHQ5MjdrM2V0bGp5bDZhNTJrd3F1cDBqZRIzdGVycmF2YWxvcGVyMXpkcGdqOGFtNW5xcXZodDkyN2szZXRsanlsNmE1Mmt3cW5kanoyGhIKBXVsdW5hEgkxMDQ3ODQwMDYSH2J5LiBodHRwczovL2dpdGh1Yi5jb20vZW1pZGV2OTgSagpSCkYKHy9jb3Ntb3MuY3J5cHRvLnNlY3AyNTZrMS5QdWJLZXkSIwohA+Q1ZNHkGfabYf1wRUdLcaJHlqDC62Llxam8fKgoH6mZEgQKAggBGJPWChIUCg4KBXVsdW5hEgUzNTk4MxCJ0g4aQOQgfKscECIN6Z6NtfWwEiZ2nxnnjdfZEVq4f2ypIm1QLY8Oo60Rfbe6Y10leA4bL5fPRHp8GC7d9hmrhtDVlXc='
      );
    });
  });

  describe('broadcast', () => {
    beforeEach(() => {
      // Need to respond to requests made by createAndSignTx.
      jest.spyOn(APIRequester.prototype, 'get').mockImplementation(route => {
        if (route.includes('/cosmos/auth/v1beta1/accounts')) {
          return Promise.resolve({
            account: {
              '@type': '/cosmos.auth.v1beta1.BaseAccount',
              address: 'AccAddress',
              pub_key: '',
              account_number: 1,
              sequence: 1,
            },
          });
        }
        return Promise.resolve();
      });

      jest.spyOn(APIRequester.prototype, 'post').mockImplementation(route => {
        if (route.includes('/cosmos/tx/v1beta1/simulate')) {
          return Promise.resolve({
            gas_info: {
              gas_wanted: 1000,
              gas_used: 1000,
            },
            result: {
              data: '',
              log: '',
              events: [],
            },
          });
        }

        return Promise.resolve({
          tx_response: {
            txhash:
              '4E63BF998EC3C8765400C800122207FB151B84123673554AAEB8BDF443AEDC39',
          },
          tx: {},
        });
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('broadcast fetches and returns txInfo', async () => {
      jest.spyOn(APIRequester.prototype, 'getRaw').mockImplementation(route => {
        if (route.includes('/cosmos/tx/v1beta1/txs/')) {
          return Promise.resolve({
            tx_response: {
              txhash: 'txInfo.txhash',
              raw_log: '[]',
              gas_wanted: 20000,
              gas_used: 20000,
              height: 20000,
              logs: [],
              timestamp: '1650608740',
              tx: {
                '@type': '/cosmos.tx.v1beta1.Tx',
                body: {
                  messages: [],
                  memo: '',
                },
                auth_info: {
                  signer_infos: [],
                  fee: {
                    amount: [],
                    gas_limit: '300000',
                    payer: '',
                    granter: '',
                  },
                },
                signatures: [],
              },
            },
          });
        }
        return Promise.resolve();
      });

      const send = new MsgSend(
        'terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8',
        'terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8',
        { uluna: '1000000' }
      );

      const tx = await wallet.createAndSignTx({
        msgs: [send],
        chainID: 'pisco-1',
      });
      const txInfo = await txAPI.broadcast(tx, 'pisco-1');

      expect(isTxError(txInfo)).toBeFalsy();
    });

    it('broadcast timeout if txInfo not found in time', async () => {
      jest.spyOn(APIRequester.prototype, 'getRaw').mockImplementation(route => {
        if (route.includes('/cosmos/tx/v1beta1/txs/')) {
          // Force an error to emulate a transaction not found.
          return Promise.reject();
        }

        return Promise.resolve();
      });

      const send = new MsgSend(
        'terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8',
        'terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8',
        { uluna: '1' }
      );

      const tx = await wallet.createAndSignTx({
        msgs: [send],
        chainID: 'pisco-1',
      });

      await expect(async () => {
        const res = await txAPI.broadcast(tx, 'pisco-1', 1);
        console.log(res);
      }).rejects.toThrow('Transaction was not included in a block');
    });
  });
});

describe('simulateTx', () => {
  it('should simulate a transaction', async () => {
    // Given the transaction that needs to be simulated
    const mockTx = new Tx(
      new TxBody([
        new MsgUndelegate(
          'mockDelegatorAddress',
          'mockValidatorAddress',
          new Coin('uluna', '1000000')
        ),
      ]),
      new AuthInfo([], new Fee(50000000, [new Coin('uluna', '1000000')])),
      ['']
    );
    // We mock the data that will be returned from the blockchain API and set it up as a function that returns a promise
    const mockResponseData = {
      gas_info: {
        gas_wanted: '2000',
        gas_used: '1000',
      },
      result: {
        data: 'data_mocked',
        log: '[{"type":"message","attributes":[{"key":"action","value":"undelegate"}]}]',
        events: [
          {
            type: 'message',
            attributes: [{ key: 'action', value: 'undelegate' }],
          },
        ],
      },
    };
    lcd.apiRequesters['pisco-1'].post = jest.fn(
      async () => Promise.resolve(mockResponseData) as any
    );

    // When simulating the transaction
    const res = await lcd.tx.simulateTx(mockTx, 'pisco-1');

    // Expect that the simulate endpoint have been executed,
    // and assert the responses from the API.
    expect(lcd.apiRequesters['pisco-1'].post).toHaveBeenCalledWith(
      `/cosmos/tx/v1beta1/simulate`,
      expect.any(Object)
    );
    expect(res.gas_info).toEqual({
      gas_wanted: 2000,
      gas_used: 1750,
    });
    expect(res.result).toEqual({
      data: 'data_mocked',
      log: '[{"type":"message","attributes":[{"key":"action","value":"undelegate"}]}]',
      events: [
        {
          type: 'message',
          attributes: [{ key: 'action', value: 'undelegate' }],
        },
      ],
    });
  });
});
