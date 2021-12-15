import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert'
import { FetchList } from './reducers/ListUser';
import classNames from 'classnames';

function UserManagement(props) {

    const dispatch = useDispatch();

    const ListUser = useSelector(state => state.ListUser);

    const token = useSelector(state => state.Auth.token);

    const [listUser, setListUSer] = useState(ListUser);

    const [page, setPage] = useState({
        _page: 0,
        _limit: 7
    })

    const HandleChangePage = (num) => {
        setPage({ ...page, _page: num })
    }

    useEffect(() => {
        dispatch(FetchList(token));
    }, [dispatch, token])

    useEffect(() => {
        setListUSer(ListUser)
    }, [ListUser])


    const ChangeBlockUser = (item) => {
        const newItem = { ...item, isBlocked: !item.isBlocked }
        swal({
            title: "Are you sure?",
            text: `${!item.isBlocked ? 'Once block, If this account is locked, the user of this account cannot log in!' : 'If this account is unlocked, users of this account can login normally!'}`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    let url = 'https://pbl6-backend.herokuapp.com/api/users/block/';
                    if (item.isBlocked) url = 'https://pbl6-backend.herokuapp.com/api/users/unblock/'
                    axios.put(`${url + item.username}`, newItem, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }).then(() => {
                        dispatch(FetchList(token));
                        swal(`${!item.isBlocked ? 'Poof! This account has been locked!' : 'Poof! This account has been unlocked!'}`, {
                            icon: "success",
                        });
                    }).catch(err => console.log(err))
                }
            });
    }

    const convertListUser = (list) => {
        console.log(list);
        if (list.length > 0) {
            const newList = list.filter(item => item.role === 1);

            let countWithPage = [];

            const startValue = page._page * page._limit
            for (let i = startValue; i < startValue + 8; i++) {
                if (i >= newList.length) break;
                countWithPage.push(list[i]);
            }


            const result = countWithPage.map((item, index) => {
                return (
                    <tr key={index} className="hover:bg-gray-50 transition duration-300 ease-in-out">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{item.firstName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{item.lastName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{item.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.birthday.substring(0, 10)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {item.isBlocked ? "Active" : "Deactivate"}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm ">
                            <div className={`cursor-pointer text-2xl ${item.isBlocked ? 'text-gray-700' : 'text-gray-400'}`}
                                title={`${item.isBlocked ? 'Unblock' : 'Block'}`}
                                onClick={() => ChangeBlockUser(item)}
                            >
                                <ion-icon name="document-lock"></ion-icon>
                            </div>
                        </td>
                    </tr>
                )
            })
            return result;
        }
    }

    const showListPage = (list) => {

        const countPage = Math.ceil(list.length / 7);
        const result = [];
        for (let i = 0; i < countPage; i++) {
            result.push(
                <li
                    key={i}
                    className={classNames(
                        'h-8 w-8 flex items-center justify-center rounded-full mx-1 cursor-pointer',
                        {
                            'text-white opacity-80 bg-blue-500': page._page === i
                        },
                        {
                            'hover:bg-gray-200 text-gray-600': page._page !== i
                        }
                    )}
                    onClick={() => HandleChangePage(i)}
                >{i + 1}</li>
            )
        }
        return result;
    }

    return (
        <div className="flex flex-col max-w-7xl mx-auto px-4 pt-32">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 ">
                    <div className="shadow overflow-hidden border border-gray-300 rounded">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        First Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Last Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Phone
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Birthday
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {convertListUser(listUser)}
                            </tbody>
                        </table>
                    </div>
                    <div className="absolute right-44 bottom-12">
                        <ul className="flex items-center">
                            <li className={classNames(
                                'text-xl h-8 w-8 flex items-center justify-center mx-2 text-blue-300 rounded-full cursor-pointer',
                                {
                                    'text-blue-500 hover:bg-gray-200': page._page !== 0
                                }
                            )} onClick={() => HandleChangePage(page._page !== 0 ? page._page - 1 : page._page)}>
                                <ion-icon name="chevron-back-outline"></ion-icon>
                            </li>
                            {showListPage(listUser)}
                            <li
                                className={classNames(
                                    'text-xl h-8 w-8 mx-1 flex items-center justify-center text-blue-300 rounded-full cursor-pointer',
                                    {
                                        'text-blue-500 hover:bg-gray-200': Math.ceil(listUser.length / 8) - 1 !== page._page
                                    }
                                )}
                                onClick={() => HandleChangePage(Math.ceil(listUser.length / 8) - 1 !== page._page ? page._page + 1 : page._page)}>
                                <ion-icon name="chevron-forward-outline"></ion-icon>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserManagement;