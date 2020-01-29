import {
	message,
} from 'ant-design-vue'
import Axios from "axios"
import * as utils from './utils'
import {
	getStore
} from './storage'
import $store from '../../store/index';
import $router from '../../router/index';
import {
	notice
} from './notice';
import config from "../../config/config";

const HOME_PAGE = config.HOME_PAGE;
const crossDomain = config.crossDomain;
let axiosConfig = {};
if (crossDomain) {
	axiosConfig.withCredentials = true;
	axiosConfig.crossDomain = true;
}
const $http = Axios.create(axiosConfig);

// After request
$http.interceptors.response.use(
	response => {
		response = response.data;
		if (response.errno === -1) {
			notice({
				title: response.msg !== '' ? response.msg : '请求失败',
			}, 'notice', 'error', 3);
			return Promise.resolve(response);
		} else {
			notice({
				title: response.msg !== '' ? response.msg : '请求成功',
			}, 'notice', 'success', 3);
			return Promise.resolve(response);
		}
	},
	error => {
		const response = error.response.data;
		console.log(response);
		response.code = Number(response.code);
		message.destroy();
		switch (response.code) {
			default:
				response.msg !== '' && notice({
					title: response.msg,
				}, 'notice', 'error', 5);
				return Promise.reject(error);
		}
	}
);

export default $http;