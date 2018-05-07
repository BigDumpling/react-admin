import React from 'react'
import { Table, Button, Input, Icon, Popconfirm, Divider } from 'antd'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {AddPageButton, EditLink} from './ModalFormTriggers'
import AasDetails from './AasDetails'
import AasForm from './AasForm'

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

const expandedRowRender = (record) => {
    const columns = [
        { title: '资产配置策略编号', dataIndex: 'strategyId', key: 'strategyId' },
        { title: '一级分类码', dataIndex: 'firstCode', key: 'firstCode' },
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
            render: (text, record) => {
                return (
                    <div>
                        <Popconfirm title="Sure to delete?" onConfirm={() => console.log('1111111')}>
                            <a href="javascript:;">删除</a>
                        </Popconfirm>
                    </div>
                )
            }
        }
    ]

    let data = []
    for (let i = 0; i < 2; i++) {
        data.push({
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
    

    return (
        <Table 
            columns={columns} 
            dataSource={data}
            pagination={false}
        />
    )
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
                    const path = {
                        pathname: '/app/prodmgnt/aas/details',
                        state: {
                            record
                        }
                    }
                    return (
                        <div>
                            <Link to={path}>明细</Link>
                            <Divider type="vertical" />
                            <EditLink entity={record} realForm={AasForm} />
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
                <AddPageButton realForm={AasForm} />
                <Table 
                    columns={columns} 
                    dataSource={this.state.data} 
                    rowSelection={rowSelection} 
                    rowKey="id" 
                    //expandedRowRender={expandedRowRender}
                    className="components-table-demo-nested"
                />
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

                    .components-table-demo-nested .ant-table-expanded-row > td:last-child {
                        padding: 0 48px 0 8px;
                    }
                      
                    .components-table-demo-nested .ant-table-expanded-row > td:last-child .ant-table-thead th {
                        border-bottom: 1px solid #e9e9e9;
                    }
                      
                    .components-table-demo-nested .ant-table-expanded-row > td:last-child .ant-table-thead th:first-child {
                        padding-left: 0;
                    }
                      
                    .components-table-demo-nested .ant-table-expanded-row > td:last-child .ant-table-row td:first-child {
                        padding-left: 0;
                    }
                      
                    .components-table-demo-nested .ant-table-expanded-row .ant-table-row:last-child td {
                        border: none;
                    }
                      
                    .components-table-demo-nested .ant-table-expanded-row .ant-table-thead > tr > th {
                        background: none;
                    }
                      
                    .components-table-demo-nested .table-operation a:not(:last-child) {
                        margin-right: 24px;
                    }
                      
                    .components-table-demo-nested .ant-table-expanded-row:hover > td {
                        background: #fbfbfb;
                    }
                `}</style>
            </div>
        )
    }
}



export {AssetAllocationStrategy, AasDetails}