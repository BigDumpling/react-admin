import React from 'react'
import { Button, Popconfirm, Table, Divider, Select } from 'antd'
import AasDetailsForm from './AasDetailsForm'
import {AddPageButton, EditLink} from './ModalFormTriggers'
/*
const firstCodeOptions = firstCode.map(item => <Option key={item}>{item}</Option>)

const renderFirstCode = (text, record) => {
    // to do
    const firstCodeOptions = firstCode.map(item => <Option key={item}>{item}</Option>)
    return record.creating ? 
            (<EditableSelect subComponents={irstCodeOptions}/>) : 
            (<div>{text}</div>)
}
*/

class AasDetails extends React.Component {
    constructor(props) {
        super(props)

        this.handleDelete = this.handleDelete.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        //this.handleCreate = this.handleCreate.bind(this)
        //this.refreshStateInput = this.refreshStateInput.bind(this)

        this.state = {
            data: [],
            entity: undefined
        }
    }

    componentDidMount() {
        console.log('passed data', this.props.location.state)
        
        // 模拟请求后端获取数据
        if (this.props.location.state && this.props.location.state.record) {
            const { record } = this.props.location.state
            let data = []
            for (let i = 0; i < 2; i++) {
                data.push({
                    key: i,
                    strategyId: record.id,
                    firstCode: 'a',
                    secondCode: 'a1',
                    thirdCode: 'x',
                    proportion: 0.3,
                    status: "有效",
                    editable: 'true',
                    createTime: '2017-03-25 21:13:00',
                    modifyTime: '2017-11-10 20:03:01'
                })
            }
            this.setState({
                data,
                entity: record
            })
        }
    }
    

    handleDelete(record) {
        console.log(record)
    }

    handleAdd() {
        /*
        console.log('handle add')
        const tempData = this.state.data.concat({
            key: this.state.data.length,
            strategyId: this.state.entity.id,
            firstCode: undefined,
            secondCode: undefined,
            thirdCode: undefined,
            proportion: undefined,
            status: "有效",
            editable: 'true',
            createTime: '2017-03-25 21:13:00',
            modifyTime: '2017-11-10 20:03:01',
            creating: true
        })
        this.setState({
            data: tempData
        })
        */
    }

    handleCreate(record) {
    }

    /*
    refreshStateInput(record, index, newVal) {
        const { data } = this.state
        const newData = data.map(item => {
            if (item.id !== undefined && item.id === record.id) {
                item[index] = parseInt(newVal)
                return item
            } 

            if (item.key !== undefined && (item.key === record.key)) {
                item[index] = parseInt(newVal)
                return item
            }
            return item
        })

        this.setState({
            data: newData
        })
    }

    refreshStateSelect(record, index, newVal) {
        const { data } = this.state
        const newData = data.map(item => {
            if (item.id !== undefined && item.id === record.id) {
                item[index] = newVal
                return item
            } 

            if (item.key !== undefined && (item.key === record.key)) {
                item[index] = newVal
                return item
            }
            return item
        })

        this.setState({
            data: newData
        })
    }
    */

    render() {
        const { data } = this.state

        const columns = [
            { 
                title: '资产配置策略编号', 
                dataIndex: 'strategyId', 
                key: 'strategyId'
            },
            { 
                title: '一级分类码', 
                dataIndex: 'firstCode', 
                key: 'firstCode'
            },
            { 
                title: '二级分类码', 
                dataIndex: 'secondCode', 
                key: 'secondCode'
            },
            { title: '三级分类码', dataIndex: 'thirdCode', key: 'thirdCode' },
            { title: '四级分类码', dataIndex: 'thirdCode', key: 'thirdCode' },
            { title: '分配比率', dataIndex: 'proportion', key: 'proportion' },
            { title: '状态', dataIndex: 'status', key: 'status' },
            { title: '是否可编辑', dataIndex: 'editable', key: 'editable' },
            { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
            { title: '修改时间', dataIndex: 'modifyTime', key: 'modifyTime' },
            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                //width: '30%',
                render: (text, record) => {
                    return (
                        <div>
                            <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record)}>
                                <a href="javascript:;">删除</a>
                            </Popconfirm>
                            <Divider type="vertical" />
                            <a href="javascript:;">编辑</a>
                        </div>
                    )
                }
            }
        ]

        return (
            <div>
            <div>
                <AddPageButton realForm={AasDetailsForm}/>
                
                <Table 
                    columns={columns} 
                    dataSource={data}
                    pagination={false}
                />
            </div>
            <style>{`
                .btn {
                    margin-top: 8px;
                    margin-bottom: 8px;
                }
            `}</style>
            </div>
        )
    }
}

export default AasDetails