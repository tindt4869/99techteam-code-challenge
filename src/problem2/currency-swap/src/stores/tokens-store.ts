import { data } from "@/data/prices";
import { create } from "zustand";

interface Token {
  symbol: string;
  name: string;
  price: number;
  balance: number | null;
  change24h: number | null;
  date: string;
}

interface TokensState {
  tokens: Token[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;

  // Actions
  fetchTokens: () => Promise<void>;
  refreshPrices: () => Promise<void>;
  getTokenBySymbol: (symbol: string) => Token | undefined;
}

// Simulated API function
const fetchTokensAPI = async (): Promise<Token[]> => {
  // Simulate API delay
  await new Promise((resolve) =>
    setTimeout(resolve, 1000 + Math.random() * 2000)
  );

  // Simulate occasional API failures
  if (Math.random() < 0.1) {
    throw new Error("Failed to fetch token data from API");
  }

  return data;
};

export const useTokensStore = create<TokensState>((set, get) => ({
  tokens: [],
  isLoading: false,
  error: null,
  lastUpdated: null,

  fetchTokens: async () => {
    set({ isLoading: true, error: null });

    try {
      const tokens = await fetchTokensAPI();
      set({
        tokens,
        isLoading: false,
        lastUpdated: Date.now(),
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch tokens",
        isLoading: false,
      });
    }
  },

  refreshPrices: async () => {
    const { tokens } = get();
    if (tokens.length === 0) return;

    try {
      const updatedTokens = await fetchTokensAPI();
      set({
        tokens: updatedTokens,
        lastUpdated: Date.now(),
      });
    } catch (error) {
      console.error("Failed to refresh prices:", error);
    }
  },

  getTokenBySymbol: (symbol: string) => {
    return get().tokens.find((token) => token.symbol === symbol);
  },
}));
