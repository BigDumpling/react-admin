import React from 'react'
import { Button, Modal, Form, Input, Select } from 'antd'

const Option = Select.Option
const FormItem = Form.Item

const firstCode = ['a', 'b', 'c']
const secondCode = {
    a: ['a1', 'a2'],
    b: ['b1', 'b2'],
    c: ['c1', 'c2']
}

const AasDetailsForm = Form.create()(
    class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                firstCode: [],
                secondCode: [],
                thirdCode: [],
                fourthCode: []
            }
        }

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
            this.props.form.setFieldsValue(propsObj)


            this.setState({
                firstCode
            })
        }

        render() {
            const { visible, onCancel, onCreate, form, title } = this.props
            const { firstCode } = this.state
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
                        <FormItem label="一级分类码">
                            {getFieldDecorator('applicableRiskLevel')(
                                <Select initialValue={firstCode[0]}>
                                    {firstCode.map(item => (<Option value={item}>{item}</Option>))}
                                </Select>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            )
        }
    }
)

export default AasDetailsForm