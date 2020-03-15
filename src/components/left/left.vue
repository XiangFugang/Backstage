<template>
  <div>
    <el-menu :default-active="$route.meta.path" class="el-menu-vertical-demo" @select="select" unique-opened>
      <template v-for="item in menu">
        <el-submenu :index="item.key" :key="item.path" v-if="item.children.length>0">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.authName}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item :index="child.key" v-for="child in item.children" :key="child.path">
              <i :class="child.icon"></i>
              <span slot="title">{{child.authName}}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item :index="item.key" :key="item.path" v-else>
          <i :class="item.icon"></i>
          <span slot="title">{{item.authName}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import router from "../../router";
export default {
  data() {
    return {
      menu: []
    };
  },
  components: {},
  methods: {
    menus() {
      this.$store
        .dispatch("user/menus")
        .then(res => {
          this.menu = res.data;
          // console.log(res.data);
          if (res.meta.status === 200) {
            res.data.unshift({
              id: 10000,
              authName: "首页",
              children: [],
              path: "home",
              order: 0
            });
            res.data.map(item => {
              if (item.children.length === 0) {
                this.$set(item, "key", `/${item.path}`);
              } else {
                this.$set(item, "key", `/${item.path}`);
                item.children.map(child => {
                  this.$set(child, "key", `/${item.path}/${child.path}`);
                });
              }
            });
            // console.log(router);
            router.options.routes.map(item => {
              if (item.meta) {
                res.data.map(item1 => {
                  if (item.meta.title === item1.authName) {
                    this.$set(item1, "icon", item.meta.icon);
                  }
                  if (
                    item.children &&
                    item.children.length > 0 &&
                    item1.children.length > 0
                  ) {
                    item.children.map(item2 => {
                      if (item2.meta) {
                        item1.children.map(item3 => {
                          if (item2.meta.title === item3.authName) {
                            this.$set(item3, "icon", item2.meta.icon);
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    select(index,indexPath){
      if(indexPath.length===1){
        this.$router.push(indexPath[0])
      }else{
        this.$router.push(indexPath[1])
      }
    }
  },
  mounted() {
    this.menus();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>