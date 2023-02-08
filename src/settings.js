module.exports = {
  title: "云票务系统",

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: false,

  /**
   * @type {Array} ['/annualCardManagement/annualCardSale/annualCardSale', 'componentsName'] 由路由或者组件名组成的数组
   * @description 需要隐藏的菜单（由于后台没有隐藏菜单的配置，通过后台返回的菜单是否隐藏由该数组控制）
   */
  hiddenList: [
    "/ticketManagement/personalSettings/personalSettings", // 个人设置
    "/ticketManagement/TeamPreOrder/addOrder", // 新增预订单
    "/ticketManagement/TeamPreOrder/modifyOrder", // 修改预订单
  ],
  baseURL: process.env.VUE_APP_BASE_API,
};
