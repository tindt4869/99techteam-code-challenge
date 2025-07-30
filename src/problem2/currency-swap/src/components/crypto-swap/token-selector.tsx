import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTokensStore } from "@/stores/tokens-store";
import { CryptoIcon } from "./crypto-icons";

interface TokenSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function TokenSelector({
  value,
  onValueChange,
  className,
}: TokenSelectorProps) {
  const { tokens } = useTokensStore();

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {tokens.map((token) => {
          return (
            <SelectItem key={token.symbol} value={token.symbol}>
              <div className="flex items-center space-x-2">
                <span>
                  <CryptoIcon name={token.symbol} />
                </span>
                <div className="flex flex-col">
                  <span>{token.symbol}</span>
                  <span className="text-xs text-muted-foreground">
                    ${token.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
