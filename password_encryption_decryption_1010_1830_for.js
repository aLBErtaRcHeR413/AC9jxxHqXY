// 代码生成时间: 2025-10-10 18:30:41
const crypto = require('crypto');

// 加密函数
function encryptPassword(password, secretKey) {
    // 使用HMAC SHA256算法进行加密
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(password);
    const encrypted = hmac.digest('hex');
    return encrypted;
}

// 解密函数
function decryptPassword(encryptedPassword, secretKey) {
    // 由于加密是单向的，这里提供的解密函数实际上是验证密码是否正确
    // 通过比较加密后的结果是否一致来判断
    const originalEncrypted = encryptPassword(encryptedPassword, secretKey);
    if (originalEncrypted === encryptedPassword) {
        return true; // 密码匹配
    } else {
        throw new Error('Incorrect password');
    }
}

// 主函数，处理加密解密操作
function handlePasswordOperation(operationType, password, secretKey) {
    if (!operationType || !password || !secretKey) {
        throw new Error('Missing required parameters');
    }

    switch (operationType) {
        case 'encrypt':
            return encryptPassword(password, secretKey);
        case 'decrypt':
            try {
                return decryptPassword(password, secretKey);
            } catch (error) {
                throw new Error(error.message);
            }
        default:
            throw new Error('Invalid operation type');
    }
}

// 导出模块
module.exports = {
    encryptPassword,
    decryptPassword,
    handlePasswordOperation
};

// 使用示例
// const { encryptPassword, decryptPassword, handlePasswordOperation } = require('./password_encryption_decryption');
// const secretKey = 'your_secret_key';
// const password = 'your_password';
// const encrypted = encryptPassword(password, secretKey);
// const isMatch = decryptPassword(encrypted, secretKey);
// console.log('Encrypted password:', encrypted);
// console.log('Password match:', isMatch);
