import React, { FC } from "react";
import { Path, Svg } from "react-native-svg";

type PropsType = {
	focused: boolean;
};
export const HomeIcon: FC<PropsType> = ({ focused }) => (
	<Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
		<Path
			d="M10.3113 1.15431L1.31125 9.70431C1.11252 9.89311 1 10.1552 1 10.4293V20C1 20.5523 1.44772 21 2 21H7.94558C7.97563 21 8 20.9756 8 20.9456V16C8 14.3431 9.34315 13 11 13C12.6569 13 14 14.3431 14 16V20.9456C14 20.9756 14.0244 21 14.0544 21H20C20.5523 21 21 20.5523 21 20V10.4293C21 10.1552 20.8875 9.89311 20.6887 9.70431L11.6887 1.15431C11.3028 0.787645 10.6972 0.787644 10.3113 1.15431Z"
			stroke={ focused ? "#03061D" : "#9A9BA5" }
			strokeWidth="1.75"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</Svg>
);
