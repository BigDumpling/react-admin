/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import {Button, Form, Icon, Input} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData, receiveData} from './../../action';
import * as method from './../../constants/HttpMethod';
import * as url from './../../constants/RequestUrlConstants';

const FormItem = Form.Item;

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        const {receiveData} = this.props;
        receiveData(null, 'auth');
    }

    componentWillReceiveProps(nextProps) {
        const {auth: nextAuth = {}} = nextProps;
        const {history} = this.props;

        console.log(`是否登陆判断 ${JSON.stringify(nextProps)}`);
        if (nextAuth.data && nextAuth.data.token) {   // 判断是否登陆
            localStorage.setItem('user', JSON.stringify(nextAuth.data));
            console.log('是否登陆判断2');
            /**
             * 登陆成功后跳转页面
             */
            history.push('/app/dashboard/index');
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {userName, passWord} = values;
                const {fetchData} = this.props;
                fetchData({
                    funcName: method.POST,
                    url: url.LOGIN,
                    stateName: 'auth',
                    params: {userName, passWord}
                });
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login">
                <div className="login-form">
                    <div className="login-logo">
                        <span>React Admin</span>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{required: true, message: '请输入用户名!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                       placeholder="请输入用户名"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('passWord', {
                                rules: [{required: true, message: '请输入密码!'}],
                            })(
                                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                       placeholder="请输入密码"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {/*{getFieldDecorator('remember', {*/}
                            {/*valuePropName: 'checked',*/}
                            {/*initialValue: true,*/}
                            {/*})(*/}
                            {/*<Checkbox>记住我</Checkbox>*/}
                            {/*)}*/}
                            <Button type="primary" htmlType="submit" className="login-form-button"
                                    style={{width: '100%'}}>
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>

        );
    }
}

const mapStateToPorps = state => {
    const {auth} = state.httpData;
    console.log(`Login mapStateToPorps, auth == ${JSON.stringify(auth)}`)

    return {auth};
};
const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch)
});


export default connect(mapStateToPorps, mapDispatchToProps)(Form.create()(Login));