import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

interface SwapButtonProps {
  onSwap: () => void;
}

export function SwapButton({ onSwap }: SwapButtonProps) {
  return (
    <div className="flex justify-center">
      <Button
        variant="outline"
        size="icon"
        onClick={onSwap}
        className="rounded-full border-2 hover:bg-blue-50 bg-transparent"
      >
        <ArrowUpDown className="h-4 w-4" />
      </Button>
    </div>
  );
}
