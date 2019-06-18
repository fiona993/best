import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { UsersData } from './data/userInfo';
let mock = new MockAdapter(axios);
mock.onGet('/login').reply(config => {
	//  console.log(config)
	// 做一个数据效验
	var data = {
		code: 200,
		msg: ''
	};
	var info={};
	UsersData.forEach((item,index)=>{
		if(item.username == config.params.username){
			if(item.password == config.params.password){
				data.msg = "登陆成功";
				data.code = 1;
				info=item;
			}else{
				data.msg = "登陆失败,密码错误";
				data.code = 2;
			}
		}else {
			data.msg = "账号或密码错误";
			data.code = 0;
		}
	})
	return [200, data,info];

});
mock.onGet('/register').reply(config => {
	// 做一个数据效验
	var data = {
		code: 200,
		msg: ''
	};
	UsersData.forEach((item) => {
		if (item.username != config.params.username) {
			data.msg = "注册成功";
			data.code = 200;
		} else {
			data.msg = "注册失败";
			data.code = 500
		}
	})
	UsersData.push(config.params);
	return [200, data];

});
export default axios;