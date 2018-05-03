/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import {Form, Table} from 'antd';
import UploadModal from './UploadModal';
import * as method from "../../../constants/HttpMethod";
import * as url from "../../../constants/RequestUrlConstants";
import {fetchData} from '../../../action/index';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import WrappedAdvancedSearchForm from './../../../components/forms/AdvancedSearchForm';


const FormItem = Form.Item;

const columns = [
    {key: 'id', title: '编号', dataIndex: 'id',},
    {key: 'fileName', title: '文件名', dataIndex: 'fileName',},
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

const items = [
    {label: '文件名', field: 'fileName'}
];

class FileInfoTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ids: [],
        };
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleGetList = this.handleGetList.bind(this);
    }

    componentWillMount() {
        this.handleGetList({});
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
        return (
            <div>
                <WrappedAdvancedSearchForm item={items}></WrappedAdvancedSearchForm>
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

export default connect(mapStateToProps, mapDispatchToProps)(FileInfoTable);
