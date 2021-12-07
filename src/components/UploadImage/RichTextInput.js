import React, { useCallback, useRef, useState } from "react";
import WebCamera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { Box, Button, Keyboard, Image, TextInput } from "grommet";
import { FormClose, Camera, Gallery, Close } from "grommet-icons";
import CameraModal from "./CameraModal";

function RichTextInput({ onSubmit, ...rest }) {

	const [image, setImage] = useState("");
	const [showCamera, setShowCamera] = useState(false);
	const [allowEnter, setAllowEnter] = useState(true);

	const fileInputRef = useRef(null);

	const openFileDialog = () => {
		fileInputRef.current.click();
	};

	const onEnter = useCallback(
		event => {
			if (allowEnter) {
				onSubmit(image);
				setImage("");
			}
			setAllowEnter(true);
		},
		[image, allowEnter, onSubmit]
	);

	const onFilesAdded = event => {
		let file = event.target.files[0];

		const reader = new FileReader();
		reader.onload = e => {
			const img = e.target.result;
			console.log(img)
			setImage(img);

			// img.onload = () => {
			// 	console.log(img);
			// };
		};
		reader.onabort = () => console.log("file reading was aborted");
		reader.onerror = () => console.log("file reading has failed");
		if (file) {
			reader.readAsDataURL(file);
		}
	};

	return (
		<Box>
			<Box alignSelf="start" direction="column">
				{image && (
					<Box width="full" align="center">
						<Box align="end" background="dark-1" alignSelf="stretch">
							<Button
								icon={<FormClose />}
								onClick={() => {
									setImage("");
									setShowCamera(false);
								}}
							/>
						</Box>
						<Image
							style={{
								maxHeight: "100%",
								maxWidth: "100%"
							}}
							fit="cover"
							src={image}
						/>
					</Box>
				)}

				{showCamera && (
					<CameraModal onClose={() => setShowCamera(false)}>
						<WebCamera
							idealResolution={{ width: 500, height: 400 }}
							onTakePhoto={dataUri => {
								console.log(dataUri)
								setImage(dataUri);
								setShowCamera(false);
							}}
						/>
					</CameraModal>
				)}
			</Box>
			<Keyboard
				onEnter={onEnter}
				onKeyDown={e => setAllowEnter(e.key === 'Enter')}
			>
				<Box
					direction="row"
					align="center"
					pad={{ horizontal: "xsmall" }}
					border="all"
					wrap
				>
					<Box direction="row" align="stretch">
						<Box alignSelf="end" direction="row">
							<Button
								icon={showCamera ? <Close /> : <Camera />}
								onClick={() => setShowCamera(!showCamera)}
							/>
							<Button icon={<Gallery />} onClick={openFileDialog} />
							<TextInput
								hidden
								ref={fileInputRef}
								type="file"
								multiple
								onChange={onFilesAdded}
							/>
						</Box>
					</Box>
				</Box>
			</Keyboard>
		</Box>
	);
}

export default RichTextInput;