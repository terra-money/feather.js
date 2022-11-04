import { Plan } from '../../../core';
import { LCDClient } from '../LCDClient';
import { UpgradeAPI } from './UpgradeAPI.ts';

const lcd = LCDClient.fromDefaultConfig('testnet');
const upgrade = new UpgradeAPI(lcd);

describe('UpgradeAPI', () => {
  describe('applied_plan', () => {
    it('0 for invalid name', async () => {
      const height = await upgrade.appliedPlan(
        'there_is_no_plan_like_this',
        'pisco-1'
      );
      expect(height).toEqual(0);
    });
  });

  describe('current_plan', () => {
    it('null plan', async () => {
      const plan = await upgrade.currentPlan('pisco-1');
      expect(plan == null || plan instanceof Plan);
    });
  });

  describe('node_versions', () => {
    it('module count', async () => {
      expect(await upgrade.moduleVersions('pisco-1')).toHaveLength(21);
    });
  });
});
