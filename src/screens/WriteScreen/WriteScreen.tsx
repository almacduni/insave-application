import React, { FC, useCallback, useRef, useState } from "react";
import { ScrollView, PermissionsAndroid, Image, Platform } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { Formik } from "formik";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSequence,
	withTiming,
} from "react-native-reanimated";
import { launchImageLibrary, MediaType } from "react-native-image-picker";
import styled from "styled-components/native";

import { RootStackParamList } from "../../routes/Routing";
import { WritePoll } from "./WritePoll";
import DeleteIcon from "../../assets/deleteImgIcon.svg";
import Poll from "../../assets/pollIcon.svg";
import Camera from "../../assets/image.svg";
import { RandomAvatar } from "../../components/RandomAvatar/RandomAvatar";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import { createPost, toggleBarVisibleAC } from "../../redux/feedSlice";
import { useAppSelector } from "../../hooks/useRedux";
import { ButtonBack, WithSafeArea } from "../../shared/ui";

type WriteScreenNavigationPropsType = StackNavigationProp<RootStackParamList, "WriteScreen">;

type WriteScreenPropsType = {
	navigation: WriteScreenNavigationPropsType;
	userId: number | null;
};

type Options = {
	mediaType: MediaType;
	includeBase64: boolean;
};
type UriImage = {
	uri: string;
};
export type Choice = { [key: string]: string | number; id: number; number: number };
export type ChoicesOptions = {
	number: number;
	id: number;
	isFocused: boolean;
};

