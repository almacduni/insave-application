import { useEffect, useState } from "react";

import { getDomain } from "./hookHelpers";
import { useAdaptations } from "./useAdaptations";
import { useGestureValues } from "./useGestureValues";
import { useGestureHandlers } from "./useGestureHandlers";
import { ICandle } from "../../../entity/chart/lib";

export const useGesture = (candleData: ICandle[] | null) => {
	const [initialDomain, setInitialDomain] = useState<[number, number]>([ 0, 0 ]);

	useEffect(() => {
		if (candleData) {
			setInitialDomain(getDomain(candleData));
		}
	}, [candleData]);

	const values = useGestureValues({ candleData: candleData ?? [] });

	const adaptation = useAdaptations({
		candleData: candleData ?? [],
		initialDomain,
		zoom: values.zoom,
		clampTranslateX: values.clampTranslateX,
	});

	const gestureHandlers = useGestureHandlers({ candleData: candleData ?? [], initialDomain, ...values });

	return {
		values: { ...values, adaptation, candleData, initialDomain },
		gestureHandlers,
	};
};
