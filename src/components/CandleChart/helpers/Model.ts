import { FC } from "react";
import Animated from "react-native-reanimated";
import {
	PanGestureHandlerGestureEvent,
	PinchGestureHandlerGestureEvent,
	GestureHandlerGestureEvent,
	LongPressGestureHandlerGestureEvent,
	GestureEvent,
} from "react-native-gesture-handler";
import { Vector } from "react-native-redash";

import { CandleType } from "../../../types/commonTypes";

export enum LabelBorders {
	LEFT = 52,
	RIGHT = 308,
}

export enum AutoScrollArea {
	LEFT = 35,
	RIGHT = 300,
}

export const AUTO_SCROLL_STEP = 15;

export type OnGestureEvent<T extends GestureHandlerGestureEvent> = (event: T) => void;

export type ControlledValuesHook = (
	params: ControlledValuesHookParams,
) => ControlledValuesHookResult;

export type WithControlsHOC = <T extends OptionalWrappers>(
	params: WithControlsHOCParams<CanvasControlledValuesProps & T>,
) => FC<T>;

export interface OptionalWrappers {
	AnimatedHeaderWrapper?: FC;
	AnimatedPriceWrapper?: FC;
	AnimatedChartWrapper?: FC;
}

export type TranslateContext = {
	startX: number;
	pervOriginTranslateX: number;
};

export interface ControlledValues {
	translateX: Animated.SharedValue<number>;
	scaleX: Animated.SharedValue<number>;
	adaptation: Animated.SharedValue<Adaptation>;
}

export interface CanvasControlledValuesProps extends ControlledValues {
	data: CandleType[];
	initialDomain: [number, number];
}

export interface ChartGesturesHandlers {
	handleSlide: OnGestureEvent<PanGestureHandlerGestureEvent>;
	handleZoom?: OnGestureEvent<PinchGestureHandlerGestureEvent>;
}

export interface PanPinchValues extends ControlledValues, ChartGesturesHandlers {}

export type CheckActiveEventType = ({ nativeEvent }: GestureEvent) => void;
export interface LongTapValues {
	candleIndex: Animated.SharedValue<number>;
	translateXLongPress: Animated.SharedValue<number>;
	range: Animated.SharedValue<[number, number]>;
	translateXLongPressLabel: Animated.SharedValue<number>;
	translateYLongPress: Animated.SharedValue<number>;
	opacityLongPress: Animated.SharedValue<number>;
	gestureActive: Animated.SharedValue<number>;
	onGestureEventPanLongPress: OnGestureEvent<PanGestureHandlerGestureEvent>;
	onLongPress: OnGestureEvent<LongPressGestureHandlerGestureEvent>;
	checkActiveEvent: CheckActiveEventType;
}

export type VisiblePointCalculator = (args: {
	sourceData: CandleType[];
	zoom: Animated.SharedValue<number>;
	candleWidth: number;
	timeFrame: string | null;
}) => VisibleDataItem[] | CandleType[];

export type ConfigureDateOnTimeFrame = (args: {
	sourceData: CandleType[];
	zoom: Animated.SharedValue<number>;
	candleWidth: number;
}) => VisibleDataItem[];
export interface VisibleDataItem {
	x: number;
	payload: string;
	visible: boolean;
	originalIndex: number;
}
export interface ControlledValuesHookResult {
	panPinch: PanPinchValues;
	longTap: LongTapValues;
	visibleData: VisibleDataItem[];
}

export interface ControlledValuesHookParams {
	data: CandleType[];
	candleWidth: number;
	timeFrame: string;
	viewportWidth: number;
	initialDomain: [number, number];
}

export interface CrossProps {
	opacityLongPress: Animated.SharedValue<number>;
	translateXLongPress: Animated.SharedValue<number>;
	translateYLongPress: Animated.SharedValue<number>;
}

export interface PriceProps {
	gestureActive: Animated.SharedValue<number>;
	candleIndex: Animated.SharedValue<number>;
	data: CandleType[];
	livePrice: number | null;
}

export interface CompanyNameProps {
	name: string;
	ticker: string;
}

export interface LabelProps {
	translateXLongPressLabel: Animated.SharedValue<number>;
	translateX: Animated.SharedValue<number>;
	opacityLongPress: Animated.SharedValue<number>;
	scaleX: Animated.SharedValue<number>;
	data: CandleType[];
}

export interface WithControlsHOCParams<T> {
	Canvas: FC<T>;
	Cross: FC<CrossProps>;
	Price: FC<PriceProps>;
	CompanyName: FC<CompanyNameProps>;
	Label: FC<LabelProps>;
	candleWidth: number;

}

export type CanvasProps = ControlledValues

export interface Adaptation {
	scaleY: number;
	offsetByY: number;
}

export interface OuterIndicatorComponentProps {
	scaleX: Animated.SharedValue<number>;
	height: number;
}

export interface Curve {
	c1: Vector;
	c2: Vector;
	to: Vector;
}
