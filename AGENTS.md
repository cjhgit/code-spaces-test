# Dev Container 项目说明

这是一个使用 Dev Container 的项目。代码在宿主机编辑，但所有命令都在容器中执行。

## 工作流程

- **编辑代码**：在宿主机使用 Cursor/Claude Code 直接编辑项目文件
- **执行命令**：所有 npm、node 等命令都必须在容器中执行
- **访问服务**：容器内的服务通过端口映射可在宿主机访问（如 http://localhost:3172）

## 容器管理

### 启动容器

```bash
cd /Users/yunser/app/code-spaces-test
devcontainer up --workspace-folder .
```

启动成功后会输出容器 ID，形如：
```
{"outcome":"success","containerId":"a73eece7573049fad2d5af69ab8a0af13139e7b627e9789655d5cb511f2ee559",...}
```

### 查看运行中的容器

```bash
docker ps
```

找到名称包含 `vsc-code-spaces-test` 的容器，获取其 CONTAINER ID。

### 停止和删除容器

```bash
# 停止容器
docker stop <container-id>

# 删除容器
docker rm <container-id>

# 或者一次性执行
docker stop <container-id> && docker rm <container-id>
```

## 在容器中执行命令

**重要：所有项目相关的命令都必须在容器中执行！**

### 基本格式

```bash
docker exec <container-id> <命令>
```

### 指定工作目录

```bash
docker exec -w /workspaces/code-spaces-test <container-id> <命令>
```

### 常用命令示例

```bash
# 安装依赖
docker exec -w /workspaces/code-spaces-test <container-id> npm install

# 启动开发服务器（后台运行）
docker exec -w /workspaces/code-spaces-test <container-id> npm run dev

# 执行脚本
docker exec -w /workspaces/code-spaces-test <container-id> node uuid.js

# 进入容器交互式 shell
docker exec -it <container-id> bash
# 进入后已经在 /workspaces/code-spaces-test 目录
```

## 端口映射

项目配置了端口映射（在 `.devcontainer/devcontainer.json` 中）：
- 容器内端口：3172
- 宿主机端口：3172
- 访问地址：http://localhost:3172

服务必须绑定到 `0.0.0.0:3172` 才能从宿主机访问（已在 `package.json` 中配置）。

## 自动化提示

当你需要执行项目命令时：
1. 首先用 `docker ps` 查看容器是否运行，获取容器 ID
2. 如果容器未运行，先用 `devcontainer up` 启动
3. 使用 `docker exec` 在容器中执行命令
4. 对于需要网络访问的命令（如 npm install），记得添加 `required_permissions: ["full_network"]`
5. 对于长时间运行的服务（如 npm run dev），设置 `block_until_ms: 0` 在后台运行

## 示例工作流

```bash
# 1. 启动容器
devcontainer up --workspace-folder /Users/yunser/app/code-spaces-test

# 2. 获取容器 ID（从上一步输出中提取，或使用 docker ps 查看）
docker ps

# 3. 安装依赖
docker exec -w /workspaces/code-spaces-test <container-id> npm install

# 4. 启动开发服务器
docker exec -w /workspaces/code-spaces-test <container-id> npm run dev

# 5. 在宿主机浏览器访问
# 打开 http://localhost:3172
```

## 注意事项

- ❌ 不要在宿主机直接运行 `npm install` 或 `npm run dev`
- ✅ 始终使用 `docker exec <container-id> <命令>` 在容器中执行
- ✅ 代码文件通过挂载自动同步，在宿主机编辑即可
- ✅ 容器启动后默认工作目录已设置为 `/workspaces/code-spaces-test`

