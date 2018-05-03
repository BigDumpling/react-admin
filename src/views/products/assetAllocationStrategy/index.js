import React from 'react'
import { Table, Button, Input, Icon, Popconfirm, Divider } from 'antd'
import moment from 'moment'
import AddPageButton from './AddPageButton'

const datalst = {
	"data": [{
		"aasDesc": "test",
		"aasName": "test11",
		"applicableRiskLevel": "1",
		"createTime": 1524453303000,
		"id": 120,
		"isEditable": false,
		"modifyTime": 1524619975000,
		"riskAlertDesc": "test",
		"status": 0,
		"term": 3,
		"termUnit": "2"
	},
	{
		"aasDesc": "客户风险等级9，9个月-默认推荐",
		"aasName": "R9-M9-0517",
		"applicableRiskLevel": "9",
		"createTime": 1510318635000,
		"id": 119,
		"isEditable": false,
		"modifyTime": 1893427200000,
		"riskAlertDesc": "",
		"status": 1,
		"term": 9,
		"termUnit": "2"
	},
	{
		"aasDesc": "客户风险等级9，6个月-默认推荐",
		"aasName": "R9-M6-0517",
		"applicableRiskLevel": "9",
		"createTime": 1510318635000,
		"id": 118,
		"isEditable": false,
		"modifyTime": 1893427200000,
		"riskAlertDesc": "",
		"status": 1,
		"term": 6,
		"termUnit": "2"
	},
	{
		"aasDesc": "客户风险等级9，3个月-默认推荐",
		"aasName": "R9-M3-0517",
		"applicableRiskLevel": "9",
		"createTime": 1510318635000,
		"id": 117,
		"isEditable": false,
		"modifyTime": 1893427200000,
		"riskAlertDesc": "",
		"status": 1,
		"term": 3,
		"termUnit": "2"
	},
	{
		"aasDesc": "客户风险等级8，9个月-默认推荐",
		"aasName": "R8-M9-0517",
		"applicableRiskLevel": "8",
		"createTime": 1510318635000,
		"id": 116,
		"isEditable": false,
		"modifyTime": 1893427200000,
		"riskAlertDesc": "",
		"status": 1,
		"term": 9,
		"termUnit": "2"
	},
	{
		"aasDesc": "客户风险等级8，6个月-默认推荐",
		"aasName": "R8-M6-0517",
		"applicableRiskLevel": "8",
		"createTime": 1510318635000,
		"id": 115,
		"isEditable": false,
		"modifyTime": 1893427200000,
		"riskAlertDesc": "",
		"status": 1,
		"term": 6,
		"termUnit": "2"
	},
	{
		"aasDesc": "客户风险等级8，3个月-默认推荐",
		"aasName": "R8-M3-0517",
		"applicableRiskLevel": "8",
		"createTime": 1510318635000,
		"id": 114,
		"isEditable": false,
		"modifyTime": 1893427200000,
		"riskAlertDesc": "",
		"status": 1,
		"term": 3,
		"termUnit": "2"
	},
	{
		"aasDesc": "客户风险等级7，9个月-默认推荐",
		"aasName": "R7-M9-0517",
		"applicableRiskLevel": "7",
		"createTime": 1510318635000,
		"id": 113,
		"isEditable": false,
		"modifyTime": 1893427200000,
		"riskAlertDesc": "",
		"status": 1,
		"term": 9,
		"termUnit": "2"
	},
	{
		"aasDesc": "客户风险等级7，6个月-默认推荐",
		"aasName": "R7-M6-0517",
		"applicableRiskLevel": "7",
		"createTime": 1510318635000,
		"id": 112,
		"isEditable": false,
		"modifyTime": 1893427200000,
		"riskAlertDesc": "",
		"status": 1,
		"term": 6,
		"termUnit": "2"
	},
	{
		"aasDesc": "客户风险等级7，3个月-默认推荐",
		"aasName": "R7-M3-0517",
		"applicableRiskLevel": "7",
		"createTime": 1510318635000,
		"id": 111,
		"isEditable": false,
		"modifyTime": 1893427200000,
		"riskAlertDesc": "",
		"status": 1,
		"term": 3,
		"termUnit": "2"
	}],
	"draw": 1,
	"recordsFiltered": 98,
	"recordsTotal": 98
}

class AssetAllocationStrategy extends React.Component {
    constructor(props) {
        super(props)
        this.handleAdd = this.handleAdd.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.state = {
            data: datalst.data
        }
    }

    handleAdd() {
    }

    onDelete(record) {

    }

    handleEdit(record) {
    }

    render() {
        const {data} = this.state

        const columns = [
            {
                title: '资产配置策略编号',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '策略名称',
                dataIndex: 'aasName',
                key: 'aasName',
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                        <Input
                            ref={ele => this.searchInput = ele}
                            placeholder="Search name"
                            value={this.state.searchText}
                            onChange={this.onInputChange}
                            onPressEnter={this.onSearch}
                        />
                        <Button type="primary" onClick={this.onSearch}>Search</Button>
                    </div>
                ),
                filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
                filterDropdownVisible: this.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => {
                    this.setState({
                        filterDropdownVisible: visible,
                    }, () => this.searchInput && this.searchInput.focus());
                }
            },
            {
                title: '适用风险等级',
                dataIndex: 'applicableRiskLevel',
                key: 'applicableRiskLevel',
            },
            {
                title: '期限',
                dataIndex: 'term',
                key: 'term',
                render: (text, record) => {
                    let termName = '月'
                    if (record.termUnit !== '2') {
                        termName = '光年'
                    }
                    return (<span>{record.term + termName}</span>)
                }
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                filters: [
                    { text: '全部', value: 2 },
                    { text: '有效', value: 0 },
                    { text: '无效', value: 1 }
                ],
                render: (text, record) => (
                    <span>{record.status === 0 ? '有效' : '无效'}</span>
                )
            },
            {
                title: '是否可编辑',
                dataIndex: 'isEditable',
                key: 'isEditable',
                render: (text, record) => (
                    <span>{record.isEditable ? '是' : '否'}</span>
                )
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
                render: (text, record) => (
                    <span>{moment(record.createTime).format("YYYY-MM-DD")}</span>
                )
            },
            {
                title: '修改时间',
                dataIndex: 'modifyTime',
                key: 'modifyTime',
                render: (text, record) => (
                    <span>{moment(record.modifyTime).format("YYYY-MM-DD")}</span>
                )
            },
            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                render: (text, record) => {
                    return (
                        <div>
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record)}>
                                <a href="javascript:;">删除</a>
                            </Popconfirm>
                            <Divider type="vertical" />
                            <a href="javascript:;" onClick={() => this.handleEdit(record)}>编辑</a>
                        </div>
                    )
                }
            }
        ]

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
            },
            onSelect: (record, selected, selectedRows) => {
                console.log(record, selected, selectedRows)
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log(selected, selectedRows, changeRows)
            },
        }

        return (
            <div className="asset-allocation-strategy">
                <AddPageButton />
                <Table columns={columns} dataSource={this.state.data} rowSelection={rowSelection} rowKey="id"/>
                <style>{`
                    .asset-allocation-strategy {
                        margin-top: 8px;
                    }
                    .custom-filter-dropdown {
                        padding: 8px;
                        border-radius: 6px;
                        background: #fff;
                        box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
                    }
                      
                    .custom-filter-dropdown input {
                        width: 130px;
                        margin-right: 8px;
                    }
                      
                    .highlight {
                        color: #f50;
                    }
                `}</style>
            </div>
        )
    }
}



export default AssetAllocationStrategy