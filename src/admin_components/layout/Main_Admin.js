import React from 'react';
import '../../admin_styles/layout/Main_Admin.scss'
import Header_Admin from './Header_Admin';
import Right_Control_Admin from './Right_Control_Admin';
import { get, post } from '../../util/api'
// import Header_Admin from './Header_Admin';
class Main_Admin extends React.Component {

    state = {}



    render() {

        return (
            <>
                <div className='admin-page-container'>
                    <Right_Control_Admin />
                    <Header_Admin />
                </div>
            </>
        )
    }
}

export default Main_Admin