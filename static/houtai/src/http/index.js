import axios from 'axios'
import qs from 'qs'
import store from '../vuex/store'

axios.defaults.baseURL = 'http://127.0.0.1:3000/houtai';
// axios.defaults.withCredentials = true;

let ajaxUrl = {
  // 创建文章
  createArticle: '/create-article',
  // 编辑文章
  editArticle: '/edit-article',
  // 获取文章列表
  getArticleList: '/get-article-list',
  // 获取文章数据
  getArticle: '/get-article',
  // 删除文章数据
  deleteArticle: '/delete-article',
  // 登录
  login: '/login',
  // 退出登录
  layout:'/layout'
}

axios.defaults.timeout = 10000;

// 请求拦截器
axios.interceptors.request.use(
  config => {
    let params = config.params || {};
    // 请求添加用户登录信息
    // params.userId = localStorage.getItem('userId');
    // params.token = localStorage.getItem('token');
    params.token = store.state.user.token;
    params.userId = store.state.user.userId;

    // 如果是post请求，就将请求参数格式化
    if (config.method === 'post') {
      config.data = qs.stringify(config.data);
    }

    // 将校验用户信息参数放到get请求参数上(排除登录)
    if(config.url.indexOf(ajaxUrl.login) === -1) {
      config.params = params;
    }

    return config;
  },

  error => {
    tool.alert('请求参数错误');
    return Promise.reject(error);
  }
);

// 返回过滤器
axios.interceptors.response.use(
  // 正确处理
  res => {
    let data = res.data,
      status = data.return_code,
      msg = data.return_msg;

    if (status === 'SUCCESS') {
      return msg;
    }else if(status === 'GUEST') {
      // 清除用户信息
      store.dispatch('clearUserInfo');
      return Promise.reject(msg);
    } else {
      return Promise.reject(msg);
    }
  },
  // 错误处理
  error => {
    let res = error.response;

    if (res) {
      console.log(res.status + ':网络错误，请刷新重试', false);
    } else {
      console.log('请求超时，请刷新重试');
    }
    return Promise.reject(error);
  }
);

// get请求方法
export function fetchGet(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(
      res => {
        resolve(res);
      },
      error => {
        reject(error)
      }).catch((error) => {
      reject(error);
    })
  })
}

// post请求方法
export function fetchPost(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(
      res => {
        resolve(res);
      },

      error => {
        reject(error)
      }
    ).catch((error) => {
      reject(error);
    })
  })
}

export default {
  // 创建文章
  createArticle(params) {
    return fetchPost(ajaxUrl.createArticle, params);
  },

  // 编辑文章
  editArticle(params) {
    return fetchPost(ajaxUrl.editArticle, params);
  },

  // 获取文章列表
  getArticleList(params) {
    return fetchGet(ajaxUrl.getArticleList, params);
  },

  // 删除文章
  deleteArticle(params) {
    return fetchGet(ajaxUrl.deleteArticle, params);
  },

  // 获取单个文章数据
  getArticle(params) {
    return fetchGet(ajaxUrl.getArticle, params);
  },

  // 登录
  login(params) {
    return fetchPost(ajaxUrl.login, params);
  },

  // 退出登录
  layout(params){
    return fetchGet(ajaxUrl.layout,params);
  }
}
