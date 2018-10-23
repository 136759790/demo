

<template>
    <div>
    <Menu :theme="theme1"  mode="horizontal" active-name="Index" @on-select="route">
        <MenuItem name="Index">
            <Icon type="ios-paper"></Icon>
            首页 
        </MenuItem>
        <MenuItem name="Spring">
            <Icon type="ios-paper"></Icon>
            spring监控
        </MenuItem>
        <MenuItem name="Jmx">
            <Icon type="ios-people" ></Icon>
            Jmx监控
        </MenuItem>
        <MenuItem name="Jvm">
            <Icon type="ios-people" ></Icon>
            JVM监控
        </MenuItem>
        <Submenu name="druid">
            <template slot="title">
                <Icon type="stats-bars"></Icon>
                Druid监控
            </template>
            <MenuGroup title="连接池">
                <MenuItem name="DruidSql">SQL</MenuItem>
                <MenuItem name="DruidUri">URI</MenuItem>
            </MenuGroup>
            <MenuGroup title="Spring">
                <MenuItem name="DruidSpring">方法</MenuItem>
            </MenuGroup>
        </Submenu>
        <Submenu name="log">
            <template slot="title">
                <Icon type="stats-bars"></Icon>
                日志    
            </template>
            <MenuItem name="LogTime">实时日志</MenuItem>
            <MenuItem name="LogFile">日志文件</MenuItem>
        </Submenu>
    </Menu>
    <br>
    </div>
</template>
<script>
    export default {
        name:"app-nav",
        data () {
            return {
                theme1: 'light'
            }
        },
        methods:{
            route(name){
                this.$router.push(name);
            }
        }
    }
</script> 