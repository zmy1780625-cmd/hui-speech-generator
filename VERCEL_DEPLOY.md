# Vercel 部署指南

## 🚀 快速部署到Vercel

### 1. 准备工作

确保你有以下API密钥：
- **GLM-4 Plus API Key**: `764bcbe559d144999f80f23878a45f2f.mmxXqw2xqA19J8pN`
- **通义千问Max API Key**: `sk-6fa39fc29fd141f694c60ff718ab3b58`

### 2. 部署步骤

#### 方法一：通过Vercel CLI部署

1. **安装Vercel CLI**：
   ```bash
   npm install -g vercel
   ```

2. **登录Vercel**：
   ```bash
   vercel login
   ```

3. **部署项目**：
   ```bash
   vercel --prod
   ```

4. **配置环境变量**：
   在部署完成后，访问Vercel Dashboard设置环境变量。

#### 方法二：通过Vercel Dashboard部署

1. **上传到GitHub**：
   - 将项目代码上传到GitHub仓库

2. **连接Vercel**：
   - 访问 [vercel.com](https://vercel.com)
   - 点击"New Project"
   - 选择你的GitHub仓库
   - 点击"Deploy"

3. **配置环境变量**：
   在项目设置中添加环境变量

### 3. 环境变量配置

在Vercel Dashboard中设置以下环境变量：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `GLM_API_KEY` | `764bcbe559d144999f80f23878a45f2f.mmxXqw2xqA19J8pN` | GLM-4 Plus API密钥 |
| `QWEN_API_KEY` | `sk-6fa39fc29fd141f694c60ff718ab3b58` | 通义千问Max API密钥 |

#### 设置步骤：
1. 进入Vercel项目Dashboard
2. 点击"Settings"标签
3. 选择"Environment Variables"
4. 添加上述环境变量
5. 点击"Save"
6. 重新部署项目

### 4. 验证部署

部署完成后，访问你的Vercel URL：
- **主页**: `https://your-project.vercel.app`
- **API状态**: `https://your-project.vercel.app/api/status`

### 5. 项目结构

```
speech-generator/
├── api/                    # Vercel Serverless Functions
│   ├── config.js          # 获取API配置
│   ├── generate.js        # 生成演讲稿
│   ├── status.js          # 系统状态
│   └── test/
│       └── [provider].js  # 测试API连接
├── index.html             # 前端页面
├── vercel.json           # Vercel配置
├── package.json          # 项目配置
└── README.md             # 说明文档
```

### 6. 功能特性

#### ✅ 自动环境检测
- 系统自动检测运行环境（本地/Vercel）
- 根据环境自动选择API端点

#### ✅ Serverless架构
- 使用Vercel Serverless Functions
- 无需管理服务器
- 自动扩缩容

#### ✅ 环境变量安全
- API密钥存储在Vercel环境变量中
- 前端无法访问敏感信息
- 支持生产/开发环境分离

### 7. 本地开发

如需本地开发和测试：

```bash
# 安装Vercel CLI
npm install -g vercel

# 本地开发服务器
vercel dev

# 访问 http://localhost:3000
```

### 8. 故障排除

#### 部署失败
- 检查`vercel.json`配置是否正确
- 确认所有API文件语法正确
- 查看Vercel部署日志

#### API调用失败
- 确认环境变量已正确设置
- 检查API密钥是否有效
- 查看Function日志

#### 环境变量未生效
- 确认变量名拼写正确
- 重新部署项目
- 检查变量作用域设置

### 9. 监控和日志

在Vercel Dashboard中可以：
- 查看Function执行日志
- 监控API调用次数
- 分析性能指标
- 设置告警通知

### 10. 成本优化

Vercel免费额度：
- 100GB带宽/月
- 100个Serverless Function调用/天
- 无限静态文件托管

超出免费额度后按使用量计费。

### 11. 安全建议

1. **API密钥管理**：
   - 定期轮换API密钥
   - 使用不同环境的不同密钥
   - 监控API使用情况

2. **访问控制**：
   - 考虑添加身份验证
   - 限制API调用频率
   - 监控异常访问

3. **数据保护**：
   - 不在前端存储敏感信息
   - 使用HTTPS传输
   - 定期备份重要数据

## 🎉 部署完成

部署成功后，你将拥有一个完全托管的演讲稿生成系统，支持：
- 🌐 全球CDN加速
- 🔒 安全的API密钥管理
- 📊 自动扩缩容
- 💰 按需付费

访问你的Vercel URL开始使用吧！