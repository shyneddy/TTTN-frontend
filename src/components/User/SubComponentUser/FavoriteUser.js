import React from 'react';
import '../../../styles/User/SubUser/FavoriteUser.scss'
import axios from 'axios'
import { get, post } from '../../../util/api'
import validator from 'validator';


class FavoriteUser extends React.Component {

    state = {}
    async componentDidMount() {
        let list_User_Favorite;
        await get('/product/user-favorite')
            .then(response => {
                console.log(response);
                list_User_Favorite = response.list_User_Favorite;

            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });

        this.setState({ list_User_Favorite })

    }


    render() {
        console.log('xin chào info');
        return (
            <>

                <div className='showinfo'>
                    <div className='title-showinfo'>
                        Sản phẩm yêu thích
                    </div>

                    <div className='UaThich'>
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên hàng</th>
                                    <th>Giá</th>


                                </tr>
                            </thead>
                            <tbody>
                                {this.state && this.state.list_User_Favorite && this.state.list_User_Favorite.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.title}</td>
                                            <td>{item.price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + 'đ'}</td>
                                        </tr>
                                    )
                                })}
                                {/* <tr>
                                    <td>1</td>
                                    <td>Sách 1</td>
                                    <td>100.000đ</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Sách 2</td>
                                    <td>200.000đ</td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>

                </div >



            </>
        )
    }
}

export default FavoriteUser
