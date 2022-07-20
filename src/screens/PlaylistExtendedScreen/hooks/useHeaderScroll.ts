import {
	useSharedValue,
	useDerivedValue,
	withTiming,
	useAnimatedScrollHandler,
} from "react-native-reanimated";

import { scale } from "../../../helpers/sizeConverter";

const useHeaderScroll = () => {
	const imageOffset = scale(180);
	const offset = useSharedValue(false);
	const progress = useDerivedValue(() => (offset.value ? withTiming(1) : withTiming(0)), []);
	const headerScrollHandler = useAnimatedScrollHandler((event) => {
		if (event.contentOffset.y > imageOffset) {
			offset.value = true;

			return;
		}
		offset.value = false;
	});

	return {
		progress,
		headerScrollHandler,
	};
};

export { useHeaderScroll };
