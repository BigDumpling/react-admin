import React from 'react';
import {Button, Col, Form, Icon, Input, Row} from 'antd';

const FormItem = Form.Item;

class AdvancedSearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expand: false,
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.toggle = this.toggle.bind(this);
        this.getFields = this.getFields.bind(this);
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    toggle = () => {
        const {expand} = this.state;
        this.setState({expand: !expand});
    }

    getFields() {
        const count = this.state.expand ? 10 : 6;
        const {getFieldDecorator} = this.props.form;
        const {item} = this.props;
        const children = [];
        for (let i = 0; i < item.length; i++) {
            const value = item[i];
            children.push(
                <Col span={8} key={i} style={{display: i < count ? 'block' : 'none'}}>
                    <FormItem label={value.label}>
                        {getFieldDecorator(value.field, {})(
                            <Input placeholder=""/>
                        )}
                    </FormItem>
                </Col>
            );
        }
        return children;
    }

    render() {
        return (
            <Form
                className="ant-advanced-search-form"
                onSubmit={this.handleSearch}
            >
                <Row gutter={24}>{this.getFields()}</Row>
                <Row>
                    <Col span={24} style={{textAlign: 'right'}}>
                        <Button type="primary" htmlType="submit">Search</Button>
                        <Button style={{marginLeft: 8}} onClick={this.handleReset}>
                            Clear
                        </Button>
                        <a style={{marginLeft: 8, fontSize: 12}} onClick={this.toggle}>
                            Collapse <Icon type={this.state.expand ? 'up' : 'down'}/>
                        </a>
                    </Col>
                </Row>
            </Form>
        );
    }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

export default WrappedAdvancedSearchForm;