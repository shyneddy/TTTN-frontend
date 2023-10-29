


import React from 'react';
import '../../styles/Order/Order.scss'
import { get, post } from '../../util/api'
class OrderComponent extends React.Component {

    state = {
        // reload: false
    }

    async totalPrice(id) {
        var totalPrice;
        await get('/order/get-totle-price', { id })
            .then(response => {
                console.log(response);
                totalPrice = response.totalPrice.total_amount
            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });
        this.setState({
            totalPrice: totalPrice
        })

        console.log('totalPrice: ', totalPrice);
    }

    async componentDidMount() {
        await get('/user/islogin')
            .then(response => {
                console.log(response);
                if (!response.isLogin) {
                    window.location = "/login";

                }
            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });


        var list_item = [];
        this.setState({
            list_item
        })
        await get('/order/get-items')
            .then(response => {
                console.log(response);
                list_item = response.list_item;
            })
            .catch(error => {
                console.error(error);
                window.location = "/login";
                // Xử lý lỗi nếu có
            });

        if (list_item.length > 0) {
            this.totalPrice(list_item[0].order_id)
        }

        this.setState({
            list_item
        })



    }

    handleShopping() {
        window.location = "/";
    }

    async handleChangQuantity(e, index, id) {
        var list_item = [...this.state.list_item];
        list_item[index].quantity = e.target.value;
        this.setState({ list_item })

        await post('/order/update-item', { id, quantity: this.state.list_item[index].quantity })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });
        this.totalPrice(this.state.list_item[0].order_id)

    }

    async handleDeleteItemOrder(id) {
        // alert(id)
        await post('/order/delete-item', { id })
            .then(response => {
                console.log('delete');
                console.log(response);
            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });
        // this.render()
        // window.location = "http://localhost:3000/";
        // this.setState({ reload: false })
        this.componentDidMount()

    }

    render() {

        return (
            <>
                {this.state && this.state.list_item && this.state.list_item.length > 0 ?
                    <div className='order-container'>
                        <div className='title-container'>
                            <div className='sub-title product'>Sản phẩm</div>
                            <div className='sub-title price'>Đơn giá</div>
                            <div className='sub-title quantity'>Số lượng</div>
                            <div className='sub-title total'>Thành tiền</div>
                            <div className='sub-title remove'>Thao tác</div>

                        </div>
                        {this.state.list_item.map((item, index) => {
                            return (
                                <div key={index} className='orderproduct-container'>
                                    <div className='product'>
                                        <div className='img'>
                                            <img src={item.book.image_url} />
                                        </div>
                                        <div className='productname'>{item.book.title}</div>
                                    </div>

                                    <div className='price'> {item.price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ </div>

                                    <div className='quantity-container'>
                                        <input type="number" id="quantity" name={index} min="1" max="10" defaultValue={item.quantity} onChange={(e) => this.handleChangQuantity(e, index, item.id)} />
                                    </div>

                                    <div className='total-price'> {String(item.price * item.quantity).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ </div>

                                    <div className='remove-btn' onClick={() => this.handleDeleteItemOrder(item.id)} >
                                        <img src='https://static.thenounproject.com/png/1144254-200.png' style={{ width: '30px' }} />
                                    </div>

                                </div>

                            )
                        })
                        }
                        <div className='pay-container'>
                            <div className='total-order'>
                                Tổng thanh toán: <span>{this.state && this.state.totalPrice ? this.state.totalPrice.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") : 0}đ</span>
                            </div>
                            <div className='btn-pay'>
                                <button onClick={() => {
                                    window.location = "order/confirm";
                                }}>MUA HÀNG</button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='order-noitem'>
                        <div className='img'>
                            <img src='https://cdn-icons-png.flaticon.com/512/2038/2038767.png' />
                        </div>
                        <div className='message'>Không có sản phẩm nào trong giỏ hàng của bạn</div>
                        <div className='btn-shopping'>
                            <button onClick={() => this.handleShopping()}>Tiếp tục mua sắm</button>
                        </div>
                    </div>
                }

            </>
        )
    }
}

export default OrderComponent