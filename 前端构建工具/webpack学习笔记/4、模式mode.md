## webpack模式mode

提供mode配置选项，告知webpack使用相应模式的内置优化。

### 用法：mode:'production'|'development'

> 只在配置中提供mode选项
>
> ```javascript
> const config = {
>     mode:'production'
> }
> module.exports = config;
> ```
>
> 支持一下字符串
>
> | 选项        | 描述                                                         |
> | ----------- | ------------------------------------------------------------ |
> | development | 会将 `process.env.NODE_ENV` 的值设为 `development`。启用 `NamedChunksPlugin` 和 `NamedModulesPlugin`。 |
> | production  | 会将 `process.env.NODE_ENV` 的值设为 `production`。  启用 `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`,   `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin`,   `OccurrenceOrderPlugin`, `SideEffectsFlagPlugin` 和 `UglifyJsPlugin`. |
>
> ```javascript
> // webpack.development.config.js
> module.exports = {
> + mode: 'development'
> - plugins: [
> -   new webpack.NamedModulesPlugin(),
> -   new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
> - ]
> }
> ```
>
> 

