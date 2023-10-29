import React from 'react';
import '../../admin_styles/layout/Right_Control_Admin.scss'

class Right_Control_Admin extends React.Component {

    state = {}

    showChildControl(elementID, event) {
        var ulElement = document.getElementById(elementID);
        if (ulElement.classList.contains("active")) {
            ulElement.classList.remove("active");
            // event.currentTarget.remove("active")
        } else {
            ulElement.classList.add("active");
            // event.currentTarget.add("active")
        }
    }

    render() {

        return (
            <>
                <div className='Right-Column'>
                    <div className='logo'>
                        <a href="/"><img src="/sachlogotrang.png" alt="Logo" /></a>
                    </div>
                    <h2>MAIN NAVIGATION</h2>
                    <ul>
                        <li>
                            <a>Dashboard</a>

                        </li>
                        <li >
                            <a onClick={(e) => this.showChildControl('productList', e)}>Sản phẩm</a>
                            <ul id="productList">
                                <li><a href='/admin/list-category'>Danh mục</a></li>
                                <li><a href='/admin/list-products'>Sách</a></li>
                                <li><a>Đánh giá</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href='/admin/list-orders'>Đơn hàng</a>
                        </li>
                        <li>
                            <a>Kho</a>

                        </li>
                    </ul>

                </div>
            </>
        )
    }
}

export default Right_Control_Admin