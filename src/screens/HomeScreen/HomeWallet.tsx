import React, { useEffect } from "react";
import SInfo from "react-native-sensitive-info";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { Categories } from "../../components/Categories/Categories";
import { useAppSelector } from "../../hooks/useRedux";
import { SkeletonHomeWallet } from "../../skeletons/SkeletonHomeWallet";
import { Wallet } from "../../components/Wallet/Wallet";

export const HomeWallet = ({ navigation }: any) => {
	const isFetching = useAppSelector((state) => state.user.isFetching);
	const userId = useAppSelector((state) => state.user.userId);
	// const [referral, setReferral] = useState("");
	const isHistoryOpen = useSharedValue(false);

	useEffect(() => {
		const getToken = async () => {
			const ref = await SInfo.getItem("referralLink", {});

			console.log(ref);
			// setReferral(ref);
		};

		getToken();
	}, []);

	useEffect(() => {
		if (isHistoryOpen.value)
			isHistoryOpen.value = !isHistoryOpen.value;
	}, [isHistoryOpen]);

	const style = useAnimatedStyle(() => ({
		opacity: withTiming(isHistoryOpen.value ? 0 : 1),
	}));

	return (
		<>
			{isFetching ? (
				<SkeletonHomeWallet />
			) : (
				<Wallet navigation={ navigation } isHistoryOpen={ isHistoryOpen } />
			)}
			<Animated.ScrollView style={ style }>
				<Categories navigation={ navigation } userId={ userId } />
			</Animated.ScrollView>
		</>
	);
};
