// API密钥测试脚本
const apiKeys = {
    glm: "764bcbe559d144999f80f23878a45f2f.mmxXqw2xqA19J8pN",
    qwen: "sk-6fa39fc29fd141f694c60ff718ab3b58"
};

console.log('🔍 验证API密钥格式...');

// 验证GLM密钥格式
const glmKey = apiKeys.glm;
const glmPattern = /^[a-f0-9]{32}\.[a-zA-Z0-9]{16}$/;
if (glmPattern.test(glmKey)) {
    console.log('✅ GLM API密钥格式正确');
} else {
    console.log('❌ GLM API密钥格式可能有误');
}

// 验证千问密钥格式
const qwenKey = apiKeys.qwen;
const qwenPattern = /^sk-[a-f0-9]{32}$/;
if (qwenPattern.test(qwenKey)) {
    console.log('✅ 通义千问 API密钥格式正确');
} else {
    console.log('❌ 通义千问 API密钥格式可能有误');
}

console.log('\n📋 API配置摘要:');
console.log(`GLM-4 Plus: ${glmKey.substring(0, 8)}...${glmKey.substring(glmKey.length-8)}`);
console.log(`通义千问Max: ${qwenKey.substring(0, 8)}...${qwenKey.substring(qwenKey.length-8)}`);

console.log('\n🚀 配置已保存到 api-config.json');
console.log('💡 启动服务器后将自动测试API连接');