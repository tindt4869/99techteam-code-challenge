import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet } from "lucide-react";

interface SwapActionButtonProps {
  isConnected: boolean;
  isSwapping: boolean;
  fromAmount: string;
  fromToken: string;
  toAmount: string;
  toToken: string;
  transactionStatus: "idle" | "pending" | "success" | "failed";
  onConnect: () => void;
  onSwap: () => void;
}

export function SwapActionButton({
  isConnected,
  isSwapping,
  fromAmount,
  fromToken,
  toAmount,
  toToken,
  transactionStatus,
  onConnect,
  onSwap,
}: SwapActionButtonProps) {
  if (!isConnected) {
    return (
      <div className="space-y-4">
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          onClick={onConnect}
        >
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Button
        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={
          !fromAmount || Number.parseFloat(fromAmount) <= 0 || isSwapping
        }
        onClick={onSwap}
      >
        {isSwapping ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Swapping...</span>
          </div>
        ) : !fromAmount || Number.parseFloat(fromAmount) <= 0 ? (
          "Enter Amount"
        ) : transactionStatus === "pending" ? (
          "Confirming..."
        ) : (
          `Swap ${fromAmount} ${fromToken} for ${toAmount} ${toToken}`
        )}
      </Button>

      <div className="text-center">
        <Badge variant="outline" className="text-green-600 border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          Wallet Connected
        </Badge>
      </div>
    </div>
  );
}
