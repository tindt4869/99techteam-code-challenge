import { create } from "zustand"

interface SwapState {
  fromToken: string
  toToken: string
  fromAmount: string
  toAmount: string

  slippage: number[]
  isConnected: boolean

  // Transaction state
  isSwapping: boolean
  transactionError: string | null
  transactionStatus: "idle" | "pending" | "success" | "failed"
  transactionHash: string | null

  // Actions
  setFromToken: (token: string) => void
  setToToken: (token: string) => void
  setFromAmount: (amount: string) => void
  setToAmount: (amount: string) => void
  setSlippage: (slippage: number[]) => void
  setIsConnected: (connected: boolean) => void
  swapTokens: () => void
  resetTransaction: () => void
  executeSwap: () => Promise<void>
}

export const useSwapStore = create<SwapState>((set, get) => ({
  // Initial state
  fromToken: "ETH",
  toToken: "USDC",
  fromAmount: "",
  toAmount: "",
  slippage: [0.5],
  isConnected: false,
  isSwapping: false,
  transactionError: null,
  transactionStatus: "idle",
  transactionHash: null,

  // Actions
  setFromToken: (token) => set({ fromToken: token }),
  setToToken: (token) => set({ toToken: token }),
  setFromAmount: (amount) => set({ fromAmount: amount }),
  setToAmount: (amount) => set({ toAmount: amount }),
  setSlippage: (slippage) => set({ slippage }),
  setIsConnected: (connected) => set({ isConnected: connected }),

  swapTokens: () => {
    const { fromToken, toToken, toAmount } = get()
    set({
      fromToken: toToken,
      toToken: fromToken,
      fromAmount: toAmount,
      toAmount: "",
    })
  },

  resetTransaction: () =>
    set({
      transactionError: null,
      transactionStatus: "idle",
      transactionHash: null,
    }),

  executeSwap: async () => {
    const { fromAmount, fromToken, toToken, slippage } = get()

    if (!fromAmount || Number.parseFloat(fromAmount) <= 0) return

    set({
      isSwapping: true,
      transactionError: null,
      transactionStatus: "pending",
    })

    try {
      // Simulate various transaction scenarios
      const scenarios = ["success", "insufficient_balance", "slippage_exceeded", "network_error", "user_rejected"]
      const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)]

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 3000))

      switch (randomScenario) {
        case "success":
          const mockTxHash = "0x" + Math.random().toString(16).substr(2, 64)
          set({
            transactionHash: mockTxHash,
            transactionStatus: "success",
            fromAmount: "",
            toAmount: "",
          })
          break

        case "insufficient_balance":
          throw new Error(
            `Insufficient ${fromToken} balance. You need at least ${fromAmount} ${fromToken} plus gas fees.`,
          )

        case "slippage_exceeded":
          throw new Error(
            `Transaction failed due to slippage. Try increasing slippage tolerance to ${(slippage[0] + 0.5).toFixed(1)}% or higher.`,
          )

        case "network_error":
          throw new Error("Network congestion detected. Please try again in a few moments.")

        case "user_rejected":
          throw new Error("Transaction was rejected by user.")

        default:
          throw new Error("Unknown error occurred during swap.")
      }
    } catch (error) {
      console.error("Swap failed:", error)
      set({
        transactionError: error instanceof Error ? error.message : "Transaction failed",
        transactionStatus: "failed",
      })
    } finally {
      set({ isSwapping: false })
    }
  },
}))
