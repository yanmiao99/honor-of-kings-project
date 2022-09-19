module.exports = {
  // express 服务启动端口
  port: 3000, // 数据库相关配置
  db: {
    host: 'localhost', // 主机名
    port: 3306, // MySQL 默认端口为 3306
    user: 'root', // 使用 root 用户登入 MySQL
    password: '12345678', // MySQL 密码，用你自己的
    database: 'honor-of-kings-database' // 数据库名称
  },
  // 路由鉴权的 key
  secretKey: 'yanmiao-key'
}
