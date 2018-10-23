
<template>
    <div id="container">
        <Row gutter="10">
            <Col span="6">
                <Card style="width:100%">
                    <p slot="title">
                        <Icon type="ios-film-outline"></Icon>
                        连接池信息
                    </p>
                    <p><b>名称：</b>{{dataSource.name}}</p>
                    <p><b>类型：</b>{{dataSource.dbType}}</p>
                    <p><b>驱动：</b>{{dataSource.driverClassName}}</p>
                    <p><b>地址：</b>{{dataSource.url}}</p>
                    <p><b>账户：</b>{{dataSource.userName}}</p>
                    <p><b>初始连接数：</b>{{dataSource.initialSize}}</p>
                    <p><b>最大连接数：</b>{{dataSource.maxActive}}</p>
                </Card>
            </Col>
            <Col span="12">
                <Card style="width:100%">
                    <p slot="title">
                        <Icon type="arrow-graph-up-right"></Icon>
                        当前线程数
                    </p>
                    <div id="threadLine" style="width:80%;height:400px;"></div>
                </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                dataSource: {
                    name:'',
                    dbType:'',
                    driverClassName:'',
                    url:'',
                    userName:'',
                    initialSize:'',
                    maxActive:'',
                },
                interval:{},//定时器
                threads:[],
                times:[]
            }
        },
        methods:{
            route(name){
                this.$router.push(name);
            },
            initEchars(){
                let chart_thread=this.$echarts.init(document.getElementById("threadLine"));
                let $this=this;
                this.interval=setInterval(function(){
                    $this.$ajax.get("/druid/thread.json").then(function(res){
                        let dataStr =res.data.Content;
                        let data=JSON.parse(dataStr)
                        let count = data.activeCount;
                        let currentDate=new Date();
                        let currentTime=currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds();
                        if($this.threads.length > 10){
                            $this.threads.shift();
                        }
                        if($this.times.length > 10){
                            $this.times.shift();
                        }
                        $this.threads.push(count);
                        $this.times.push(currentTime);
                        chart_thread.setOption({
                            title:{text:'线程数量'},
                            tooltip:{},
                            xAxis:{
                                data:$this.times
                            },
                            yAxis:{},
                            series:[{
                                name:'线程数',
                                type:'line',
                                data:$this.threads
                            }]
                        });
                    }).catch(function(e){

                    });
                },5000);
            },
            initDataSources(){
                let $this=this;
                this.$ajax.get('/druid/datasource.json').then(function(data){
                    debugger;
                    if(data.data.ResultCode == 1){
                        let obj=data.data.Content[0];
                        $this.dataSource.name=obj.Name;
                        $this.dataSource.driverClassName=obj.DriverClassName;
                        $this.dataSource.dbType=obj.DbType;
                        $this.dataSource.url=obj.URL;
                        $this.dataSource.userName=obj.UserName;
                        $this.dataSource.initialSize=obj.InitialSize;
                        $this.dataSource.maxActive=obj.MaxActive;
                    }
                }).catch(function(error){
                    console.log(error);
                });
            }
        },
        mounted(){
            this.initEchars();
            this.initDataSources();
        }
    }
</script> 