(function(){
	window.addEventListener("load",drawCircle);
	// 暴露一个全局的方法
	window.drawCircle=drawCircle;
//	new drawCircle({})
	function drawCircle(){
		//	找到所有带data-precent的元素
		var elems=document.querySelectorAll("*[data-precent]");
		// 动态的插入一个canvas
		for(var i=0;i<elems.length;i++){
			// 创建了一个canvas节点
			var canvas=document.createElement("canvas");
				var ew=elems[i].offsetWidth;
				var eh=elems[i].offsetHeight
				// 当页面没有渲染时候  ew 没有宽度的
				if(ew<=70){ew=70};
				if(eh<=70){eh=70};
				var pre=parseFloat(elems[i].getAttribute("data-precent"));
				// 设置canvas 的宽高
				canvas.setAttribute("width",ew);
				canvas.setAttribute("height",eh);
				// 清空
				elems[i].innerHTML="";
				elems[i].appendChild(canvas);
				// 得到画布
				var ctx=canvas.getContext("2d");
				//  画一个圆环需要 画布ctx，宽ew 高eh，百分比 pre
				drawColor(ctx,ew,eh,pre)
		}
		function drawColor(ctx,ew,eh,pre){
			
			for(var i=0;i<=pre;i++){
				(function(){
					var j=i;
					setTimeout(function(){
						drawAnimate(ctx,ew,eh,j);
					},j*20)
				})()
			}
			
		}
		function drawBasic(ctx,ew,eh){
			// 开始画
			ctx.beginPath();
			ctx.lineWidth=2;
			ctx.lineCap="round";
			ctx.strokeStyle="#EEE";
			ctx.arc(ew/2,ew/2,ew/2-2*2,0,Math.PI*2);
			ctx.stroke();
			
		}
		function drawAnimate(ctx,ew,eh,j){
			// 清空画布
			ctx.clearRect(0,0,ew,eh);
			// 画底圆环
			drawBasic(ctx,ew,eh)
			ctx.beginPath();
			ctx.lineWidth=2;
			ctx.lineCap="round";
			ctx.strokeStyle="#FF6331";
			ctx.arc(ew/2,ew/2,ew/2-2*2,0,Math.PI*2/100*j);
			ctx.stroke();
			ctx.fillStyle="#333";//文字的颜色
			ctx.font="16px Aril";
			ctx.textAlign="center";//字体的对齐方式
			ctx.fillText(j+"%",ew/2,ew/2);
		}
	}

})()