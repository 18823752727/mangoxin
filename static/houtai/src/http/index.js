import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://localhost:3000';

let ajaxUrl = {
    createArticle: '/houtai/create-article',
    editArticle: '/houtai/edit-article',
    getArticleList: '/houtai/get-article-list',
}

axios.defaults.timeout = 10000;

// 请求拦截器
axios.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data);
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
    return res;
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
    createArticle(params){
        return fetchPost(ajaxUrl.createArticle,params);
    },

    // 编辑文章
    editArticle(params){
        return fetchPost(ajaxUrl.editArticle,params);
    },
    
    // 获取文章列表
    getArticleList(params){
        return fetchGet(ajaxUrl.getArticleList,params);
    }
}
