!window.Simditor && 
document.write('<script src=resource/js/simditor/module.js><\/script>');
document.write('<script src=resource/js/simditor/hotkeys.js><\/script>');
document.write('<script src=resource/js/simditor/uploader.js><\/script>');
document.write('<script src=resource/js/simditor/simditor.js><\/script>');

OJApp.controller('reportController',function ($scope,$http,Data,$routeParams) {
	$scope.showReport =1;
    $scope.ContentUs = 'page/contentUs.html';
    $scope.template = 'page/testreport.html';
    $scope.leftBar = 'page/leftBar.html';
    var testid = Data.tid();
	 
	$http({
         url: WEBROOT+"/report/list",
         method: 'POST',
         data: {"testid":testid}
     }).success(function (data) {
    	
    	$scope.invites = data;
    	console.log(data);
     }).error(function(){
    	 console.log("get data failed");
     })
     
     $scope.getScore = function(invite){
		 return invite.score+"/"+invite.totalScore;
	 }
	 
	 $scope.getState = function(invite){
		 if(invite.state==0){
			 return "未完成";
		 }else if(invite.state ==1){
			 return "已完成";
		 }
	 }
	 
	 $scope.isScoreDown=false;
	 function sortByScore(a,b){
	  return a.score - b.score;
	 }
	 $scope.reversalScoreSort=function(){
		 $scope.invites.sort(sortByScore); 
		 if($scope.isScoreDown){
			 $scope.invites.reverse();
		 }
		 $scope.isScoreDown=!$scope.isScoreDown;
	 }
	 
	 $scope.isTimeDown=false;
	 function sortByTime(a,b){
		 return a.finishtime-b.finishtime;
	 }
	 $scope.reversalTimeSort=function(){
		 $scope.invites.sort(sortByTime);
		 if($scope.isTimeDown){
			 $scope.invites.reverse();
		 }
		 $scope.isTimeDown=!$scope.isTimeDown;
	 }
	 
	 
	 $scope.viewReport = function(invite){
		Data.setTid(invite.testid);
        Data.setInviteid(invite.iid);
        Data.setTuid(invite.uid);
        window.location.href="#/report/list";
	 }
});

OJApp.controller('reportListController',function ($scope,$http,Data,$routeParams) {
	$scope.showReport =2;
	$scope.listNav=1;
	$scope.detailNav=0;
	$scope.logNav=0;
    $scope.ContentUs = 'page/contentUs.html';
    $scope.template = 'page/testreport.html';
    $scope.leftBar = 'page/leftBar.html';
    
    var testid = Data.tid();
    var inviteid = Data.inviteid();
    var tuid = Data.tuid();
    
    $scope.printPDF=function(){
    	var pdf = new jsPDF('p','pt','a4');
        pdf.addHTML(document.getElementById('pdf'),function() {
            pdf.save('report.pdf');
        });
    };
	 
    $http({
        url: WEBROOT+"/report/overall",
        method: 'POST',
        data: {"testid":testid,"iid":inviteid,"uid":tuid}
    }).success(function (data) {
    	$scope.score = data.score;
    	$scope.rank = data.rank;
    	$scope.user = data.user;
    	$scope.labels = data.dimension.name;
    	$scope.data = data.dimension.val;
    	//生成说明文字
    	$scope.setNum = $scope.labels.length;
    	$scope.contents = data.dimension.content;
    	$scope.faceproblmes = data.dimension.faceproblem;
    	$scope.names = data.dimension.name;
    	
    	$scope.namenums=[]
    	$scope.showFacePro =[];
    	for(var i=0;i<$scope.data[0].length;i++){
    		var namenum={};
    		namenum.name = $scope.names[i];
    		namenum.num = $scope.data[1][i]/$scope.data[0][i]
    		namenum.faceproblem = $scope.faceproblmes[i];
    		$scope.namenums.push(namenum);
    		$scope.showFacePro[i]=0;//控制面试题的显示
    	}
        
    	//level的雷达图
    	$scope.levelLabels = data.levelDimension.name;
    	$scope.levelData = data.levelDimension.val;
    	
    	
    	
    	
    	
    	var totalScores = $scope.data[0];
    	var userScores = $scope.data[1];
    	$scope.descStr =[];
    	for(var i=0; i< totalScores.length; i++){
    		var tmpStr = $scope.labels[i]+":"+(userScores[i]/totalScores[i])*100+"%";
    		$scope.descStr.push(tmpStr);
    	}
    	
     	//得分	
     	var score = data.score.split("/");
     	$scope.labelsScore =['用户成绩', '总分'];
     	$scope.dataScore = [parseInt(score[0]),parseInt(score[1])];
     	//排名
     	var rank = data.rank.split("/");
     	$scope.labelsRank =['用户排名', '总人数'];
     	$scope.dataRank = [parseInt(rank[0]),parseInt(rank[1])];
     		//data.score.split("/");
     	//照片
     	$scope.imgs = data.imgs;
     	//保留从倒数第三个"/"后的字符串
     	
//     	for(var i = 0;i< $scope.imgs.length;i++){
//     		var location = $scope.imgs[i].location;
//     		var j = location.lastIndexOf("/");
//     		j = location.lastIndexOf("/",j-1);
//     		j = location.lastIndexOf("/",j-1);
//     		$scope.imgs[i].location =location.slice(j,location.length);
//     	}
     	
    }).error(function(){
   	 console.log("get data failed");
    })
});

