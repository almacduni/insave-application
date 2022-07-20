import React, { FC, useState } from "react";
import { Formik } from "formik";
import styled from "styled-components/native";
import { Keyboard } from "react-native";
import { useDispatch } from "react-redux";
import FastImage from "react-native-fast-image";

import { scale, verticalScale } from "../../helpers/sizeConverter";
import SendButtonIcon from "../../assets/ArrowRightSubmitIcon.svg";
import SendGreyIcon from "../../assets/SendGreyIcon.svg";
import GifIcon from "../../assets/gifAddIcon.svg";
import DeleteIcon from "../../assets/deleteImgIcon.svg";
import { authenticationCheck } from "../../helpers/authenticationCheck";
import { createComment } from "../../redux/feedSlice";
import { CircleProgress } from "./CircleProgress";

type PropsType = {
	isExtended?: boolean;
	isLogged: boolean;
	feedType: string;
	feedId: number;
	navigation: any;
	setReply: (arg: { username: string; id: number }) => void;
	commentsCount: number;
	setCommentsCount?: (arg1: (prevState: number) => number) => void;
	setRepliedUsername?: (prevState: object) => void;
	repliedUsername?: object;
	setIsFirstLoad?: (arg1: boolean) => void;
	setInputValue?: (arg1: string) => void;
	inputValue?: any;
	reply: { id: number; username: string };
};

export const CommentBox: FC<PropsType> = ({
	isExtended,

	feedId,
	navigation,
	feedType,
	reply,
	setCommentsCount,
	commentsCount,
	inputValue,

	setRepliedUsername,
	setInputValue,
	setIsFirstLoad,
	setReply,
}) => {
	const dispatch = useDispatch();

	const textLimitPercent = Math.round((inputValue.length / 140) * 100);
	const [isBorderColor, setIsBorderColor] = useState(false);
	const [gifsList, setGifsList] = useState("");
	const onOpenGifs = () => {
		navigation.push("GifScreen", { setGifsList });
		Keyboard.dismiss();
	};

	return (
		<Container isExtended={ isExtended }>
			<Formik
				initialValues={ { comment: "" } }
				onSubmit={ (values, { resetForm }) => {
					if (setIsFirstLoad) {
						setIsFirstLoad(false);
					}
					let value = inputValue;
					let replyUser = reply.username;

					if (value.indexOf("@") === 0) {
						value = value.substr(value.indexOf(" ") + 1);
					} else {
						replyUser = "";
						setReply({} as { username: string; id: number });
					}
					if (setCommentsCount) {
						setCommentsCount((prevState: number) => ++prevState);
					}

					dispatch(
						createComment({
							feedId: feedId,
							commentsCount,
							payload: {
								text: value,
								gifsList,
								isReply: true,
								replyUser: replyUser,
							},
						}),
					);
					if (setInputValue) {
						setInputValue("");
					}

					setReply({} as { username: string; id: number });
					setGifsList("");
					resetForm();
				} }
			>
				{({ handleChange, handleBlur, handleSubmit }) => (
					<FormContainer>
						<IconForm
							onPress={ () => {
								authenticationCheck(onOpenGifs, null, navigation, undefined, {
									fromComments: true,
								});
							} }
						>
							<GifIcon />
						</IconForm>

						<CommentCover
							style={
								isBorderColor
									? {
										borderWidth: 1,
										borderColor: "#566aec",
									}
									: {
										borderWidth: 1,
										borderColor: "#e5e5e5",
									}
							}
						>
							<CommentWrapper>
								<CommentInput
									isReply={ Object.keys(reply).length !== 0 }
									onChangeText={ (value) => {
										handleChange("comment");
										if (setInputValue) {
											setInputValue(value);
										}
										if (setRepliedUsername) {
											setRepliedUsername((prevState: object) => ({
												...prevState,
												commentValue: value,
											}));
										}

									} }
									onBlur={ () => {
										setIsBorderColor(!isBorderColor);
										handleBlur("comment");
									} }
									value={ inputValue }
									onFocus={ () => {
										setIsBorderColor(!isBorderColor);
									} }
									placeholder="Your comment"
									multiline={ true }
									numberOfLines={ 1 }
									maxLength={ 140 }
								/>
								{!!gifsList && (
									<GifContainer>
										<GifItem>
											<FastImage
												style={ { width: scale(56), height: scale(56), borderRadius: 8 } }
												source={ { uri: gifsList } }
											/>
											<DeleteImg onPress={ () => setGifsList("") }>
												<DeleteIcon width={ scale(22) } height={ verticalScale(22) } />
											</DeleteImg>
										</GifItem>
									</GifContainer>
								)}
							</CommentWrapper>
							<CircularContainer>
								<CircleProgress percentage={ textLimitPercent } />
							</CircularContainer>
						</CommentCover>

						<CommentSendButton onPress={ () => authenticationCheck(handleSubmit, null, navigation) }>
							{isBorderColor ? <SendButtonIcon /> : <SendGreyIcon />}
						</CommentSendButton>
					</FormContainer>
				)}
			</Formik>
		</Container>
	);
};

const Container = styled.View<{ isExtended?: boolean }>`
	width: 100%;
	padding: 0;
	background: #fff;
`;

const FormContainer = styled.View`
	position: relative;
	display: flex;
	flex-direction: row;
	border-bottom-color: #f2f2f2;
	border-bottom-width: 1px;
	align-items: flex-end;
	padding: ${verticalScale(0)}px ${scale(8)}px ${verticalScale(10)}px 16px;
	margin-top: 10px;
`;
const IconForm = styled.TouchableOpacity`
	transform: translateY(${verticalScale(-20)}px);
`;

const CommentCover = styled.View`
	border-radius: ${scale(8)}px;
	padding-left: ${scale(5)}px;
	padding-right: ${scale(35)}px;
	flex-direction: row;
	align-items: center;
	transform: translateY(${verticalScale(-8)}px);
	margin-left: ${scale(13)}px;
	position: relative;
	width: ${scale(275)}px;
	overflow: hidden;
	padding-top: 2px;
`;
const CommentInput = styled.TextInput<{ isReply?: boolean }>`
	font-family: ProximaNova-Regular;
	padding: ${scale(6)}px;
	padding-top: ${verticalScale(9)}px;
	padding-bottom: ${verticalScale(7.5)}px;
	flex-direction: row;
	color: black;
	min-width: ${scale(30)}px;
	transform: translateY(${verticalScale(-2)}px);
	width: 100%;
	font-weight: 500;
	font-size: ${scale(13.8)}px;
`;
const CircularContainer = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	position: absolute;
	right: ${scale(7)}px;
	bottom: ${verticalScale(16)}px;
`;
const CommentWrapper = styled.View`
	flex-direction: column;
	border-radius: ${scale(8)}px;
	padding-right: ${scale(35)}px;
	position: relative;
	border-radius: ${scale(8)}px;
	overflow: hidden;
	width: ${scale(275)}px;
	overflow: hidden;
	padding-top: 2px;
	margin-bottom: 2px;
`;
const CommentSendButton = styled.TouchableOpacity`
	transform: translateY(${verticalScale(-21)}px);
	margin-left: ${scale(10)}px;
`;

const GifContainer = styled.View``;

const GifItem = styled.View`
	width: ${scale(56)}px;
	height: ${scale(56)}px;
	border-radius: 8px;
	overflow: hidden;
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
