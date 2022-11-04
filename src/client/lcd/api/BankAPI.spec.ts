import { LCDClient } from '../LCDClient';
import { BankAPI } from './BankAPI';

// has a default list of endpoints that we can select with the first parameter
// 'mainnet' | 'testnet' | 'local'
// we can add more chains or overwrite the default settings with the second parameter
const lcd = LCDClient.fromDefaultConfig('testnet');
const bank = new BankAPI(lcd);

describe('BankAPI', () => {
  describe('balance', () => {
    it('account exists', async () => {
      // automatically understand in which chain it should do the query based on the prefix of the address
      await bank.balance('terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v');
    });

    it('invalid account', async () => {
      await expect(bank.balance('1234')).rejects.toThrow();
    });
  });

  it('total supply', async () => {
    // if the query don't require an address, we can specify the chain using the chainID
    const totalSupply = await bank.total('pisco-1');
    expect(totalSupply[0].toArray().length).toBeGreaterThan(0);
  });

  describe('parameters', () => {
    it('parameters', async () => {
      const param = await bank.parameters('pisco-1');

      expect(param.default_send_enabled).toBeDefined();
    });
  });
});
