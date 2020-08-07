/**原生处理post */

const Koa = require('koa');
const app = new Koa();
app.use(async(ctx)=>{
    //当请求时GET请求时，显示表单让用户填写
    // 我们利用上文中说到的ctx.method判断请求的类型
    if(ctx.url==='/' && ctx.method === 'GET'){
        let html =`
            <form method="POST"  action="/">
                <p>userName</p>
                <input name="name" /> <br/>
                <p>age</p>
                <input name="sex" /> <br/>
                <p>webSite</p>
                <input name='way' /><br/>
                <button type="submit">submit</button>
            </form>
        `;
        // 如果是get请求我们把这个表单进行显示，当点击提交按钮时，我们以post的方式进行提交
        ctx.body =html;
        //当请求时POST请求时
    }else if(ctx.url==='/' && ctx.method === 'POST'){
        // 当请求为post请求的时候，我们需要解析post请求到的参数，所以调用parsePostData这个函数，并且把ctx作为上下文传递过去，因为我们要获取到里面的值进行处理
        // 这里的await相当于与延时的作用，跟async有区别，async是异步的
        let pastData=await parsePostData(ctx);
        // 最终把pastData编写到页面中
        ctx.body=pastData;
    }else{
        //其它请求显示404页面
        ctx.body='<h1>404!</h1>';
    }
})
 
/*
* 需要注意：这里我们使用了ctx.req.on来接收事件
* */
function parsePostData(ctx){
    // 利用ES6的语法new一个Promise对象，其中传递两个值，resolve是成功的，而reject是失败的
    return new Promise((resolve,reject)=>{
        try{
            // 对获取到的值进行处理
            let postdata="";
            // 原生监听事件,
            ctx.req.addListener('data',(data)=>{
                postdata += data
            })

            ctx.req.addListener("end",function(){
                // 把我们在全局定义的postdata传递给parseQueryStr，进行格式的转化
                let parseData = parseQueryStr( postdata )
                // 把成功后的parseData传出去
                resolve(parseData);
            })
        }catch(error){
            // 把错误的信息返回出去
            reject(error);
        }
    });
}
 
/*POST字符串解析JSON对象*/
function parseQueryStr(queryStr){
    let queryData={};
    let queryStrList = queryStr.split('&');
    console.log(queryStrList);
    Object.prototype.toString.call(queryStrList, 123)
    // 利用了ES6提供的forOf，可以找找相关的看看
    for( let [index,queryStr] of queryStrList.entries() ){
        // 进行切割
        let itemList = queryStr.split('=');
        console.log(itemList);
        queryData[itemList[0]] = decodeURIComponent(itemList[1]);
    }
    return queryData
}
 
app.listen(3000,()=>{
    console.log('success on port 3000');
})