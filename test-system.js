// 系统功能测试脚本
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000/api';

async function testSystem() {
    console.log('🔍 开始系统功能测试...\n');
    
    const tests = [];
    
    // 1. 测试服务器状态
    console.log('1. 测试服务器状态...');
    try {
        const response = await fetch(`${BASE_URL}/status`);
        if (response.ok) {
            const data = await response.json();
            console.log('✅ 服务器状态正常');
            console.log('📊 状态信息:', JSON.stringify(data, null, 2));
            tests.push({ name: '服务器状态', status: 'pass' });
        } else {
            throw new Error(`HTTP ${response.status}`);
        }
    } catch (error) {
        console.log('❌ 服务器状态测试失败:', error.message);
        tests.push({ name: '服务器状态', status: 'fail', error: error.message });
    }
    
    console.log('');
    
    // 2. 测试API配置获取
    console.log('2. 测试API配置获取...');
    try {
        const response = await fetch(`${BASE_URL}/config`);
        if (response.ok) {
            const data = await response.json();
            console.log('✅ API配置获取成功');
            console.log('📋 配置信息:', JSON.stringify(data, null, 2));
            tests.push({ name: 'API配置获取', status: 'pass' });
            
            // 3. 测试各API连接
            console.log('\n3. 测试API连接...');
            for (const [provider, api] of Object.entries(data.apis)) {
                if (api.hasKey) {
                    console.log(`\n测试 ${api.name} 连接...`);
                    try {
                        const testResponse = await fetch(`${BASE_URL}/test/${provider}`, {
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
            throw new Error(`HTTP ${response.status}`);
        }
    } catch (error) {
        console.log('❌ API配置获取失败:', error.message);
        tests.push({ name: 'API配置获取', status: 'fail', error: error.message });
    }
    
    // 4. 生成测试报告
    console.log('\n' + '='.repeat(50));
    console.log('📊 测试报告汇总');
    console.log('='.repeat(50));
    
    const passedTests = tests.filter(t => t.status === 'pass').length;
    const failedTests = tests.filter(t => t.status === 'fail').length;
    const skippedTests = tests.filter(t => t.status === 'skip').length;
    const totalTests = tests.length;
    
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
    
    // 5. 提供建议
    const failedTestsList = tests.filter(t => t.status === 'fail');
    if (failedTestsList.length > 0) {
        console.log('\n💡 问题解决建议:');
        failedTestsList.forEach(test => {
            if (test.name === '服务器状态') {
                console.log('- 请确保后端服务器已启动 (运行 node server.js)');
            } else if (test.name === 'API配置获取') {
                console.log('- 请检查api-config.json文件是否存在且格式正确');
            } else if (test.name.includes('连接')) {
                console.log(`- 请检查${test.name}的API密钥是否正确`);
                console.log('- 确认网络连接正常且API服务可访问');
            }
        });
    }
    
    console.log('\n🔍 如需更详细的诊断，请在网页中点击"系统诊断"按钮');
    console.log('📖 更多帮助请查看 troubleshooting.md 文件');
}

// 运行测试
testSystem().catch(error => {
    console.error('❌ 测试脚本执行失败:', error);
    process.exit(1);
});