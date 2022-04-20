<template>
  <div class="tableWrapper">
    <table class="table table-hover" :class="tableClasses">
      <!-- 渲染表头 -->
      <thead v-if="headers.length > 0">
        <tr>
          <th v-for="(header, index) in headers" :key="index">
            <!-- 渲染排序列 -->
            <div v-if="header.sortable" class="sortable-th">
              <div class="title">{{header.label}}</div>
              <span class="column-sorter">
                <span class="column-sorter-inner">
                  <span @click="setOrder(header.prop, 'asc')" :class="sortProp == header.prop && sortOrder == 'asc' ? 'active' : ''" role="img" aria-label="caret-up" class="caret-up"><svg focusable="false" class="" data-icon="caret-up" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="0 0 1024 1024"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path></svg></span>
                  <span @click="setOrder(header.prop, 'desc')" :class="sortProp == header.prop && sortOrder == 'desc' ? 'active' : ''" role="img" aria-label="caret-down" class="caret-down"><svg focusable="false" class="" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="0 0 1024 1024"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path></svg></span>
                </span>
              </span>
            </div>
            <div v-else>{{header.label}}</div>
          </th>
        </tr>
      </thead>
      <tbody v-if="data.length > 0">
        <tr v-for="(row, index) in data" :key="index">
          <td v-for="(header, hIndex) in headers" :key="hIndex" :class="header.ellipse ? 'ellipsis' : ''">
            <!-- 渲染自定义渲染内容 -->
            <div v-if="typeof header.customRender == 'function'">
              <component :is="{
                render() {
                  return header.customRender(row)
                }
              }" />
            </div>
            <!-- 渲染序号 -->
            <div v-else-if="header.type == 'index'">
              <input v-if="rowSelect && hIndex == 0" type="checkbox" @change="rowSelectChanged(row[rowKey])"/>
              {{index + 1}}
            </div>
            <!-- 渲染默认内容 -->
            <div v-else>
              <input v-if="rowSelect && hIndex == 0" type="checkbox" @change="rowSelectChanged(row[rowKey])"/>
              {{row[header.prop]}}
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <nav v-if="pagination" aria-label="Page navigation">
      <ul class="pagination">
        <li>
          <a href="javascript:void(0)" @click="() => {}" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li v-for="(pageNum, index) in Math.round(pagination.total/pagination.size)" :key="index">
          <a href="javascript:void(0)" @click="pagingHandler(pageNum)">{{pageNum}}</a>
        </li>
        <li>
          <a href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
/**
 * dc-table组件
 * 参数列表：
 * @param columns 表格列定义数字，列支持属性：
 */
export default {
  name: 'DC-Table',
  data() {
    return {
      sortProp: '', // 排序字段
      sortOrder: '', // 排序方向
      selectedRowKeys: [],  //选择的rows
    }
  },
  props: {
    /**
     * 表头列表
     */
    headers: {
      type: Array,
      default: () => []
    },
    /**
     * 表格数据
     */
    data: {
      type: Array,
      default: () => []
    },
    /**
     * 是否显示边框，默认不显示
     */
    bordered: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否显示斑马条纹样式，默认不显示
     */
    striped: {
      type: Boolean,
      default: false
    },
    /**
     * 设置分页选项，默认值为false，不显示分页
     * @page 当前页码
     * @size 每页条数
     * @total 总数据量
     */
    pagination: {
      type: [Boolean, Object],
      default: false
    },

    /**
     * 是否启用响应式表格, 其会在小屏幕设备上（小于768px）水平滚动。当屏幕大于 768px 宽度时，水平滚动条消失。
     */
    responsive: {
      type: Boolean,
      default: false
    },
    /**
     * 是否选择行
     */
    rowSelect: {
      type: Boolean,
      default: false
    },
    /**
     * 数据的key属性名，在行选择操作时必传
     */
    rowKey: {
      type: String
    }
  },
  computed: {
    /**
     * 根据配置生成表格的基本class
     * @returns {*[]}
     */
    tableClasses() {
      let classes = []
      if(this.bordered) {
        classes.push('table-bordered')
      }
      if(this.striped) {
        classes.push('table-striped')
      }
      if(this.responsive) {
        classes.push('table-responsive')
      }
      return classes
    },
  },
  created() {

  },
  methods: {
    setOrder(prop, order) {
      if(this.sortProp == prop && this.sortOrder == order) {
        this.sortProp = ''
        this.sortOrder = ''
      } else {
        this.sortProp = prop
        this.sortOrder = order
      }
      this.$emit('sort', {prop, order})
    },
    rowSelectChanged(key) {
      if(this.selectedRowKeys.includes(key)) {
        this.selectedRowKeys.splice(this.selectedRowKeys.indexOf(key), 1)
      } else {
        this.selectedRowKeys.push(key)
      }
      this.$emit('rowSelect', this.selectedRowKeys)
    },
    pagingHandler(page) {
      this.$emit('change', {page, size: this.pagination.size})
    }
  },
  mounted() {

  }
}
</script>
<style scoped lang="scss">
.tableWrapper {
  width: 100%;
  height: 100%;
  .table {
    table-layout: fixed;
    thead>tr>th {
      vertical-align: middle;
    }
    td.ellipsis {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: keep-all;
    }
    .sortable-th {
      display: flex;
      align-items: center;
      .title {
        flex: 1;
      }
      .column-sorter {
        cursor: pointer;
        font-size: 0;
        .column-sorter-inner {
          font-size: 11px;
          display: flex;
          flex-direction: column;
          .active {
            color: #1890ff;
          }
          .caret-down {
            margin-top: -0.3em;
          }
        }
      }
    }
  }
  nav {
    padding: 0;
    .pagination {
      margin: 5px 0;
    }
  }
}
</style>