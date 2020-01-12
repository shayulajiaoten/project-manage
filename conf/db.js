const env = process.env.NODE_ENV  //环境参数


// 配置

let MYSQL_CONF
let REDIS_CONF


// 线上环境
if(env === 'dev'){
    MYSQL_CONF = {
        host:'127.0.0.1',
        user:'root',
        password:'123',
        port:'3306',
        database:'project_manage'
    }
    // redis
    REDIS_CONF = {
        port:6379,
        host:'127.0.0.1'
    }
}

// 本机环境
if (env === "production"){
    MYSQL_CONF = {
        host:'localhost',
        user:'root',
        password:'123',
        port:'3306',
        database:'myblog'
    }
    // redis
    REDIS_CONF = {
        port:6379,
        host:'127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}