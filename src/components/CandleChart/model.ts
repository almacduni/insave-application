
import { createEffect, createEvent, createStore } from "effector";

import { chartAPI } from "../../api/chart-api";
import { IAssetInfo } from "../../types/commonTypes";
import { NameTimeFrame } from "./helpers/dateHelpers";
import { CandleData } from "./helpers/hookHelpers";

const loadCandleData = createEvent<CandleData[]>();
const loadAssetInfo = createEvent<IAssetInfo>();
const loadTimeFrame = createEvent<NameTimeFrame>();

export const $candleData = createStore<CandleData[] | null>(null)
	.on(loadCandleData, (_, candleData) => candleData);

export const $assetInfo = createStore<IAssetInfo | null>(null)
	.on(loadAssetInfo, (_, assetInfo) => assetInfo);

export const $timeFrame = createStore<NameTimeFrame | null>(null)
	.on(loadTimeFrame, (_, timeFrame) => timeFrame);

interface IFetchCandleDataFx {
	assetTicker: string,
	assetName: string,
	timeFrame: NameTimeFrame
}

export const fetchCandleDataFx = createEffect({
	async handler ({ assetTicker, assetName, timeFrame }: IFetchCandleDataFx) {
		try {
			const res = await chartAPI.getCandlesDateByTimeFrame(assetTicker, timeFrame);

			if (res) {
				return {
					candleData: res.data,
					livePrice: res.current.price,
					assetName,
					assetTicker,
					timeFrame
				};
			}
		} catch (err) {
			console.error(err);
		}
	},
});

fetchCandleDataFx.doneData.watch(result => {
	if (result) {
		const { candleData, assetName, livePrice, assetTicker, timeFrame } = result;

		loadCandleData(candleData);
		loadAssetInfo({ assetName, assetTicker, livePrice });
		loadTimeFrame(timeFrame);
	}
});
