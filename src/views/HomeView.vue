<template>
  <div class="home">
    <div class="panel panel-success">
      <div class="panel-heading"><h3 class="panel-title">基础表格</h3></div>
      <div class="panel-body">
        <dc-table :headers="header" :data="tableData"/>
      </div>
    </div>
    <div class="panel panel-success">
      <div class="panel-heading"><h3 class="panel-title">条纹状表格</h3></div>
      <div class="panel-body">
        <dc-table striped :headers="header" :data="tableData"/>
      </div>
    </div>
    <div class="panel panel-success">
      <div class="panel-heading"><h3 class="panel-title">带边框的表格</h3></div>
      <div class="panel-body">
        <dc-table bordered :headers="header" :data="tableData"/>
      </div>
    </div>
    <div class="panel panel-success">
      <div class="panel-heading"><h3 class="panel-title">响应式的表格</h3></div>
      <div class="panel-body">
        <dc-table striped bordered responsive :headers="header" :data="tableData"/>
      </div>
    </div>
    <div class="panel panel-success">
      <div class="panel-heading"><h3 class="panel-title">单元格自动省略</h3></div>
      <div class="panel-body">
        <dc-table striped bordered responsive :headers="header_ellipse" :data="tableData"/>
      </div>
    </div>
    <div class="panel panel-success">
      <div class="panel-heading"><h3 class="panel-title">列排序</h3></div>
      <div class="panel-body">
        <dc-table striped bordered responsive :headers="header_sortable" :data="tableData" @sort="tableSortHandler"/>
      </div>
    </div>
    <div class="panel panel-success">
      <div class="panel-heading"><h3 class="panel-title">列选择</h3></div>
      <div class="panel-body">
        <dc-table striped bordered responsive row-select row-key="id" :headers="header_ellipse" :data="tableData" @rowSelect="tableSelected"/>
      </div>
    </div>
    <div class="panel panel-success">
      <div class="panel-heading"><h3 class="panel-title">带分页功能的表格</h3></div>
      <div class="panel-body">
        <dc-table striped bordered responsive :headers="header" :data="tableData" :pagination="pagination" @change="tableChanged"/>
      </div>
    </div>
    <div class="panel panel-success">
      <div class="panel-heading"><h3 class="panel-title">自定义列渲染</h3></div>
      <div class="panel-body">
        <dc-table striped bordered responsive :headers="header_customer" :data="tableData" :pagination="pagination" @change="tableChanged"/>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import DcTable from "@/components/dc-table";
export default {
  name: 'HomeView',
  components: { DcTable },
  data() {
    return {
      header: [
        {type: 'index', label: '序号'},
        {prop: 'datetime', label: '日期'},
        {prop: 'name', label: '姓名'},
        {prop: 'country', label: '地址'},
        {prop: 'province', label: '省份'},
        {prop: 'city', label: '城市'},
      ],
      header_ellipse: [
        {type: 'index', label: '序号'},
        {prop: 'datetime', label: '日期'},
        {prop: 'name', label: '姓名'},
        {prop: 'country', label: '地址', ellipse: true},
        {prop: 'province', label: '省份', ellipse: true},
        {prop: 'city', label: '城市', ellipse: true},
      ],
      header_sortable: [
        {type: 'index', label: '序号'},
        {prop: 'datetime', label: '日期'},
        {prop: 'name', label: '姓名'},
        {prop: 'country', label: '地址', sortable: true},
        {prop: 'province', label: '省份', sortable: true},
        {prop: 'city', label: '城市', sortable: true},
      ],
      header_customer: [
        {type: 'index', label: '序号'},
        {prop: 'datetime', label: '日期'},
        {prop: 'name', label: '姓名'},
        {prop: 'country', label: '地址'},
        {prop: 'province', label: '省份'},
        {prop: 'city', label: '城市'},
        {prop: 'action', label: '操作', customRender: (row) => {
          return (<button type="button" className="btn btn-link" onClick={this.test.bind(this, row)}>查看</button>)
        }}
      ],
      originData: [],
      pagination: {
        page: 1,
        size: 10,
        total: 100
      }
    }
  },
  computed: {
    tableData() {
      return this.originData.slice((this.pagination.page - 1) * this.pagination.size, this.pagination.size)
    }
  },
  created() {
    this.loadData()
  },

  methods: {
    test(row) {
      window.alert(row.name)
    },
    loadData() {
      axios.get('https://yapi.ixf.io/mock/20/api/users').then(res => {
        this.originData = res.data.data.list
        this.pagination.total = this.originData.length
      })
    },
    tableChanged() {
      this.loadData()
    },
    tableSelected(keys) {
      window.alert(`您选择了${keys.length}行：${keys.join()}`)
    },
    tableSortHandler() {
      this.loadData()
    }
  }
}
</script>
<style scoped lang="scss">
.home {
  padding: 10px;
}
</style>