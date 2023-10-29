import React from 'react';
import '../../styles/Order/ConfirmOrder.scss';
import axios from 'axios'
import { get, post } from '../../util/api';

class ConfirmOrderComponent extends React.Component {

    state = {}

    async componentDidMount() {
        var list_order, user;
        await get('/order/confirm')
            .then(response => {
                user = response.user;
                list_order = response.list_order;

            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });

        this.setState({ user, list_order })


    }

    async handleOrder() {
        const full_name = this.state.user.full_name;
        const phone_number = this.state.user.phone_number;
        const address = this.state.user.address;
        await post('/order/confirm', { full_name, phone_number, address })
            .then(response => {
                console.log(response);

            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });
        window.location = "/";

    }


    render() {

        return (
            <>
                {this.state && this.state.user &&
                    <>
                        <div className='confirm-container'>

                            <div className='list-product-container'>
                                <div className='title'>
                                    <div className='title-product'>Sản phẩm</div>
                                    <div className='title-quantity'>Số lượng</div>
                                    <div className='title-price'>Thành tiền</div>

                                </div>



                                {this.state.list_order && this.state.list_order.map((item, index) => {
                                    return (
                                        <div className='list-product' key={index}>
                                            <div className='product'>
                                                <div className='img'>
                                                    <img src={item.image_url} />
                                                </div>
                                                <div className='name'>{item.title}</div>
                                            </div>
                                            <div className='quantity'>
                                                <div className='value'>{item.quantity}</div>
                                            </div>
                                            <div className='price'>
                                                <div className='value'>{String(item.price * item.quantity).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}đ</div>
                                            </div>


                                        </div>
                                    )
                                })}


                                {this.state.totalPrice &&
                                    <div className='total-container'>
                                        <div className='title'>Tổng: </div>
                                        <div className='total-price'>{this.state.totalPrice.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}đ</div>
                                    </div>
                                }

                            </div>

                            {this.state.user &&
                                <div className='confirm-infouser-container'>
                                    <div className='edit-info'>
                                        <div className='confirm-infouser'>
                                            <div className='title'>Thông tin đơn hàng</div>
                                        </div>

                                        <div className='short-info'>
                                            <div className='fullnameuser'>
                                                <form >
                                                    <label htmlFor="name">Tên khách hàng:</label>
                                                    <input type="text" defaultValue={this.state.user.full_name} />
                                                </form>
                                            </div>

                                            <div className='phonenumber'>
                                                <form >
                                                    <label htmlFor="name">Số điện thoại:</label>
                                                    <input type="text" defaultValue={this.state.user.phone_number} />
                                                </form>
                                            </div>
                                        </div>

                                        <div className='address'>
                                            <form >
                                                <label htmlFor="name">Địa chỉ:</label>
                                                <input type="text" defaultValue={this.state.user.address} />
                                            </form>
                                        </div>
                                    </div>
                                    <div className='btn-comfirmpay'>
                                        <button onClick={() => { this.handleOrder() }}>XÁC NHẬN MUA HÀNG</button>
                                    </div>

                                </div>
                            }


                        </div>
                    </>
                }

            </>
        )
    }
}

export default ConfirmOrderComponent
