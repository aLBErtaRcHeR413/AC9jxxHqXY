// 代码生成时间: 2025-10-05 17:37:42
const Ajv = require('ajv'); // 引入ajv库用于JSON schema验证
const ajv = new Ajv(); // 创建ajv实例

// 定义数据验证函数
function validateData(schema, data) {
  // 编译schema
  const validate = ajv.compile(schema);

  // 执行验证
  const valid = validate(data);
  if (!valid) {
    // 如果验证失败，抛出错误
    throw new Error(validate.errors);
  }
  // 如果验证成功，返回验证结果
  return data;
}

// 定义要验证的数据结构的schema
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1
    },
    age: {
      type: 'number',
      minimum: 0
    }
  },
  required: ['name', 'age'],
  additionalProperties: false
};

// 以下是使用validateData函数的例子
try {
  const dataToValidate = {
    name: 'John Doe',
    age: 30
  };

  // 调用validateData函数进行验证
  const validatedData = validateData(schema, dataToValidate);
  console.log('Validated data:', validatedData);
} catch (error) {
  console.error('Validation error:', error.message);
}

// 导出validateData函数，以便其他模块使用
module.exports = validateData;