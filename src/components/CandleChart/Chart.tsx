import React, { FC } from "react";

import { CANDLE_WIDTH } from "../../constants/sizes";
import { withControls } from "./WithControls";
import { Canvas } from "./Canvas";
import { Cross } from "./Cross/Cross";
import { Price } from "./Header/Price";
import { CompanyName } from "./Header/CompanyName";
import { Label } from "./Label";
import { OptionalWrappers } from "./helpers/Model";

const ControlledCanvas = withControls({
	Canvas,
	Cross,
	Label,
	Price,
	CompanyName,
	candleWidth: CANDLE_WIDTH,
});

export const Chart: FC<OptionalWrappers> = ({
	AnimatedHeaderWrapper,
	AnimatedPriceWrapper,
	AnimatedChartWrapper,
}) => (
	<ControlledCanvas { ...{ AnimatedChartWrapper, AnimatedHeaderWrapper, AnimatedPriceWrapper } } />
);
