
<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                日志实时监控
            </p>
            <p  slot="extra" >
                <Select @on-change="handleChangeTimer" v-model="timeOption" style="width:200px">
                    <Option  v-for="(e,i) in timeOptions" :key="i" :value="e.key" >{{e.value}}</Option>
                </Select>
            </p>
        </Card>
    </div>
</template>
<script>
    export default {
        data () {
            return {
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
            this.handleChangeTimer(this.timeOption);
        },
        destroyed(){
           window.clearInterval(this.timer); 
        }
    }
</script> 