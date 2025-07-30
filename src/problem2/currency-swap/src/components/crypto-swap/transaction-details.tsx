import { Separator } from "@/components/ui/separator";
import { Info } from "lucide-react";

interface TransactionDetailsProps {
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  slippage: number;
}

export function TransactionDetails({
  fromToken,
  toToken,
  fromAmount,
  toAmount,
  slippage,
}: TransactionDetailsProps) {
  const priceImpact = fromAmount
    ? (Number.parseFloat(fromAmount) * 0.01).toFixed(2)
    : "0";
  const networkFee = "0.0023";
  const protocolFee = fromAmount
    ? (Number.parseFloat(fromAmount) * 0.003).toFixed(6)
    : "0";

  if (!fromAmount) return null;

  return (
    <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-1 mb-2">
        <Info className="h-4 w-4 text-blue-500" />
        <span className="text-sm font-medium">Transaction Details</span>
      </div>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Price Impact</span>
          <span className="text-green-600">{priceImpact}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Network Fee</span>
          <span>{networkFee} ETH</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Protocol Fee (0.3%)</span>
          <span>
            {protocolFee} {fromToken}
          </span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between font-medium">
          <span>Minimum Received</span>
          <span>
            {toAmount
              ? (Number.parseFloat(toAmount) * (1 - slippage / 100)).toFixed(6)
              : "0"}{" "}
            {toToken}
          </span>
        </div>
      </div>
    </div>
  );
}
