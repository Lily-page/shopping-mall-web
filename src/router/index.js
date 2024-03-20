import Vue from 'vue'
import VueRouter from 'vue-router'

const Index = () => import('@/views')
const Login = () => import('@/views/Login')
const Register = () => import('@/views/Login/register')
const Home = () => import('@/views/Home')
const Goods = () => import('@/views/Goods')
const GoodsDetail = () => import('@/views/GoodsDetail')
const CarDetail = () => import('@/views/CarDetail')
const Settlement = () => import('@/views/Settlement')
const Payment = () => import('@/views/Payment')
const PaySuccess = () => import('@/views/PaySuccess')
const AddCarSuccess = () => import('@/views/AddCarSuccess')
const SearchGoods = () => import('@/views/SearchGoods')
const ShowTypeGoods = () => import('@/views/ShowTypeGoods')
const MyTracks = () => import('@/views/MyTracks')
const Evaluation = () => import('@/views/Evaluation')
const Notice = () => import('@/views/Notice')
const OrderDetail = () => import('@/views/OrderDetail')

const PersonalCenter = () => import('@/views/PersonalCenter')
const User = () => import('@/views/PersonalCenter/User')
const OrderList = () => import('@/views/PersonalCenter/OrderList')
const FavorList = () => import('@/views/PersonalCenter/FavorList')
const Assets = () => import('@/views/PersonalCenter/Assets')
const Address = () => import('@/views/PersonalCenter/Address')

Vue.use(VueRouter)

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};

const routes = [
  {
    path: '/',
    redirect: '/home',
    name: 'home',
    component: Index,
    children: [
      {
        path: 'home',
        component: Home,
        meta: {
          showSlot: true
        }
      },
      {
        path: 'goods',
        component: Goods
      },
      {
        path: 'goodsDetail',
        name: 'goodsDetail',
        component: GoodsDetail
      },
      {
        path: 'carDetail',
        name: 'carDetail',
        component: CarDetail,
        meta: {
          //需要守卫
          auth: true
        }
      },
      {
        path: 'settlement',
        name: 'settlement',
        component: Settlement,
        meta: {
          auth: true
        }
      },
      {
        path: 'payment',
        name: 'payment',
        component: Payment,
        meta: {
          auth: true
        }
      },
      {
        path: 'paySuccess',
        name: 'paySuccess',
        component: PaySuccess,
        meta: {
          auth: true
        }
      },
      {
        path: 'addCarSuccess',
        name: 'addCarSuccess',
        component: AddCarSuccess,
        meta: {
          auth: true
        }
      },
      {
        path: 'searchGoods',
        name: 'searchGoods',
        component: SearchGoods,
        meta: {
          showSlot: true
        }
      },
      {
        path: 'showTypeGoods',
        name: 'showTypeGoods',
        component: ShowTypeGoods,
        meta: {
          showSlot: true
        }
      },
      {
        path: 'myTracks',
        name: 'myTracks',
        component: MyTracks,
        meta: {
          auth: true
        }
      },
      {
        path: 'evaluation/:id',
        name: 'evaluation',
        component: Evaluation,
        props: true,
        meta: {
          auth: true
        }
      },
      {
        path: 'notice/:id',
        name: 'notice',
        component: Notice,
        props: true,
        meta: {
          showSlot: true
        }
      },
      {
        path: 'orderDetail/:id',
        name: 'orderDetail',
        component: OrderDetail,
        props: true,
        meta: {
          showSlot: true
        }
      },
      {
        path: 'personalCenter',
        redirect: '/personalCenter/orderList',
        name: 'personalCenter',
        component: PersonalCenter,
        children: [
          {
            path: 'user',
            name: 'user',
            component: User,
            meta: {
              showSlot: true,
              auth: true
            }
          },
          {
            path: 'orderList',
            name: 'orderList',
            component: OrderList,
            meta: {
              showSlot: true,
              auth: true
            }
          },
          {
            path: 'assets',
            name: 'assets',
            component: Assets,
            meta: {
              showSlot: true,
              auth: true
            }
          },
          {
            path: 'favorList',
            name: 'favorList',
            component: FavorList,
            meta: {
              showSlot: true,
              auth: true
            }
          },
          {
            path: 'address',
            name: 'address',
            component: Address,
            meta: {
              showSlot: true,
              auth: true
            }
          },
        ]
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
