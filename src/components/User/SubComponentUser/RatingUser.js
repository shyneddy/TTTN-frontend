import React from 'react';
import '../../../styles/User/SubUser/RatingUser.scss'
import axios from 'axios'
import { get, post } from '../../../util/api'
import validator from 'validator';


class RatingUser extends React.Component {

    state = {}
    async componentDidMount() {
        let list_User_Rating;
        await get('/product/user-rating')
            .then(response => {
                console.log(response);
                list_User_Rating = response.list_User_Rating;

            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });

        this.setState({ list_User_Rating })

    }


    render() {
        console.log('xin chào info');
        return (
            <>

                <div className='showinfo'>
                    <div className='title-showinfo'>
                        Sản phẩm đã đánh giá
                    </div>

                    <div className='DanhGia'>
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên hàng</th>
                                    <th>Giá</th>
                                    <th>Sao đánh giá</th>

                                </tr>
                            </thead>
                            <tbody>
                                {this.state && this.state.list_User_Rating && this.state.list_User_Rating.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.title}</td>
                                            <td>{item.price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + 'đ'}</td>
                                            <td class="start">

                                                {
                                                    ((i) => {
                                                        const jsxElements = [];
                                                        for (let i = 0; i < item.stars; i++) {
                                                            jsxElements.push('\u2605');

                                                        }
                                                        return jsxElements;
                                                    })(item.rating)
                                                }

                                            </td>
                                        </tr>
                                    )
                                })}
                                {/* <tr>
                                    <td>1</td>
                                    <td>Sách 1</td>
                                    <td>100.000đ</td>
                                    <td class="start">&#9733; &#9733;&#9733;</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Sách 2</td>
                                    <td>200.000đ</td>
                                    <td class="start">&#9733; &#9733;&#9733;</td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>

                </div >



            </>
        )
    }
}

export default RatingUser
