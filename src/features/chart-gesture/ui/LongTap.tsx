import React, { FC, MutableRefObject } from "react";
import Animated from "react-native-reanimated";
import {
	LongPressGestureHandler,
	LongPressGestureHandlerGestureEvent,
	PanGestureHandler,
	PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

import { CheckActiveEventType, OnGestureEvent } from "../model";

interface LongTapProps {
	refs: {
		slideRef: MutableRefObject<PanGestureHandler | undefined>;
		longTapRef: MutableRefObject<LongPressGestureHandler | undefined>;
		panRef: MutableRefObject<PanGestureHandler | undefined>;
	};
	onLongPress: OnGestureEvent<LongPressGestureHandlerGestureEvent>;
	onGestureEventPanLongPress: OnGestureEvent<PanGestureHandlerGestureEvent>;
	checkActiveEvent: CheckActiveEventType;
	children: any;
}

export const LongTap: FC<LongTapProps> = ({
	refs: { longTapRef, panRef, slideRef },
	onLongPress,
	onGestureEventPanLongPress,
	checkActiveEvent,
	children,
}) => (
	<LongPressGestureHandler
		onHandlerStateChange={ onLongPress }
		ref={ longTapRef }
		minDurationMs={ 1000 }
		simultaneousHandlers={ [panRef] }
	>
		<Animated.View>
			<PanGestureHandler
				waitFor={ [longTapRef, slideRef] }
				onGestureEvent={ onGestureEventPanLongPress }
				ref={ panRef }
				simultaneousHandlers={ [longTapRef, slideRef] }
				onHandlerStateChange={ checkActiveEvent }
				shouldCancelWhenOutside={ true }
			>
				<Animated.View>{children}</Animated.View>
			</PanGestureHandler>
		</Animated.View>
	</LongPressGestureHandler>
);
