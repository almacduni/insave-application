import React, { FC, useMemo, useRef, useState } from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import styled from "styled-components/native";
import { KeyboardAvoidingView, Platform, TextInput } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { ScrollView } from "react-native-gesture-handler";

import { ChoicesOptions, Choice } from "./WriteScreen";
import { sc, scale, verticalScale } from "../../helpers/sizeConverter";
import TrashIcon from "../../assets/trashIcon.svg";
import AddInputIcon from "../../assets/addInputIcon.svg";
import { HandleIcon } from "../../components/HandleIcon/HandleIcon";
import { WithBottomSheet } from "../../entity/bottom-sheet";

type WritePollPropsType = {
	handleBlur: any;
	isPoll: boolean;
	handleChange: any;
	navigation: any;
	values: any;
	handleClosePoll: () => void;
	handleSubmit: any;
	handleAddChoices: any;
	showChoices: any;
	choicesAdded: Choice;
	isEditing: boolean;
	choices: Array<ChoicesOptions>;
	setChoices: any;
};
type Choices = {
	number: number;
	id: number;
	isFocused: boolean;
};
export const WritePoll: FC<WritePollPropsType> = ({
	handleChange,
	handleBlur,
	navigation,
	values,
	isPoll,
	handleClosePoll,
	handleSubmit,
	handleAddChoices,
	showChoices,
	choicesAdded,
	isEditing,
	choices,
	setChoices,
}) => {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const ref = useRef<ScrollView>(null);
	const snapPoints = useMemo(() => [1, wp("78%")], []);
	const [isMaxChoices, setIsMaxChoices] = useState<boolean>(false);
	const [borderColor, setBorderColor] = useState<boolean>(false);
	const InputFirstRef = useRef<TextInput>(null);
	const InputSecondRef = useRef<TextInput>(null);
	const InputThirdRef = useRef<TextInput>(null);
	const InputFourthRef = useRef<TextInput>(null);
	const InputFifthRef = useRef<TextInput>(null);
	const InputSixthRef = useRef<TextInput>(null);
	const InputRef = useRef<TextInput>(null);
	const handlePlusButton = (): void => {
		if (choices.length === 5) setIsMaxChoices(true);

		if (choices.length !== 0) {
			setChoices((choices: Choices[]) => [
				...choices,
				{
					number: choices[choices.length - 1].number + 1,
					id: choices[choices.length - 1].number + 1,
					isFocused: false,
				},
			]);
		} else {
			setChoices((choices: Choices[]) => [...choices, { number: 1, id: 1, isFocused: false }]);
		}
		setTimeout(() => {
			if (choices[4]) {
				ref.current?.scrollToEnd({ animated: true });

				return InputSixthRef?.current?.focus();
			} else if (choices[3]) {
				ref.current?.scrollToEnd({ animated: true });

				return InputFifthRef?.current?.focus();
			} else if (choices[2]) {
				ref.current?.scrollToEnd({ animated: true });

				return InputFourthRef?.current?.focus();
			} else if (choices[1]) {
				ref.current?.scrollToEnd({ animated: true });

				return InputThirdRef?.current?.focus();
			} else if (choices[0]) {
				ref.current?.scrollToEnd({ animated: true });

				return InputSecondRef?.current?.focus();
			} else {
				return InputFirstRef?.current?.focus();
			}
		}, 100);
	};

	const handleDeleteButton = (option: { number: number; id: number }, choiceElement: string) => {
		setIsMaxChoices(false);
		setChoices(choices.filter((item) => option.id !== item.id));
		const arrChoices = [...choices].splice(option.id);

		arrChoices.map((item) => {
			item.id -= 1;
			item.number -= 1;

			return item;
		});
		delete choicesAdded[choiceElement];
		const choicesProto: any = { ...choicesAdded };
		const choicesArrayResult = Object.keys(choicesProto).map((item: any) => {
			if (item === "choice-1") return "choice-1";
			else {
				const lastLetter = item.slice(-1) - 1;

				item = item.substring(0, item.length - 1) + lastLetter;

				return item;
			}
		});
		const resultAll = choicesArrayResult.map((item) => {
			const lastLetter: number = +item.slice(-1) + 1;
			const valueKey: string = item.substring(0, item.length - 1);
			const value = choicesProto[valueKey + lastLetter];
			const arrValues = Object.keys(choicesProto);

			if (arrValues[0] === "choice-1" && item === "choice-1") {
				let lastLetterCount = lastLetter;

				lastLetterCount -= 1;
				const valueFirst = choicesProto[valueKey + lastLetterCount];

				delete choicesProto[valueKey + lastLetterCount];
				choicesProto[valueKey + lastLetterCount] = valueFirst;
			} else {
				let lastLetterCountSeconds = lastLetter;

				delete choicesProto[valueKey + lastLetterCountSeconds];
				lastLetterCountSeconds -= 1;
				choicesProto[valueKey + lastLetterCountSeconds] = value;
			}
		});
		const valuesArr = Object.keys(values);
		const choicesArrayResultValues = valuesArr.map((item) => {
			if (item === "choice-1") return "choice-1";
			else {
				const lastLetter = item.slice(-1) - 1;

				item = item.substring(0, item.length - 1) + lastLetter;

				return item;
			}
		});

		choicesArrayResultValues.map((item) => {
			const lastLetter = +item.slice(-1) + 1;
			const valueKey = item.substring(0, item.length - 1);
			const arrValues = Object.keys(values);

			if (arrValues[lastLetter - 2] === item) return;
			else if (arrValues[0] === "choice-1" && item === "choice-1") {
				let lastLetterCount = lastLetter;

				lastLetterCount -= 1;
				const valueFirst = values[valueKey + lastLetterCount];

				delete values[valueKey + lastLetterCount];
				values[valueKey + lastLetterCount] = valueFirst;

				return;
			} else {
				let lastLetterCountSeconds = lastLetter;
				const valueWillDelete = values[valueKey + lastLetterCountSeconds];

				delete values[valueKey + lastLetterCountSeconds];
				lastLetterCountSeconds -= 1;
				values[valueKey + lastLetterCountSeconds] = valueWillDelete;
			}
		});

		choicesAdded = { ...choicesProto };
		handleAddChoices(choicesAdded);
	};
	const handleSubmitForm = () => {
		handleSubmit();
		handleCloseSheet();
		showChoices(true);
		setChoices(
			choices.map((item) => ({
				...item,
				isFocused: false,
			})),
		);
		const choicesProto = choicesAdded;
		const value = Object.keys(choicesProto);
		let finallyResult = {};
		const result = value.map((item, index) => {
			if (choicesProto[item] === "") {
				delete choicesProto[item];

				return;
			} else {
				finallyResult = {
					...finallyResult,
					[item]: choicesProto[item],
				};

				return {
					...finallyResult,
					[item]: choicesProto[item],
				};
			}
		});

		const finnally = result.filter((item) => result[item] !== "");

		handleAddChoices(finallyResult);
	};

	const handleCloseSheet = () => {
		bottomSheetRef.current?.forceClose();
		handleClosePoll();
	};

	React.useEffect(() => {
		if (isPoll) {
			InputFirstRef?.current?.focus();
		}
	}, [isPoll]);

	return (
		<Container>
			<KeyboardAvoidingView
				style={ { flex: 1 } }
				enabled
				keyboardVerticalOffset={ Platform.OS === "ios" ? 40 : 0 }
				behavior="height"
			>
				<WithBottomSheet snapPoints={ snapPoints } handleCloseSheet={ handleCloseSheet } bottomSheetRef={ bottomSheetRef }>

					<Wrapper>
						<ScrollView
							ref={ ref }
							keyboardShouldPersistTaps={ "always" }
							showsVerticalScrollIndicator={ false }
						>
							<HandleWrapper>
								<HandleIcon />
							</HandleWrapper>
							<TitlePoll>New poll</TitlePoll>
							{!isEditing &&
								choices.map((num, index) => {
									const choicesArr = Object.keys(choicesAdded);
									const choiceElement = choicesArr[num.number - 1];
									const placeholder = `Option ${num.number}`;

									return (
										<CoverInput key={ `${num.number}_${index}` }>
											<ChoiceInput
												onBlur={ () => {
													setBorderColor(!borderColor);
													handleBlur(`choice-${num}`);
													num.isFocused = false;
												} }
												ref={
													index === 0
														? InputFirstRef
														: index === 1
															? InputSecondRef
															: index === 2
																? InputThirdRef
																: index === 3
																	? InputFourthRef
																	: index === 4
																		? InputFifthRef
																		: InputSixthRef
												}
												onFocus={ () => {
													setBorderColor(!borderColor);
													num.isFocused = true;
												} }
												autoFocus={ index === 0 ? true : false }
												onChangeText={ handleChange(`choice-${num.number}`) }
												onChange={ handleAddChoices(values) }
												placeholder={ placeholder }
												maxLength={ 20 }
												style={
													num.isFocused
														? {
															borderWidth: 1,
															borderColor: "#566aec",
														}
														: {
															borderWidth: 1,
															borderColor: "#e5e5e5",
														}
												}
											/>

											<DeleteButton onPress={ () => handleDeleteButton(num, choiceElement) }>
												<TrashIcon width={ scale(24) } height={ verticalScale(24) } />
											</DeleteButton>
										</CoverInput>
									);
								})}
							{isEditing &&
								choices.map((num, index) => {
									const placeholder = `Option ${num.number}`;
									const choicesArr = Object.keys(choicesAdded);

									console.log(index);
									const choiceValue = choicesAdded[choicesArr[num.number - 1]];
									const choiceElement = choicesArr[num.number - 1];

									return (
										<CoverInput key={ `${num.number}_${index}` }>
											<ChoiceInput
												onBlur={ () => {
													setBorderColor(!borderColor);
													handleBlur(`choice-${num.number}`);
													num.isFocused = false;
												} }
												blurOnSubmit={ false }
												onFocus={ () => {
													setBorderColor(!borderColor);
													num.isFocused = true;
												} }
												ref={
													index === 0
														? InputFirstRef
														: index === 1
															? InputSecondRef
															: index === 2
																? InputThirdRef
																: index === 3
																	? InputFourthRef
																	: index === 4
																		? InputFifthRef
																		: InputSixthRef
												}
												onChangeText={ handleChange(`choice-${num.number}`) }
												defaultValue={ choiceValue }
												onChange={ handleAddChoices(values) }
												placeholder={ placeholder }
												maxLength={ 20 }
												style={
													num.isFocused
														? {
															borderWidth: 1,
															borderColor: "#566aec",
														}
														: {
															borderWidth: 1,
															borderColor: "#e5e5e5",
														}
												}
											/>

											<DeleteButton onPress={ () => handleDeleteButton(num, choiceElement) }>
												<TrashIcon width={ scale(24) } height={ verticalScale(24) } />
											</DeleteButton>
										</CoverInput>
									);
								})}
							{!isMaxChoices && (
								<AddButton onPress={ handlePlusButton }>
									<AddText>Add</AddText>
									<AddInputIcon style={ { marginLeft: 5 } } />
								</AddButton>
							)}
							<ReadyButton onPress={ handleSubmitForm }>
								<TextReady>Ready</TextReady>
							</ReadyButton>
						</ScrollView>
					</Wrapper>
				</WithBottomSheet>
			</KeyboardAvoidingView>
		</Container>
	);
};

