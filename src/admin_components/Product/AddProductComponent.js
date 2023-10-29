import React from 'react';
import '../../admin_styles/Product/AddProduct.scss'
import { get, post } from '../../util/api'
import { ToastContainer, toast } from 'react-toastify';


class AddProductComponent extends React.Component {

    state = {
        imageSrc: '', files: [],
        imagePreviews: []
    }

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
            this.setState({
                imageSrc: reader.result
            });
        };

        if (file) {
            reader.readAsDataURL(file);
        }

        // console.log(e.target.files);

        // Update the state
        await this.setState({ selectedFileAvatar: e.target.files[0] });



    };

    handleFileChange = (e) => {
        // console.log(e.target.files);
        this.setState({ selectedFileImg: e.target.files });


        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length > 0) {
            const imagePreviews = selectedFiles.map(file => URL.createObjectURL(file));
            this.setState({ files: selectedFiles, imagePreviews: imagePreviews });
        }
    }

    handleChangeInput(e, key) {
        this.setState({
            [key]: e.target.value
        })
    }

    Validate() {

        var isValidate = true;



        const { title, price, author, category, quantity, description, selectedFileAvatar, selectedFileImg } = this.state;

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

        if (!category) {
            isValidate = false;
            return false
        }

        if (!quantity) {
            isValidate = false;
            return false
        }

        if (!description) {
            isValidate = false;
            return false
        }

        if (!selectedFileAvatar) {
            isValidate = false;
            return false
        }

        if (!selectedFileImg || selectedFileImg.length <= 0) {
            isValidate = false;
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
        formData.append("selectedFileAvatar", this.state.selectedFileAvatar);
        // formData.append('selectedFileImg', this.state.selectedFileImg[0]);
        for (let i = 0; i < this.state.selectedFileImg.length; i++) {
            formData.append('selectedFileImg', this.state.selectedFileImg[i]);
        }

        formData.append('title', this.state.title);
        formData.append('price', this.state.price);
        formData.append('author', this.state.author);
        formData.append('category', this.state.category);
        formData.append('quantity', this.state.quantity);
        formData.append('description', this.state.description);


        let isAddProduct;
        await post('/product/admin-addproduct', formData, {
            withCredentials: true,
        })
            .then(function (response) {
                console.log(response);
                if (response.isAddProduct) {
                    isAddProduct = response.isAddProduct;
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.dismiss();
                toast.error("Thêm sản phẩm thất bại", {
                    position: toast.POSITION.TOP_RIGHT
                });
                e.target.disabled = true;
            });

        if (isAddProduct) {
            window.location = "/admin/list-products";
        }
    }

    handleDeleteImgSmallDefault(index) {
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
                <div className='add-product-admin'>
                    <div className="container">
                        <div className="left-side">
                            <h2>Thêm Sách</h2>
                            <label htmlFor="bookName">Tên sách</label>
                            <input type="text" id="bookName" name="bookName" value={this.state.title} onChange={(e) => this.handleChangeInput(e, 'title')} />
                            <div className="row">
                                {/* <div className="column">
                                    <label htmlFor="discount">Giảm giá</label>
                                    <input type="text" id="discount" name="discount" value="" />
                                </div> */}
                                <div className="column">
                                    <label htmlFor="price">Giá sản phẩm</label>
                                    <input type="text" id="price" name="price" value={this.state.price} onChange={(e) => this.handleChangeInput(e, 'price')} />
                                </div>
                                <div className="column">
                                    <label htmlFor="quantity">Số lượng</label>
                                    <input type="text" id="quantity" name="quantity" value={this.state.quantity} onChange={(e) => this.handleChangeInput(e, 'quantity')} />
                                </div>
                            </div>
                            <label htmlFor="category">Danh mục</label>
                            <select onChange={(e) => this.handleChangeInput(e, 'category')}>
                                <option disabled selected style={{ display: 'none' }}>Chọn danh mục</option>
                                {this.state && this.state.fullListCategory && this.state.fullListCategory.map((item, index) => {
                                    return (
                                        <option value={item.id}>{item.name}</option>
                                    )
                                })}
                            </select>
                            <label htmlFor="author">Nhà cung cấp</label>
                            <input type="text" id="author" name="author" value={this.state.author} onChange={(e) => this.handleChangeInput(e, 'author')} />
                            <label htmlFor="description">Mô tả chi tiết</label>
                            <textarea name="description" rows="10" cols="30" onChange={(e) => this.handleChangeInput(e, 'description')}></textarea>
                        </div>
                        <div className="right-side">
                            <h2>Avatar</h2>
                            {/* <img src="Sach1.jpg" alt="Avatar" />
                            <form>
                                <input type="file" id="avatar" name="avatar" />
                            </form> */}

                            <div className='avatar update-avatar'>
                                <img src={this.state.imageSrc ? this.state.imageSrc : 'https://media.tenor.com/sGyV1dgHaWoAAAAC/m%C3%ACnh-r%E1%BA%A5t-th%C3%ADch-doremon-v%C3%AC-c%E1%BA%ADu-%E1%BA%A5y-c%C3%B3-m%C3%A0u-s%E1%BA%AFc-hi-v%E1%BB%8Dng.gif'} onClick={() => { this.handleChangeAvatar() }} />
                            </div>
                            <input id="file-input" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { this.onFileChange(e) }} />

                            <div className='img-detail'>
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCc-CCxIzjZHFfBQbqYamVCR8vQcbywKp_Cc3KKw2zspuO6eNfq1Oobeta8wYDdHey9mA&usqp=CAU' onClick={() => this.handleAddImg()} />
                            </div>
                            <input id='files-input' type="file" accept="image/*" multiple onChange={(e) => this.handleFileChange(e)} style={{ display: "none" }} />
                            {this.state.imagePreviews.length > 0 && (
                                <div className='img-small-container'>
                                    {/* <h3>Selected Images:</h3> */}
                                    {this.state.imagePreviews.map((preview, index) => (
                                        <div key={index} className='img-small'>
                                            <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100px' }} />
                                            <div className='delete' onClick={() => this.handleDeleteImgSmallDefault(index)}></div>

                                        </div>
                                    ))}
                                </div>
                            )}

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
            </>
        )
    }
}

export default AddProductComponent