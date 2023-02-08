import { asyncRoutes, constantRoutes } from "@/router";
import { getAuthMenu } from "@/api/user";
import Layout from "@/layout";
import { get } from "@/utils/request";
import { getCompNameByPath } from "@/utils";
import { hiddenList } from "@/settings";

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role));
  } else {
    return true;
  }
}
/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param routes (resolve: any) => require([`@/views/${view}.vue`], resolve)
 */
export function generaMenu(routes, data) {
  data.forEach((item) => {
    let compName = getCompNameByPath(item.url);
    // 判断路由url和组件名是否在隐藏数组中
    let hidden = hiddenList.includes(compName) || hiddenList.includes(item.url);
    // 如果是一级菜单
    if (item.type == 0 && item.list && item.list.length > 0) {
      let list = item.list;
      for (let i = 0; i < list.length; i++) {
        // 当子菜单不为隐藏菜单
        if (
          !hiddenList.includes(list[i].url) &&
          !hiddenList.includes(getCompNameByPath(list[i].url))
        ) {
          // 将路径设置为子路径的第一个单词，防止多个空路径造成菜单展开时全部展开
          item.url = list[i].url.replace(/(\/\w+)\/.+/, "$1");
          // 在面包屑菜单中点击一级菜单可重定向到子菜单的第一个不隐藏的菜单
          item.redirect = list[i].url;
          break;
        }
      }
    }
    const menu = {
      path: item.url === "#" ? item.menuId + "_key" : item.url,
      // component: item.component === '#' ? Layout : () => import(`@/views${item.component}`),
      component:
        item.type === 0
          ? Layout
          : (resolve) => require([`@/views${item.url}`], resolve),
      hidden: hidden, //在左侧菜单不显示
      redirect: item.redirect,
      name: item.name,
      meta: {
        menuId: item.menuId,
        title: item.name,
        // icon: item.icon
        icon: item.icon.includes("el-icon") ? item.icon : "",
      },

      // meta: { title: item.name, id: item.id, roles: ['admin'] }
    };
    if (item.list) {
      menu.children = [];
      generaMenu(menu.children, item.list);
    }
    routes.push(menu);
  });
}
export function setBtnPermission() {
  get("/sellticket/role/info").then((res) => {
    if (res.code == 200) {
      state.btnPermission = res.buttonList;
    }
  });
}
/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];

  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

const state = {
  routes: [],
  addRoutes: [],
  btnPermission: [],
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  },
  SET_BTN_PER: (state, data) => {
    state.btnPermission = data;
  },
};

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise((resolve) => {
      const loadMenuData = [];
      let menu = {
        icon: " fa fa-envelope",
        isDelete: 0,
        list: [
          {
            isDelete: 0,
            icon: "fa fa-envelope el-icon-s-ticket",
            name: "产品矩阵",
            menuId: 3987,
            orderNum: 0,
            perms: "",
            list: [
              {
                isDelete: 0,
                icon: "fa fa-envelope",
                name: "产品矩阵",
                menuId: 3992,
                orderNum: 1,
                perms:
                  "ticketManagement:personalSettings:personalSettings",
                type: 1,
                parentId: 3987,
                url: "/product/product",
              },
            ],
            type: 0,
            parentId: 3932,
            url: "/product",
          },
          {
            isDelete: 0,
            icon: "fa fa-envelope el-icon-bank-card",
            name: "解决方案",
            menuId: 4120,
            orderNum: 1,
            perms: "",
            list: [
              {
                isDelete: 0,
                icon: "fa fa-envelope",
                name: "解决方案",
                menuId: 4121,
                orderNum: 0,
                perms:
                  "annualCardManagement:annualCardSale:annualCardSale",
                type: 1,
                parentId: 4120,
                url: "/solution/solution",
              },
            ],
            type: 0,
            parentId: 3932,
            url: "/solution",
          },
        ],
        menuId: 3932,
        name: "文旅官网",
        orderNum: 1014,
        parentId: 0,
        perms: "",
        type: 0,
        url: "",
      };
      Object.assign(loadMenuData, menu.list);
      const tempAsyncRoutes = Object.assign([], asyncRoutes);
      // tempAsyncRoutes = asyncRoutes
      generaMenu(tempAsyncRoutes, loadMenuData);
      commit("SET_ROUTES", tempAsyncRoutes);
      resolve(tempAsyncRoutes);
    });
  },
  setBtnPermission({ commit, state }, val) {
    // console.log(val);
    let data = [
      {
        icon: "",
        isDelete: 0,
        menuId: 3978,
        name: "新增",
        orderNum: 0,
        parentId: 3977,
        perms: "tktTicketmodelinfo:save",
        type: 2,
        url: "",
      },
      {
        icon: "",
        isDelete: 0,
        menuId: 3979,
        name: "修改",
        orderNum: 0,
        parentId: 3977,
        perms: "tktTicketmodelinfo:update",
        type: 2,
        url: "",
      },
    ];
    console.log(112123);
    this.$get("/sellticket/role/info", {}).then((res) => {
      if (res.code == 200) {
        commit("SET_BTN_PER", res.buttonList);
      }
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
