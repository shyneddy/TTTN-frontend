
import React from 'react';
import '../../styles/Login_Register/Login_Register.css'
class Login_register_Component extends React.Component {

    state = {}


    render() {
        return (
            <div class="d-flex justify-content-center align-items-center mt-5">


                <div class="card">

                    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li class="nav-item text-center">
                            <a class="nav-link active btl" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Login</a>
                        </li>
                        <li class="nav-item text-center">
                            <a class="nav-link btr" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Signup</a>
                        </li>

                    </ul>
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

                            <div class="form px-4 pt-5">

                                <input type="text" name="" class="form-control" placeholder="Email or Phone" />

                                <input type="text" name="" class="form-control" placeholder="Password" />
                                <button class="btn btn-dark btn-block">Login</button>

                            </div>


                        </div>
                        <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">


                            <div class="form px-4">

                                <input type="text" name="" class="form-control" placeholder="Name" />

                                <input type="text" name="" class="form-control" placeholder="Email" />

                                <input type="text" name="" class="form-control" placeholder="Phone" />

                                <input type="text" name="" class="form-control" placeholder="Password" />

                                <button class="btn btn-dark btn-block">Signup</button>


                            </div>



                        </div>

                    </div>




                </div>


            </div>
        )
    }
}


// export default Login_register_Component
export default Login_register_Component;