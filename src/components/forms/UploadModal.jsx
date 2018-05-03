import React from 'react';
import {Button, DatePicker, Form, Icon, Modal, Select, Upload} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import * as method from "../../constants/HttpMethod";
import * as url from "../../constants/RequestUrlConstants";
moment.locale('zh-cn');
const FormItem = Form.Item;
const {MonthPicker, RangePicker, WeekPicker} = DatePicker;
const Option = Select.Option;

const CustomizedForm = Form.create({
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        return {
            fileDate: Form.createFormField({
                ...props.fileDate,
                value: props.fileDate.value,
            }),
            excuteType: Form.createFormField({
                ...props.excuteType,
                value: props.excuteType.value,
            }),
            file: Form.createFormField({
                ...props.file,
                value: props.file.value,
            }),
        };
    },
    onValuesChange(_, values) {
        console.log(values);
    },
})((props) => {
    const {getFieldDecorator} = props.form;
    return (
        <Form layout='horizontal' style={{maxWidth: '300px'}}>
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
    );
});


class UploadModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            fields: {
                fileDate: {
                    value: '',
                },
                excuteType: {
                    value: '',
                },
                file: {
                    value: '',
                },
            },
        }

        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
    }


    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = () => {
        this.setState({loading: true});
        console.log(`文件上传 form data == ${JSON.stringify(this.state.fields)}`);
    }

    handleCancel = () => {
        this.setState({visible: false, loading: false});
    }

    handleFormChange = (changedFields) => {
        this.setState(({fields}) => ({
            fields: {...fields, ...changedFields},
        }));
    }

    render() {
        const {visible, loading, fields} = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    上传文件
                </Button>
                <Modal
                    visible={visible}
                    title="文件上传"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>取消</Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            上传
                        </Button>,
                    ]}
                >
                    <CustomizedForm {...fields} onChange={this.handleFormChange}/>
                </Modal>
            </div>
        );
    }
}

export default UploadModal;