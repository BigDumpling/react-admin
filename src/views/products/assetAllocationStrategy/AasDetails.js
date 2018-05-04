import React from 'react'
import { Button, Popconfirm, Table, Divider, Select } from 'antd'
import { EditableInput, EditableSelect } from '../../../components/EditableComponents'

const Option = Select.Option

const firstCode = ['a', 'b', 'c']
const secondCode = {
    a: ['a1', 'a2'],
    b: ['b1', 'b2', 'b3'],
    c: ['c1', 'c2', 'c3']
}


/*
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
        this.handleCreate = this.handleCreate.bind(this)
        this.refreshState = this.refreshState.bind(this)

        this.state = {
            data: [],
            entity: undefined
        }
    }

    componentDidMount() {
        console.log('passed data', this.props.location.state)
        
        // 模拟请求后端获取数据44
        if (this.props.location.state && this.props.location.state.record) {
            const { record } = this.props.location.state
            let data = []
            for (let i = 0; i < 2; i++) {
                data.push({
                    key: i,
                    strategyId: record.id,
                    firstCode: 1,
                    secondCode: 2,
                    thirdCode: 3,
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
        console.log('handle add')
        const tempData = this.state.data.concat({
            key: this.state.data.length,
            strategyId: this.state.entity.id,
            firstCode: 1,
            secondCode: 2,
            thirdCode: 3,
            proportion: 0.3,
            status: "有效",
            editable: 'true',
            createTime: '2017-03-25 21:13:00',
            modifyTime: '2017-11-10 20:03:01',
            creating: true
        })
        this.setState({
            data: tempData
        })
    }

    handleCreate(record) {

    }

    refreshState(record, index, newVal) {
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

    render() {
        const { data } = this.state

        const columns = [
            { 
                title: '资产配置策略编号', 
                dataIndex: 'strategyId', 
                key: 'strategyId', 
                render: (text, record) => true ?
                    (<EditableInput 
                        value={record.strategyId} 
                        onChange={(newVal) => this.refreshState(record, 'strategyId', newVal)} 
                    />) :
                    (<div>{text}</div>)
            },
            { 
                title: '一级分类码', 
                dataIndex: 'firstCode', 
                key: 'firstCode',
                render: (text, record) => true ?
                    (<EditableSelect 
                        value={record.firstCode} 
                        onChange={(newVal) => this.refreshState(record, 'firstCode', newVal)} 

                    />) :
                    (<div>{text}</div>)
            },
            { title: '二级分类码', dataIndex: 'secondCode', key: 'secondCode' },
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
                            { 
                                record.creating &&  <Divider type="vertical" />
                            }
                            {
                                record.creating && 
                                <Popconfirm title="确认添加?" onConfirm={() => this.handleCreate(record)}>
                                    <a href="javascript:;">添加</a>
                                </Popconfirm>
                            }
                        </div>
                    )
                }
            }
        ]

        return (
            <div>
            <div>
                <Button type="primary" onClick={this.handleAdd} className="btn">添加</Button>
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