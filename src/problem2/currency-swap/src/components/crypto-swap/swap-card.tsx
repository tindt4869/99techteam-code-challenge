import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { TokenSelector } from "./token-selector";
import { useTokensStore } from "@/stores/tokens-store";

interface SwapCardProps {
  label: string;
  token: string;
  amount: string;
  onTokenChange: (token: string) => void;
  onAmountChange: (amount: string) => void;
  readOnly?: boolean;
}

export function SwapCard({
  label,
  token,
  amount,
  onTokenChange,
  onAmountChange,
  readOnly = false,
}: SwapCardProps) {
  const { getTokenBySymbol } = useTokensStore();
  const tokenData = getTokenBySymbol(token);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={`${label.toLowerCase()}-amount`}>{label}</Label>
        <Badge variant="secondary" className="text-xs">
          Balance: {tokenData?.balance?.toFixed(4) || "0.0000"} {token}
        </Badge>
      </div>
      <div className="flex space-x-2">
        <div className="flex-1">
          <Input
            id={`${label.toLowerCase()}-amount`}
            type="number"
            placeholder="0.0"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            readOnly={readOnly}
            className={`text-lg font-semibold ${readOnly ? "bg-gray-50" : ""}`}
          />
        </div>
        <TokenSelector
          value={token}
          onValueChange={onTokenChange}
          className="w-32"
        />
      </div>
      {tokenData && (
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${tokenData.price.toLocaleString()}</span>
          <span
            className={
              (tokenData.change24h ?? 0) >= 0
                ? "text-green-600"
                : "text-red-600"
            }
          >
            {(tokenData.change24h ?? 0) >= 0 ? "+" : ""}
            {tokenData.change24h?.toFixed(2) || 0}%
          </span>
        </div>
      )}
    </div>
  );
}
