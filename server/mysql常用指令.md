### mysql 常用语句

#### SELECT 查询

```mysql
-- 查询所有 
SELECT * FORM user

-- 查询指定列 
SELECT * name age FORM user

-- 条件查询 
select *
from user
where name = ?
  and password = ?
```

#### INSERT 插入

```mysql
-- 第一种方式 ( 指定值 )
INSERT INTO user (name, age)
values ('张三', 18)

-- 第二种方式 ( 不指定默认值 )
INSERT INTO user(name, age)
values (?, ?)

-- 第三种方式 ( 插入一个对象 )
INSERT INTO user
SET ?
```

#### UPDATE 更新

```mysql
-- 更新一个
UPDATE user
SET name = '测试'
WHERE id = 4

-- 更新多个 
UPDATE user
SET name='测试',
    age='18'
WHERE id = 4
```

#### DELETE 删除

```mysql
-- 硬删除
DELETE
FROM user
where id = 1

-- 软删除
UPDATE user
SET isDelete = 1
WHERE id = 1

```

#### AND 和 OR 与和或

```mysql
AND 表示必须同时满足多个条件, 相当于 js 的 && 运算符 if(a !== 10 && a !== 20)  , 一假则假 
OR 表示只需要满足任意一个条件即可, 相当于 js 的 || 运算符 if (a !== 10 || a !== 20 ) , 一真则真 
```

#### ORDER BY 排序

```mysql
-- 升序 ASC 
-- 降序 DESC

-- 默认升序 
SELECT *
FROM user
ORDER BY status

-- 升序 
SELECT *
FROM user
ORDER BY status ASC

-- 降序 
SELECT *
FROM user
ORDER BY status DESC
```

#### WHERE 条件

```mysql
-- 查询所有 
SELECT * FORM user

-- 查询名称为 zs 的
SELECT * FORM user
WHERE name = 'zs' 
```

#### COUNT 查询总数

```mysql
-- 查询表中有多少条数据 
SELECT COUNT(*)
FROM user

-- 查询表中的 status 为 0 的数据有多少条 
SELECT COUNT(*)
FROM user
WHERE status = 0
```

#### AS 别名

```mysql
-- 设置 count(*) 为 total
SELECT COUNT(*) AS total
FROM user
```
