# 晖总演讲稿生成器 V5.0 Vercel版

## 🎯 项目简介

这是一个专为杨晖量身定制的演讲稿生成系统，现已升级为Vercel Serverless版本，支持云端部署和本地开发两种模式。API密钥通过环境变量安全管理，用户界面简洁专业。

## ✨ 主要特性

### 🌐 多环境支持
- **Vercel云端部署**: 使用Serverless Functions，全球CDN加速
- **本地开发环境**: 传统Express服务器，便于开发调试
- **自动环境检测**: 系统自动识别运行环境并适配

### 🔒 企业级安全配置
- **环境变量管理**: API密钥安全存储在Vercel环境变量中
- **前端安全**: 敏感信息不暴露给前端
- **即开即用**: 配置完成后无需用户手动设置
- **自动测试**: 启动时自动测试API连接状态

### 🎨 智能用户界面
- **环境感知**: 根据部署环境显示不同的状态信息
- **模型选择**: 用户只需选择使用哪个AI模型
- **实时状态**: 显示API连接状态和系统信息
- **智能诊断**: 内置系统诊断功能，快速定位问题

## 🚀 部署方式

### 方式一：Vercel云端部署（推荐）

#### 1. 快速部署
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/speech-generator)

#### 2. 环境变量配置
在Vercel Dashboard中设置：
- `GLM_API_KEY`: `764bcbe559d144999f80f23878a45f2f.mmxXqw2xqA19J8pN`
- `QWEN_API_KEY`: `sk-6fa39fc29fd141f694c60ff718ab3b58`

#### 3. 访问应用
部署完成后访问：`https://your-project.vercel.app`

### 方式二：本地开发

#### 环境要求
- Node.js 18.0.0 或更高版本
- npm 包管理器

#### 本地启动
```bash
# 使用原有的Express服务器
node server.js

# 或使用Vercel本地开发
npm install -g vercel
vercel dev
```

## 🎯 使用说明

### Vercel环境使用
1. **访问应用**: 打开你的Vercel部署URL
2. **选择模型**: 在页面中选择AI模型（GLM-4 Plus 或 通义千问Max）
3. **生成演讲稿**: 输入主题，调整参数，点击生成
4. **二次优化**: 使用专业优化功能提升演讲稿质量

### 本地环境使用
1. **启动系统**: 运行 `node server.js` 或 `vercel dev`
2. **访问页面**: 浏览器访问 http://localhost:3000
3. **使用功能**: 与Vercel环境相同的操作流程

## 🔍 环境检测与状态

### 自动环境识别
系统会自动检测运行环境：
- **🌐 Vercel环境**: 显示"Vercel Serverless"标识
- **🏠 本地环境**: 显示"Local Express Server"标识

### API连接状态
- **🟢 已连接**: API工作正常，可生成高质量内容
- **🟡 已配置**: API已配置但连接异常
- **🔴 连接失败**: API暂时不可用
- **⚪ 检测中**: 正在检测API状态

## 🛠️ 开发和测试

### 本地开发
```bash
# 安装Vercel CLI
npm install -g vercel

# 本地开发服务器（推荐）
vercel dev

# 传统Express服务器
node server.js
```

### 测试部署
```bash
# 测试本地环境
npm test

# 测试Vercel部署
node test-vercel.js https://your-project.vercel.app
```

### 环境变量设置
创建 `.env.local` 文件（本地开发）：
```
GLM_API_KEY=764bcbe559d144999f80f23878a45f2f.mmxXqw2xqA19J8pN
QWEN_API_KEY=sk-6fa39fc29fd141f694c60ff718ab3b58
```

## 📁 项目结构

```
speech-generator/
├── api/                      # Vercel Serverless Functions
│   ├── config.js            # 获取API配置
│   ├── generate.js          # 生成演讲稿
│   ├── status.js            # 系统状态
│   └── test/
│       └── [provider].js    # 测试API连接
├── index.html               # 前端页面（自适应环境）
├── server.js                # 本地Express服务器
├── vercel.json             # Vercel配置文件
├── package.json            # 项目配置
├── VERCEL_DEPLOY.md        # Vercel部署详细指南
└── README.md               # 项目说明
```

