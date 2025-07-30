import { Button } from "@/components/ui/button";

interface TransactionStatusProps {
  error?: string | null;
  success?: boolean;
  transactionHash?: string | null;
  onRetry?: () => void;
  onViewExplorer?: () => void;
}

export function TransactionStatus({
  error,
  success,
  transactionHash,
  onRetry,
  onViewExplorer,
}: TransactionStatusProps) {
  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">!</span>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-red-800 mb-1">
              Transaction Failed
            </h4>
            <p className="text-sm text-red-700">{error}</p>
            {onRetry && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="mt-2 text-red-700 border-red-300 hover:bg-red-50 bg-transparent"
              >
                Try Again
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (success && transactionHash) {
    return (
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-green-800 mb-1">
              Swap Successful!
            </h4>
            <p className="text-sm text-green-700 mb-2">
              Your transaction has been confirmed.
            </p>
            <div className="flex items-center space-x-2">
              <code className="text-xs bg-green-100 px-2 py-1 rounded font-mono">
                {transactionHash.slice(0, 10)}...{transactionHash.slice(-8)}
              </code>
              {onViewExplorer && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onViewExplorer}
                  className="text-green-700 border-green-300 hover:bg-green-50 bg-transparent"
                >
                  View on Explorer
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
