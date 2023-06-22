import { ModuleAccount } from './ModuleAccount';

describe('ModuleAccount', () => {
  it('deserializes module acccount correctly', () => {
    const data: ModuleAccount.Amino = {
      type: 'cosmos-sdk/ModuleAccount',
      value: {
        name: 'alliance',
        permissions: ['minter', 'burner'],
        base_account: {
          type: 'cosmos-sdk/BaseAccount',
          value: {
            address: 'terra12fm3tql2uu0gheuj3st9cwz7ml97tq9mla88c2',
            public_key: null,
            account_number: '1',
            sequence: '5',
          },
        },
      },
    };
    const acct = ModuleAccount.fromAmino(data);
    expect(acct).toMatchObject({
      name: 'alliance',
      permissions: ['minter', 'burner'],
      baseAccount: {
        account_number: 1,
        address: 'terra12fm3tql2uu0gheuj3st9cwz7ml97tq9mla88c2',
        sequence: 5,
        public_key: null,
      },
    });
    expect(acct.toAmino(false)).toMatchObject(data);
  });
});
