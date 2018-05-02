/**
 * Created by 叶子 on 2017/7/30.
 */
import * as constant from './../constants/HttpConstants';
import * as http from './../axios/http';

const requestData = category => ({
    type: constant.REQUEST_DATA,
    category
});

export const receiveData = (data, category) => (
    console.log(`------receiveData, data == ${JSON.stringify(data)}, category == ${category}`), {
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

    if (!variable) {
        http[funcName]({url, headers, params})
            .then(res => dispatch(receiveData(res.data, stateName)))
            .catch(err => console.error(`axios http post, err = ${err}`));
    } else {
        const variableUrl = `${url}/${params}`;
        console.log(`variableUrl == ${variableUrl}`);
        http[funcName]({url: variableUrl, headers:{}})
            .then(res => dispatch(receiveData(res.data, stateName)))
            .catch(err => console.error(`axios http post, err = ${err}`));
    }

}
