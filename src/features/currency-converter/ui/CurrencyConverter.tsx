import * as React from "react";

import { useAppSelector } from "../../../hooks/useRedux";
import { Currency } from "../../../types/commonTypes";
import { Text, Button, Input, Side } from "../../../shared/ui";

interface CurrencyConverterProps {
	currency: Currency;
	onChange: (value: string) => void;
	autoFocus?: boolean;
	error?: boolean;
}

export const CurrencyConverter: React.FC<CurrencyConverterProps> = (props) => {
	const { currency, onChange, error, autoFocus } = props;
	const rate = useAppSelector((state) => state.walletNew.rates[currency]);

	const [firstCurrencyValue, setFirstCurrencyValue] = React.useState("");
	const [secondCurrencyValue, setSecondCurrencyValue] = React.useState("");

	React.useEffect(() => {
		onChange(firstCurrencyValue);
	}, [firstCurrencyValue]);

	const onChangeFirstCurrency = (value: string) => {
		setFirstCurrencyValue(value);
		setSecondCurrencyValue((+value * rate).toFixed(2));
	};

	const onChangeSecondCurrency = (value: string) => {
		setSecondCurrencyValue(value);
		setFirstCurrencyValue((+value / rate).toFixed(5));
	};

	return (
		<Side.SpaceBetween>
			<Input
				width={ 167 }
				autoFocus={ autoFocus }
				placeholder={ `0.00 ${currency}` }
				keyboardType="number-pad"
				value={ `${firstCurrencyValue}` }
				error={ error }
				onChangeText={ onChangeFirstCurrency }
			/>
			<Input
				width={ 167 }
				placeholder={ `0.00 $ ` }
				value={ `${secondCurrencyValue}` }
				keyboardType="number-pad"
				error={ error }
				onChangeText={ onChangeSecondCurrency }
			/>
		</Side.SpaceBetween>
	);
};
