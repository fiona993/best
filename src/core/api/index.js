import request from './http'
import params from './params'
import mock from "@/mock/mock"
const url1 = "/json1811.ashx"
class apls {
	//mock登录接口
	mockTest(data){
		return mock.get("/login", {
			params: {
				username: data.username,
				password:data.password
			}
		  })
	}
	//mock注册接口
	mockTest2(data){
		return mock.get("/register", {
			params: {
				username: data.username,
				password: data.password,
				avatar: data.avatar,
				name: data.name
			}
		  })
	}
	//轮播
	GetBannerList(data) {
		return request({
			method: "get",
			url: url1,
			params: data
		})
	}
	//商品首页
	GetIndexCakeList() {
		return request({
			method: "get",
			url: url1,
			params: {
				m: "GetIndexCakeList",
				v: params.v,
				c: "Index"
			}
		})
	}
	//焦点图接口
	GetNSCakeByName(data) {
		return request({
			method: "get",
			url: url1,
			params: {
				Name: data.Name,
				c: 'NsCakeCenter',
				m: 'GetNSCakeByName',
				v: params.v
			}
		})
	}

	//列表详情
	GetCakeByName(data) {
		return request({
			method: "get",
			url: url1,
			params: {
				City: '上海',
				ProName: data.ProName,
				c: 'Product',
				m: 'GetCakeByName',
				v: params.v
			}
		})
	}

	//分类接口

	GetJdListNew() {
		return request({
			method: "get",
			url: url1,
			params: {
				v: params.v,
				c: 'NsCakeCenter',
				m: 'GetJdListNew'
			}
		})
	}

	//伴手礼
	GetjzCakeInfo(data) {
		return request({
			method: "get",
			url: url1,
			params: {
				City: '上海',
				ProName: data.ProName,
				c: 'IndexCenter',
				m: 'GetjzCakeInfo',
				v: params.v,
			}
		})
	}

	//乳品
	GetRuPCakeByName(data) {
		return request({
			method: "get",
			url: url1,
			params: {
				Name: data.Name,
				c: 'NsCakeCenter',
				m: 'GetRuPCakeByName',
				v: params.v,
			}
		})
	}

	//评价数量
	GetSumAndAvgAccessInfo(data) {
		return request({
			method: "get",
			url: url1,
			params: {
				c: 'CakeAssess',
				m: 'GetSumAndAvgAccessInfo',
				pid: data.pid,
				v: params.v,
			}
		})
	}
}
export default new apls()
