# Hexo Manager
反正是不想用hexo的命令来写东西了,有时候觉得不方便.再加上练手,之前说的做这个工具,终于开始做了.万一好使呢


使用ES6语法来写的Node应用,前端使用React + React Router,使用服务端渲染.

### run
编译输出目录dist
build
```
npm run build
```

运行启动的是dist目录中的编译后代码,使用原生node
 start
```
npm run start
```

 开发模式,使用gulp来监控客户端文件变化,nodemon监控服务端变化
```
npm run dev
``
