/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */


var aqiData = {}; 
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
	
function addAqiData() {
		var oTxtCity=document.getElementById('aqi-city-input').value.trim();
		var oTxtValue=document.getElementById('aqi-value-input').value.trim();
		
		var reCity=/^[\u4e00-\u9fa5a-zA-Z]+$/g;
		var reNum=/^[0-9]+$/g;
		if(reCity.test(oTxtCity) && reNum.test(oTxtValue)) 
		{
			aqiData[oTxtCity]=oTxtValue;
		}
		else if(!reCity.test(oTxtCity) && reNum.test(oTxtValue))
		{
			alert('城市名必须为中英文字符');
		}
		else if(!reNum.test(oTxtValue) && reCity.test(oTxtCity))
		{
			alert('空气质量指数必须为整数');
		}
		else
		{
			alert('城市名必须为中英文字符，空气质量指数必须为整数');
		}
};
function renderAqiList() {
 	var oTab=document.getElementById('aqi-table');
 	oTab.innerHTML=''; 
 	for(var oTxtCity in aqiData)
 	{
 		if(oTab.children.length==0)
 		{
		oTab.innerHTML='<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
		}
		var oTr=document.createElement('tr');
		var oTd=document.createElement('td');
		oTd.innerHTML=oTxtCity;
		oTr.appendChild(oTd);

		var oTd=document.createElement('td');
		oTd.innerHTML=aqiData[oTxtCity];
		oTr.appendChild(oTd);

		var oTd=document.createElement('td');
		oTd.innerHTML='<button>删除</button>';
		oTr.appendChild(oTd);

		oTab.appendChild(oTr); 
	}	
};

/*----------------------------------------------------------*/
/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
};

/*----------------------------------------------------------*/
/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  var oTab=document.getElementById('aqi-table');
  var oDel=oTab.getElementsByTagName('button');
	for(var i=0;i<oDel.length;i++)
	{
		oDel[i].onclick=function()
		{
			oTab.removeChild(this.parentNode.parentNode);
		}
	}
};

/*----------------------------------------------------------*/
function init() {
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var oBtn=document.getElementById('add-btn');
  oBtn.onclick=addBtnHandle;
   // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var oTab=document.getElementById('aqi-table');
  oTab.onclick=delBtnHandle;
}

init();