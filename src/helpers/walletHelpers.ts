import { Currency, WalletData } from "../types/commonTypes";

export function removeWalletCurrencies (
	wallet: WalletData[],
	...currencies: Currency[]
): WalletData[] {
	return wallet.filter(({ currency }) => !currencies.includes(currency));
}
