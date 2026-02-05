import { createPublicClient, http, parseAbi, formatUnits } from 'viem';
import { base } from 'viem/chains';

// Minimal ERC20 ABI for balanceOf
const ERC20_ABI = parseAbi([
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
]);

export interface TokenDefinition {
  id: string;
  name: string;
  symbol: string;
  address: `0x${string}`;
  decimals: number;
  monsterImage: string; // Placeholder for now
}

// Curated list of Base tokens
export const SUPPORTED_TOKENS: TokenDefinition[] = [
  {
    id: 'weth',
    name: 'Wrapped Ether',
    symbol: 'WETH',
    address: '0x4200000000000000000000000000000000000006',
    decimals: 18,
    monsterImage: 'https://placehold.co/100x100/purple/white?text=EtherGhost',
  },
  {
    id: 'usdc',
    name: 'USDC',
    symbol: 'USDC',
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    decimals: 6,
    monsterImage: 'https://placehold.co/100x100/blue/white?text=StableGolem',
  },
  {
    id: 'degen',
    name: 'Degen',
    symbol: 'DEGEN',
    address: '0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed',
    decimals: 18,
    monsterImage: 'https://placehold.co/100x100/violet/white?text=DegenHat',
  },
  {
    id: 'toshi',
    name: 'Toshi',
    symbol: 'TOSHI',
    address: '0xAC1Bd2486aAf3B5C0fc3Fd868558b082a531B2B4',
    decimals: 18,
    monsterImage: 'https://placehold.co/100x100/orange/white?text=ToshiCat',
  },
];

const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});

export interface TokenBalance extends TokenDefinition {
  rawBalance: bigint;
  formattedBalance: string;
}

export async function getWalletBalances(walletAddress: `0x${string}`): Promise<TokenBalance[]> {
  const balances: TokenBalance[] = [];

  // Parallel fetch for efficiency
  const results = await Promise.all(
    SUPPORTED_TOKENS.map(async (token) => {
      try {
        const balance = await publicClient.readContract({
          address: token.address,
          abi: ERC20_ABI,
          functionName: 'balanceOf',
          args: [walletAddress],
        });

        return {
          ...token,
          rawBalance: balance,
          formattedBalance: formatUnits(balance, token.decimals),
        };
      } catch (error) {
        console.error(`Error fetching balance for ${token.symbol}:`, error);
        return {
            ...token,
            rawBalance: 0n,
            formattedBalance: '0',
        };
      }
    })
  );

  return results.filter(t => t.rawBalance > 0n);
}
