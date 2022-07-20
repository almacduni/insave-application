import React, { FC } from "react";
import Animated, {
	useAnimatedStyle,
	withTiming,
	Easing,
	useSharedValue,
} from "react-native-reanimated";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { SwipeRow } from "../../components/SwipeRow/SwipeRow";
import { StockItem } from "../../components/StockItem/StockItem";
import { sc, scale, verticalScale } from "../../helpers/sizeConverter";
import { Exchanges } from "../../shared/model";

interface Props {
	onRemove: () => any;
	onDrag: () => any;
	toggleClickToRow: () => any;
	symbol: string;
	image: string;
	name: string;
	changesPercentage: number;
	change: number;
	price: number;
	isActive: boolean;
	isSelected: boolean;
	isChanged: boolean;
	exchange: Exchanges;
}

export const WatchListItem: FC<Props> = ({
	onRemove,
	onDrag,
	toggleClickToRow,
	symbol,
	image,
	name,
	changesPercentage,
	exchange,
	change,
	price,
	isActive,
	isSelected,
}) => {
	const style = {
		elevation: isActive ? 3 : 0,
		paddingTop: verticalScale(8),
		paddingBottom: verticalScale(8),
		paddingLeft: scale(16),
		paddingRight: scale(16),
		borderRadius: isActive ? sc(8) : 0,
	};

	const isSelectedValue = useSharedValue(+isSelected);

	const bg = useAnimatedStyle(() => {
		isSelectedValue.value = withTiming(0, { duration: 1000, easing: Easing.bezier(1, -1, 1.0, 0.975) });

		return { backgroundColor: isSelected ? `rgba(222, 222, 222, ${isSelectedValue.value})` : "#fff" };
	});

	return (
		<View key={ symbol }>
			<Animated.View style={ [style, bg] }>
				<TouchableOpacity onLongPress={ onDrag } activeOpacity={ 1 } delayLongPress={ 300 }>
					<SwipeRow onRemove={ onRemove }>
						<StockItem
							handleClick={ toggleClickToRow }
							logo={ image }
							title={ symbol }
							exchange={ exchange }
							subtitle={ name ? name.replace(/[,|.]/g, "") : "" }
							price={ {
								current: price,
								change,
								changeInPercentage: changesPercentage,
							} }
						/>
					</SwipeRow>
				</TouchableOpacity>
			</Animated.View>
		</View>
	);
};
