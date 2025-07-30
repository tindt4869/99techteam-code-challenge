import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { useSwapStore } from "@/stores/swap-store";

export function SettingsDialog() {
  const { slippage, setSlippage } = useSwapStore();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Swap Settings</DialogTitle>
          <DialogDescription>Adjust your swap preferences</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Slippage Tolerance: {slippage[0]}%</Label>
            <Slider
              value={slippage}
              onValueChange={setSlippage}
              max={5}
              min={0.1}
              step={0.1}
              className="mt-2"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