export const WriteScreen: FC<WriteScreenPropsType> = ({ navigation }) => {
	const stateLogin = useAppSelector((state) => state.user);
	const formRef = useRef(null as any);
	const formRefSec = useRef(null as any);
	const summaryRef = useRef(null as any);
	const MAX_LENGTH = 300;
	const dispatch = useDispatch();
	const [textSummary, setTextSummary] = useState<string>("");
	const [addChoices, setAddChoices] = useState<Choice>({});
	const [isPoll, setIsPoll] = useState<boolean>(false);
	const [countClick, setCountClick] = useState(0);
	const [isChoices, setIsChoices] = useState<boolean>(false);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [choices, setChoices] = useState<Array<ChoicesOptions>>([
		{ number: 1, id: 1, isFocused: false },
		{ number: 2, id: 2, isFocused: false },
	]);
	const [poll, setPoll] = useState<Array<string | number> | []>([]);
	const [imageList, setImageList] = useState<Array<UriImage>>([]);

	useFocusEffect(
		useCallback(() => {
			dispatch(toggleBarVisibleAC(false));

			return () => dispatch(toggleBarVisibleAC(true));
		}, []),
	);

	const translate = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translate.value }],
	}));

	const handleSubmit = () => {
		if (formRef.current && textSummary.length <= MAX_LENGTH) formRef.current.handleSubmit();
		else
			translate.value = withSequence(
				withTiming(0, { duration: 500 }),
				withTiming(-10, { duration: 50 }),
				withRepeat(withTiming(0, { duration: 100 }), 3, true),
				withTiming(0, { duration: 50 }),
			);
	};

	const handleOpenPoll = () => {
		setIsPoll(true);
		setIsChoices(false);
	};
	const buildPoll = (values: Choice): Array<string | number> | [] => {
		if (isPoll) {
			const keys = Object.keys(values);

			return	keys.map((value) => values[value]);
		}

		return [];
	};
	const buildPictures = (values: Array<UriImage>) => values.map((item) => item.uri);

	const handleClosePoll = () => {
		setIsPoll(false);
		setIsChoices(true);
		summaryRef.current.focus();
	};

	const handleEditChoices = () => {
		setIsPoll(true);
		setIsChoices(false);
		setIsEditing(true);
	};

	const handleTakePhoto = async () => {
		try {
			const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				const options: Options = {
					mediaType: "photo",
					includeBase64: true,
				};

				launchImageLibrary(options, async (result) => {
					if (result.didCancel) console.log("DID cancel", result.errorCode);
					else {
						const source: { uri: string } = {
							uri: `data:${result.assets[0].type};base64,` + result.assets[0].base64,
						};

						imageList.length !== 0 ? setImageList([...imageList, source]) : setImageList([source]);
					}
				});
			} else console.log("Camera permission denied");
		} catch (err) {
			console.warn(err);
		}
	};
	const deleteImageList = (index: number) => {
		setImageList((prevImages) => prevImages.filter((item) => item !== imageList[index]));
	};

	return (
		<WithSafeArea>

			<MainContainer
				behavior={ Platform.OS === "ios" ? "padding" : "default" }
				enabled
				keyboardVerticalOffset={ Platform.select({
					ios: 50,
				}) }
			>
				<Formik
					innerRef={ formRef }
					initialValues={ { summary: "" } }
					onSubmit={ (values) => {
						const text = values.summary;
						const userId = stateLogin.userId;
						const pictures = buildPictures(imageList);
						const tweet = {
							poll,
							text,
						};
						const formData = new FormData();

						formData.append("postRequest", JSON.stringify({ text }));
						if (countClick === 0)
							if (text.trim().length !== 0) {
								dispatch(createPost(formData));
								setCountClick((prevCount) => prevCount + 1);

								return navigation.goBack();
							} else {
								setCountClick((prevCount) => prevCount + 1);

								return navigation.goBack();
							}
					} }
				>
					{({ handleChange, handleBlur, values, handleReset }) => (
						<>
							<HeaderContainer>
								<ButtonBack onPress={ navigation.goBack } title="Back" />
								<HeadTitle>New Post</HeadTitle>
								<ButtonPost onPress={ handleSubmit }>Post</ButtonPost>
							</HeaderContainer>
							<ScrollView keyboardShouldPersistTaps={ "always" }>
								<ItemInfoCover>
									<ImageContainer>
										<RandomAvatar
											width={ 36 }
											height={ 36 }
											username={ stateLogin.username }
											fontSize={ 17 }
										/>
									</ImageContainer>
									<Summary
										onBlur={ handleBlur("summary") }
										onChangeText={ handleChange("summary") }
										onChange={ setTextSummary(values.summary) }
										value={ values.summary }
										autoFocus
										placeholder={ isPoll ? "Ask a question..." : "What’s interesting?" }
										multiline
										//	maxLength={MAX_LENGTH}
										ref={ summaryRef }
									/>
								</ItemInfoCover>

								{isChoices && Object.entries(addChoices).length !== 0 && (
									<FieldsPoll>
										<EditBtnChoices onPress={ handleEditChoices }>Edit</EditBtnChoices>

										{Object.keys(addChoices).map((item: string, index) => (
											<ChoicesCover key={ `${item}-${index}` }>
												<ChoicesText>{addChoices[item]}</ChoicesText>
											</ChoicesCover>
										))}
									</FieldsPoll>
								)}
							</ScrollView>
						</>
					)}
				</Formik>

				{isPoll && (
					<Formik
						innerRef={ formRefSec }
						initialValues={ addChoices }
						onSubmit={ (values) => {
							setPoll(buildPoll(values));
						} }
					>
						{({ handleChange, handleBlur, values, handleReset, handleSubmit }) => (
							<WritePoll
								navigation={ navigation }
								values={ values }
								isPoll={ isPoll }
								handleChange={ handleChange }
								handleBlur={ handleBlur }
								handleClosePoll={ handleClosePoll }
								handleSubmit={ handleSubmit }
								handleAddChoices={ setAddChoices }
								choicesAdded={ addChoices }
								showChoices={ setIsChoices }
								isEditing={ isEditing }
								choices={ choices }
								setChoices={ setChoices }
							/>
						)}
					</Formik>
				)}
				{imageList.length !== 0 && !isPoll && (
					<ImagesListContainer>
						{imageList.map((image, index) => (
							<ImageListItemContainer key={ `${image}_${index}` }>
								<Image
									source={ image }
									style={ { height: verticalScale(60), width: scale(60), borderRadius: scale(10) } }
								/>
								<DeleteImg onPress={ () => deleteImageList(index) }>
									<DeleteIcon width={ scale(22) } height={ verticalScale(22) } />
								</DeleteImg>
							</ImageListItemContainer>
						))}
					</ImagesListContainer>
				)}
				{!isPoll && (
					<>
						<BottomContainer>
							<ButtonsContainer>
								<CameraButton onPress={ handleTakePhoto }>
									<Camera width={ scale(22) } height={ verticalScale(22) } />
								</CameraButton>
								<PollButton onPress={ handleOpenPoll }>
									<Poll width={ scale(22) } height={ verticalScale(22) } />
								</PollButton>
							</ButtonsContainer>
							<Animated.View style={ [animatedStyle] }>
								<CountMaxLenght maxLength={ MAX_LENGTH } textlength={ textSummary.length }>
									{textSummary.length}/{MAX_LENGTH}
								</CountMaxLenght>
							</Animated.View>
						</BottomContainer>
					</>
				)}
			</MainContainer>
		</WithSafeArea>

	);
};

