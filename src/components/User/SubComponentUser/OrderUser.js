import React from 'react';
import '../../../styles/User/SubUser/OrderUser.scss'
import { get, post } from '../../../util/api'
import validator from 'validator';


class InfoUser extends React.Component {

    state = {}
    async componentDidMount() {
        let list_User_Order;
        await get('/order/get-user-order')
            .then(response => {
                console.log(response);
                list_User_Order = response.list_User_Order;

            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });

        this.setState({ list_User_Order })

    }

    handleHideDetailProduct() {
        let positionElement = document.getElementsByClassName('position-container');
        for (var i = 0; i < positionElement.length; i++) {
            positionElement[i].setAttribute('style', 'display: none')

        }
    }

    handleViewDetailOrder(e) {
        let tr_parent = e.target.parentNode.parentNode.getElementsByClassName('position-container');
        // console.log(tr_parent);
        tr_parent[0].setAttribute('style', 'display: block')
    }


    render() {
        console.log('xin chào info');
        return (
            <>

                <div className='showinfo'>
                    <div className='title-showinfo'>
                        Đơn hàng của tôi
                    </div>

                    <div className='table'>
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>ID đơn hàng</th>
                                    <th>Ngày mua</th>
                                    <th>Trạng thái</th>
                                    <th>Giá</th>
                                    <th>Chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.state && this.state.list_User_Order && this.state.list_User_Order.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.id}</td>
                                            <td>{item.order_date}</td>
                                            <td>{item.status}</td>
                                            <td>{item.total_amount.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + 'đ'}</td>
                                            <td>
                                                <img src='/eye.png' onClick={(e) => this.handleViewDetailOrder(e)}></img>
                                            </td>

                                            <div className='position-container'>

                                                <div className='position-layout-container'>
                                                    <div className='position-layout'>
                                                        <div className='position-header'>
                                                            <div className='title-header'>
                                                                Chi tiết đơn hàng
                                                            </div>
                                                            <div className='btn-close' onClick={(e) => { this.handleHideDetailProduct(e) }}>
                                                                <img src='https://cdn-icons-png.flaticon.com/512/75/75519.png' />
                                                            </div>
                                                        </div>

                                                        <div className='position-content-container'>
                                                            <div className='info-receiver detail-order'>
                                                                <div className='title'>Thông tin người nhận</div>
                                                                <ul>
                                                                    <li> - Tên người nhận:  {item.name_des} </li>
                                                                    <li> - Địa chỉ:  {item.phone_des} </li>
                                                                    <li> - Số điện thoại:  {item.address_des} </li>
                                                                </ul>
                                                            </div>

                                                            <div className='info-weight detail-order'>
                                                                <div className='title'>Danh sách đơn hàng</div>
                                                                {item.detail && item.detail.map((item, index) => {
                                                                    return (
                                                                        <div className='orderproduct-container'>
                                                                            <div className='product'>
                                                                                <div className='img'>
                                                                                    <img src={item.image_url} />
                                                                                </div>
                                                                                <div className='productname'>{item.title}</div>
                                                                            </div>

                                                                            <div className='price'> {item.price} </div>

                                                                            <div className='quantity-container'>
                                                                                <input type="number" id="quantity" name={index} min="1" max="10" value={item.quantity} onChange={(e) => this.handleChangQuantity(e, index, item.id)} />
                                                                            </div>

                                                                            <div className='total-price'> {item.price * item.quantity} </div>

                                                                        </div>
                                                                    )
                                                                })}

                                                            </div>



                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </tr>
                                    )
                                })}
                                {/* <tr>
                                    <td>1</td>
                                    <td>01/10/2023</td>
                                    <td>Đã nhận</td>
                                    <td>100,000đ</td>
                                    <td>&#xF33E;</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>05/10/2023</td>
                                    <td>Đang giao hàng</td>
                                    <td>50,000đ</td>
                                    <td>&#xF33E;</td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>

                </div>



            </>
        )
    }
}

export default InfoUser
