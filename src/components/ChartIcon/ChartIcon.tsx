import React, { FC } from "react";
import { Path, Svg, Rect } from "react-native-svg";

type PropsType = {
	focused: boolean;
};
export const ChartIcon: FC<PropsType> = ({ focused }) => (
	<Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
		<Rect width="24" height="24" fill="white" />
		<Path
			d="M6 14.0107L10.0059 10L14.0118 14.0107L18.0177 10"
			stroke={ focused ? "#03061D" : "#9A9BA5" }
			strokeWidth="1.75"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<Path
			d="M17 22.125H7C4.16954 22.125 1.875 19.8305 1.875 17V7C1.875 4.16954 4.16954 1.875 7 1.875H17H17.5C20.0543 1.875 22.125 3.94568 22.125 6.5V7V17C22.125 19.8305 19.8305 22.125 17 22.125Z"
			stroke={ focused ? "#03061D" : "#9A9BA5" }
			strokeWidth="1.75"
		/>
	</Svg>
);
