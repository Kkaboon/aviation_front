import Vue from 'vue'
import Router from 'vue-router'

import MainBox from '../components/Box/MainBox'
import HeadLeft from '../components/Box/HeadLeft'
import HeadRight from '../components/Box/HeadRight'

import AcTicket from '../components/Ticket/AcTicket'
import CityTicket from '../components/Ticket/CityTicket'

import Index from "../components/Index"

import login from '../components/Account/login'
import Register from '../components/Account/Register'

import  Modify from '../components/User/Modify'
import  PersonalOrder from '../components/User/PersonalOrder'

import  UserQuery from '../components/BackStage/UserQuery'
import  AllUsers from '../components/BackStage/AllUsers'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      //默认跳转到推荐，实现默认页面
      redirect:'/Index',
      components: {
        'head_left': HeadLeft,
        'head_right': HeadRight,
        'main': MainBox,
      },
      children: [
        {
          path: '/Index',
          name: 'Index',
          component: Index
        },

        {
          path: '/account/login',
          name: 'login',
          component: login
        },
        {
          path: '/account/Register',
          name: 'Register',
          component: Register
        },
        {
          path: '/ticket/AcTicket',
          name: 'AcTicket',
          component: AcTicket
        },
        {
          path: '/ticket/CityTicket',
          name: 'CityTicket',
          component: CityTicket
        },
        {
          path: '/user/Modify',
          name: 'Modify',
          component: Modify
        },
        {
          path: '/user/PersonalOrder',
          name: 'PersonalOrder',
          component: PersonalOrder
        },
        {
          path: '/backstage/UserQuery',
          name: 'UserQuery',
          component: UserQuery
        },
        {
          path: '/backstage/AllUsers',
          name: 'AllUsers',
          component: AllUsers
        }
      ]
    },
  ]

})
