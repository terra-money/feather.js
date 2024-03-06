import { Setting } from '../../../core/smartaccount/v1/models/Setting';
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

  // test with wallet15 terra1tck9vx8vwu6l83zy76ssdkhnhw8dfcrt80hc6x
  it('assert the account setting', async () => {
    const res = await smartaccount.setting(
      'terra1tck9vx8vwu6l83zy76ssdkhnhw8dfcrt80hc6x'
    );
    expect(res.toData()).toEqual({
      owner: 'terra1tck9vx8vwu6l83zy76ssdkhnhw8dfcrt80hc6x',
      authorization: [],
      post_transaction: [],
      pre_transaction: [],
      fallback: true,
    });
  });
});
