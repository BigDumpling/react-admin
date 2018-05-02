import axios from 'axios';
import {message} from 'antd';

/**
 * get请求，返回值需要根据code判断是否成功
 * @param url           接口地址
 * @param headers       接口所需header配置
 * @param param         接口参数
 * @returns {Promise<AxiosResponse>}
 */
export const get = ({url, headers = {}, params = {}}) => {
    console.log(`axios http get, url = ${url}, headers = ${JSON.stringify(headers)}, params = ${JSON.stringify(params)}`);

    return axios.get(url, {headers, params}).then(res => {
        console.log(`axios http get, res = ${JSON.stringify(res)}`);
        return res;
    }).catch(err => {
        console.error(`axios http get, err = ${err}`);
        message(err);
    })
}

/**
 * post请求，返回值需要根据code判断是否成功
 * @param url           接口地址
 * @param headers       接口所需header配置
 * @param data          接口参数
 * @returns {Promise<AxiosResponse>}
 */
export const post = ({url, headers = {}, params = {}}) => {
    console.log(`axios http post, url = ${url}, headers = ${JSON.stringify(headers)}, data = ${JSON.stringify(params)}`);

    return axios.post(url, params, headers).then(res => {
        console.log(`axios http post, res = ${JSON.stringify(res)}`);
        return res;
    }).catch(err => {
        console.error(`axios http post, err = ${err}`);
        message(err);
    })
}