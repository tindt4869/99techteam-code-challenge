import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useSwapStore } from "@/stores/swap-store";
import { useTokensStore } from "@/stores/tokens-store";
import { SwapCard } from "./swap-card";
import { SwapButton } from "./swap-button";
import { ExchangeRateBar } from "./exchange-rate-bar";
import { TransactionDetails } from "./transaction-details";
import { TransactionStatus } from "./transaction-status";
import { SwapActionButton } from "./swap-action-button";
import { LoadingScreen } from "./loading-screen";

export default function CryptoSwap() {
  const {
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    slippage,
    isConnected,
    isSwapping,
    transactionError,
    transactionStatus,
    transactionHash,
    setFromToken,
    setToToken,
    setFromAmount,
    setToAmount,
    setIsConnected,
    swapTokens,
    resetTransaction,
    executeSwap,
  } = useSwapStore();

  const {
    tokens,
    isLoading: tokensLoading,
    error: tokensError,
    fetchTokens,
    getTokenBySymbol,
  } = useTokensStore();

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  useEffect(() => {
    if (fromAmount && tokens.length > 0) {
      const fromTokenData = getTokenBySymbol(fromToken);
      const toTokenData = getTokenBySymbol(toToken);

      if (fromTokenData && toTokenData) {
        const rate = fromTokenData.price / toTokenData.price;
        const calculated = (
          Number.parseFloat(fromAmount) *
          rate *
          0.997
        ).toFixed(6); // 0.3% fee
        setToAmount(calculated);
      }
    } else {
      setToAmount;
    }
  }, [fromAmount, fromToken, toToken, tokens, getTokenBySymbol, setToAmount]);

  const fromTokenData = getTokenBySymbol(fromToken);
  const toTokenData = getTokenBySymbol(toToken);
  const exchangeRate =
    fromTokenData && toTokenData
      ? (fromTokenData.price / toTokenData.price).toFixed(6)
      : "0";

  if ((tokensLoading && tokens.length === 0) || tokensError) {
    return (
      <LoadingScreen
        isLoading={tokensLoading && tokens.length === 0}
        error={tokensError}
        onRetry={fetchTokens}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="mx-auto max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Crypto Swap
                </CardTitle>
                <CardDescription>
                  Swap cryptocurrencies instantly with the best rates
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <SwapCard
              label="From"
              token={fromToken}
              amount={fromAmount}
              onTokenChange={setFromToken}
              onAmountChange={setFromAmount}
            />

            <SwapButton onSwap={swapTokens} />

            <SwapCard
              label="To"
              token={toToken}
              amount={toAmount}
              onTokenChange={setToToken}
              onAmountChange={setToAmount}
              readOnly
            />

            <ExchangeRateBar
              fromToken={fromToken}
              toToken={toToken}
              exchangeRate={exchangeRate}
            />

            <TransactionDetails
              fromToken={fromToken}
              toToken={toToken}
              fromAmount={fromAmount}
              toAmount={toAmount}
              slippage={slippage[0]}
            />

            <TransactionStatus
              error={transactionError}
              success={transactionStatus === "success"}
              transactionHash={transactionHash}
              onRetry={resetTransaction}
              onViewExplorer={() =>
                window.open(
                  `https://etherscan.io/tx/${transactionHash}`,
                  "_blank"
                )
              }
            />

            <SwapActionButton
              isConnected={isConnected}
              isSwapping={isSwapping}
              fromAmount={fromAmount}
              fromToken={fromToken}
              toAmount={toAmount}
              toToken={toToken}
              transactionStatus={transactionStatus}
              onConnect={() => setIsConnected(true)}
              onSwap={executeSwap}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
