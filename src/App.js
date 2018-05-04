import React, {Component} from 'react';
import {Icon, Layout, notification} from 'antd';
import './style/index.less';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
import {fetchData, receiveData} from './action';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Routes from './routes';
import * as method from './constants/HttpMethod';
import * as url from './constants/RequestUrlConstants';

/**
 * ES6解构模式，等同于 Content=Layout.Layout, Footer=Layout.Footer;
 */
const {Content, Footer} = Layout;

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };

        this.getClientWidth = this.getClientWidth.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentWillMount() {
        const {receiveData} = this.props;
        const user = JSON.parse(localStorage.getItem('user'));
        user && receiveData(user, 'auth');
        const {fetchData} = this.props;
        fetchData({
            funcName: method.GET,
            url: url.MENU,
            stateName: 'menu',
            params: `super/CONTROL`,
            variable: true
        });
        this.getClientWidth();

        window.onresize = () => {
            console.log('屏幕变化了');
            this.getClientWidth();
        }
    }

    componentDidMount() {
        const openNotification = () => {
            notification.open({
                message: '智投控台',
                description: (
                    <div>
                        <p>
                            天地不仁以万物为刍狗
                        </p>
                    </div>
                ),
                icon: <Icon type="smile-circle" style={{color: 'red'}}/>,
                duration: 0,
            });
            localStorage.setItem('isFirst', JSON.stringify(true));
        };
        const isFirst = JSON.parse(localStorage.getItem('isFirst'));
        // !isFirst && openNotification();
        openNotification();
    }

    /**
     * 获取当前浏览器宽度并设置responsive管理响应式
     */
    getClientWidth = () => {
        const {receiveData} = this.props;
        const clientWidth = document.body.clientWidth;
        receiveData(false, 'responsive');
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        const state = this.state;
        const {auth, menu} = this.props;
        return (
            <Layout>
                <SiderCustom collapsed={state.collapsed} menu={menu}/>
                <Layout style={{flexDirection: 'column'}}>
                    <HeaderCustom toggle={this.toggle} collapsed={state.collapsed} user={auth.data || {}}/>
                    <Content style={{margin: '0 16px', overflow: 'initial'}}>
                        <Routes auth={auth}/>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        React-Admin ©2017 Created by 865470087@qq.com
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = state => {

    /**
     * ES6解构模式，等同于 let auth = {data: {}}; let responsive = {data: {}}; auth = state.httpData.auth; responsive = state.httpData.responsive;
     * @type {{data: {}}}
     */
    const {auth = {data: {}}, responsive = {data: {}}, menu = {data: {}}} = state.httpData;

    /**
     * ES6对象扩展，等同于 let auth=**; let responsive=**; return {auth: auth, responsive: responsive};
     */
    return {auth, responsive, menu};
};
const mapDispatchToProps = dispatch => ({
    receiveData: bindActionCreators(receiveData, dispatch),
    fetchData: bindActionCreators(fetchData, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
