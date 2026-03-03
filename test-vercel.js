// Vercel环境测试脚本
// 使用方法: node test-vercel.js [your-vercel-url]

const url = process.argv[2] || 'http://localhost:3000';

async function testVercelDeployment() {
    console.log('🔍 开始测试Vercel部署...\n');
    console.log(`测试URL: ${url}`);
    
    const tests = [];
    
    // 1. 测试主页
    console.log('1. 测试主页访问...');
    try {
        const response = await fetch(`${url}`);
        if (response.ok) {
            console.log('✅ 主页访问正常');
            tests.push({ name: '主页访问', status: 'pass' });
        } else {
            throw new Error(`HTTP ${response.status}`);
        }
    } catch (error) {
        console.log('❌ 主页访问失败:', error.message);
        tests.push({ name: '主页访问', status: 'fail', error: error.message });
    }
    
    console.log('');
    
    // 2. 测试API状态
    console.log('2. 测试API状态...');
    try {
        const response = await fetch(`${url}/api/status`);
        if (response.ok) {
            const data = await response.json();
            console.log('✅ API状态正常');
            console.log('📊 状态信息:', JSON.stringify(data, null, 2));
            tests.push({ name: 'API状态', status: 'pass' });
            
            // 3. 测试API配置
            console.log('\n3. 测试API配置...');
            try {
                const configResponse = await fetch(`${url}/api/config`);
                if (configResponse.ok) {
                    const configData = await configResponse.json();
                    console.log('✅ API配置获取成功');
                    console.log('📋 配置信息:', JSON.stringify(configData, null, 2));
                    tests.push({ name: 'API配置', status: 'pass' });
                    
                    // 4. 测试各API连接（如果有密钥）
                    console.log('\n4. 测试API连接...');
                    for (const [provider, api] of Object.entries(configData.apis)) {
                        if (api.hasKey) {
                            console.log(`\n测试 ${api.name} 连接...`);
                            try {
                                const testResponse = await fetch(`${url}/api/test/${provider}`, {
                                    method: 'POST'
                                });
                                
                                if (testResponse.ok) {
                                    const testData = await testResponse.json();
                                    console.log(`✅ ${api.name} 连接测试成功`);
                                    console.log('📝 响应:', testData.response);
                                    tests.push({ name: `${api.name}连接`, status: 'pass' });
                                } else {
                                    const errorData = await testResponse.json();
                                    throw new Error(errorData.error || `HTTP ${testResponse.status}`);
                                }
                            } catch (error) {
                                console.log(`❌ ${api.name} 连接测试失败:`, error.message);
                                tests.push({ name: `${api.name}连接`, status: 'fail', error: error.message });
                            }
                        } else {
                            console.log(`⚠️ ${api.name} 未配置API密钥，跳过测试`);
                            tests.push({ name: `${api.name}连接`, status: 'skip', reason: '未配置API密钥' });
                        }
                    }
                } else {
                    throw new Error(`HTTP ${configResponse.status}`);
                }
            } catch (error) {
                console.log('❌ API配置获取失败:', error.message);
                tests.push({ name: 'API配置', status: 'fail', error: error.message });
            }
        } else {
            throw new Error(`HTTP ${response.status}`);
        }
    } catch (error) {
        console.log('❌ API状态测试失败:', error.message);
        tests.push({ name: 'API状态', status: 'fail', error: error.message });
    }
    
    // 5. 生成测试报告
    console.log('\n' + '='.repeat(50));
    console.log('📊 Vercel部署测试报告');
    console.log('='.repeat(50));
    
    const passedTests = tests.filter(t => t.status === 'pass').length;
    const failedTests = tests.filter(t => t.status === 'fail').length;
    const skippedTests = tests.filter(t => t.status === 'skip').length;
    const totalTests = tests.length;
    
    console.log(`测试URL: ${url}`);
    console.log(`总测试项: ${totalTests}`);
    console.log(`✅ 通过: ${passedTests}`);
    console.log(`❌ 失败: ${failedTests}`);
    console.log(`⚠️ 跳过: ${skippedTests}`);
    
    const successRate = Math.round((passedTests / (totalTests - skippedTests)) * 100);
    console.log(`成功率: ${successRate}%`);
    
    console.log('\n详细结果:');
    tests.forEach(test => {
        const icon = test.status === 'pass' ? '✅' : 
                    test.status === 'fail' ? '❌' : '⚠️';
        console.log(`${icon} ${test.name}: ${test.status}`);
        if (test.error) {
            console.log(`   错误: ${test.error}`);
        }
        if (test.reason) {
            console.log(`   原因: ${test.reason}`);
        }
    });
    
    // 6. Vercel特定建议
    const failedTestsList = tests.filter(t => t.status === 'fail');
    if (failedTestsList.length > 0) {
        console.log('\n💡 Vercel部署问题解决建议:');
        failedTestsList.forEach(test => {
            if (test.name === '主页访问') {
                console.log('- 检查Vercel部署状态');
                console.log('- 确认域名解析正确');
            } else if (test.name === 'API状态') {
                console.log('- 检查Vercel Serverless Functions部署状态');
                console.log('- 查看Vercel Dashboard中的Function日志');
            } else if (test.name === 'API配置') {
                console.log('- 检查Vercel环境变量配置');
                console.log('- 确认GLM_API_KEY和QWEN_API_KEY已设置');
            } else if (test.name.includes('连接')) {
                console.log(`- 验证${test.name}的API密钥有效性`);
                console.log('- 检查API服务商的网络连接');
            }
        });
        
        console.log('\n🔧 Vercel环境变量设置:');
        console.log('1. 访问Vercel Dashboard');
        console.log('2. 选择项目 → Settings → Environment Variables');
        console.log('3. 添加以下变量:');
        console.log('   - GLM_API_KEY: 你的GLM API密钥');
        console.log('   - QWEN_API_KEY: 你的通义千问API密钥');
        console.log('4. 重新部署项目');
    }
    
    if (successRate === 100) {
        console.log('\n🎉 恭喜！Vercel部署测试全部通过！');
        console.log('🌐 你的演讲稿生成器已成功部署到Vercel');
    } else if (successRate >= 80) {
        console.log('\n✅ Vercel部署基本成功，存在少量问题');
    } else {
        console.log('\n⚠️ Vercel部署存在问题，请根据上述建议进行修复');
    }
}

// 运行测试
testVercelDeployment().catch(error => {
    console.error('❌ Vercel测试脚本执行失败:', error);
    process.exit(1);
});