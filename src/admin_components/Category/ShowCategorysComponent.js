import React from 'react';
import '../../admin_styles/Category/ShowCategory.scss'
import { get, post } from '../../util/api'
import { ToastContainer, toast } from 'react-toastify';

class ShowCategorysComponent extends React.Component {

    state = {
        categogyNameAdd: '',
        categogyNameEdit: '',
        categogyEdit: {}
    }

    async componentDidMount() {
        let fullListCategory;
        let category;
        await get('/product/admin-fullcategory')
            .then(response => {
                fullListCategory = response.fullListCategory;
            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });


        await get('/category/get-category')

            .then(response => {
                category = response.category;

            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });


        this.setState({
            fullListCategory,
            category
        })

    }


    handleSearch = (e) => {
        e.preventDefault();
        // Xử lý tìm kiếm sản phẩm
    };


    toggleCategory = (e) => {
        console.log(e.target);

        let e_content = e.target.parentNode.parentNode.getElementsByClassName('sub-category')[0]
        console.log(e_content);
        if (e_content.classList.contains('visible')) {
            e_content.classList.remove('visible')
        } else {
            e_content.classList.add('visible')
        }



    };

    handleClickAddCategory() {
        let elementAddCategory = document.getElementById('add-category');
        console.log(elementAddCategory);
        elementAddCategory.setAttribute('style', 'display: block')

        // if (!elementAddCategory.classList.contains('active')) {
        // }
    }

    handleExitAddCategory() {
        let elementAddCategory = document.getElementById('add-category');
        console.log(elementAddCategory);
        elementAddCategory.setAttribute('style', 'display: none')
    }

    handleExitEditCategory() {
        let elementEditCategory = document.getElementById('edit-category');
        // console.log(elementEditCategory);
        elementEditCategory.setAttribute('style', 'display: none')
    }

    handleChangNameCategory(e) {
        this.setState({
            categogyNameAdd: e.target.value
        })
    }

