// 代码生成时间: 2025-10-11 18:33:40
const { app, globalShortcut } = require('electron');

// 定义全局快捷键对象
let globalShortcuts = {};

/**
 * 初始化全局快捷键处理程序
 * @param {Object} shortcuts - 快捷键对象，键为快捷键组合，值为对应的回调函数
 */
function initKeyboardShortcuts(shortcuts) {
  // 清除所有之前注册的快捷键
  globalShortcut.unregisterAll();

  // 为每个快捷键注册全局快捷键
  Object.keys(shortcuts).forEach((shortcut) => {
    globalShortcuts[shortcut] = shortcuts[shortcut];
    globalShortcut.register(shortcut, function() {
      globalShortcuts[shortcut]();
    });
  });
}

/**
 * 处理快捷键按下事件
 */
function handleShortcuts() {
  // 检查是否所有快捷键都已注册
  if (Object.keys(globalShortcuts).length === 0) {
    console.error('No shortcuts registered.');
    return;
  }

  // 监听快捷键事件
  globalShortcut.on('registered', (shortcut) => {
    console.log(`Shortcut ${shortcut} registered successfully!`);
  });

  globalShortcut.on('unregistered', (shortcut) => {
    console.log(`Shortcut ${shortcut} unregistered successfully!`);
  });
}

// 示例快捷键对象
const exampleShortcuts = {
  'CommandOrControl+X': () => {
    console.log('Cut activated');
  },
  'CommandOrControl+C': () => {
    console.log('Copy activated');
  },
  'CommandOrControl+V': () => {
    console.log('Paste activated');
  }
};

// 初始化快捷键
initKeyboardShortcuts(exampleShortcuts);

// 开始监听快捷键事件
handleShortcuts();
