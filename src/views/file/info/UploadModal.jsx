import React from 'react';
import {Button, DatePicker, Form, Icon, Modal, Select, Upload} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
const FormItem = Form.Item;
const {MonthPicker, RangePicker, WeekPicker} = DatePicker;
const Option = Select.Option;

const UploadModalForm = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Create a new collection"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout='horizontal' onSubmit={this.handleSubmit}>
                        <FormItem label="执行日期">
                            {getFieldDecorator('fileDate', {
                                rules: [{required: true, message: '执行日期不能为空'}],
                            })(<DatePicker size='default'/>)}
                        </FormItem>
                        <FormItem label="文件类型">
                            {getFieldDecorator('excuteType', {
                                rules: [{required: true, message: '文件类型不能为空'}],
                            })(<Select style={{width: 160}}>
                                <Option key="0">每日计息(大数据)</Option>
                                <Option key="1">推荐策略</Option>
                                <Option key="2">产品信息</Option>
                                <Option key="3">每日计息(原文件)</Option>
                                <Option key="4">到期兑付</Option>
                                <Option key="5">批量发券文件</Option>
                            </Select>)}
                        </FormItem>
                        <FormItem label="选择文件">
                            {getFieldDecorator('file', {
                                rules: [{required: true, message: '请选择上传文件'}],
                            })(<Upload>
                                <Button>
                                    <Icon type="upload"/>选择文件
                                </Button>
                            </Upload>)}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);

class UploadModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            confirmLoading: false
        }

        this.showModal = this.showModal.bind(this);
        this.saveFormRef = this.saveFormRef.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

    }

    showModal = () => {
        this.setState({
            visible: true
        });
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    }
    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    render() {
        const {visible, loading, fields} = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    上传文件
                </Button>
                <UploadModalForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

export default UploadModal;