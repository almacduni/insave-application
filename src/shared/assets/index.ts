import BtcIcon from "../../assets/btc-icon.svg";
import EthereumIcon from "../../assets/ethereum-icon.svg";
import MiniBtcIcon from "../../assets/mini-btc-icon.svg";
import MiniEthereumIcon from "../../assets/mini-ethereum-icon.svg";
import { Currency } from "../../types/commonTypes";

export const CryptoIcons = {
	[Currency.BTC]: BtcIcon,
	[Currency.ETH]: EthereumIcon,
	[Currency.BTC + "_MINI"]: MiniBtcIcon,
	[Currency.ETH + "_MINI"]: MiniEthereumIcon,
};
