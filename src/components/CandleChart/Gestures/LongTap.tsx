import React, { FC, MutableRefObject } from "react";
import Animated from "react-native-reanimated";
import {
	LongPressGestureHandler,
	LongPressGestureHandlerGestureEvent,
	PanGestureHandler,
	PanGestureHandlerGestureEvent,
	PinchGestureHandler,
} from "react-native-gesture-handler";

import { CheckActiveEventType, OnGestureEvent } from "../helpers/Model";

interface LongTapProps {
	refs: {
		pinchRef: MutableRefObject<PinchGestureHandler | undefined>;
		slideRef: MutableRefObject<PanGestureHandler | undefined>;
		longPressRef: MutableRefObject<LongPressGestureHandler | undefined>;
		panRef: MutableRefObject<PanGestureHandler | undefined>;
	};
	onLongPress: OnGestureEvent<LongPressGestureHandlerGestureEvent>;
	onGestureEventPanLongPress: OnGestureEvent<PanGestureHandlerGestureEvent>;
	checkActiveEvent: CheckActiveEventType;
	children: any;
}

export const LongTap: FC<LongTapProps> = ({
	refs: { longPressRef, panRef, slideRef },
	onLongPress,
	onGestureEventPanLongPress,
	checkActiveEvent,
	children,
}) => (
	<LongPressGestureHandler
		onHandlerStateChange={ onLongPress }
		ref={ longPressRef }
		minDurationMs={ 1000 }
		simultaneousHandlers={ [panRef] }
	>
		<Animated.View>
			<PanGestureHandler
				waitFor={ [longPressRef, slideRef] }
				onGestureEvent={ onGestureEventPanLongPress }
				ref={ panRef }
				simultaneousHandlers={ [longPressRef, slideRef] }
				onHandlerStateChange={ checkActiveEvent }
				shouldCancelWhenOutside={ true }
			>
				<Animated.View>{children}</Animated.View>
			</PanGestureHandler>
		</Animated.View>
	</LongPressGestureHandler>
);
