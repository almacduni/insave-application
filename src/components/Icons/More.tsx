import React, { FC } from "react";
import { Svg, Path, Rect } from "react-native-svg";

import { scale } from "../../helpers/sizeConverter";

type IconProps = {
	isActive: boolean;
};

export const MoreIcon: FC<IconProps> = ({ isActive }) => (
	<Svg width={ scale(24) } height={ scale(24) } viewBox="0 0 24 24" fill="none">
		<Rect
			x="5"
			y="9"
			width="14"
			height="10"
			rx="2"
			stroke={ isActive ? "#344CD3" : "#252525" }
			strokeWidth="2"
		/>
		<Path
			d="M8 7C8 5.89543 8.89543 5 10 5H14C15.1046 5 16 5.89543 16 7V9H8V7Z"
			stroke={ isActive ? "#344CD3" : "#252525" }
			strokeWidth="2"
		/>
	</Svg>
);