    async submitAddCategory() {
        let parent = document.getElementById('parent-category-add');
        const parent_id = parent.value;
        const name = this.state.categogyNameAdd;
        let isSuccess;
        await post('/category/admin-addcategory', { parent_id, name })
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
    async handleClickBtnEditCategory(id, s) {
        let fullListCategory = [...s.state.fullListCategory]
        let categoryEdit = fullListCategory.filter(e => e.id === id);
        console.log(categoryEdit[0].name);

        s.setState({
            categoryEdit_id: categoryEdit[0].id,
            categogyNameEdit: categoryEdit[0].name
        })

        let elementEditCategory = document.getElementById('edit-category');
        elementEditCategory.setAttribute('style', 'display: block')


    }

    handleEditNameCategory(e) {
        this.setState({
            categogyNameEdit: e.target.value
        })
    }

    async submitEditCategory() {
        let parent = document.getElementById('parent-category-edit');
        const parent_id = parent.value;
        var isSuccess;
        const name = this.state.categogyNameEdit;

        await post('/category/admin-editcategory', { categoryEdit_id: this.state.categoryEdit_id, parent_id, name })
            .then(response => {
                console.log(response);
                if (response.isSuccess) {
                    isSuccess = response.isSuccess;
                }
            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });

        console.log(isSuccess);
        if (isSuccess) {
            window.location.reload()
        }
    }

    async handleClickBtnRemoveCategory(id, s) {
        var isSuccess;
        console.log(id);
        await post('/category/admin-removecategory', { id })
            .then(response => {
                console.log(response);
                if (response.isSuccess) {
                    isSuccess = response.isSuccess;
                }
            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
                toast.dismiss();
                toast.error("Danh mục có sản phẩm không thể xóa!", {
                    position: toast.POSITION.TOP_RIGHT
                });
            });

        if (isSuccess) {
            window.location.reload()
        }
    }

    render() {

        function renderCategory(category, callback, callback_Edit, callback_Remove, s) {
            if (category && category.length > 0) {
                return category.map((item, index) => {
                    if (item.child_category) {
                        return (
                            <>
                                <li className="category-item">
                                    <div className='title-category'>
                                        <div className='category-header' onClick={(e) => callback(e)}>
                                            {item.name}
                                        </div>
                                        <div className='ico-controller'>
                                            <button onClick={() => callback_Edit(item.id, s)}>sửa</button>
                                            <button onClick={() => callback_Remove(item.id, s)}>xóa</button>
                                        </div>
                                    </div>
                                    <ul className='sub-category'>
                                        {renderCategory(item.child_category, callback, callback_Edit, callback_Remove, s)}
                                    </ul>
                                </li>

                            </>

                        );
                    } else {

                        return (
                            // <li key={index}><a href={`/category?key=${encodeURIComponent(item.name)}`}>{item.name}</a></li>
                            <li className="category-item"><div className='title-category'>
                                <div className='category-header'>
                                    {item.name}
                                </div>
                                <div className='ico-controller'>
                                    <button onClick={() => callback_Edit(item.id, s)}>sửa</button>
                                    <button onClick={() => callback_Remove(item.id, s)}>xóa</button>
                                </div>
                            </div></li>
                        );

                    }
                });
            }
            return null;
        }

        return (
            <>
                <div className='show-category-admin'>
                    <h1>Quản lý danh mục</h1>
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
                        </form> */}

                        <button className="btn-add" onClick={() => this.handleClickAddCategory()}>
                            Thêm mới
                            <img src="https://cdn3.iconfinder.com/data/icons/eightyshades/512/14_Add-512.png" alt="ThemMoi" />
                        </button>
                    </div >

                    <div className='categogy-manager'>
                        <h3>Danh sách danh mục</h3>
                        <ul className="category-list">
                            {this.state && this.state.category && renderCategory(this.state.category, this.toggleCategory, this.handleClickBtnEditCategory, this.handleClickBtnRemoveCategory, this)}

                        </ul>

                    </div>


                </div >

                <div className='edit-pos-category' id='edit-category'>
                    <div className='edit-container'>
                        <div class="container">
                            <div class="left-side">
                                <h2>Sửa danh mục</h2>
                                <label for="">Tên sách</label>
                                <input type="text" id="clas" name="class" value={this.state.categogyNameEdit} onChange={(e) => this.handleEditNameCategory(e)} />
                                <label for="">Parent</label>
                                <select id='parent-category-edit'>
                                    <option value='-1'>Root</option>
                                    {this.state && this.state.fullListCategory && this.state.fullListCategory.map((item, index) => {
                                        return (
                                            <option value={item.id}>{item.name}</option>
                                        )
                                    })}
                                    {/* <option value="">Năm 2</option>
                                    <option value="">Năm 3</option>
                                    <option value="">Năm 4</option> */}
                                </select>
                            </div>
                        </div>
                        <div class="button-container">
                            <div class="bt">
                                <button class="custom-button" onClick={() => this.handleExitEditCategory()}>Quay lại</button>
                            </div>
                            <div class="bt2">
                                <button class="custom-button" onClick={() => this.submitEditCategory()}>Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='add-pos-category' id='add-category'>
                    <div className='add-container'>
                        <div class="container">
                            <div class="left-side">
                                <h2>Thêm danh mục</h2>
                                <label for="">Tên sách</label>
                                <input type="text" id="clas" name="class" value={this.state.categogyNameAdd} onChange={(e) => this.handleChangNameCategory(e)} />
                                <label for="">Parent</label>
                                <select id='parent-category-add'>
                                    <option value='-1'>Root</option>
                                    {this.state && this.state.fullListCategory && this.state.fullListCategory.map((item, index) => {
                                        return (
                                            <option value={item.id}>{item.name}</option>
                                        )
                                    })}
                                    {/* <option value="">Năm 2</option>
                                    <option value="">Năm 3</option>
                                    <option value="">Năm 4</option> */}
                                </select>
                            </div>
                        </div>
                        <div class="button-container">
                            <div class="bt">
                                <button class="custom-button" onClick={() => this.handleExitAddCategory()}>Quay lại</button>
                            </div>
                            <div class="bt2">
                                <button class="custom-button" onClick={() => this.submitAddCategory()}>Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>


            </>

        );
    }
}

export default ShowCategorysComponent