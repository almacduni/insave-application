import React, { FC } from "react";
import { Path, Svg, Rect } from "react-native-svg";

type PropsType = {
	focused: boolean;
};
export const FeedIcon: FC<PropsType> = ({ focused }) => (
	<Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
		<Rect width="24" height="24" fill="white" />
		<Rect
			x="2.875"
			y="1.875"
			width="18.25"
			height="20.25"
			rx="3.125"
			stroke={ focused ? "#03061D" : "#9A9BA5" }
			strokeWidth="1.75"
		/>
		<Path
			d="M7 8L11 8"
			stroke={ focused ? "#03061D" : "#9A9BA5" }
			strokeWidth="1.75"
			strokeLinecap="round"
		/>
		<Path
			d="M7 12L17 12"
			stroke={ focused ? "#03061D" : "#9A9BA5" }
			strokeWidth="1.75"
			strokeLinecap="round"
		/>
		<Path
			d="M7 16L17 16"
			stroke={ focused ? "#03061D" : "#9A9BA5" }
			strokeWidth="1.75"
			strokeLinecap="round"
		/>
	</Svg>
);
