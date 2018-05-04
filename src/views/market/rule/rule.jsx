/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import {Form, Icon, Input, Popconfirm, Table} from 'antd';
import * as method from "../../../constants/HttpMethod";
import * as url from "../../../constants/RequestUrlConstants";
import {fetchData} from '../../../action/index';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';

const FormItem = Form.Item;
const Search = Input.Search;

const EditableCell = ({editable, value, onChange}) => (
    <div>
        {editable
            ? <Input style={{margin: '-5px 0'}} value={value} onChange={e => onChange(e.target.value)}/>
            : value
        }
    </div>
);

class MarketRuleTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterDropdownVisible: false,
            searchText: '',
            filtered: false,
        };
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleGetList = this.handleGetList.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.renderColumns = this.renderColumns.bind(this);
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentWillMount() {
        this.handleGetList({});
    }

    onInputChange = (e) => {
        this.setState({searchText: e.target.value});
    }

    onSearch = () => {
        const {searchText} = this.state;

        searchText && this.handleGetList({
            fileName: searchText
        });

        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText
        });
    }

    handlePageChange = (pagination, filters, sorter) => {
        this.handleGetList({});
    }

    handleGetList = (params) => {
        const {fetchData} = this.props;
        fetchData({
            funcName: method.POST,
            url: url.LOGIN,
            stateName: 'rules',
            params: params
        });
    }

    renderColumns(text, record, column) {
        return (
            <EditableCell
                editable={record.editable}
                value={text}
                onChange={value => this.handleChange(value, record.key, column)}
            />
        );
    }

    edit(key) {
        const {rules} = this.props;
        const target = rules.data.filter(item => key === item.key)[0];
        if (target) {
            target.editable = true;
            this.setState({data: rules});
        }
    }

    save(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            delete target.editable;
            this.setState({data: newData});
            this.cacheData = newData.map(item => ({...item}));
        }
    }

    cancel(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
            delete target.editable;
            this.setState({data: newData});
        }
    }

    render() {
        const {rules} = this.props;
        const pagination = {
            position: 'bottom',
            showSizeChanger: true
        };
        const columns = [
            {
                key: 'id', title: '编号', dataIndex: 'id', defaultSortOrder: 'descend',
                sorter: (a, b) => a.id - b.id,
                render: (text, record) => this.renderColumns(text, record, 'name'),
            },
            {
                key: 'code', title: '活动规则代码', dataIndex: 'code',
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                        <Search
                            ref={ele => this.searchInput = ele}
                            placeholder="输入文件名"
                            onSearch={this.onSearch}
                            style={{width: 200}}
                            onChange={this.onInputChange}
                            enterButton
                        />
                    </div>
                ),
                filterIcon: <Icon type="search" style={{color: this.state.filtered ? '#108ee9' : '#aaa'}}/>,
                filterDropdownVisible: this.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => {
                    this.setState({
                        filterDropdownVisible: visible,
                    }, () => this.searchInput && this.searchInput.focus());
                },
                render: (text, record) => this.renderColumns(text, record, 'name'),
            },
            {
                key: 'ruleType',
                title: '种类',
                dataIndex: 'ruleType',
                render: (text, record) => this.renderColumns(text, record, 'name'),
            },
            {
                key: 'discountPercentage',
                title: '折扣百分比（万分之一）',
                dataIndex: 'discountPercentage',
                render: (text, record) => this.renderColumns(text, record, 'name'),
            },
            {
                key: 'discountAmount',
                title: '抵扣（代金）金额',
                dataIndex: 'discountAmount',
                render: (text, record) => this.renderColumns(text, record, 'name'),
            },
            {
                key: 'experienceAmount',
                title: '满足此金额时才可抵扣',
                dataIndex: 'experienceAmount',
                render: (text, record) => this.renderColumns(text, record, 'name'),
            },
            {
                key: 'raiseInterestRates',
                title: '加息百分比(万分之一)',
                dataIndex: 'raiseInterestRates',
                render: (text, record) => this.renderColumns(text, record, 'name'),
            },
            {
                key: 'action',
                title: '操作',
                render: (text, record) => {
                    const {editable} = record;
                    return (
                        <div className="editable-row-operations">
                            {editable
                                ? <span>
                                    <a onClick={() => this.save(record.key)}>Save</a>
                                    <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                                        <a>Cancel</a>
                                    </Popconfirm>
                                </span>
                                : <a onClick={() => this.edit(record.key)}>Edit</a>
                            }
                        </div>
                    );
                },
            }
        ];

        return (
            <div>
                <Table rowKey='id' bordered columns={columns} dataSource={Array.from(rules.data)}
                       pagination={pagination} onChange={this.handlePageChange}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {rules = {data: {}}} = state.httpData;
    return {rules};
};
const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketRuleTable);
