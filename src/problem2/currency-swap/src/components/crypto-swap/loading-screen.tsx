import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LoadingScreenProps {
  isLoading: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function LoadingScreen({
  isLoading,
  error,
  onRetry,
}: LoadingScreenProps) {
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <Card className="shadow-xl border-0 w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading tokens...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <Card className="shadow-xl border-0 w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 font-bold">!</span>
            </div>
            <p className="text-red-600 mb-4">{error}</p>
            {onRetry && (
              <Button onClick={onRetry} variant="outline">
                Retry
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