OJApp.controller('reportDetailController',function ($scope,$http,Data,$routeParams,$modal) {
	$scope.showReport =3;
	$scope.listNav=0;
	$scope.logNav=0;
	$scope.detailNav=1;
    $scope.ContentUs = 'page/contentUs.html';
    $scope.template = 'page/testreport.html';
    $scope.leftBar = 'page/leftBar.html';
    
    var testid = Data.tid();
    var inviteid = Data.inviteid();
    var tuid = Data.tuid();
	 
    $http({
        url: WEBROOT+"/report/detail",
        method: 'POST',
        data: {"testid":testid,"iid":inviteid,"uid":tuid}
    }).success(function (data) {
    	$scope.questions = data;
    }).error(function(){
   	 console.log("get data failed");
    })
    
    $scope.judge = function(question){
    	if(question.type==1){
    		if(question.useranswer == question.rightanswer){
        		return "正确";
        		$scope.color=1;
        	}else{
        		return "错误";
        		$scope.color=2;
        	}
    	}else if(question.type==2){
    		
    	}
    	
    }
    
   //查看和修改试题的通用方法
	$scope.viewQuestion = function (size,q,params) {
		//选择题
		if(q.type ==1 ){
			var question = jQuery.extend(true, {}, q);
			  var modalInstance = $modal.open({
			      templateUrl: 'page/myModalContent.html',
			      controller: 'ModalInstanceCtrl',
			      size: size,
			      resolve: {
			          params:function(){
			        	  var obj ={};
			        	  obj.operation = params.operation;
			        	  obj.title=params.title;
			        	  obj.question = question;
			        	  obj.report = 1;      //表示是查看报告
			        	  return obj;
			          }
			      }
			 });
		//编程题
		}else if(q.type ==2 ){
			 var senddata ={"problemid":q.qid ,"inviteId":Data.inviteid()};
			 $http({
			        url: WEBROOT+"/report/getprodetail",
			        method: 'POST',
			        data: senddata
			    }).success(function (data) {
			    	
			    	q.answer = data.resultInfos;
			    	q.useranswer = data.useranswer;
			    	q.language = $scope.lgs[data.language];
			    	  var modalInstance = $modal.open({
					      templateUrl: 'page/proModalContent.html',
					      controller: 'proModalInstanceCtrl',
					      size: size,
					      resolve: {
					          params:function(){
					        	  var obj ={};
					        	  obj.operation = params.operation;
					        	  obj.title=params.title;
					        	  obj.question = q;
					        	  obj.report = 1;      //表示是查看报告
					        	  return obj;
					          }
					      }
					 });
			    }).error(function(){
			   	 console.log("get data failed");
			    })
		}else if(q.type == 3){
			var modalInstance = $modal.open({
			      templateUrl: 'page/proModalContent.html',
			      controller: 'proModalInstanceCtrl',
			      size: size,
			      resolve: {
			          params:function(){
			        	  var obj ={};
			        	  obj.operation = params.operation;
			        	  obj.title=params.title;
			        	  obj.question = q;
			        	  obj.report = 1;      //表示是查看报告
			        	  return obj;
			          }
			      }
			 });
		}
	   
	 };
	 
	 $scope.lgs ={0:'c_cpp',1:'c_cpp',3:'java',9:'csharp'}; 
		
	 
	 
});


OJApp.controller('reportLogController',function ($scope,$http,Data) {
	$scope.showReport =4;
	$scope.listNav=0;
	$scope.logNav=1;	
	$scope.detailNav=0;
    $scope.ContentUs = 'page/contentUs.html';
    $scope.template = 'page/testreport.html';
    $scope.leftBar = 'page/leftBar.html';
    
    $http({
        url: WEBROOT+"/report/log",
        method: 'POST',
        data: {"inviteid":Data.inviteid()}
    }).success(function (data) {
    	for(var i=0;i<data.length;i++){
    		var datetime= new Date(data[i].time);
    		data[i].year = datetime.getFullYear();
    		data[i].month = datetime.getMonth()+1;
    		data[i].day = datetime.getDate();
    		data[i].hour = datetime.getHours();
    		data[i].minute = datetime.getMinutes();
    	}
    	$scope.logs = data;
    }).error(function(){
   	 console.log("get data failed");
    })
    
	
})
