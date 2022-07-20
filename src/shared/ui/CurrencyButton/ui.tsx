import React, { FC } from "react";

import BtcIcon from "../../../assets/btc-icon.svg";
import EthereumIcon from "../../../assets/ethereum-icon.svg";
import { Currency } from "../../../types/commonTypes";
import { ListItemButton } from "../ListItemButton";
import { CryptoBackgrounds } from "../../model";

const ButtonsData = {
	[Currency.BTC]: {
		name: "Bitcoin",
		Icon: BtcIcon,
		color: CryptoBackgrounds.BTC,
	},
	[Currency.ETH]: {
		name: "Ethereum",
		Icon: EthereumIcon,
		color: CryptoBackgrounds.ETH,
	},
};

interface CryptoCurrencyButtonProps {
	currency: Currency;
	onPress: () => void;
}

export const CurrencyButton: FC<CryptoCurrencyButtonProps> = (props) => {
	const { currency, onPress } = props;
	const data = ButtonsData[currency];
	const Icon = data?.Icon || (() => <></>);

	return (
		<ListItemButton
			colors={ { circle: data?.color } }
			text={ data?.name }
			data={ {
				icon: <Icon />,
			} }
			onPress={ onPress }
		/>
	);
};
