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
import './css/login.css';

const {
	Header,
	Footer,
	Sider,
	Content
} = Layout;
class RegisterMessge extends React.Component {
	constructor(props) {
		super(props);
		//react定义数据
		this.state = {
			userName: '',
			passWord: '',
			phoneNum: '',
			email: '',
			registerflag: false
		};
	}
	myChangeHandler = (event) => {
		let name = event.target.name;
		let val = event.target.value;
		this.setState({
			[name]: val
		});
	}
	registerClick = (event) => {
		console.log('注册事件被点击');
		axios({
			url: '/main/register',
			method: 'post',
			cache: false,
			async: false,
			data: {
				username: this.state.userName,
				password: this.state.passWord,
				phone_number: this.state.phoneNum,
				email_address: this.state.email
			}, //post data
		}).then((response) => { //这样才可以获取外部变量this
			console.log(response);
			if (response.data == '0') {
				Modal.success({
					content: '用户 ' + this.state.userName + ' 注册成功！',
					onOk: () => {
						this.setState({
							registerflag: true
						})
					}
				});

			} else {
				Modal.error({
					content: "注册失败" + response.data
				});
			}
		}).catch(function(error) {
			Modal.error({
				content: '注册失败原因：' + error
			});
		});
	}
	render() {
		if (this.state.registerflag) {
			return <Navigate to='/' />;
		}

		return (
			<Row>
				<p>用户名：</p>
				<Input name="userName" type='text'  onChange={this.myChangeHandler} placeholder="请输入用户名"/>
				<p>密码：</p>
				<Input name="passWord" type='text'  onChange={this.myChangeHandler} placeholder="请输入密码"/>
				<p>手机号：</p>
				<Input name="phoneNum" type='text' onChange={this.myChangeHandler} placeholder="请输入手机号"/>
				<p>邮箱：</p>
				<Input name="email" type='text' onChange={this.myChangeHandler} placeholder="请输入邮箱"/>
				<br />
				{/*这个语法确保了 `this` 绑定在  handleClick 中*/}
				<button id="btn_register" onClick={this.registerClick} >注册</button>
			</Row>
		);
	}
}

export default RegisterMessge;