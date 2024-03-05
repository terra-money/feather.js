import { SmartaccountParams } from '../../../core/smartaccount/v1/models/SmartaccountParams';
import { LCDClient } from '../LCDClient';
import { SmartaccountAPI } from './SmartaccountAPI';

const lcd = new LCDClient({
  'pisco-1': {
    chainID: 'pisco-1',
    gasAdjustment: 1.5,
    gasPrices: {
      uluna: 0.02,
    },
    lcd: 'http://localhost:1317/',
    prefix: 'terra',
  },
});
const smartaccount = new SmartaccountAPI(lcd);

describe('SmartaccountAPI', () => {
  it('assert the module params', async () => {
    const res = await smartaccount.params('pisco-1');

    expect(res).toStrictEqual(new SmartaccountParams());

    expect(res.toData()).toEqual({});
  });

  // TODO: there must be a smart account created to test this
  // it('assert the account setting', async () => {
  //   const res = await smartaccount.setting('a');
  //   // TODO: call
  //   const setting = new Setting('a', [], [], [], true);
  //   expect(res).toStrictEqual(setting);
  //   expect(res.toData()).toEqual(setting);
  // });
});
