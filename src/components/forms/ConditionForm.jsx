import React from 'react';
import {Button, Form, Input} from 'antd';
const FormItem = Form.Item;

class ConditionForm extends React.Component {

    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        console.log('handleSubmit');
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form>
                <FormItem>
                    {getFieldDecorator('fileName', {
                        rules: []
                    })(
                        <Input placeholder="文件名"/>
                    )}
                </FormItem>
                <FormItem>
                    <Button
                        type="primary"
                        htmlType='submit'
                    >
                        查询
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const ConditionSearchForm = Form.create()(ConditionForm);

export default ConditionSearchForm;