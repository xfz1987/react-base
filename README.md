# 环境配置
## 开发环境
> - NODE_ENV 为 development
> - 启用模块热更新（hot module replacement）
> - 额外的 webpack-dev-server 配置项，API Proxy 配置项
> - 输出 Sourcemap
## 生产环境
> - NODE_ENV 为 production
> - 将 React、jQuery 等常用库设置为 external，直接采用 CDN 线上的版本
> - 样式源文件（如 css、less、scss 等）需要通过 ExtractTextPlugin 独立抽取成 css 文件
> - 启用 optimize-minimize（如 uglify 等）
> - 绝对不能有 console.log() , 为 babel 配置 Remove console transform

## 框架应用
> - webpack3
> - react
> - react-router-dom
> - mobx
> - axios
> - postcss - cssnext

## 运行命令
> - 开发: npm run dev
> - 测试环境打包: npm run build.test
> - 生产环境: npm run build
> - API接口测试: npm run api