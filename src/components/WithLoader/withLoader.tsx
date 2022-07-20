import * as React from "react";

import { Loader } from "../Loader/Loader";
import { useAppSelector } from "../../hooks/useRedux";
import { ChatStateType } from "../../redux/chatSlice";

export const withLoader = (totalField: keyof Pick<ChatStateType, "totalChats" | "totalMessages">, resultsLimit: number) => {
	const LoaderBox = ({ offset }: { offset: any }) => {
		const chat: ChatStateType = useAppSelector((state) => state.chat);
		const [canShowLoader, setCanShowLoader] = React.useState(true);

		React.useEffect(() => {
			if (offset.current > Math.floor(chat[totalField] / resultsLimit)) {
				setCanShowLoader(false);
			} else {
				setCanShowLoader(true);
			}
			const timeoutId = setTimeout(() => {
				if (chat[totalField] == 0) {
					setCanShowLoader(false);
				}
			}, 2000);

			return () => {
				clearTimeout(timeoutId);
			};
		}, [offset.current]);

		return canShowLoader ? <Loader /> : <></>;
	};

	return LoaderBox;
};
