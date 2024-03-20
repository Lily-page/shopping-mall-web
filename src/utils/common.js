export const navList = {
    // setting: "用户设置",
    order: "我的订单",
    // assets: "我的资产",
    collection: "我的收藏",
    address: "地址管理",
};

export const navListPath = {
    // setting: "/personalCenter/user",
    order: "/personalCenter/orderList",
    // assets: "/personalCenter/assets",
    collection: "/personalCenter/favorList",
    address: "/personalCenter/address",
}

export const navPathParameter = {
    // "/personalCenter/user": "setting",
    "/personalCenter/orderList": "order",
    // "/personalCenter/assets": "assets",
    "/personalCenter/favorList": "collection",
    "/personalCenter/address": "address"
}

export const orderNav = {
    allOrders: "全部订单",
    pendingPayment: "待付款",
    toBeReceived: "待收货",
    toBeEvaluated: "待评价",
    trash: "订单回收站"
}

export const showOrderState = {
    1: '待付款',
    2: '待收货',
    3: '待评价',
    4: "已评价"
}

export const orderNavAndState = {
    allOrders: 0,
    pendingPayment: 1,
    toBeReceived: 2,
    toBeEvaluated: 3,
    trash: 5
}

export const modService = {
    "多": "品类齐全,轻松购物",
    "快": "多仓直发，极速配送",
    "好": "正品行货，精致服务",
    "省": "天天低价，畅选无忧"
}

export const modServiceClass = {
    "多": "mod_service_duo",
    "快": "mod_service_kuai",
    "好": "mod_service_hao",
    "省": "mod_service_sheng"
}