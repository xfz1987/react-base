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
> - 启用 post-css
> - 启用 optimize-minimize（如 uglify 等）
> - 绝对不能有 console.log() , 为 babel 配置 Remove console transform

## 运行命令
> - 开发: npm run dev
> - 测试环境打包: npm run build.test
> - 生产环境: npm run build
> - API接口测试: npm run api

## css编写
> - 使用了cssnext，postcss-px2rem，因此无需考虑兼容性，样式单位直接写px，webpack自动转rem
```
以iphone6设计草稿为基准，设计图一个盒子宽为40px(实际上就为20px),那么直接写40px
postcss-px2rem，设置remUnit=200,会自动将40px转为40/200 = 0.2rem
---------------------postcss.config.js----------------------------
module.exports = {
  plugins: [
    require('postcss-cssnext'),
    require('postcss-px2rem')({
        remUnit: 200
    })
  ]
};
```
