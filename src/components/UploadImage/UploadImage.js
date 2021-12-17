import React from 'react';
import { Grommet, Box, Heading, Text } from "grommet";
import theme from "./theme";
import RichTextEditor from "./RichTextEditor";
import './UploadImage.scss';
import { useSelector } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';

function UploadImage(props) {

    const token = useSelector(state => state.Auth.token);

    const printSubmittedValue = value => {
        console.log(value)
        let data = value.split(',')[1];
        axios.post(`https://pbl6-backend.herokuapp.com/api/ml/predict`, {
            base64String: data
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                if(res.data.result.length === 9){
                    swal("You are wearing a mask. Stay safe!!", "Click ok to go back!", "success");
                } else {
                    swal("Oops! Please wear a mask!!!!", "Click ok to go back!", "warning");
                }
            })
            .catch(err => {

            })
    };

    return (

        <div className="relative">
            <div className="upload-image-container"></div>
            <div className="modal">
                <div className="upload-image bg-white p-6 rounded-md">
                    <div className="">
                        <Grommet theme={theme} style={{ height: "500px" }}>
                            <Box>
                               <div className="text-xl font-bold text-center"> Choose a photo or take a photo</div>
                            </Box>
                                <RichTextEditor
                                    placeholder="Keep us engaged ..."
                                    onSubmit={printSubmittedValue}
                                />
                        </Grommet>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadImage;