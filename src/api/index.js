/* eslint-disable import/prefer-default-export */
import axios from '../lib/api';

/**
 * 登录接口
 * @param {*} data
 */
export function login(data) {
  return axios({
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    url: '/login',
    data,
  });
}

/**
 *获取沙盘点位目标树形列表
 * @param {*} queryAreaType
 * @param {*} queryAreaName
 * @param {*} keyword
 */
export function getTargetTreeList(params) {
  return axios({
    method: 'get',
    url: '/api/v1/sandtable_target/getTreeListByArea',
    params,
  });
}
