import React, { FC, MutableRefObject } from "react";
import Animated from "react-native-reanimated";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";

import { OnGestureEvent } from "../helpers/Model";

interface PanPinchProps {
	refs: {
		slideRef: MutableRefObject<PanGestureHandler | undefined>;
	};
	handleSlide: OnGestureEvent<PanGestureHandlerGestureEvent>;
	children: any;
}

export const PanPinch: FC<PanPinchProps> = ({ refs: { slideRef }, handleSlide, children }) => (
	<Animated.View>
		<PanGestureHandler onGestureEvent={ handleSlide } ref={ slideRef }>
			<Animated.View>{children}</Animated.View>
		</PanGestureHandler>
	</Animated.View>
);
