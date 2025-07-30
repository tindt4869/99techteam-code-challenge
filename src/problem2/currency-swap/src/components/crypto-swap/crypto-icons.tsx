import BLURIcon from "../../assets/tokens/BLUR.svg?react";
import bNEOIcon from "../../assets/tokens/bNEO.svg?react";
import BUSDIcon from "../../assets/tokens/BUSD.svg?react";
import USDIcon from "../../assets/tokens/USD.svg?react";
import ETHIcon from "../../assets/tokens/ETH.svg?react";
import GMXIcon from "../../assets/tokens/GMX.svg?react";
import STEVMOSIcon from "../../assets/tokens/stEVMOS.svg?react";
import LUNAIcon from "../../assets/tokens/LUNA.svg?react";
import RATOMIcon from "../../assets/tokens/rATOM.svg?react";
import STRDIcon from "../../assets/tokens/STRD.svg?react";
import EVMOSIcon from "../../assets/tokens/EVMOS.svg?react";
import IBCXIcon from "../../assets/tokens/IBCX.svg?react";
import IRISIcon from "../../assets/tokens/IRIS.svg?react";
import ampLUNAIcon from "../../assets/tokens/ampLUNA.svg?react";
import KUJIIcon from "../../assets/tokens/KUJI.svg?react";
import STOSMOIcon from "../../assets/tokens/stOSMO.svg?react";
import USDCIcon from "../../assets/tokens/USDC.svg?react";
import axlUSDCIcon from "../../assets/tokens/axlUSDC.svg?react";
import ATOMIcon from "../../assets/tokens/ATOM.svg?react";
import STATOMIcon from "../../assets/tokens/stATOM.svg?react";
import OSMOIcon from "../../assets/tokens/OSMO.svg?react";
import rSWTHIcon from "../../assets/tokens/rSWTH.svg?react";
import STLUNAIcon from "../../assets/tokens/stLUNA.svg?react";
import LSIIcon from "../../assets/tokens/LSI.svg?react";
import OKBIcon from "../../assets/tokens/OKB.svg?react";
import OKTIcon from "../../assets/tokens/OKT.svg?react";
import SWTHIcon from "../../assets/tokens/SWTH.svg?react";
import USCIcon from "../../assets/tokens/USC.svg?react";
import WBTCIcon from "../../assets/tokens/WBTC.svg?react";
import wstETHIcon from "../../assets/tokens/wstETH.svg?react";
import YieldUSDIcon from "../../assets/tokens/YieldUSD.svg?react";
import ZILIcon from "../../assets/tokens/ZIL.svg?react";
import type { FC } from "react";

const icons = {
  BLUR: BLURIcon,
  bNEO: bNEOIcon,
  BUSD: BUSDIcon,
  USD: USDIcon,
  ETH: ETHIcon,
  GMX: GMXIcon,
  STEVMOS: STEVMOSIcon,
  LUNA: LUNAIcon,
  RATOM: RATOMIcon,
  STRD: STRDIcon,
  EVMOS: EVMOSIcon,
  IBCX: IBCXIcon,
  IRIS: IRISIcon,
  ampLUNA: ampLUNAIcon,
  KUJI: KUJIIcon,
  STOSMO: STOSMOIcon,
  USDC: USDCIcon,
  axlUSDC: axlUSDCIcon,
  ATOM: ATOMIcon,
  STATOM: STATOMIcon,
  OSMO: OSMOIcon,
  rSWTH: rSWTHIcon,
  STLUNA: STLUNAIcon,
  LSI: LSIIcon,
  OKB: OKBIcon,
  OKT: OKTIcon,
  SWTH: SWTHIcon,
  USC: USCIcon,
  WBTC: WBTCIcon,
  wstETH: wstETHIcon,
  YieldUSD: YieldUSDIcon,
  ZIL: ZILIcon,
} as const;

export const CryptoIcon: FC<{ name: string; size?: number }> = ({
  name,
  size,
}) => {
  const Component = icons[name as keyof typeof icons];
  if (!Component) return null;
  return <Component width={size || 24} />;
};
