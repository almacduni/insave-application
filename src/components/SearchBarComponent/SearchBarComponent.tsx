import React, { FC } from "react";
import { Platform, TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";
import styled from "styled-components/native";

import CloseSearchScreenIcon from "../../assets/CloseSearchScreenIcon.svg";
import SearchScreenIcon from "../../assets/SearchScreenIcon.svg";
import { scale, verticalScale } from "../../helpers/sizeConverter";

type PropsType = {
	onChangeSearch?: (search: string) => void;
	toggleOnClear?: () => void;
	search?: string;
	isFocus?: boolean;
	inputRef?: any;
	onChangeStateSearch?: (search: string) => void;
	placeholder?: string;
	setIsFirstLoad?: (arg1: boolean) => void;
	setFirstTouch?: (arg1: boolean) => void;
	withCancel?: boolean;
	style?: any;
	changeWithCancel?: () => void;
	visible?: boolean;
	setWithCancel?: (arg1: boolean) => void;
	toggleOnCancel?: () => void;
};

export const SearchBarComponent: FC<PropsType> = ({
	onChangeSearch,
	search,
	inputRef,
	toggleOnClear,
	setIsFirstLoad,
	onChangeStateSearch,
	placeholder,
	withCancel = false,
	isFocus,
	changeWithCancel,
	visible,
	setWithCancel,
	setFirstTouch,
	toggleOnCancel,
	style,
}: PropsType) => {
	const toggleOnPress = () => {
		if (onChangeSearch) {
			onChangeSearch("");
		}
		if (setIsFirstLoad) {
			setIsFirstLoad(false);
		}
		if (inputRef && inputRef.current) {
			inputRef.current.focus();
		}
	};
	const handleChangeText = (value: string) => {
		if (onChangeStateSearch) {
			onChangeStateSearch(value);
		}
		if (setWithCancel) {
			setWithCancel(true);
		}
		if (onChangeSearch) {
			onChangeSearch(value);
		}
		if (setIsFirstLoad) {
			setIsFirstLoad(false);
		}

	};
	const renderCancelBtn = () => {
		if (withCancel) {
			return <CancelSearchBar onPress={ toggleOnCancel }>Cancel</CancelSearchBar>;
		}
		if (search && !onChangeStateSearch) {
			return <CancelSearchBar onPress={ toggleOnCancel }>Cancel</CancelSearchBar>;

		}

	};

	React.useEffect(() => {
		if (inputRef && inputRef.current) {
			setTimeout(() => inputRef.current.focus(), 40);
		}
	}, []);

	return (
		<WrapperSearchBar style={ { marginTop: verticalScale(8) } }>
			{Platform.OS === "ios" ? (
				<>
					<SearchBar
						ref={ inputRef }
						platform={ Platform.OS === "ios" ? "ios" : "android" }
						placeholder={ placeholder ? placeholder : "Enter ticker or company name" }
						onChangeText={ handleChangeText }
						autoFocus={ isFocus }
						onPress={ () => {
							setFirstTouch && setFirstTouch(true);
						} }
						value={ search }
						onFocus={ () => changeWithCancel && changeWithCancel() }
						lightTheme={ true }
						onCancel={ toggleOnCancel ? toggleOnCancel : () => {} }
						searchIcon={
							<SearchScreenIcon
								width={ scale(24) }
								height={ verticalScale(24) }
								style={ { transform: [{ translateY: -1 }] } }
							/>
						}
						placeholderTextColor="rgba(37, 37, 37, 0.4)"
						inputStyle={ {
							fontFamily: "ProximaNova-Regular",
							fontSize: scale(13),
							color: "#03061D",
							backgroundColor: "#F8F8F8",
							marginLeft: 0,
							zIndex: 2,
						} }
						inputContainerStyle={ {
							backgroundColor: "#F8F8F8"
						} }
						containerStyle={ {
							width: withCancel || search ? "103%" : "93%",
							backgroundColor: "#fff",
							borderRadius: scale(6),
							zIndex: 2,
							borderColor: "rgba(68, 68, 68, 0.2)",
							borderWidth: scale(0.3),
							paddingHorizontal: 0,
							height: verticalScale(38),
							justifyContent: "center",
						} }
					/>
				</>
			) : (
				<>
					<SearchBar
						ref={ inputRef }
						placeholder={ placeholder ? placeholder : "Enter ticker or company name" }
						onChangeText={ handleChangeText }
						autoFocus={ isFocus }
						onPress={ () => {
							setFirstTouch && setFirstTouch(true);
						} }
						value={ search }
						onFocus={ () => changeWithCancel && changeWithCancel() }
						lightTheme={ true }
						platform="android"
						clearIcon={
							search && !onChangeStateSearch ? (
								<TouchableOpacity onPress={ toggleOnClear ? toggleOnClear : toggleOnPress }>
									<CloseSearchScreenIcon width={ scale(24) } height={ verticalScale(24) } />
								</TouchableOpacity>
							) : (
								<></>
							)
						}
						cancelIcon={
							<SearchScreenIcon
								width={ scale(24) }
								height={ verticalScale(24) }
								style={ { transform: [{ translateY: -1 }] } }
							/>
						}
						searchIcon={
							<SearchScreenIcon
								width={ scale(24) }
								height={ verticalScale(24) }
								style={ { transform: [{ translateY: -1 }] } }
							/>
						}
						placeholderTextColor="rgba(37, 37, 37, 0.4)"
						inputStyle={ {
							fontFamily: "ProximaNova-Regular",
							fontSize: scale(13),
							marginLeft: 0,
							zIndex: 2,
						} }
						containerStyle={ {
							width: withCancel || search ? "85%" : "92%",
							backgroundColor: "#F8F8F8",
							borderRadius: scale(6),
							zIndex: 2,
							borderColor: "rgba(68, 68, 68, 0.2)",
							borderWidth: scale(0.3),
							paddingHorizontal: 0,
							height: verticalScale(38),
							justifyContent: "center",
						} }
					/>
					{renderCancelBtn()}
				</>
			)}
		</WrapperSearchBar>
	);
};

const WrapperSearchBar = styled.View`
	flex-direction: row;
	justify-content: center;
	margin-bottom: 8px;
`;

const CancelSearchBar = styled.Text`
	font-family: ProximaNova-Regular;
	color: #566aec;
	font-size: ${scale(16)}px;
	margin-left: ${scale(12)}px;
	text-align-vertical: center;
`;
