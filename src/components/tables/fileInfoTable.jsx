/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import {Button, Form, Input, Table} from 'antd';
import {fileinfos} from './../../constants/fileinfo';
import UploadModal from './../forms/UploadModal';

const FormItem = Form.Item;

const columns = [
    {title: '编号', dataIndex: 'id',},
    {title: '文件名', dataIndex: 'fileName',},
    {title: '文件路径', dataIndex: 'filePath',},
    {
        title: '文件大小', dataIndex: 'fileSize', render: (text) => {
            return text + ' KB';
        }
    },
    {
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
    {title: '创建者', dataIndex: 'createBy',},
    {title: '创建时间', dataIndex: 'createTime',},
    {
        title: '操作', render: () => {
            return '重新解析';
        }
    },

];

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const ConditionForm = Form.create({
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        return {
            fileName: Form.createFormField({
                ...props.fileName,
                value: props.fileName.value,
            })
        };
    },
    onValuesChange(_, values) {
        console.log(values);
    },
})((props) => {
    const {getFieldDecorator} = props.form;
    return (
        <Form layout="inline">
            <FormItem label='文件名'>
                {getFieldDecorator('fileName', {})(
                    <Input placeholder='文件名'/>
                )}
            </FormItem>
            <FormItem>
                <Button
                    type='primary'
                    htmlType='submit'
                >
                    查询
                </Button>
            </FormItem>
        </Form>
    );
});

class FileInfoTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ids: [],
            fields: {
                fileName: {
                    value: ''
                }
            }
        };
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    handleFormChange = (changedFields) => {
        this.setState(({fields}) => ({
            fields: {...fields, ...changedFields},
        }));
    }

    render() {
        const fields = this.state.fields;
        return (
            <div>
                <ConditionForm {...fields} onChange={this.handleFormChange}/>
                <UploadModal />
                <Table rowKey='id' columns={columns} dataSource={fileinfos}/>
            </div>
        );
    }
}

export default FileInfoTable;