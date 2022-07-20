import * as React from "react";
import {
	LongPressGestureHandlerGestureEvent,
	PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

import { Slide } from "./Slide";
import { LongTap } from "./LongTap";
import { CheckActiveEventType, OnGestureEvent } from "../model";

interface ChartGestureProps {
	handleSlide: OnGestureEvent<PanGestureHandlerGestureEvent>,
	onLongPress: OnGestureEvent<LongPressGestureHandlerGestureEvent>,
	onGestureEventPanLongPress: OnGestureEvent<PanGestureHandlerGestureEvent>,
	checkActiveEvent: CheckActiveEventType,
	children: any,
}

export const ChartGesture = (props: ChartGestureProps) => {
	const {
		handleSlide,
		onLongPress,
		onGestureEventPanLongPress,
		checkActiveEvent,
		children
	} = props;

	const slideRef = React.useRef();
	const longTapRef = React.useRef();
	const panRef = React.useRef();

	return (
		<Slide
			slideRef={ slideRef }
			handleSlide={ handleSlide }
		>
			<LongTap
				refs={ {
					slideRef,
					longTapRef,
					panRef
				} }
				onLongPress={ onLongPress }
				onGestureEventPanLongPress={ onGestureEventPanLongPress }
				checkActiveEvent={ checkActiveEvent }
			>
				{children}
			</LongTap>
		</Slide>
	);
};
