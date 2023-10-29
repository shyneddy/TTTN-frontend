import React from 'react';
import '../../styles/Product/DetailProduct.scss';
import { withRouter } from "react-router";
import { ToastContainer, toast } from 'react-toastify';

import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import { get, post } from '../../util/api'

class DetailProductComponent extends React.Component {

    state = {}

    async componentDidMount() {
        const book_id = this.props.match.params.id;
        var book_detail;
        await get('/product/detail', { book_id })
            .then(response => {
                book_detail = response.book_detail;
            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });

        if (book_detail) {
            book_detail.quantity = 1;
            this.setState({
                book_detail: book_detail,

            })

        }
    }

    async handleAddOrder() {
        await post('/order/add-item', { ...this.state.book_detail })
            .then(response => {
                if (response.addOrder) {
                    toast.dismiss()
                    toast.success("Đã vào giỏ hàng !", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
                toast.dismiss()
                toast.warning("Vui lòng đăng nhập !", {
                    position: toast.POSITION.TOP_RIGHT
                });
            });
    }

    handleQuantityInput(e) {
        var book_detail = { ...this.state.book_detail }
        book_detail.quantity = e.target.value;
        this.setState({
            book_detail: book_detail,

        })
    }

    handleViewImg(index) {

        const images = this.state.book_detail.img;

        var small_img = document.getElementsByClassName("product-details__small-img");

        for (var i = 0; i < small_img.length; i++) {
            small_img[i].classList.remove("isChoose")
        }
        // alert(index)
        var anh = document.getElementById("front-img");
        anh.src = images[index].image_url;
        // clearBoder()
        small_img[index].classList.add("isChoose")
    }

    highlightStars(index) {
        const stars = document.getElementsByClassName('rating');
        for (let i = 0; i <= index; i++) {
            stars[i].classList.add('highlight');
        }
    }
    resetStars() {
        const stars = document.getElementsByClassName('rating');
        for (let i = 0; i < stars.length; i++) {
            if (!stars[i].classList.contains('selected')) {
                stars[i].classList.remove('highlight');
            }
        }
    }

    selectStars(index) {
        const stars = document.getElementsByClassName('rating');
        for (let i = 0; i < stars.length; i++) {
            stars[i].classList.remove('selected');
        }

        for (let i = 0; i <= index; i++) {
            stars[i].classList.add('selected');
        }

        this.resetStars()
    }

    async handleRating(book_id) {
        const stars = document.getElementsByClassName('rating');
        var rating = 0;
        for (let i = 0; i < stars.length; i++) {
            if (stars[i].classList.contains('selected')) {
                rating++;
            }
        }

        await post('/product/rating', { rating: rating, book_id: book_id })
            .then(response => {
                // console.log(response);
            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });

        this.componentDidMount();

    }

    async handleFavorite(book_id) {
        // alert('handleFavorite')
        var isFavorite = false;
        await post('/product/favorite', { book_id: book_id })
            .then(response => {
                console.log(response);
                if (response.isFavorites) {
                    isFavorite = response.isFavorites
                    console.log('true');
                }
            })
            .catch(error => {
                console.log('error');
                // console.error(error);
                // Xử lý lỗi nếu có
                if (error.response.data.isLogin === false) {

                    toast.dismiss()
                    toast.warning("Vui lòng đăng nhập !", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            });

        console.log(isFavorite);
        if (isFavorite) {
            if (isFavorite === true) {
                toast.dismiss()
                toast.success("Đã thích !", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        } else {
            toast.dismiss()
            toast.warning("Bỏ thích !", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        this.componentDidMount()
    }


    render() {

        return (
            <>
                {this.state && this.state.book_detail &&
                    <div className='page-detail-container'>
                        <div className="product-details">
                            <div className='image'>
                                <div className="product-details__small">
                                    {this.state.book_detail.img && this.state.book_detail.img.map((item, index) => {
                                        return (
                                            <div className={`product-details__small-img ${index == 0 ? 'isChoose' : ''}`} >
                                                <img src={item.image_url} alt=""
                                                    onClick={() => this.handleViewImg(index)} />
                                            </div>

                                        )
                                    })}

                                </div>
                                <div className='large_img'>
                                    <img id="front-img" src={this.state.book_detail.img ? this.state.book_detail.img[0].image_url : ''} alt="Ảnh sản phẩm" />

                                </div>

                            </div>





                            <div className='detail'>
                                <h1>{this.state.book_detail.title}</h1>
                                <div className="product-rating-statis">
                                    {
                                        (() => {
                                            const jsxElements = [];
                                            for (let i = 0; i < 5; i++) {
                                                if (i <= this.state.book_detail.rating - 1) {
                                                    jsxElements.push(<span className="star highlight">&#9733;</span>);
                                                }
                                                else {
                                                    jsxElements.push(<span className="star">&#9733;</span>);
                                                }
                                            }
                                            return jsxElements;
                                        })()
                                    }
                                    | {this.state.book_detail.user_rating ? this.state.book_detail.user_rating : 0} lượt đánh giá | Đã bán: {this.state.book_detail.quantity_sold}
                                </div>
                                <hr />
                                <div className="product-price">
                                    Giá: <span>{this.state.book_detail.price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + 'đ'}</span>
                                </div>

                                <div className="quantity-remaining">
                                    Số lượng còn lại: <span>{this.state.book_detail.quantity_remaining}</span>
                                </div>


                                <div className="product-quantity">
                                    Số lượng:&nbsp;&nbsp;
                                    <input type="number" id="quantity" name="quantity" min="1" max={this.state.book_detail.quantity_remaining} value={this.state.book_detail.quantity} onChange={(e) => this.handleQuantityInput(e)} />
                                </div>

                                <button className="buy-button" onClick={() => this.handleAddOrder()} >Mua hàng</button>
                                <button className="favorite-button" onClick={() => this.handleFavorite(this.state.book_detail.id)}>{this.state.book_detail.favorite ? 'Đã thích' : 'Yêu thích'}</button>

                                <div className='info'>Thông tin</div>
                                <hr />
                                <div className="product-category">
                                    Danh mục: <span>{this.state.book_detail.category_name}</span>
                                </div>
                                <div className="product-publisher">
                                    Tác giả: <span>{this.state.book_detail.author}</span>
                                </div>

                                <div className='product-reviews'>
                                    <p>Đánh giá sản phẩm:</p>

                                    {typeof this.state.book_detail.isRating !== 'undefined' ?
                                        this.state.book_detail.isRating === true ?
                                            <>
                                                <ol class='list-inline' title='Average rating'>
                                                    {
                                                        (() => {
                                                            const jsxElements = [];
                                                            for (let i = 0; i < 5; i++) {
                                                                if (i < this.state.book_detail.my_rating) {
                                                                    jsxElements.push(<li
                                                                        class='rating highlight selected'
                                                                        onMouseOver={() => this.highlightStars(i)}
                                                                        onClick={() => this.selectStars(i)}
                                                                        onMouseOut={this.resetStars}
                                                                    >&#9733;</li>)
                                                                } else {
                                                                    jsxElements.push(<li
                                                                        class='rating'
                                                                        onMouseOver={() => this.highlightStars(i)}
                                                                        onClick={() => this.selectStars(i)}
                                                                        onMouseOut={this.resetStars}
                                                                    >&#9733;</li>)
                                                                }
                                                                // if (i <= this.state.book_detail.my_s - 1) {
                                                                //     jsxElements.push(<span className="star highlight">&#9733;</span>);
                                                                // }
                                                                // else {
                                                                //     jsxElements.push(<span className="star">&#9733;</span>);
                                                                // }
                                                            }
                                                            return jsxElements;
                                                        })()
                                                    }
                                                </ol>
                                                <button onClick={() => this.handleRating(this.state.book_detail.id)} >Đánh giá lại</button>
                                            </>
                                            :
                                            <>
                                                <ol class='list-inline' title='Average rating'>
                                                    <li
                                                        class='rating'
                                                        onMouseOver={() => this.highlightStars(0)}
                                                        onClick={() => this.selectStars(0)}
                                                        onMouseOut={this.resetStars}
                                                    >&#9733;</li>

                                                    <li
                                                        class='rating'
                                                        onMouseOver={() => this.highlightStars(1)}
                                                        onClick={() => this.selectStars(1)}
                                                        onMouseOut={this.resetStars}
                                                    >&#9733;</li>

                                                    <li
                                                        class='rating'
                                                        onMouseOver={() => this.highlightStars(2)}
                                                        onClick={() => this.selectStars(2)}
                                                        onMouseOut={this.resetStars}
                                                    >&#9733;</li>

                                                    <li
                                                        class='rating'
                                                        onMouseOver={() => this.highlightStars(3)}
                                                        onClick={() => this.selectStars(3)}
                                                        onMouseOut={this.resetStars}
                                                    >&#9733;</li>

                                                    <li
                                                        class='rating'
                                                        onMouseOver={() => this.highlightStars(4)}
                                                        onClick={() => this.selectStars(4)}
                                                        onMouseOut={this.resetStars}
                                                    >&#9733;</li>
                                                </ol>
                                                <button onClick={() => this.handleRating(this.state.book_detail.id)} >Gửi đánh giá</button>

                                            </>
                                        :

                                        <>
                                            <ol class='list-inline' title='Average rating'>
                                                <li
                                                    class='rating'
                                                // onMouseOver={() => this.highlightStars(0)}
                                                // onClick={() => this.selectStars(0)}
                                                // onMouseOut={this.resetStars}
                                                >&#9733;</li>

                                                <li
                                                    class='rating'
                                                // onMouseOver={() => this.highlightStars(1)}
                                                // onClick={() => this.selectStars(1)}
                                                // onMouseOut={this.resetStars}
                                                >&#9733;</li>

                                                <li
                                                    class='rating'
                                                // onMouseOver={() => this.highlightStars(2)}
                                                // onClick={() => this.selectStars(2)}
                                                // onMouseOut={this.resetStars}
                                                >&#9733;</li>

                                                <li
                                                    class='rating'
                                                // onMouseOver={() => this.highlightStars(3)}
                                                // onClick={() => this.selectStars(3)}
                                                // onMouseOut={this.resetStars}
                                                >&#9733;</li>

                                                <li
                                                    class='rating'
                                                // onMouseOver={() => this.highlightStars(4)}
                                                // onClick={() => this.selectStars(4)}
                                                // onMouseOut={this.resetStars}
                                                >&#9733;</li>
                                            </ol>

                                            <a href='/login'> Vui lòng đăng nhập để đánh giá</a>
                                        </>


                                    }

                                </div>



                            </div>

                        </div >
                        <div className="product-description">
                            <div className='title'>Nội dung:</div>
                            <div className='content'>{`${this.state.book_detail.description}`}</div>
                        </div>
                        <div className='category'>
                            <div className='title'>
                                <label>SÁCH LIÊN QUAN</label>
                            </div>
                            <div className='list-item'>
                                <div className="product-card">
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
                                </div>
                                <div className="product-card">
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
                                </div>
                            </div>
                        </div>
                    </div>

                }


            </>
        )
    }
}

export default withRouter(DetailProductComponent);