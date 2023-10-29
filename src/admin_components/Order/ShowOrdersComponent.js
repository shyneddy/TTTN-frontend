import React from 'react';
import '../../admin_styles/Order/ShowOrders.scss'
import { get, post } from '../../util/api'
class ShowOrdersComponent extends React.Component {

    state = {}

    async componentDidMount() {
        let fullListOrder;
        await get('/order/admin-fullorder')
            .then(response => {
                fullListOrder = response.fullListOrder;
            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });

        this.setState({
            fullListOrder
        })
    }


    handleSearch = (e) => {
        e.preventDefault();
        // Xử lý tìm kiếm sản phẩm
    };

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

    async handleChangeStatus(id) {
        var isSuccess;

        let selectStatus = document.getElementById(`status-select-${id}`);
        await post('/order/admin-editorder', { id, status: selectStatus.value })
            .then(response => {
                if (response.isSuccess) {
                    isSuccess = response.isSuccess;
                }
            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });

        if (isSuccess) {
            window.location.reload()
        }
    }

    render() {
        return (
            <div className='show-orders-admin'>
                <h1>Quản lý đơn hàng</h1>
                <div className="filter-control">
                    {/* <input type="number" id="IDsp" name="Ma" value="ID" />
                    <select id="nh" name="nh">
                        <option value="">Danh mục</option>
                        <option value="">Năm 1</option>
                        <option value="">Năm 2</option>
                        <option value="">Năm 3</option>
                        <option value="">Năm 4</option>
                    </select>

                    <form action="#" method="get" className="form-search" onSubmit={this.handleSearch}>
                        <input type="text" name="search" placeholder="Tìm kiếm sản phẩm..." required />
                        <button className="search"><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1024px-Search_Icon.svg.png' alt='tk'></img></button>
                    </form>

                    <button className="btn-add">
                        Thêm mới
                        <img src="https://cdn3.iconfinder.com/data/icons/eightyshades/512/14_Add-512.png" alt="ThemMoi" />
                    </button> */}
                </div>

                <table>
                    <thead>
                        <tr>
                            {/* <th>STT</th> */}
                            <th>Mã đơn hàng</th>
                            <th>Mã khách hàng</th>
                            <th>Thông tin người nhận</th>
                            <th>Ngày đặt hàng</th>
                            <th>Giá</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                            <th>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state && this.state.fullListOrder && this.state.fullListOrder.map((item, index) => {
                            return (
                                <tr>
                                    {/* <td>{index + 1}</td> */}
                                    <td>{item.id}</td>
                                    <td>{item.user_id}</td>
                                    <td>
                                        {item.name_des} <br />
                                        {item.phone_des} <br />
                                        {item.address_des} <br />
                                    </td>
                                    <td>{item.order_date}</td>
                                    <td>{item.total_amount.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + 'đ'}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <div className="button-group">
                                            <select id={`status-select-${item.id}`}>
                                                <option value="" selected disabled style={{ display: 'none' }} >Action</option>
                                                <option value="Đang chờ xử lý">Đang chờ xử lý</option>
                                                <option value="Đã tiếp nhận">Đã tiếp nhận</option>
                                                <option value="Đang vận chuyển">Đang vận chuyển</option>
                                                <option value="Hoàn tất">Hoàn tất</option>
                                                <option value="Hủy">Hủy</option>

                                            </select>
                                            <button className="btn-comfirm" onClick={() => this.handleChangeStatus(item.id)}>
                                                {/* <img src="Delete.png" /> */}
                                                Xác nhận
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        <img className='icon-view' src='/eye.png' onClick={(e) => this.handleViewDetailOrder(e)}></img>
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

                                                                    {/* <div className='remove-btn' onClick={() => this.handleDeleteItemOrder(item.id)} >
                                                                <img src='https://static.thenounproject.com/png/1144254-200.png' style={{ width: '30px' }} />
                                                            </div> */}

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
                        {/* Thêm các hàng khác tương tự */}
                    </tbody>
                    <tfoot>
                        <tr>
                            {/* <td colSpan="8">Tổng tiền:</td> */}
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}

export default ShowOrdersComponent