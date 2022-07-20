import React, { FC } from "react";
import { Path, Svg, Circle } from "react-native-svg";

type PropsType = {
	focused: boolean;
};
export const ExploreIcon: FC<PropsType> = ({ focused }) => (
	<Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
		<Path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M8.27002 14.9519L9.8627 9.8627L14.9519 8.27002L13.3593 13.3593L8.27002 14.9519Z"
			stroke={ focused ? "#03061D" : "#9A9BA5" }
			strokeWidth="1.75"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<Circle
			cx="11.611"
			cy="11.611"
			r="9.61098"
			stroke={ focused ? "#03061D" : "#9A9BA5" }
			strokeWidth="1.75"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</Svg>
);
