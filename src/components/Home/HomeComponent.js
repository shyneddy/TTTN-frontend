import React from 'react';
// import '../styles/layout/Main.scss';
// import '../components/Home/HomeComponent.js'
import '../../styles/Home/Home.scss';
import { get, post } from '../../util/api'

class HomeComponent extends React.Component {

    state = {}

    async componentDidMount() {
        var list_book_new;
        var list_book_rating;
        await get('/home/index')
            .then(response => {
                console.log(response);
                list_book_new = response.list_book_new;
                list_book_rating = response.list_book_rating;
            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });

        this.setState({
            list_book_new,
            list_book_rating
        })

    }

    async banner_slide() {
        const slides = document.querySelectorAll('.slide');
        const swiper = document.getElementsByClassName('swiper-pagination-bullet');
        let currentSlide = 0;
        // console.log(swiper);
        function showSlide(index) {
            slides.forEach((slide, idx) => {
                if (idx === index) {
                    slide.classList.add('active');
                    swiper[idx].classList.add('active');
                } else {
                    slide.classList.remove('active');
                    swiper[idx].classList.remove('active');

                }
            });
        }

        function nextSlide() {
            currentSlide++;
            if (currentSlide === slides.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        }

        setInterval(nextSlide, 5000);
    }

    handleDetailPage(book_id) {
        window.location = "/detail/" + book_id;

    }

    scrollRightButton(e) {
        let container = e.target.parentNode.getElementsByClassName('list-item')[0];

        // const container = document.querySelector('.list-item');
        container.scrollBy({
            left: 200,
            behavior: 'smooth'
        });
    }

    scrollLeftButton(e) {
        let container = e.target.parentNode.getElementsByClassName('list-item')[0];
        // console.log(container);
        // const container = document.querySelector('.list-item');
        container.scrollBy({
            left: -200,
            behavior: 'smooth'
        });
    }

    handleOverFlow(e) {
        // const element_container = document.getElementById("list-item-container"); // Thay "myElement" bằng ID của thẻ bạn muốn lấy chiều rộng
        // const width_conteiner = element_container.offsetWidth;
        // const contentWidth = element_container.scrollWidth;

        // // console.log(contentWidth, ' : ', width_conteiner);
        // if (contentWidth <= width_conteiner) {
        //     // console.log('tràn');
        //     const btn_prev = document.getElementById('prev-button');
        //     const btn_next = document.getElementById('next-button');
        //     btn_prev.style.display = "none";
        //     btn_next.style.display = "none";

        // }
    }


    render() {

        return (
            <>
                <div className='header-banner'>
                    {/* <div className="container">
                            <img src='https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-cool-new-mobile-phone-promotion-purple-banner-image_183067.jpg' />
                            <div className="swiper-pagination">
                                <span className="swiper-pagination-bullet active"></span>
                                <span className="swiper-pagination-bullet"></span>
                                <span className="swiper-pagination-bullet"></span>
                                <span className="swiper-pagination-bullet"></span>
                            </div>
                        </div> */}

                    <div className="banner" onLoad={() => this.banner_slide()}>
                        <div className="slide active">
                            <img src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/06/Sach-hay.jpg" alt="Slide 1" />
                        </div>
                        <div className="slide">
                            <img src="https://static.ybox.vn/2017/10/22/c58f32cc-b6f2-11e7-aaab-cac091044fd5.jpg" alt="Slide 2" />
                        </div>
                        <div className="slide">
                            <img src="https://camnangchiase.com/wp-content/uploads/2019/03/doc-mot-cuon-sach-hay-cung-nhu-tro-chuyen-voi-mot-nguoi-ban-thong-minh-1.jpg" alt="Slide 3" />
                        </div>
                        <div className="swiper-pagination">
                            <span className="swiper-pagination-bullet active"></span>
                            <span className="swiper-pagination-bullet"></span>
                            <span className="swiper-pagination-bullet"></span>
                        </div>
                    </div>
                </div>

                <div className='main-container'>
                    {/* Sách bán chạy */}
                    {this.state && this.state.list_book_new &&

                        <div className='category trend'>
                            <div className='title'>
                                <label>SÁCH MỚI RA MẮT</label>
                            </div>
                            <div className='list-item' id='list-item-container' onLoad={(e) => { this.handleOverFlow(e) }}>

                                {this.state.list_book_new.map((item, index) => {
                                    return (
                                        <>
                                            <div key={index} className="product-card" title={item.title} onClick={() => this.handleDetailPage(item.id)} >
                                                <div className="product-image">
                                                    <img src={item.image_url} alt="Book 1" />
                                                </div>
                                                <div className="product-info">
                                                    <h2 className="product-title">{item.title}</h2>
                                                    <p className="product-author">By {item.author}</p>
                                                    <p className="product-price">{item.price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + 'đ'}</p>
                                                    <div className="product-rating">
                                                        {
                                                            (() => {
                                                                const jsxElements = [];
                                                                for (let i = 0; i < 5; i++) {
                                                                    if (i <= item.rating - 1) {
                                                                        jsxElements.push(<span className="star highlight">&#9733;</span>);
                                                                    }
                                                                    else {
                                                                        jsxElements.push(<span className="star">&#9733;</span>);
                                                                    }
                                                                }
                                                                return jsxElements;
                                                            })()
                                                        }
                                                    </div>
                                                </div>
                                            </div>




                                        </>
                                    )
                                })}


                                {/* <div className="product-card">
                                    <div className="product-image">
                                        <img src="https://nhasachphuongnam.com/images/thumbnails/500/500/detailed/141/doraemon-hoc-tap-dien-kinh.jpg" alt="Book 1" />
                                    </div>
                                    <div className="product-info">
                                        <h2 className="product-title">Book 1 Title</h2>
                                        <p className="product-author">By Author Name</p>
                                        <p className="product-price">$19.99</p>
                                        <div className="product-rating">
                                            <span className="star">&#9733;</span>
                                            <span className="star">&#9733;</span>
                                            <span className="star">&#9733;</span>
                                            <span className="star">&#9733;</span>
                                            <span className="star">&#9733;</span>
                                        </div>
                                    </div>
                                </div> */}

                            </div>
                            <button className="prev-button" id='prev-button' onClick={(e) => this.scrollLeftButton(e)}>&#60;</button> {/* Nút di chuyển sang trái */}
                            <button className="next-button" id='next-button' onClick={(e) => this.scrollRightButton(e)}>&#62;</button> {/* Nút di chuyển sang trái */}

                        </div>
                    }



                    {this.state && this.state.list_book_rating &&

                        <div className='category trend'>
                            <div className='title'>
                                <label>SÁCH ĐÁNH GIÁ CAO</label>
                            </div>
                            <div className='list-item' id='list-item-container' onLoad={(e) => { this.handleOverFlow(e) }}>

                                {this.state.list_book_rating.map((item, index) => {
                                    return (
                                        <>
                                            <div key={index} className="product-card" title={item.title} onClick={() => this.handleDetailPage(item.id)} >
                                                <div className="product-image">
                                                    <img src={item.image_url} alt="Book 1" />
                                                </div>
                                                <div className="product-info">
                                                    <h2 className="product-title">{item.title}</h2>
                                                    <p className="product-author">By {item.author}</p>
                                                    <p className="product-price">{item.price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + 'đ'}</p>
                                                    <div className="product-rating">
                                                        {
                                                            (() => {
                                                                const jsxElements = [];
                                                                for (let i = 0; i < 5; i++) {
                                                                    if (i <= item.rating - 1) {
                                                                        jsxElements.push(<span className="star highlight">&#9733;</span>);
                                                                    }
                                                                    else {
                                                                        jsxElements.push(<span className="star">&#9733;</span>);
                                                                    }
                                                                }
                                                                return jsxElements;
                                                            })()
                                                        }
                                                    </div>
                                                </div>
                                            </div>




                                        </>
                                    )
                                })}


                            </div>
                            <button className="prev-button" id='prev-button' onClick={(e) => this.scrollLeftButton(e)}>&#60;</button> {/* Nút di chuyển sang trái */}
                            <button className="next-button" id='next-button' onClick={(e) => this.scrollRightButton(e)}>&#62;</button> {/* Nút di chuyển sang trái */}

                        </div>
                    }





                </div>
            </>
        )
    }
}

export default HomeComponent