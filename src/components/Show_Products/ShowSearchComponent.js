import React from 'react';
import '../../styles/Show_Products/ShowSearch.scss'
import { withRouter } from "react-router";
import { get, post } from '../../util/api';

class ShowSearchComponent extends React.Component {

    state = {}

    async componentDidMount() {
        const { location } = this.props;
        const params = new URLSearchParams(location.search);
        const key = params.get('key');
        this.setState({ key })
        var search_items;
        await post('/product/search-items', { key })
            .then(response => {
                // console.log(response);
                search_items = response.searchItems;
            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });
        this.setState({ search_items })


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
                        </div>
                        <div className='list-item'>
                            {this.state && this.state.search_items && this.state.search_items.map((item, index) => {
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

export default withRouter(ShowSearchComponent)