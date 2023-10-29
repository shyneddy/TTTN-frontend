import React from 'react';
import '../../admin_styles/Product/EditProduct.scss';
import { get, post } from '../../util/api'
import { withRouter } from "react-router";
import { ToastContainer, toast } from 'react-toastify';


class EditProductComponent extends React.Component {
    state = {};

    async componentDidMount() {
        let fullListCategory;
        await get('/product/admin-fullcategory')
            .then(response => {
                fullListCategory = response.fullListCategory;
            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });


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
            this.setState({
                book_detail: book_detail,

            })

        }

        this.setState({
            fullListCategory
        })
    }

    handleChangeAvatar() {
        document.getElementById("file-input").click();
    }
    handleAddImg() {
        document.getElementById("files-input").click();
    }

    async onFileChange(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            let book_detail = { ...this.state.book_detail };
            book_detail.img[0].image_url = reader.result
            this.setState({
                book_detail
            });
        };

        if (file) {
            reader.readAsDataURL(file);
        }

        // console.log(e.target.files);

        // Update the state
        await this.setState({ selectedFileAvatar: e.target.files[0] });



    };

    handleFileChange = async (e) => {
        // console.log(e.target.files);
        let selectedFileImg = this.state.selectedFileImg && this.state.selectedFileImg;
        if (selectedFileImg) {
            const fileArray = Array.from(selectedFileImg); // Chuyển đổi FileList thành mảng
            // const fileArrNew = Array.from(e.target.files);
            for (var i = 0; i < e.target.files.length; i++) {
                fileArray.push(e.target.files[i]); // Thêm phần tử mới vào mảng
            }

            const updatedFileList = new DataTransfer(); // Tạo một đối tượng DataTransfer

            fileArray.forEach((file) => {
                updatedFileList.items.add(file); // Thêm lại các phần tử vào DataTransfer
            });

            const updatedFileListFiles = updatedFileList.files; // Lấy FileList từ DataTransfer
            console.log(updatedFileListFiles);

            await this.setState({ selectedFileImg: updatedFileListFiles });
            // console.log();
        }
        else {
            selectedFileImg = e.target.files;
            await this.setState({ selectedFileImg });
        }



        const selectedFiles = Array.from(this.state.selectedFileImg);
        if (selectedFiles.length > 0) {
            const imagePreviews = selectedFiles.map(file => URL.createObjectURL(file));
            this.setState({ files: selectedFiles, imagePreviews: imagePreviews });
        }
    }

    handleChangeInput(e, key) {
        let book_detail = { ...this.state.book_detail }
        book_detail[key] = e.target.value;
        this.setState({
            book_detail
        })
    }

    Validate() {

        var isValidate = true;



        const { title, price, author, category_id, quantity_remaining, description, img } = this.state.book_detail;
        const { selectedFileImg } = this.state;

        if (!title) {
            isValidate = false;
            return false
        }

        if (!price) {
            isValidate = false;
            return false
        }

        if (!author) {
            isValidate = false;
            return false
        }

        if (!category_id) {
            isValidate = false;
            return false
        }

        if (!quantity_remaining) {
            isValidate = false;
            return false
        }

        if (!description) {
            isValidate = false;
            return false
        }

        if (img.length <= 1 && (!selectedFileImg || selectedFileImg.length <= 0)) {
            isValidate = false;
            console.log('123');
            return false
        }

        return isValidate;

    }

    async handleSubmit(e) {
        e.target.disabled = true;

        if (!this.Validate()) {
            toast.dismiss();
            toast.warning("Vui lòng nhập đầy đủ thông tin", {
                position: toast.POSITION.TOP_RIGHT
            });
            e.target.disabled = false;
            return
        }

        let formData = new FormData();
        if (this.state.selectedFileAvatar) {
            formData.append("selectedFileAvatar", this.state.selectedFileAvatar);
        }
        if (this.state.selectedFileImg && this.state.selectedFileImg.length > 0) {
            for (let i = 0; i < this.state.selectedFileImg.length; i++) {
                formData.append('selectedFileImg', this.state.selectedFileImg[i]);
            }
        }
        formData.append('id', this.state.book_detail.id);
        formData.append('title', this.state.book_detail.title);
        formData.append('price', this.state.book_detail.price);
        formData.append('author', this.state.book_detail.author);
        formData.append('category', this.state.book_detail.category_id);
        formData.append('quantity_remaining', this.state.book_detail.quantity_remaining);
        formData.append('description', this.state.book_detail.description);
        formData.append('img', JSON.stringify(this.state.book_detail.img));

        let isSuccess;
        await post('/product/admin-updateproduct', formData, { img: this.state.book_detail.img }, {
            withCredentials: true,
        })
            .then(function (response) {
                console.log(response);

                if (response.isSuccess) {
                    isSuccess = response.isSuccess;
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.dismiss();
                toast.error("Cập nhật sản phẩm thất bại", {
                    position: toast.POSITION.TOP_RIGHT
                });
                e.target.disabled = false;

            });

        if (isSuccess) {
            window.location = "/admin/list-products";
        }
    }

    handleDeleteImgSmallDefault(index) {
        let book_detail = { ...this.state.book_detail }
        book_detail.img.splice(index + 1, 1);
        this.setState({ book_detail })
    }

    handleDeleteImgSmallNew(index) {
        let imagePreviews = this.state.imagePreviews;
        let selectedFileImg = this.state.selectedFileImg;
        let files = this.state.files;
        imagePreviews.splice(index, 1)
        files.splice(index, 1)
        const fileArray = Array.from(selectedFileImg); // Chuyển đổi FileList thành mảng
        fileArray.splice(index, 1); // Xóa phần tử tại vị trí index trong mảng

        const updatedFileList = new DataTransfer(); // Tạo một đối tượng DataTransfer

        fileArray.forEach((file) => {
            updatedFileList.items.add(file); // Thêm lại các phần tử vào DataTransfer
        });

        const updatedFileListFiles = updatedFileList.files; // Lấy FileList từ DataTransfer

        this.setState({ imagePreviews, selectedFileImg: updatedFileListFiles });

    }

    render() {
        return (
            <>
                {this.state && this.state.book_detail ?
                    <div className='edit-product-admin'>
                        <div className="container">
                            <div className="left-side">
                                <h2>Chỉnh sửa Sách</h2>
                                <label htmlFor="bookName">Tên sách</label>
                                <input type="text" id="bookName" name="bookName" value={this.state.book_detail.title} onChange={(e) => this.handleChangeInput(e, 'title')} />
                                <div className="row">
                                    {/* <div className="column">
                                <label htmlFor="discount">Giảm giá</label>
                                <input type="text" id="discount" name="discount" value="" />
                            </div> */}
                                    <div className="column">
                                        <label htmlFor="price">Giá sản phẩm</label>
                                        <input type="text" id="price" name="price" value={this.state.book_detail.price} onChange={(e) => this.handleChangeInput(e, 'price')} />
                                    </div>
                                    <div className="column">
                                        <label htmlFor="quantity">Số lượng</label>
                                        <input type="text" id="quantity" name="quantity" value={this.state.book_detail.quantity_remaining} onChange={(e) => this.handleChangeInput(e, 'quantity_remaining')} />
                                    </div>
                                </div>
                                <label htmlFor="category">Danh mục</label>
                                <select onChange={(e) => this.handleChangeInput(e, 'category_id')}>
                                    <option disabled selected style={{ display: 'none' }}>Chọn danh mục</option>
                                    {this.state && this.state.fullListCategory && this.state.fullListCategory.map((item, index) => {
                                        if (item.id == this.state.book_detail.category_id) {
                                            return (
                                                <option selected value={item.id}>{item.name}</option>
                                            )
                                        } else {
                                            return (
                                                <option value={item.id}>{item.name}</option>
                                            )
                                        }
                                    })}
                                </select>
                                <label htmlFor="author">Nhà cung cấp</label>
                                <input type="text" id="author" name="author" value={this.state.book_detail.author} onChange={(e) => this.handleChangeInput(e, 'author')} />
                                <label htmlFor="description">Mô tả chi tiết</label>
                                <textarea name="description" rows="10" cols="30" onChange={(e) => this.handleChangeInput(e, 'description')} value={this.state.book_detail.description}></textarea>
                            </div>
                            <div className="right-side">
                                <h2>Avatar</h2>
                                {/* <img src="Sach1.jpg" alt="Avatar" />
                        <form>
                            <input type="file" id="avatar" name="avatar" />
                        </form> */}

                                <div className='avatar update-avatar'>
                                    <img src={this.state.book_detail.img ? this.state.book_detail.img[0].image_url : 'https://media.tenor.com/sGyV1dgHaWoAAAAC/m%C3%ACnh-r%E1%BA%A5t-th%C3%ADch-doremon-v%C3%AC-c%E1%BA%ADu-%E1%BA%A5y-c%C3%B3-m%C3%A0u-s%E1%BA%AFc-hi-v%E1%BB%8Dng.gif'} onClick={() => { this.handleChangeAvatar() }} />
                                </div>
                                <input id="file-input" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { this.onFileChange(e) }} />

                                <div className='img-detail'>
                                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCc-CCxIzjZHFfBQbqYamVCR8vQcbywKp_Cc3KKw2zspuO6eNfq1Oobeta8wYDdHey9mA&usqp=CAU' onClick={() => this.handleAddImg()} />
                                </div>
                                <input id='files-input' type="file" accept="image/*" multiple onChange={(e) => this.handleFileChange(e)} style={{ display: "none" }} />
                                <div className='img-small-container'>
                                    {this.state.book_detail.img && this.state.book_detail.img.length > 1 && this.state.book_detail.img.slice(1).map((item, index) => (
                                        <div key={index} className='img-small'>
                                            <img src={item.image_url} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100px' }} />
                                            <div className='delete' onClick={() => this.handleDeleteImgSmallDefault(index)}></div>

                                        </div>
                                    ))}
                                    {this.state.imagePreviews && this.state.imagePreviews.length > 0 && this.state.imagePreviews.map((preview, index) => (
                                        <div key={index} className='img-small'>
                                            <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100px' }} />
                                            <div className='delete' onClick={() => this.handleDeleteImgSmallNew(index)}></div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                        <div className="button-container">
                            <div className="bt">
                                <button className="custom-button">Quay lại</button>
                            </div>
                            <div className="bt2">
                                <button className="custom-button" onClick={(e) => this.handleSubmit(e)}>Lưu</button>
                            </div>
                        </div>
                    </div>
                    :
                    <div>Không có sản phẩm</div>
                }

            </>
        );
    }
}

export default withRouter(EditProductComponent);