/**
 * Created by 叶子 on 2017/7/30.
 */
import * as constant from './../constants/HttpConstants';
import * as http from './../axios/http';
import {fileinfos} from './../constants/fileinfo';
import {menus} from './../constants/menus';
import {rules} from './../constants/marketRule';

const requestData = category => ({
    type: constant.REQUEST_DATA,
    category
});

export const receiveData = (data, category) => (
    {
        type: constant.RECEIVE_DATA,
        data,
        category
    });

/**
 * 请求数据调用方法
 * @param funcName          请求接口的函数名
 * @param url               请求接口的url
 * @param stateName         stateName
 * @param params            请求接口的参数
 * @returns {function(*)}
 */
export const fetchData = ({funcName, url, stateName, params = {}, variable = false}) => dispatch => {
    console.log(`----fetchData, funcName == ${funcName}, url =  ${url}, stateName == ${stateName}, params == ${JSON.stringify(params)}`);
    dispatch(requestData(stateName));

    var headers = {
        'Content-Type': 'application/json;charset=UTF-8'
    };

    if (Object.is('menu', stateName)) {
        dispatch(receiveData(menus, stateName));
        return;
    }

    if (Object.is('fileInfo', stateName)) {
        dispatch(receiveData(fileinfos, stateName));
        return;
    }

    if (Object.is('rules'), stateName) {
        dispatch(receiveData(rules, stateName));
        return;
    }

    if (!variable) {
        http[funcName]({url, headers, params})
            .then(res => dispatch(receiveData(res.data, stateName)))
            .catch(err => console.error(`axios http post, err = ${err}`));
    } else {
        const variableUrl = `${url}/${params}`;
        console.log(`variableUrl == ${variableUrl}`);
        http[funcName]({url: variableUrl, headers: {}})
            .then(res => dispatch(receiveData(res.data, stateName)))
            .catch(err => console.error(`axios http post, err = ${err}`));
    }

}
