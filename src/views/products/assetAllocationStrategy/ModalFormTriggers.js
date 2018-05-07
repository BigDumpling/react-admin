import React from 'react'
import { Button } from 'antd'
import AasForm from './AasForm'


class PageTrigger extends React.Component {
    constructor(props) {
        super(props)

        this.showModal = this.showModal.bind(this)
        this.handleCreate = this.handleCreate.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.saveFormRef = this.saveFormRef.bind(this)
        
        this.state = {
            visible: false,
            confirmLoading: false
        }
    }

    showModal() {
        this.setState({
            visible: true
        })
    }

    handleCreate() {
        this.setState({
            confirmLoading: true
        })

        const form = this.formRef.props.form
        form.validateFields((err, values) => {
            if (err) {
                return
            }

            console.log('Form is: ', form)
            //console.log('Received values of form: ', values);

            form.resetFields();
            console.log('Changed form is: ', form)
            this.setState({ 
                visible: false, 
                confirmLoading: false 
            })
        })
    }

    handleCancel() {
        const form = this.formRef.props.form;
        if (this.props.type === 'add') {
            form.resetFields();
        }
        
        this.setState({
            visible: false
        })
    }

    saveFormRef(formRef) {
        this.formRef = formRef;
    }

    render() {
        const { visible, confirmLoading } = this.state
        const { type, entity } = this.props
        const RealForm = this.props.realForm
        return (
            <div>
                {
                    type === 'add' && 
                    (
                        <div>
                            <Button type="primary" onClick={this.showModal} className="editable-add-btn">添加</Button>
                            <RealForm
                                wrappedComponentRef={this.saveFormRef}
                                visible={this.state.visible}
                                onCancel={this.handleCancel}
                                onCreate={this.handleCreate}
                            />
                        </div>
                    )
                }

                {
                    type === 'edit' &&
                    (
                        <div>
                            <a href="javascript:;" onClick={this.showModal}>编辑</a>
                            <RealForm
                                wrappedComponentRef={this.saveFormRef}
                                visible={this.state.visible}
                                onCancel={this.handleCancel}
                                onCreate={this.handleCreate}
                                entity={entity}
                            />
                        </div>
                    )
                        
                }
                
                
                {
                    type === 'add' &&
                    <style>{`
                        .editable-add-btn {
                            margin-bottom: 8px;
                        }
                    `}
                    </style>
                }
                
            </div>
        )
    }
}


const AddPageButton = (props) => (
    <PageTrigger type="add" realForm={props.realForm} />
)

const EditLink = (props) => (
    <PageTrigger type="edit" entity={props.entity} realForm={props.realForm} />
)

export {AddPageButton, EditLink}