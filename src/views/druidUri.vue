
<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                URI访问统计
            </p>
            <p  slot="extra" >
                <Select @on-change="handleChangeTimer" v-model="timeOption" style="width:200px">
                    <Option  v-for="(e , i) in timeOptions" :key="i" :value="e.key" >{{e.value}}</Option>
                </Select>
            </p>
            <Table size="small"  highlight-row ref="currentRowTable" height="500"
             border   :columns="col_uri" :data="data_uri"></Table>
        </Card>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                col_uri: [
                    {title: '#',type:'index',width:60},
                    {title: 'URI',key: 'URI'},
                    {title: '请求次数',key: 'RequestCount',sortable: true,width:170},
                    {title: '请求时间（和）',key: 'RequestTimeMillis',sortable: true,width:170},
                    {title: '请求时间最慢',key: 'RequestTimeMillisMax',sortable: true,width:170},
                    {title: '最大并发',key: 'ConcurrentMax',sortable: true,width:170},
                    {title: 'JDBC执行数',key: 'JdbcExecuteCount',sortable: true,width:170},
                    {title: 'JDBC时间',key: 'JdbcExecuteTimeMillis',sortable: true,width:170},
                    {title: '读取行数',key: 'JdbcFetchRowCount',sortable: true,width:170},
                ],
                data_uri:[],
                timeOptions:[
                            {key:0,value:'停止刷新'},
                            {key:1,value:'每秒刷新'},
                            {key:3,value:'每3秒刷新'},
                            {key:5,value:'每5秒刷新'},
                            {key:10,value:'每10秒刷新'},
                            {key:15,value:'每15秒刷新'},
                ],
                timeOption:5,
                timer:{},
            }
        },
        methods:{
            handleQuery (){
                let $this=this;
                this.$ajax.get('/druid/weburi.json').then(function(res) {
                    if(res && res.data.ResultCode == 1){
                        $this.data_uri=res.data.Content;
                    }else{
                        $this.$Message.error("查询错误");
                    }
                }).catch(function(e){
                        $this.$Message.error("查询错误："+e.message);
                });
            },
            handleModalSqlDetail(params){
                console.log(params+"111111122233444");
            },
            handleChangeTimer(){
                let value=this.timeOption;
                window.clearInterval(this.timer);
                if(value < 1){
                    return;
                }
                let $this=this;
                this.timer=setInterval(function () {
                    $this.handleQuery();
                },1000 * value);
            }
        },
        created:function(){
            this.handleQuery();
            this.handleChangeTimer(this.timeOption);
        },
        destroyed(){
            window.clearInterval(this.timer);
        }
    }
</script> 