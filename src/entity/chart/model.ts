
import { combine, createEffect, createEvent, createStore } from "effector";

import { chartAPI } from "../../api/chart-api";
import { NameTimeFrame } from "../../components/CandleChart/helpers/dateHelpers";
import { IAssetInfo } from "../../types/commonTypes";
import { ICandle } from "./lib";

const loadCandleData = createEvent<ICandle[]>();
const loadAssetInfo = createEvent<IAssetInfo>();

export const loadTimeFrame = createEvent<NameTimeFrame>();

const $candleData = createStore<ICandle[] | null>(null)
	.on(loadCandleData, (_, candleData) => candleData);

const $assetInfo = createStore<IAssetInfo | null>(null)
	.on(loadAssetInfo, (_, assetInfo) => assetInfo);

const $timeFrame = createStore<NameTimeFrame | null>(null)
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

export const $isCandleDataLoading = fetchCandleDataFx.pending;
export const $chartData = combine({
	candleData: $candleData,
	assetInfo: $assetInfo,
	timeFrame: $timeFrame
});
