/**
 * @ doc  万达金融主模块
 * @ author 木木
 * @ name wdApp
 * @ require ionic
 */

var app=angular.module("wdApp",["ionic"])
/**
 * @ name wdCtrl  万达金融 主控制器
 * @ params {Object=} $scope 数据挂载
 * @ params {Object=} $ionicHistory 控制ionic 路由的历史记录 
 * 
 */
.controller("wdCtrl",["$scope","$ionicHistory",function($scope,$ionicHistory){
	// 返回上一个历史记录
	$scope.goBack=function(){
		$ionicHistory.goBack();
	}
	 
}])
/**
 * @ name loginCtrl  万达金融 登陆控制器
 * @ params {Service=} $http angular内置方法 执行ajax 增删改查
 * @ params {Service=} wdService 万达金融 的数据服务 存储数据和抓取本地数据
 * 
 */
.controller("loginCtrl",["$scope","$http","wdService","$state",function($scope,$http,wdServer,$state){
	// user 用户默认空
	$scope.user={};
	// 检查登陆
	$scope.checkLogin=function(){
		// 登陆失败提示
		$scope.user.tip="";
		// 发起ajax 登陆
		$http({
			url:"http://www.wd.com/login",
			method:'POST',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},        
			data:"name="+$scope.user.name+"&password="+$scope.user.password,
			})
			.success(function(res){
				// res.status ==1 登陆成功 ==2登陆失败
				if(res.status==1){
					// 登陆成功要跳转到首页
					wdServer.saveData("wd-user",res.user);
					// 存取用户名
					$state.go("tabs.home",{});
					
					
				}else if(res.status==0){
					// 登陆失败显示提示
					$scope.user.tip="用户名或者秘密错误！"
				}
		})
	}
}])
.controller("homeCtrl",["$scope","$http","wdService",function($scope,$http,wdService){
	// 默认从本地抓取数据
	$scope.produceList=wdService.fechData("produceList");
	// 默认用户名为空
	$scope.user=wdService.fechData("wd-user");
	// 如何有本地数据就不加载新数据
	if($scope.produceList.length<=0){
		LoadProduceList();
	}
	// 首页进来检查登陆
	
	/* checkIsLogin();
	function checkIsLogin(){
		var user=wdService.fechData("wd-user");
		console.log(user);
		if(user.name){
			$scope.user=user;
		}
	}*/
	// 加载数据函数
	function LoadProduceList(type){		
		if(!type){type=1;}// 如果没有type type=1 
		// type==1 下拉刷新  type===2 是无限下拉加载
		$http.get("http://www.wd.com/prolist?type=")
		.success(function(res){
			if(type==1){
			$scope.produceList=res.dataList.concat($scope.produceList);	
			
			}else if(type==2){
			$scope.produceList=$scope.produceList.concat(res.dataList);		
			}
			
			
		})
		.finally(function(){
			if(type==1){
				$scope.$broadcast('scroll.refreshComplete');
			}else{
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}
			// 数据加载成功要 广播事件
			// 保存数据到本地
			 wdService.saveData("produceList",$scope.produceList);
		})
	}
	$scope. doRefresh=function(){
		// type 1 是上拉 2 是下拉
		 LoadProduceList(1)
	}
	$scope.loadMore=function(){
		LoadProduceList(2)
	}
}])
.config(["$stateProvider","$urlRouterProvider","$ionicConfigProvider",function($stateProvider,$urlRouterProvider,$ionicConfigProvider){
		 $ionicConfigProvider.platform.android.tabs.style('standard');  
	 	 $ionicConfigProvider.platform.android.tabs.position('standard');  
	
	// 路由状态提供者
	
	$stateProvider
	// tabs 状态 ； 没有名字  （views 他是对应首页里面的 ion-nav-view）
	// 状态
	.state("login",{
		// 状态对应的地址
		url:"/login",
		// 状态所对应的模板
		templateUrl:"templates/pages/login.html"
	})
	.state("detail",{
		// 状态对应的地址
		url:"/detail/{id:[0-9]{1,10}}",
		// 状态所对应的模板
		templateUrl:"templates/pages/detail.html"
	})
	.state("tabs",{
		// 状态对应的地址
		url:"/tabs",
		// 状态所对应的模板
		templateUrl:"templates/pages/tabs.html"
	})
	// tabs子状态home
	.state("tabs.home",{
		
		url:"/home",
		// 视图 名称(ion-nav-view名称 )
		views:{"home":{templateUrl:"templates/pages/home.html"}}
	})
	.state("tabs.produce",{
		url:"/produce",
		views:{"produce":{templateUrl:"templates/pages/produce.html"}}
	})
	.state("tabs.user",{
		url:"/user",
		views:{"user":{templateUrl:"templates/pages/user.html"}}
	})
	// 默认跳转到tabs
	// 地址栏目的 提供者
	$urlRouterProvider.otherwise("/tabs/home")
}])
// 列表数据加载完毕 重新执行 渲染 圆环
.directive("wdRender",[function(){
	return{
		restrict:"A",
		link:function(scope,elem,attr){
			scope.$on("loadPList",function(event,data){			
				if(scope.$last||scope.$first){					
					setTimeout(function(){					
					window.drawCircle();
					},50)					
				}
				
			})
			
			if(scope.$last||scope.$first){
				setTimeout(function(){						
					window.drawCircle();
				},50)
			}
		}
	}
}])
// 服务
.factory("wdService",[function(){
	return {
		saveData:function(name,data){
			window.localStorage.setItem(name,JSON.stringify(data));
		},
		fechData:function(name){
			var str=window.localStorage.getItem(name)||"[]";
			return JSON.parse(str);
		}
	}
}])
.controller("produceCtrl",["$scope","$http",function($scope,$http){
	$scope.produceList=[];//产品列表
	$scope.loadProduce=function(){
		var url = "http://www.wd.com/prolist?type="+$scope.produceType;
		$http.get(url)
		.success(function(res){//			
			$scope.produceList=res.dataList;
			// 发送了一个事件
			$scope.$broadcast("loadPList",{})
		})
		
	}// 加载函数
	$scope.produceType=0;//自定义得产品类型
	// 0代表是定期 1代表得是私募 2 保险 3房地产
	$scope.loadProduce();
	$scope.changeType=function(type){
		$scope.produceType=type;
		$scope.loadProduce();
	}
}])
