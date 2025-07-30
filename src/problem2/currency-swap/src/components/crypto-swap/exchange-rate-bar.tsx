import { RefreshCw, TrendingUp } from "lucide-react";
import { SettingsDialog } from "./settings-dialog";
import { useTokensStore } from "@/stores/tokens-store";
import { Button } from "../ui/button";

interface ExchangeRateBarProps {
  fromToken: string;
  toToken: string;
  exchangeRate: string;
}

export function ExchangeRateBar({
  fromToken,
  toToken,
  exchangeRate,
}: ExchangeRateBarProps) {
  const { refreshPrices } = useTokensStore();
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center space-x-1">
        <TrendingUp className="h-4 w-4 text-green-500" />
        <span>
          1 {fromToken} = {exchangeRate} {toToken}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={refreshPrices}
          className="ml-2"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        <SettingsDialog />
      </div>
    </div>
  );
}
