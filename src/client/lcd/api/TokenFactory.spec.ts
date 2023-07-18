import { LCDClient } from '../LCDClient';
import { TokenFactory } from './TokenFactoryAPI';

// has a default list of endpoints that we can select with the first parameter
// 'mainnet' | 'testnet' | 'local'
// we can add more chains or overwrite the default settings with the second parameter
const lcd = LCDClient.fromDefaultConfig('testnet');
const tokenFactory = new TokenFactory(lcd);

describe('TokenFactory', () => {
  it('params', async () => {
    const param = await tokenFactory.params('pisco-1');

    expect(param).toMatchObject({
      params: {
        denom_creation_fee: [
          {
            denom: 'uluna',
            amount: '10000000',
          },
        ],
      },
    });
  });

  it('denoms for creator', async () => {
    const res = await tokenFactory.denomsFromCreator(
      'terra1zdpgj8am5nqqvht927k3etljyl6a52kwqup0je'
    );

    expect(res.denoms[res.denoms.length - 1]).toEqual(
      'factory/terra1zdpgj8am5nqqvht927k3etljyl6a52kwqup0je/utest766e'
    );
  });

  /*
    The following request does not work yet because the endpoint 
    does recognize the url encoded denom.

    it('authority metadata', async () => {
      const res = await tokenFactory.authorityMetadata("pisco-1","factory/terra1zdpgj8am5nqqvht927k3etljyl6a52kwqup0je/utest766e");

      expect(res)
        .toEqual("factory/terra1zdpgj8am5nqqvht927k3etljyl6a52kwqup0je/utest766e")
    });
    */
});
