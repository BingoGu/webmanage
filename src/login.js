/*
 * @Author: GGB
 * @Date:   2021-08-18 13:20:46
 * @Last Modified by:   GGB
 * @Last Modified time: 2021-08-19 13:03:23
 */
import React from 'react';
import axios from 'axios';
import {
    Button,
    Layout,
    Input,
    Row,
    Col,
    Modal
} from 'antd';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Navigate
} from "react-router-dom";
import {
    myCookieGet,
    myCookieSave,
    myCookieDel
} from './pubjs/cookie.js' // 引入
import './css/login.css';

const {
    Header,
    Footer,
    Sider,
    Content
} = Layout;

function Test() {}
// function Title(){
//     return <h3>烽火流星管理系统</h3>;
// }
function Title() {
    return <Row >
                <Col className="TitleStyle" flex="auto" justify="center" align="middle" span={24} >
                    烽火流星管理系统
                </Col>
            </Row>;
}
class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usename: '',
            password: '',
            loginflag: false
        };
    }
    componentDidMount() { //react生命周期初始化
        myCookieDel('username');
    }
    myLogin = (event) => {
        event.preventDefault();
        if (this.state.userName == '' || this.state.userName == null) {
            Modal.warning({
                content: '用户名不能为空！'
            });
            return false;
        }
        if (this.state.passWord == '' || this.state.passWord == null) {
            Modal.warning({
                content: '密码不能为空！'
            });
            return false;
        }
        axios({
            url: '/main/login',
            method: 'post',
            cache: false,
            data: {
                username: this.state.userName,
                password: this.state.passWord
            }
            // data: JSON.stringify(this.state)
        }).then((response) => {
            console.log(response);
            if (response.data == 0) {
                Modal.success({
                    content: '用户 ' + this.state.userName + ' 登录成功！',
                    onOk: () => {
                        myCookieSave('username', this.state.userName);
                        this.setState({
                            loginflag: true
                        })
                    }
                });
            } else if (response.data == -1) {
                Modal.error({
                    content: '登录失败！'
                });
            }
        }).catch(function(error) {
            Modal.error({
                content: '登录失败原因：' + error
            });
        });

    }
    myChangeHandler = (event) => {
        let name = event.target.name;
        let val = event.target.value;
        this.setState({
            [name]: val
        });
    }
    render() {
        if (this.state.loginflag) {
            return <Navigate to='usermanage' />;
        }

        return (
            <Row>
                <Col flex="auto"  span={4} offset={10}>
                    <div >
                        <Input addonBefore="用户名" type='text' name='userName' className="InputStyle" onChange={this.myChangeHandler} />
                        <Input addonBefore="密码" type='text' name='passWord' className="InputStyle" onChange={this.myChangeHandler} />
                    </div>
                </Col>
                <Col flex="auto"  span={4} offset={10}>
                        <Button onClick={this.myLogin}>登录</Button>
                        <Link to="userregister"><Button style={{float:"right"}} onClick={this.myRegister}>注册</Button></Link>
                </Col>                                                       
            </Row>
        );
    }
}

function MainPageRender() {
    return (
        <div>
        <Title  />
        <MyForm  />
        </div>
    );
}

export default MainPageRender;