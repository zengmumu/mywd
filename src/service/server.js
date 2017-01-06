	/**
	 * 为 两个ajax 地址 提供假数据
	 * @require  Mock.js
	 * @require  mock.angular.js
	 * */
	Mock.mock("http://www.wd.com/detail",{
		"status":function(){var  num=Math.random();
			if(num>.8){
				return 0
			}else{
				return 1
			}},	
		"msg":function(){
				if(this.status){ return "处理成功"}
				else{
					 return "处理失败"
				}
		},
		"data":{
			"id|1-2000":1,
			"title":"万达-@ctitle(3)",
			"yearBefit|2-25.1-2":1,
			"investDay|30-36500":1,
			"invertLeftPre|1-100":1,
			"investLeft|0-200000":1,
			"investEndTime":Mock.mock('@date("yyyy-MM-dd")'),
			"investDate":{start:Mock.mock('@date("yyyy-MM-dd")'),end:Mock.mock('@date("yyyy-MM-dd")'),calBefit:Mock.mock('@date("yyyy-MM-dd")'),over:Mock.mock('@date("yyyy-MM-dd")')},
			"investAll":/[1-9]0?0?0?00/,
			"receivableWay":"到期一次兑付",
			"minInvest":function(){ return Mock.mock('@natural(100, 10000)') },
			"level":function(){
				var  num=Math.random();
				if(num>.5){
					return "低风险"
				}else{
					return "高回报"
				}
		},
		"proDetailLink":Mock.Random.url(),
		"proGuideBookLink":Mock.Random.url()
		}
		
	});
/**
	 * 为 两个ajax 地址 提供假数据
	 * {status} status  状态 0为失败 1成功
	 * {msg}  处理成功  ||处理失败
	 * {dataList} 提供列表数据 默认是一次5条
	 * */	
Mock.mock(/http:\/\/www.wd.com\/prolist\?type=\d?/,{
		"status":function(){var  num=Math.random();
			if(num>.8){
				return 0
			}else{
				return 1
			}},	
		"msg":function(){
				if(this.status){ return "处理成功"}
				else{
					 return "处理失败"
				}
		},
		"dataList|5":[
				{
				"id|1-2000":1,
				"title":"万达-@ctitle(3)",
				"yearBefit|2-25.1-2":1,
				"investDay|30-36500":1,
				"invertLeftPre":function () {return Math.round(Math.random()*100)},
				"investLeft|0-200000":1,
				"investEndTime":Mock.mock('@date("yyyy-MM-dd")'),
				"investDate":{start:Mock.mock('@date("yyyy-MM-dd")'),end:Mock.mock('@date("yyyy-MM-dd")'),calBefit:Mock.mock('@date("yyyy-MM-dd")'),over:Mock.mock('@date("yyyy-MM-dd")')},
				"investAll":/[1-9]0?0?0?00/,
				"receivableWay":"到期一次兑付",
				"minInvest":function(){ return Mock.mock('@natural(100, 10000)') },
				"level":function(){
					var  num=Math.random();
					if(num>.5){
						return "低风险"
					}else{
						return "高回报"
					}
			},
			"proDetailLink":Mock.Random.url(),
			"proGuideBookLink":Mock.Random.url()
			}
		]
		
		
	});
	
Mock.mock("http://www.wd.com/login",{
		"status":function(){var  num=Math.random();
			if(num>.8){
				return 0
			}else{
				return 1
			}},	
		"msg":function(){
				if(this.status){ return "处理成功"}
				else{
					 return "处理失败"
				}
		},
		user:{
			"uid|100-1000":1,
			"name":Mock.mock('@cname'),
			"riskLevel":Mock.mock('@natural(0, 3)')
		}
		
		
	})