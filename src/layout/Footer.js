import React from 'react';
import '../styles/layout/Footer.scss'

class Footer extends React.Component {

    state = {}


    render() {

        return (
            <div className='footer-container'>

                <div className='footer'>
                    <div className='about-us'>
                        <h3>VỀ CHÚNG TÔI</h3>
                        <a>Sản phẩm</a>
                        <a>Đăng ký</a>
                        <a>Đăng nhập</a>
                    </div>

                    <div className='news'>
                        <h3>TIN TỨC</h3>

                        <a>Kinh nghiệm mua sách</a>
                        <a>Kinh nghiệm đọc sách</a>
                        <a>Liên hệ</a>
                    </div>

                    <div className='policy'>
                        <h3>CHÍNH SÁCH</h3>

                        <a>Hướng dẫn mua hàng</a>
                        <a>Chính sách đổi trả</a>

                    </div>

                    <div className='category-hot'>
                        <h3>DANH MỤC NỔI BẬT</h3>

                        <a>Truyện tranh</a>
                    </div>

                    <div className='contact'>
                        <h3>LIÊN HỆ VỚI CHÚNG TÔI</h3>
                        <a href='https://www.facebook.com/shyneddy/'>Facebook</a>
                        <a href='https://www.youtube.com/'>Youtube</a>

                    </div>
                </div>


            </div>
        )
    }
}

export default Footer