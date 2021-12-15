import axios from 'axios';
import './ViolatorManagement.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

function ViolatorManagement(props) {

    const [data, setData] = useState([]);

    const token = useSelector(state => state.Auth.token);

    const [count, setCount] = useState(0);

    useEffect(() => {

        const fetchData = () => {
            axios.get('https://pbl6-backend.herokuapp.com/api/ml/predict', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                setData(res.data)
            }).catch(err => console.log(err))
        }

        fetchData();

    }, [token]);

    const convertList = (list) => {
        if (list.length > 0) {
            return (list.map((item, index) => {
                return (
                    <div className="card" key={index}>
                        <div className="card-thumb">
                            <img src={`data:image/jpeg;base64,${item.base64String}`} alt="" />
                        </div>
                        <h3 className="card-name text-center">
                            {moment(item.predictedTime).format('YYYY-MM-DD HH:mm:ss')}
                        </h3>
                    </div>
                )
            }))
        }

    }

    const [change, setChange] = useState(0);

    const HandleChangePlus = (number) => {

        if (count !== 0) {
            setCount(count - 1);
            setChange(change + 20);
        }
    }

    const HandleChangeMinus = (number) => {

        if ((count + 1) * 3 + 1 > data.length) {
        } else {
            setCount(count + 1);
            setChange(change - 20);
        }
    }

    return (
        <div className="relative">
            <div className="violator-management-container"></div>
            <div className="modal">

                <div className="fixed cursor-pointer text-white text-4xl left-6"
                    onClick={() => HandleChangePlus(1050)}>
                    <ion-icon name="chevron-back-outline"></ion-icon>
                </div>
                <div className="fixed cursor-pointer text-white text-4xl right-6"
                    onClick={() => HandleChangeMinus(-1050)}>
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </div>
                <div className="hotSearch mt-4 relative">
                    <div className="hotSearch__ flex delay-100 px-6 gap-8" style={{ marginLeft: `${change}px` }}>
                        {convertList(data.reverse())}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ViolatorManagement;