const MainContainer = styled.KeyboardAvoidingView`
	justify-content: space-between;
	background-color: #ffffff;
	height: 100%;
`;

const HeaderContainer = styled.View`
	align-items: center;
	flex-direction: row;
	padding: ${scale(12)}px 16px ${scale(4.26)}px 10px;
	justify-content: space-between;
	margin-bottom: ${verticalScale(12)}px;
`;

const HeadTitle = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${scale(17)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.15)}px;
`;
const ButtonPost = styled.Text`
	font-family: ProximaNova-SemiBold;
	font-size: ${scale(17)}px;
	line-height: ${verticalScale(22)}px;
	padding: ${verticalScale(4)}px ${scale(17)}px;
	background: #566aec;
	border-radius: ${scale(44)}px;
	color: rgb(255, 255, 255);
`;

const Summary = styled.TextInput`
	font-family: Proxima Nova;
	font-size: ${scale(16)}px;
	padding: ${verticalScale(10)}px ${scale(16)}px ${verticalScale(5)}px ${scale(10)}px;
	flex: 1;
	text-align-vertical: top;
`;

const ImageContainer = styled.View`
	margin-left: 16px;
	width: ${scale(40)}px;
	height: ${verticalScale(40)}px;
`;
const ImageListItemContainer = styled.View`
	position: relative;
	margin-right: ${scale(8)}px;
`;
const EditBtnChoices = styled.Text`
	font-family: Proxima Nova;
	font-weight: bold;
	font-size: ${scale(17)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.25)}px;
	color: rgba(86, 106, 236, 1);
	margin-bottom: ${verticalScale(10)}px;
	margin-top: ${verticalScale(15)}px;
`;

const ButtonsContainer = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;

const ItemInfoCover = styled.View`
	flex-direction: row;
`;

const FieldsPoll = styled.View`
	padding: ${verticalScale(5)}px 16px;
`;
const ChoicesCover = styled.View`
	flex: 1;
	flex-direction: row;
	align-items: center;
	padding: 10px 10px 10px 16px;
	background: rgba(17, 3, 32, 0.05);
	border-radius: ${scale(10)}px;
	margin-bottom: ${verticalScale(8)}px;
`;

const ChoicesText = styled.Text`
	font-family: Proxima Nova;
	font-size: ${scale(16)}px;
	letter-spacing: ${scale(0.5)}px;
`;

const BottomContainer = styled.View`
	border-top-width: 1;
	border-top-color: rgba(17, 3, 32, 0.05);
	align-items: center;
	flex-direction: row;
	justify-content: space-between;
	padding-left: 16px;
	padding-bottom: ${verticalScale(8)}px;
	padding-top: ${verticalScale(10)}px;
`;
const DeleteImg = styled.TouchableOpacity`
	position: absolute;
	right: ${scale(4)}px;
	top: ${verticalScale(4)}px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: ${scale(8)}px;
	width: ${scale(22)}px;
	height: ${verticalScale(22)}px;
	background: #ffffff;
`;
const ImagesListContainer = styled.View`
	display: flex;
	flex-direction: row;
	margin-left: ${scale(18)}px;
	margin-bottom: ${verticalScale(15)}px;
`;
const CameraButton = styled.Pressable``;

const PollButton = styled(CameraButton)`
	margin-left: ${scale(15)}px;
`;
const CountMaxLenght = styled.Text<{ textlength: number; maxLength: number }>`
	font-size: ${scale(14)}px;
	color: ${({ textlength, maxLength }) => (textlength <= maxLength ? "#9A9BA5" : "rgba(235, 0, 70, 1)")};
	margin-right: ${scale(15)}px;
`;
