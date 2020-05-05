import viewBox from './src/view-box';

function install(Vue) {
  // 若已注册插件，则不重复注册
  if (install.installed) {
    return;
  }
  install.installed = true;
  Vue.component(viewBox.name, viewBox);
}

viewBox.install = install;

// 确保在浏览器环境且已存在全局Vue对象
// 用于<script>标签引入插件时，自动注册插件
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(viewBox)
}

export default viewBox;
