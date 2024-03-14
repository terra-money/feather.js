import Decimal from 'decimal.js';
import {
  FeemarketDenomParams,
  FeemarketParams,
  FeemarketState,
} from '../../../core/feemarket';
import { LCDClient } from '../LCDClient';
import { FeemarketAPI } from './FeemarketAPI';

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
const feemarket = new FeemarketAPI(lcd);

describe('FeemarketAPI', () => {
  it('asset the module params', async () => {
    const res = await feemarket.params('pisco-1');

    expect(res).toStrictEqual(
      new FeemarketParams(
        new Decimal(0),
        new Decimal(1),
        new Decimal(0),
        new Decimal(0.125),
        new Decimal(0.125),
        new Decimal(15000000),
        new Decimal(30000000),
        new Decimal(1),
        true,
        'uluna'
      )
    );

    expect(res.toData()).toEqual({
      alpha: '0',
      beta: '1',
      theta: '0',
      min_learning_rate: '0.125',
      max_learning_rate: '0.125',
      target_block_utilization: '15000000',
      max_block_utilization: '30000000',
      window: '1',
      enabled: true,
      default_fee_denom: 'uluna',
    });
  });

  it('asset the module state', async () => {
    const res = await feemarket.state('pisco-1');
    expect(res).toStrictEqual(
      new FeemarketState(new Decimal(0.125), [new Decimal(0)], new Decimal(0))
    );
    expect(res.toData()).toEqual({
      learning_rate: '0.125',
      window: ['0'],
      index: '0',
    });
  });

  it('get fee denom params', async () => {
    const res = await feemarket.feeDenomParam('pisco-1', 'uluna');
    expect(res).toStrictEqual([
      new FeemarketDenomParams(
        'uluna',
        new Decimal('0.0015'),
        new Decimal('0.0015')
      ),
    ]);
    expect(res[0].toData()).toEqual({
      fee_denom: 'uluna',
      min_base_fee: '0.0015',
      base_fee: '0.0015',
    });
  });
});
