/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import {Button, Form, Icon, Input, Table} from 'antd';
import UploadModal from './UploadModal';
import * as method from "../../../constants/HttpMethod";
import * as url from "../../../constants/RequestUrlConstants";
import {fetchData} from '../../../action/index';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';


const FormItem = Form.Item;


class FileInfoTable2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ids: [],
            filterDropdownVisible: false,
            data: [],
            searchText: '',
            filtered: false,
        };
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleGetList = this.handleGetList.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    componentWillMount() {
        this.handleGetList({});
    }

    onInputChange = (e) => {
        this.setState({searchText: e.target.value});
    }

    onSearch = () => {
        const {searchText} = this.state;
        const {fileInfo} = this.props;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            data: fileInfo.data.map((record) => {
                const match = record.name.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    name: (
                        <span>
              {record.name.split(reg).map((text, i) => (
                  i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
                    ),
                };
            }).filter(record => !!record),
        });
    }

    handlePageChange = (page, pageSize) => {
        console.log(`----page == ${page}, pageSize == ${pageSize}`);
        this.handleGetList({});
    }

    handleGetList = (params) => {
        const {fetchData} = this.props;
        fetchData({
            funcName: method.POST,
            url: url.LOGIN,
            stateName: 'fileInfo',
            params: params
        });
    }

    render() {
        const {fileInfo} = this.props;
        const pagination = {
            position: 'bottom',
            showSizeChanger: true,
            onChange: this.handlePageChange,
            onShowSizeChange: this.handlePageChange,
        };
        const columns = [
            {key: 'id', title: '编号', dataIndex: 'id',},
            {
                key: 'fileName', title: '文件名', dataIndex: 'fileName',
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
                filterIcon: <Icon type="smile-o" style={{color: this.state.filtered ? '#108ee9' : '#aaa'}}/>,
                filterDropdownVisible: this.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => {
                    this.setState({
                        filterDropdownVisible: visible,
                    }, () => this.searchInput && this.searchInput.focus());
                },
            },
            {key: 'filePath', title: '文件路径', dataIndex: 'filePath',},
            {
                key: 'fileSize',
                title: '文件大小', dataIndex: 'fileSize', render: (text) => {
                    return text + ' KB';
                }
            },
            {
                key: 'excuteType',
                title: '文件类型', dataIndex: 'excuteType', render: (text) => {
                    switch (text) {
                        case 0 :
                            return '每日计息(大数据)';
                        case 1 :
                            return '推荐策略';
                        case 2 :
                            return '产品信息';
                        case 3 :
                            return '每日计息(原文件)';
                        case 4 :
                            return '到期兑付';
                        case 5 :
                            return '批量发券文件';
                        default :
                            return '未知类型';
                    }

                }
            },
            {
                key: 'ufsResult',
                title: '上传结果', dataIndex: 'ufsResult', render: (text) => {
                    switch (text) {
                        case 0 :
                            return '未执行';
                        case 1 :
                            return '成功';
                        case 2 :
                            return '异常';
                        case 3 :
                            return '失败';
                        default :
                            return '未知结果';
                    }
                }
            },
            {
                key: 'analyResult',
                title: '解析结果', dataIndex: 'analyResult', render: (text) => {
                    switch (text) {
                        case 0 :
                            return '未执行';
                        case 1 :
                            return '成功';
                        case 2 :
                            return '异常';
                        case 3 :
                            return '失败';
                        default :
                            return '未知结果';
                    }
                }
            },
            {
                key: 'batchResult',
                title: '执行结果', dataIndex: 'batchResult', render: (text) => {
                    switch (text) {
                        case 0 :
                            return '未执行';
                        case 1 :
                            return '成功';
                        case 2 :
                            return '异常';
                        case 3 :
                            return '失败';
                        default :
                            return '未知结果';
                    }
                }
            },
            {key: 'createBy', title: '创建者', dataIndex: 'createBy',},
            {key: 'createTime', title: '创建时间', dataIndex: 'createTime',},
            {
                title: '操作', render: () => {
                    return '重新解析';
                }
            },

        ];

        return (
            <div>
                <UploadModal/>
                <Table rowKey='id' columns={columns} dataSource={Array.from(fileInfo.data)} pagination={pagination}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {fileInfo = {data: {}}} = state.httpData;
    return {fileInfo};
};
const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FileInfoTable2);
