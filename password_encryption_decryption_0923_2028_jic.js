// 代码生成时间: 2025-09-23 20:28:25
const crypto = require('crypto');

// 密码加密解密工具
class PasswordEncryptionDecryption {

  // 加密密码
  static encryptPassword(password, salt) {
    try {
      // 使用pbkdf2算法进行密码加密
      const key = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512');
      return key.toString('hex');
    } catch (error) {
      // 错误处理
      console.error('加密密码失败:', error.message);
      throw error;
    }
  }

  // 解密密码
  static decryptPassword(encryptedPassword, salt) {
    try {
      // 将十六进制字符串转换为Buffer
      const keyBuffer = Buffer.from(encryptedPassword, 'hex');
      // 使用pbkdf2算法进行密码解密
      const key = crypto.pbkdf2Sync(keyBuffer, salt, 10000, 64, 'sha512');
      // 将解密后的密码转换为字符串
      return key.toString('utf8');
    } catch (error) {
      // 错误处理
      console.error('解密密码失败:', error.message);
      throw error;
    }
  }

  // 生成盐值
  static generateSalt() {
    try {
      // 使用randomBytes生成256位随机盐值
      return crypto.randomBytes(32).toString('hex');
    } catch (error) {
      // 错误处理
      console.error('生成盐值失败:', error.message);
      throw error;
    }
  }
}

// 示例用法
(async () => {
  try {
    const password = 'mysecretpassword';
    const salt = PasswordEncryptionDecryption.generateSalt();
    const encryptedPassword = PasswordEncryptionDecryption.encryptPassword(password, salt);
    console.log('加密后的密码:', encryptedPassword);
    const decryptedPassword = PasswordEncryptionDecryption.decryptPassword(encryptedPassword, salt);
    console.log('解密后的密码:', decryptedPassword);
  } catch (error) {
    console.error('示例用法失败:', error.message);
  }
})();
