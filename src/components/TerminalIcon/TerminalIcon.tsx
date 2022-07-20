import React, { FC } from "react";
import { Path, Svg, Rect } from "react-native-svg";

type PropsType = {
	focused: boolean;
};
export const TerminalIcon: FC<PropsType> = ({ focused }) => (
	<Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
		<Rect width="24" height="24" fill="white" />
		<Path
			d="M22 14V6C22 3.79086 20.2091 2 18 2H6C3.79086 2 2 3.79086 2 6V15C2 17.2091 3.79086 19 6 19H7"
			stroke={ focused ? "#03061D" : "#9A9BA5" }
			strokeWidth="1.75"
			strokeLinecap="round"
		/>
		<Path
			d="M11 19H21M21 19L18 22M21 19L18 16"
			stroke={ focused ? "#03061D" : "#9A9BA5" }
			strokeWidth="1.75"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<Path
			d="M18 12H8M8 12L11 15M8 12L11 9"
			stroke={ focused ? "#03061D" : "#9A9BA5" }
			strokeWidth="1.75"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</Svg>
);
