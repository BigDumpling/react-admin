import React from 'react'
import { Button, Modal, Form, Input, Select } from 'antd'

const Option = Select.Option
const FormItem = Form.Item

const AasForm = Form.create()(class extends React.Component {
    componentDidMount() {
        const { entity } = this.props
        let propsObj = {}
        if (entity) {
            for (let prop in entity) {
                if (entity.hasOwnProperty(prop)) {
                    propsObj[prop] = entity[prop]
                }
            }
        }
        console.log('propsObj', propsObj)
        this.props.form.setFieldsValue(propsObj)
    }
    render() {
        const { visible, onCancel, onCreate, form, title } = this.props
        const { getFieldDecorator } = form

        return (
            <Modal
                visible={visible}
                title={title}
                okText="确定"
                cancelText="取消"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <FormItem label="策略名称">
                        {getFieldDecorator('aasName', {
                            rules: [{ required: true, message: '请输入策略名称!' }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="适用风险等级">
                        {getFieldDecorator('applicableRiskLevel')(
                            <Select initialValue="1">
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                                <Option value="4">4</Option>
                                <Option value="5">5</Option>
                                <Option value="6">6</Option>
                                <Option value="7">7</Option>
                                <Option value="8">8</Option>
                                <Option value="9">9</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="期限">
                        {getFieldDecorator('term', {
                            rules: [{ required: true, message: '请输入期限!' }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="期限单位">
                        {getFieldDecorator('termUnit', {
                            rules: [{ required: true, message: '请选择期限单位!' }]
                        })(
                            <Select initialValue="0">
                                <Option value="0">天</Option>
                                <Option value="1">周</Option>
                                <Option value="2">月</Option>
                                <Option value="3">季</Option>
                                <Option value="4">年</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="状态">
                        {getFieldDecorator('status')(
                            <Select initialValue="0">
                                <Option value="0">无效</Option>
                                <Option value="1">有效</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="是否可编辑">
                        {getFieldDecorator('isEditable')(
                            <Select initialValue="true">
                                <Option value="true">是</Option>
                                <Option value="false">否</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="策略描述">
                        {getFieldDecorator('aasDesc', {
                            rules: [{ required: true, message: '请输入策略描述!' }]
                        })(
                            <Input.TextArea />
                        )}
                    </FormItem>
                    <FormItem label="风险警告描述">
                        {getFieldDecorator('riskAlertDesc')(
                            <Input.TextArea />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
})


export default AasForm