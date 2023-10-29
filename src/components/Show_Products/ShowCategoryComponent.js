import React from 'react';
import '../../styles/Show_Products/ShowCategory.scss'
import { withRouter } from "react-router";
import { get, post } from '../../util/api';
import queryString from 'query-string';


class ShowCategoryComponent extends React.Component {

    state = {}
    async componentDidMount() {
        const { location } = this.props;
        const params = new URLSearchParams(location.search);
        const key = params.get('key');
        const priceFrom = params.get('priceFrom');
        const priceTo = params.get('priceTo');
        const filter = params.get('filter');
        // const priceDec = params.get('filter');


        if (filter) {
            let selectionFilter = document.getElementById('selection-fulter') ? document.getElementById('selection-fulter') : null;
            if (selectionFilter) {
                switch (filter) {
                    case 'priceInc':
                        selectionFilter[1].selected = true;
                        break;

                    case 'priceDec':
                        selectionFilter[2].selected = true;
                        break;

                    default:
                        break;
                }

            }
        }

        if (priceFrom && priceTo) {
            let selection_by_price = document.getElementById('selection-by-price') ? document.getElementById('selection-by-price') : null;
            if (selection_by_price) {
                if (priceFrom == 0 && priceTo == 100000) {
                    selection_by_price[1].selected = true;
                }
                if (priceFrom == 100000 && priceTo == 300000) {
                    selection_by_price[2].selected = true;

                }
                if (priceFrom == 300000 && priceTo == 500000) {
                    selection_by_price[3].selected = true;

                }
                if (priceFrom == 500000 && priceTo == 1000000) {
                    selection_by_price[4].selected = true;

                }
            }
        }



        this.setState({ key })

        let list_items = [];
        this.setState({ list_items: [] })
        console.log(priceFrom);

        await post('/product/category', { key, priceFrom, priceTo, filter })
            .then(response => {
                console.log('post');
                console.log(response.listItems);
                list_items = response.listItems;
            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });
        this.setState({ list_items })


    }

    handleFilterByPrice(e) {
        let option = e.target.value;
        if (option) {
            let priceFrom, priceTo;
            switch (option) {
                case '1':
                    priceFrom = 0;
                    priceTo = 100000;
                    break;
                case '2':
                    priceFrom = 100000;
                    priceTo = 300000;
                    break;
                case '3':
                    priceFrom = 300000;
                    priceTo = 500000;
                    break;
                case '4':
                    priceFrom = 500000;
                    priceTo = 1000000;
                    break;

                default:
                    break;
            }

            const existingQuery = this.props.location.search;

            const queryPriceFrom = `priceFrom=${priceFrom}`;
            const queryPriceTo = `priceTo=${priceTo}`;


            // Giải phân tích query parameters hiện tại
            const parsedQuery = queryString.parse(existingQuery);

            // Thêm query mới vào parsedQuery
            const updatedQuery = {
                ...parsedQuery,
                ...queryString.parse(queryPriceFrom),
                ...queryString.parse(queryPriceTo),

            };

            // Tạo chuỗi query parameters mới
            const newQueryString = queryString.stringify(updatedQuery);

            // Thay đổi URL bằng cách cập nhật location.search
            this.props.history.push({
                pathname: this.props.location.pathname,
                search: newQueryString,
            });
        }

        window.location.reload()
        // this.componentDidMount()
    }

    handleFilterByOption(e) {
        let option = e.target.value;
        if (option) {
            let priceInc = false, priceDec = false;
            switch (option) {
                case '1':
                    priceInc = true;
                    break;
                case '2':
                    priceDec = true;
                    break;

                default:
                    break;
            }

            const existingQuery = this.props.location.search;

            let queryPriceInc;
            let queryPriceDec;
            let updatedQuery;
            // const queryPriceTo = `priceTo=${priceTo}`;


            // Giải phân tích query parameters hiện tại
            const parsedQuery = queryString.parse(existingQuery);

            if (priceInc) {
                queryPriceInc = `filter=priceInc`;
                updatedQuery = {
                    ...parsedQuery,
                    ...queryString.parse(queryPriceInc),
                };
            }
            if (priceDec) {
                queryPriceDec = `filter=priceDec`;
                updatedQuery = {
                    ...parsedQuery,
                    ...queryString.parse(queryPriceDec),
                };
            }
            // Thêm query mới vào parsedQuery

            // const updatedQuery = {
            //     ...parsedQuery,
            //     ...queryString.parse(queryPriceFrom),
            //     ...queryString.parse(queryPriceTo),
            // };

            // Tạo chuỗi query parameters mới
            const newQueryString = queryString.stringify(updatedQuery);

            // Thay đổi URL bằng cách cập nhật location.search
            this.props.history.push({
                pathname: this.props.location.pathname,
                search: newQueryString,
            });
        }

        window.location.reload()
    }


    render() {

        return (
            <>

                <div className='search-page'>
                    <div className='category trend'>
                        <div className='title'>
                            <h4>
                                <img src='https://png.pngtree.com/png-clipart/20230419/original/pngtree-magnifying-glass-flat-icon-png-image_9067288.png' ></img>
                                {this.state && this.state.key ? this.state.key : ''}</h4>
                            <span className="label-container">
                                <label htmlFor="ldl"></label>
                                <select id="selection-by-price" name="ldl" onChange={(e) => this.handleFilterByPrice(e)}>
                                    <option value="" disabled selected style={{ display: 'none' }}>Chọn mức giá</option>
                                    <option value={1}>0-100.000đ</option>
                                    <option value={2}>100.000-300.000đ</option>
                                    <option value={3}>300.000-500.000đ</option>
                                    <option value={4}>500.000-1.000.000đ</option>
                                </select>
                                <label htmlFor="ldl"></label>
                                <select id="selection-fulter" name="ltg" onChange={(e) => this.handleFilterByOption(e)}>
                                    <option value="" disabled selected style={{ display: 'none' }}>Chọn</option>

                                    <option value="1">Tăng dần theo giá</option>
                                    <option value="2">Giảm dần theo giá</option>
                                    {/* <option value="3">Sách ưu thích</option>
                                    <option value="4">Sách theo đánh giá</option> */}
                                </select>
                            </span>
                        </div>
                        <div className='list-item'>
                            {this.state && this.state.list_items && this.state.list_items.map((item, index) => {
                                return (
                                    <a href={`/detail/${item.id}`}>
                                        <div className="product-card">
                                            <div className="product-image">
                                                <img src={item.image_url} alt="Book 1" />
                                            </div>
                                            <div className="product-info">
                                                <h2 className="product-title">{item.title}</h2>
                                                <p className="product-author">By {item.author}</p>
                                                <p className="product-price">{item.price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + 'đ'}</p>
                                                <div className="product-rating">
                                                    {/* <span className="star">&#9733;</span>
                                                        <span className="star">&#9733;</span>
                                                        <span className="star">&#9733;</span>
                                                        <span className="star">&#9733;</span>
                                                        <span className="star">&#9733;</span> */}
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
                                    </a>
                                )
                            })}

                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default withRouter(ShowCategoryComponent)