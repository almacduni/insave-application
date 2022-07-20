import { IMarketDataRequest } from "../model";
import { marketData } from "./instances";

export async function getMarketData (params: IMarketDataRequest): Promise<any> {
	const response = await marketData.v1.instance.get(`market-data/historical?timeFrame=${params.timeFrame}&ticker=${params.ticker}&to=${params.to}`);

	return response.data;
}
