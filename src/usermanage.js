import React, {
  useState
} from 'react';
import axios from 'axios';
import {
  Table,
  Tag,
  Space,
  PageHeader,
  Tabs,
  Button,
  Statistic,
  Descriptions
} from 'antd';
import {
  myCookieGet,
  myCookieDel
} from './pubjs/cookie.js' // 引入

const {
  TabPane
} = Tabs;

const loginusername = myCookieGet('username');

const renderContent = (state, column = 3) => (
  <Descriptions size="small" column={column}>
    <Descriptions.Item label="用户名">{loginusername}</Descriptions.Item>
    <Descriptions.Item label="手机号">{state.phone}</Descriptions.Item>
    <Descriptions.Item label="邮箱">{state.email}</Descriptions.Item>
    <Descriptions.Item label="创建时间">{state.reg_time}</Descriptions.Item>
    <Descriptions.Item label="账号创建IP">{state.bind_ip}</Descriptions.Item>
    <Descriptions.Item label="当前登录IP">{state.now_ip}</Descriptions.Item>
  </Descriptions>
);

const extraContent = (
  <div
    style={{
      display: 'flex',
      width: 'max-content',
      justifyContent: 'flex-end',
    }}
  >
  </div>
);

const Content = ({
  children,
  extra
}) => (
  <div className="content">
    <div className="main">{children}</div>
    <div className="extra">{extra}</div>
  </div>
);
const myTitleInfoGetParams = (params) => ({
  username: params.loginusername
})
class TitlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: '',
      phone: '',
      email: '',
      bind_ip: '',
      now_ip: '',
      reg_time: ''

    };
  }
  componentDidMount() { //react生命周期初始化
    this.TitleInfoHandler({
      loginusername
    });
  }
  componentWillUnmount() {
    myCookieDel('username')
  }
  TitleInfoHandler = (params = {}) => {
    console.log(params); //loginusername: "gjb"所以这样不行要处理
    console.log(myTitleInfoGetParams(params)); //loginusername: "gjb"所以这样不行要处理
    axios({
      url: '/main/getuserinfo',
      method: 'get',
      params: myTitleInfoGetParams(params)
    }).then(response => {
      const data = response.data.row;
      console.log('222', data[0])

      this.setState({
        userid: data[0].id,
        phone: data[0].phone,
        email: data[0].email,
        bind_ip: data[0].bind_ip,
        now_ip: data[0].now_ip,
        reg_time: data[0].reg_time
      });
    });
  };
  render() {
    console.log('123', this.state);
    return (<PageHeader
          className="site-page-header-responsive"
          onBack={() => window.history.back()}
          title="用户管理"
          subTitle="测试"
          extra={[
            <Button key="3">Operation</Button>,
            <Button key="2">Operation</Button>,
            <Button key="1" type="primary">
              Primary
            </Button>,
          ]}
          footer={
            <Tabs defaultActiveKey="1">
              <TabPane tab="Details" key="1" />
              <TabPane tab="Rule" key="2" />
            </Tabs>
          }
        >
          <Content extra={extraContent}>{renderContent(this.state)}</Content>
        </PageHeader>);
  }
}

const columns = [{
  title: '用户名',
  dataIndex: 'name',
  key: 'name'
}, {
  title: '手机号',
  dataIndex: 'phone',
  key: 'phone',
}, {
  title: '邮箱',
  dataIndex: 'email',
  key: 'email',
}, {
  title: '绑定IP',
  dataIndex: 'bind_ip',
  key: 'bind_ip',
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <Space size="middle">
      <a>编辑</a>
      <a>删除</a>
    </Space>
  ),
}];

const getRandomuserParams = (params) => ({
  limit: params.pagination.pageSize,
  page: params.pagination.current
});

class UserManage extends React.Component {
  state = {
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    loading: false,
  };

  componentDidMount() {
    const {
      pagination
    } = this.state;
    this.userListHandler({
      pagination
    });
  }

  handleTableChange = (pagination) => {
    this.userListHandler({
      pagination,
    });
  };

  userListHandler = (params = {}) => {
    this.setState({
      loading: true
    });
    axios({
      url: '/main/getuserlist',
      method: 'get',
      params: getRandomuserParams(params), //get params
    }).then(response => {
      const data = response.data;
      this.setState({
        loading: false,
        data: data.row,
        pagination: {
          ...params.pagination
        },
      });
    });
  };

  render() {
    const {
      data,
      pagination,
      loading
    } = this.state;
    return (

      <Table
        columns={columns}
        rowKey={record => record.id}//record就是data
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={this.handleTableChange}
      />
    );
  }
}

function UserManagePage() {
  return (
    <div>
        <TitlePage  />
        <UserManage  /></div>
  );
}

export default UserManagePage;