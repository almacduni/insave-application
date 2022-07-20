import { authorizedInstance, basicInstance } from "./instances";
import { TransferData, WalletData } from "../../types/commonTypes";
import { CryptoOrder, Order } from "../model";

export const FinanceAPI = {
	async makeTransfer (transferData: TransferData): Promise<string> {
		const { data } = await basicInstance.post("/crypto/transfer", transferData);

		return data;
	},

	async getCryptoBalances (userId: number): Promise<WalletData[]> {
		const { data } = await basicInstance.get(`/crypto/allBalance?userId=${userId}`);

		return data;
	},
};
export async function createCryptoOrder (order: CryptoOrder): Promise<string> {
	const response = await authorizedInstance.post("crypto/orders", order);

	return response.data;
}
