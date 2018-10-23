import Spring from './views/spring.vue';
import Index from './views/index.vue';
import Jmx from './views/jmx.vue';
import Jvm from './views/jvm.vue';
import DruidSql from './views/druidSql.vue';
import DruidUri from './views/druidUri.vue';
import DruidSpring from './views/druidSpring.vue';
import LogTime from './views/logTime.vue';
import LogFile from './views/logFile.vue';
const routers = [
    {path: '/',component: Index},
    {path: '/Spring',component: Spring},
    {path: '/Index',component: Index},
    {path: '/jmx',component: Jmx},
    {path: '/Jvm',component: Jvm},
    {path: '/DruidSql',component: DruidSql},
    {path: '/DruidUri',component: DruidUri},
    {path: '/DruidSpring',component: DruidSpring},
    {path: '/LogTime',component: LogTime},
    {path: '/LogFile',component: LogFile},
];
export default routers;