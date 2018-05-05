/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import {Button, Form, Icon, Input, Popconfirm, Table} from 'antd';
import * as method from "../../../constants/HttpMethod";
import * as url from "../../../constants/RequestUrlConstants";
import {fetchData} from '../../../action/index';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';

const FormItem = Form.Item;
const Search = Input.Search;
const stateName = 'rules';

const EditableCell = ({editable, value, onChange, select}) => {
        const optionCreate = ({value, text}) => (
            <option key={value} value={value}>{text}</option>
        );

        const selectDefault = () => {
            return select.map((f) => {
                if (Object.is(value, f.text)) {
                    return f.value;
                }
            })
        }

        return select
            ? <div>
                {editable
                    ?
                    <select style={{margin: '-5px 0'}} defaultValue={selectDefault()}
                            onChange={e => onChange(e.target.value)}>
                        {select.map((item) => optionCreate(item))}
                    </select>
                    : value
                }
            </div>
            : <div>
                {editable
                    ? <Input style={{margin: '-5px 0'}} defaultValue={value} onChange={e => onChange(e.target.value)}/>
                    : value
                }
            </div>
    }
;

class MarketRuleTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            filterDropdownVisible: false,
            searchText: '',
            filtered: false,
        };

        this.cacheData = this.state.data.map(m => ({...m}));
        this.handleTableChange = this.handleTableChange.bind(this);
        this.handleGetList = this.handleGetList.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.renderColumns = this.renderColumns.bind(this);
        this.handleCellChange = this.handleCellChange.bind(this);
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    componentWillMount() {
        this.handleGetList({});
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            data: newProps[stateName].data
        });

        this.cacheData = newProps[stateName].data.map(item => ({...item}));
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

    handleTableChange = (pagination, filters, sorter) => {
        console.log(`----market rules table change: pagination == ${JSON.stringify(pagination)}, filters == ${JSON.stringify(filters)}, sorter == ${JSON.stringify(sorter)}`)
        this.handleGetList({});
    }

    handleGetList = (params) => {
        const {fetchData} = this.props;
        fetchData({
            funcName: method.POST,
            url: url.LOGIN,
            stateName: stateName,
            params: params
        });
    }

    renderColumns(text, record, column, select) {
        return (
            <EditableCell
                editable={record.editable}
                value={text}
                onChange={value => this.handleCellChange(value, record.id, column)}
                select={select}
            />
        );
    }

    handleCellChange(value, key, column) {
        const {data} = this.state;
        const add = () => {
            const target = data[0];
            target[column] = value;
            this.setState({data: data});
        };

        const modify = () => {
            const target = data.filter(item => key === item.id)[0];
            if (target) {
                target[column] = value;
                this.setState({data: data});
            }
        };

        key ? modify() : add();
    }

    edit(key) {
        const {data} = this.state;
        const target = data.filter(item => key === item.id)[0];
        if (target) {
            target.editable = true;
            this.setState({data: data});
        }
    }

    save(key) {
        const {data} = this.state;
        const add = () => {
            const target = data[0];
            delete target.editable;
            //todo 新增操作

            this.setState({data: data});
            this.cacheData = data.map(item => ({...item}));
        };

        const modify = () => {
            const target = data.filter(item => key === item.id)[0];
            if (target) {
                //todo 保存修改,根据修改结果确定重新加载数据
                delete target.editable;
                this.setState({data: data});
                this.cacheData = data.map(item => ({...item}));
            }
        }

        key ? modify() : add();
    }


    cancel(key) {
        const {data} = this.state;
        const target = data.filter(item => key === item.id)[0];
        if (target) {
            Object.assign(target, this.cacheData.filter(item => key === item.id)[0]);
            delete target.editable;
            this.setState({data: this.cacheData});
        }
    }

    handleAdd = () => {
        const newData = this.state.data;
        const {code, ruleType, discountPercentage, discountAmount, satisfiedAmount, experienceAmount, raiseInterestRates} = newData[0];
        this.setState({
            data: [{
                code,
                ruleType,
                discountPercentage,
                discountAmount,
                satisfiedAmount,
                experienceAmount,
                raiseInterestRates,
                editable: true
            }, ...newData]
        });
    }

    render() {
        const {data} = this.state;
        const pagination = {
            position: 'bottom',
            showSizeChanger: true
        };
        const columns = [
            {
                key: 'id', title: '编号', dataIndex: 'id', defaultSortOrder: 'descend',
                sorter: (a, b) => a.id - b.id,
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
                render: (text, record) => this.renderColumns(text, record, 'code'),
            },
            {
                key: 'ruleType',
                title: '种类',
                dataIndex: 'ruleType',
                render: (text, record) => {
                    switch (Number.parseInt(text)) {
                        case 1:
                            text = '折扣';
                            break;
                        case 2:
                            text = '满减';
                            break;
                        case 3:
                            text = '代金';
                            break;
                        case 4:
                            text = '体验金';
                            break;
                        case 5:
                            text = '加息';
                            break;
                        default:
                            text = '未知';
                            break;
                    }
                    return this.renderColumns(text, record, 'ruleType', [{value: 1, text: '折扣'}, {
                        value: 2,
                        text: '满减'
                    }, {value: 3, text: '代金'}, {value: 4, text: '体验金'}, {value: 5, text: '加息'}, {
                        value: -1,
                        text: '未知'
                    }])
                }
            },
            {
                key: 'discountPercentage',
                title: '折扣百分比（万分之一）',
                dataIndex: 'discountPercentage',
                render: (text, record) => this.renderColumns(text, record, 'discountPercentage'),
            },
            {
                key: 'discountAmount',
                title: '抵扣（代金）金额',
                dataIndex: 'discountAmount',
                render: (text, record) => this.renderColumns(text, record, 'discountAmount'),
            },
            {
                key: 'experienceAmount',
                title: '满足此金额时才可抵扣',
                dataIndex: 'experienceAmount',
                render: (text, record) => this.renderColumns(text, record, 'experienceAmount'),
            },
            {
                key: 'raiseInterestRates',
                title: '加息百分比(万分之一)',
                dataIndex: 'raiseInterestRates',
                render: (text, record) => this.renderColumns(text, record, 'raiseInterestRates'),
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
                                    <a onClick={() => this.save(record.id)}>Save</a>
                                    <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.id)}>
                                        <a>Cancel</a>
                                    </Popconfirm>
                                </span>
                                : <a onClick={() => this.edit(record.id)}>修改</a>
                            }
                        </div>
                    );
                },
            }
        ];

        return (
            <div>
                <Button className="editable-add-btn" onClick={this.handleAdd}>Add</Button>
                <Table rowKey='id' bordered columns={columns} dataSource={Array.from(data)}
                       pagination={pagination} onChange={this.handleTableChange}/>
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
