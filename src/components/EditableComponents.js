import React from 'react'
import { Input, Icon, Select } from 'antd';


class EditableCell extends React.Component {
    constructor(props) {
        super(props)

        this.check = this.check.bind(this)
        this.edit = this.edit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        
        this.state = {
            value: this.props.value,
            editable: false
        }
    }

    handleChange(e) {
        const { refreshParentState, dataIndex } = this.props
        const value = e.target.value;
        this.setState({ value })
    }

    check() {
        console.log('in check1')
        this.setState({ editable: false });
        if (this.props.onChange) {
            console.log('in check2')
            this.props.onChange(this.state.value);
        }
    }

    edit() {
        this.setState({ editable: true });
    }

    render() {
        const Component = this.props.component
        const { value, editable } = this.state
        const { defaultValue } = this.props

        return (
            <div>
                <div className="editable-cell">
                    {
                        editable ?
                            <div className="editable-cell-input-wrapper">
                                <Component 
                                    defaultValue={defaultValue}
                                    value={value}
                                    onChange={this.handleChange}
                                    onPressEnter={this.check}
                                >
                                </Component>
                                <Icon
                                    type="check"
                                    className="editable-cell-icon-check"
                                    onClick={this.check}
                                />
                            </div>
                            :
                            <div className="editable-cell-text-wrapper">
                                {value || ' '}
                                <Icon
                                    type="edit"
                                    className="editable-cell-icon"
                                    onClick={this.edit}
                                />
                            </div>
                    }
                </div>
                <style>{`
                    .editable-cell {
                        position: relative;
                    }
                      
                    .editable-cell-input-wrapper,
                    .editable-cell-text-wrapper {
                        padding-right: 24px;
                    }
                      
                    .editable-cell-text-wrapper {
                        padding: 5px 24px 5px 5px;
                    }
                      
                    .editable-cell-icon,
                    .editable-cell-icon-check {
                        position: absolute;
                        right: 0;
                        width: 20px;
                        cursor: pointer;
                    }
                      
                    .editable-cell-icon {
                        line-height: 18px;
                        display: none;
                    }
                      
                    .editable-cell-icon-check {
                        line-height: 28px;
                    }
                      
                    .editable-cell:hover .editable-cell-icon {
                        display: inline-block;
                    }
                      
                    .editable-cell-icon:hover,
                    .editable-cell-icon-check:hover {
                        color: #108ee9;
                    }
                      
                    .editable-add-btn {
                        margin-bottom: 8px;
                    }
                `}</style>
            </div>
        )
    }
}

const EditableInput = (props) => (
    <EditableCell component={Input} value={props.value} onChange={props.onChange} />
)

const EditableSelect = (props) => {
    return (
        <EditableCell component={Select} value={props.value} onChange={props.onChange} defaultValue={props.defaultValue} subComponents={props.subComponents}/>
    )
}
    


export { EditableInput, EditableSelect }