## 🚨 故障排除

### API状态刷新失败解决方案

#### 🔍 快速诊断
1. **使用系统诊断功能**：
   - 在网页中点击"🔍 系统诊断"按钮
   - 查看详细的系统状态报告
   - 根据诊断结果采取相应措施

2. **运行测试脚本**：
   ```bash
   npm test
   # 或
   node test-system.js
   ```

#### ❌ 常见错误及解决方法

**1. "无法连接到后端服务器"**
- 确保后端服务器已启动：`node server.js`
- 检查端口3000是否被占用：`netstat -ano | findstr :3000`
- 确认防火墙未阻止端口3000

**2. "刷新API状态失败"**
- 点击"🔄 刷新API状态"按钮重试
- 使用"🔍 系统诊断"进行全面检查
- 查看浏览器控制台错误信息（F12）

**3. "API连接测试失败"**
- GLM-4 Plus: 检查智谱AI账户状态和余额
- 通义千问Max: 检查阿里云账户状态和API配额
- 确认网络可以访问相应的API服务器

#### 🛠️ 紧急修复步骤

1. **重启服务器**：
   ```bash
   # 关闭服务器 (Ctrl+C)
   # 重新启动
   node server.js
   ```

2. **清除浏览器缓存**：
   - 按F12打开开发者工具
   - 右键刷新按钮 → "清空缓存并硬性重新加载"

3. **重新安装依赖**：
   ```bash
   npm install
   ```

4. **检查配置文件**：
   - 确认 `api-config.json` 文件存在
   - 验证JSON格式正确性

#### 📋 获取详细错误信息

1. 按F12打开浏览器开发者工具
2. 切换到"Console"标签
3. 点击"🔄 刷新API状态"或"🔍 系统诊断"
4. 查看红色错误信息
5. 根据错误信息采取相应措施

#### 📖 详细故障排除指南

查看 `troubleshooting.md` 文件获取完整的故障排除指南，包括：
- 详细的错误诊断步骤
- 常见问题的解决方案
- 预防措施和最佳实践
- 快速命令参考

## 🚨 常见问题

### Q: 后端服务器启动失败？
A: 检查Node.js版本，确保端口3000未被占用

### Q: API显示连接失败？
A: 网络连接问题，系统会自动切换到演示模式

### Q: 生成演讲稿时出现错误？
A: 检查后端服务器状态，确认网络连接正常

### Q: 页面显示服务器离线？
A: 确认后端服务器已启动，检查防火墙设置

## 📞 技术支持

如遇到问题，请检查：
1. Node.js环境是否正确安装
2. 后端服务器是否正常启动
3. 网络连接是否正常
4. 防火墙是否阻止了端口3000

## 📄 更新日志

### V5.0 (2024-03-03) - Vercel Serverless版
- 🌐 **Vercel支持**: 完整的Serverless Functions架构
- 🔧 **环境变量**: 通过Vercel环境变量管理API密钥
- 🚀 **自动部署**: 支持一键部署到Vercel
- 🔍 **智能检测**: 自动识别运行环境（Vercel/本地）
- 📊 **增强诊断**: 针对不同环境的专门诊断功能
- 🛡️ **安全升级**: 更安全的API密钥管理方式

### V4.0 (2024-03-03) - 企业版
- 🔒 预配置API密钥，无需用户配置
- 🎨 简化用户界面，专注模型选择
- 🚀 一键启动，即开即用
- 🛡️ 企业级安全配置
- 📊 智能状态监控

### V3.0 (2024-03-03)
- ✨ 新增后端API配置系统
- 🎨 重新设计前端配置界面
- 🔧 优化API连接管理

### V2.0 (2024-02-01)
- 🤖 支持真实AI API集成
- 🎯 个性化内容生成

### V1.0 (2024-01-01)
- 🎉 初始版本发布

## 🔗 相关链接

- **Vercel部署指南**: [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md)
- **Vercel官网**: [vercel.com](https://vercel.com)
- **GLM-4 API文档**: [智谱AI开放平台](https://open.bigmodel.cn)
- **通义千问API文档**: [阿里云模型服务](https://dashscope.aliyuncs.com)