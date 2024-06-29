# Lang JSON RPC Server

> 原型项目，请勿直接使用

基于 [h3](https://h3.unjs.io/) 的 [JSON-RPC](https://www.jsonrpc.org/specification) 服务，专为高性能和可移植性设计，可在任何 JavaScript Runtime 中运行。

## 启动项目

克隆仓库后：

```bash
# 安装依赖
$ pnpm install

# 启动服务
$ pnpm serve
```

然后：

```sh
curl --location 'http://localhost:3000/lm/rpc' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc": "2.0",
    "method": "completion",
    "params": {
        "model": "gpt-3.5-turbo",
        "prompt": "hello"
    },
    "id": "1"
}'
```

输出：

```json
{ "jsonrpc": "2.0", "id": "1", "result": "Please call the Language Model API" }
```

## 本地调试

使用 VS Code 的 [调试](https://code.visualstudio.com/docs/editor/debugging) 功能：

1. 打开 `Run And DEBUG` 启动程序
2. 选择 `Run Server` 配置
3. 在希望调试的代码行添加断点或使用 `debugger` 关键字。

## License

MIT
