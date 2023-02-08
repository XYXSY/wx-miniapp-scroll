<template>
  <div class="navbar">
    底部信息栏
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { baseURL } from '@/settings.js'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data(){
    return{
      baseURL:baseURL
    }
  },
  computed: {
    ...mapGetters([
      'device',
      'sidebar',
      'avatar',
      'realname',
      'name'
    ])
  },

  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout').then(()=>{
          location.reload()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 120px;
  overflow: hidden;
  position: relative;
  background: #1E0AE8;
  color: #FFF;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;
          cursor: pointer;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        // .el-icon-caret-bottom {
          // cursor: pointer;
          // position: absolute;
          // right: -20px;
          // top: 25px;
          // font-size: 12px;
        // }
      }
    }
  }
}
</style>