const Container = styled.Pressable`
	background: rgba(3, 6, 29, 0.2);
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
`;

const ContainerBackSide = styled.Pressable`
	background: rgba(3, 6, 29, 0.2);
	width: 100%;
	height: 100%;
	z-index: -90;
	padding: 0;
`;

const Wrapper = styled.View`
	height: ${verticalScale(310)}px;
	z-index: 105;
	width: 100%;
	background: #ffffff;
	border-top-left-radius: ${scale(10)}px;
	border-top-right-radius: ${scale(10)}px;
	padding: 0 16px 0 16px;
	position: absolute;
	bottom: 0;
`;
const TitlePoll = styled.Text`
	color: rgba(3, 6, 29, 1);
	text-align: center;
	font-weight: 700;
	font-size: ${scale(21)}px;
	line-height: ${verticalScale(28)}px;
	letter-spacing: ${scale(0.15)}px;
`;
const HandleWrapper = styled.View`
	margin-bottom: ${verticalScale(16)}px;
	align-items: center;
`;
const ChoiceInput = styled.TextInput`
	width: 90%;
	padding: ${verticalScale(11)}px ${scale(16)}px;
	margin-bottom: ${verticalScale(2)}px;
	display: flex;
	flex-direction: row;
	align-items: center;
	border-radius: 10px;
`;
const CoverInput = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: ${verticalScale(15)}px;
`;
const DeleteButton = styled.Pressable`
	transform: translateY(${verticalScale(-4)}px);
	margin-left: ${scale(10)}px;
`;
const AddButton = styled.Pressable`
	flex-direction: row;
	align-items: center;
	margin-top: ${verticalScale(15)}px;
`;
const AddText = styled.Text`
	font-family: Proxima Nova;
	font-weight: 600;
	font-size: ${scale(17)}px;
	color: #566aec;
	margin-right: ${scale(4)}px;
`;

const ReadyButton = styled.TouchableOpacity`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-top: ${verticalScale(18)}px;
	padding: ${scale(15)}px;
	background: #566aec;
	border-radius: ${scale(10)}px;
	margin-bottom: 16px;
`;
const TextReady = styled.Text`
	font-weight: 600;
	font-size: ${scale(17)}px;
	color: #ffffff;
`;
