
<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                SQL执行统计
            </p>
            <p  slot="extra" >
                <Select @on-change="handleChangeTimer" v-model="timeOption" style="width:200px">
                    <Option  v-for="(e,i) in timeOptions" :key="i" :value="e.key" >{{e.value}}</Option>
                </Select>
            </p>
            <Table size="small"  highlight-row ref="currentRowTable" height="500"
             border   :columns="col_sql" :data="data_sql"></Table>
        </Card>
        <!-- sql详情框 -->
        <Modal v-model="modal.sql" title="执行" @on-ok="handleModalSql"width="500">
            <Content>
                <Card>
                    <p slot="title">
                        <Icon type="ios-film-outline"></Icon>
                        SQL详情
                    </p>
                </Card>
            </Content>
        </Modal>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                theme1: 'light',
                col_sql: [
                    {title: '#',type:'index',width:60},
                    {title: 'SQL',key: 'SQL',render: (h, params) => {
                            let sqlStr=params.row[params.column.key];
                            if(sqlStr.length > 200){
                                sqlStr=sqlStr.substring(0,200);
                            }
                            return h('div', [
                                h('a',{
                                    on:{
                                        click: () => {
                                            return;
                                            this.handleModalSqlDetail(params);
                                            this.modal.sql=true;
                                        }
                                    }
                                }, sqlStr)
                            ]);
                        }
                    },
                    {title: '执行数',key: 'ExecuteCount',sortable: true,width:170},
                    {title: '执行时间',key: 'TotalTime',sortable: true,width:170},
                    {title: '事务执行',key: 'InTransactionCount',sortable: true,width:170},
                    {title: '错误数',key: 'ErrorCount',sortable: true,width:170},
                    {title: '最大并发',key: 'ConcurrentMax',sortable: true,width:170},
                    {title: '读取行数',key: 'FetchRowCount',sortable: true,width:170},
                ],
                data_sql:[],
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
                modal:{
                    sql:false,
                },
                sqlDetail:{
                    
                }
            }
        },
        methods:{
            handleQuery (){
                let $this=this;
                this.$ajax.get('/druid/sql.json').then(function(res) {
                    if(res && res.data.ResultCode == 1){
                        $this.data_sql=res.data.Content;
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
            handleModalSql(){
                this.modal.sql=false;
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