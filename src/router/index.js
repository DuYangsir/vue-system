import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import page1 from '@/components/page1'
import page2 from '@/components/page2'
import page3 from '@/components/page3'
import page4 from '@/components/page4'
import page5 from '@/components/page5'
import invest_right_box from '@/view/invest/invest_right_box'
import holdAposition from '@/view/invest/holdAposition'
import select2 from '@/view/invest/select2'
import investtest from '@/view/invest/index'
import logindemo from '@/view/login/demo'
import login from '@/view/login/login'
import loginAccount from '@/view/login/loginAccount'
import forgetPassword from '@/view/login/forgetPassword'
import signIn from '@/view/login/signIn'
import resetPassword from '@/view/login/resetPassword'
import resetSucceed from '@/view/login/resetSucceed'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/page1',
      name: 'page1',
      component: page1
    },
    {
      path: '/page2',
      name: 'page2',
      component: page2
    },
    {
      path: '/page3',
      name: 'page3',
      component: page3
    },
    {
      path: '/page4',
      name: 'page4',
      component: page4
    },
    {
      path: '/page5',
      name: 'page5',
      component: page5
    },
    {
      path: '/invest',
      name: 'invest_right_box',
      component: invest_right_box
    },
    {
      path: '/holdAposition',
      name: 'holdAposition',
      component: holdAposition
    },
    {
      path: '/select2',
      name: 'select2',
      component: select2
    },
    {
      path: '/investtest',
      name: 'investtest',
      component: investtest
    },
    {
      path: '/logindemo',
      name: 'logindemo',
      component: logindemo
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/loginAccount',
      name: 'loginAccount',
      component: loginAccount
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: forgetPassword
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: signIn
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      component: resetPassword
    },
    {
      path: '/resetSucceed',
      name: 'resetSucceed',
      component: resetSucceed
    },
    {
      path: '/signinNewAccount',
      name: 'signinNewAccount',
      component: resolve => {
        require(['../view/login/signinNewAccount'], resolve)
      }
    }
  ]
})
