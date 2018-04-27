import React, {Component} from 'react';
import {Icon, Layout, notification} from 'antd';
import './style/index.less';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
import {receiveData} from './action';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Routes from './routes';

/**
 * ES6解构模式，等同于 Content=Layout.Layout, Footer=Layout.Footer;
 */
const {Content, Footer} = Layout;

class App extends Component {
    state = {
        collapsed: false,
    };

    componentWillMount() {
        const {receiveData} = this.props;
        const user = JSON.parse(localStorage.getItem('user'));
        console.log('App.js user == ' + JSON.stringify(user));
        user && receiveData(user, 'auth');
        // receiveData({a: 213}, 'auth');
        // fetchData({funcName: 'admin', stateName: 'auth'});
        this.getClientWidth();
        window.onresize = () => {
            console.log('屏幕变化了');
            this.getClientWidth();
            // console.log(document.body.clientWidth);
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

    getClientWidth = () => {    // 获取当前浏览器宽度并设置responsive管理响应式
        const {receiveData} = this.props;
        console.log('App.js receiveData == ' + JSON.stringify(receiveData))
        const clientWidth = document.body.clientWidth;
        console.log(clientWidth);
        receiveData(false, 'responsive');
        console.log('App.js receiveData2 == ' + JSON.stringify(receiveData))

    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        const {auth, responsive} = this.props;
        console.log('App.js auth == ' + JSON.stringify(auth));
        console.log('App.js responsive == ' + JSON.stringify(responsive));
        return (
            <Layout>
                <SiderCustom collapsed={this.state.collapsed}/>
                <Layout style={{flexDirection: 'column'}}>
                    <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={auth.data || {}}/>
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
    console.log('state == ' + JSON.stringify(state));
    const {auth = {data: {}}, responsive = {data: {}}} = state.httpData;

    /**
     * ES6对象扩展，等同于 let auth=**; let responsive=**; return {auth: auth, responsive: responsive};
     */
    return {auth, responsive};
};
const mapDispatchToProps = dispatch => ({
    receiveData: bindActionCreators(receiveData, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
