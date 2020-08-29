<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="my-5 d-flex justify-content-start">
      <button
        type="button"
        class="creatContent fz-20 btn btn-info"
        data-toggle="modal"
        data-target=".bd-example-modal-xl"
        @click.prevent="openModal('new')"
      >建立新的優惠券</button>
    </div>
    <!-- order list -->
    <table class="table table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">名稱</th>
          <th scope="col">折扣碼</th>
          <th scope="col">折扣百分比</th>
          <th scope="col">到期日</th>
          <th scope="col">是否啟用</th>
          <th scope="col">編輯</th>
        </tr>
      </thead>
      <tbody v-if="coupons.length">
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.code }}</td>
          <td class="text-center">{{ item.percent }}%</td>
          <td>{{ item.deadline.datetime }}</td>
          <td class="text-center">
            <strong class="text-warning" v-if="item.enabled">啟用</strong>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary mr-2"
                @click="openModal('edit',item)"
              >編輯</button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="openModal('delete',item)"
              >刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- coupon modal -->
    <div
      id="editCoupon"
      class="modal fade"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      role="dialog"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <edit-coupon ref="editCoupon" :is-new="isNew" @update="getCoupons"></edit-coupon>
    </div>
    <!-- del coupon modal -->
    <div
      id="delCoupon"
      class="modal fade"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      role="dialog"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <del-coupon :temp-coupon="tempCoupon" @update="getCoupons"></del-coupon>
    </div>
    <!-- pagination 前內後外-->
    <pagination :pages="pagination" @update="getCoupons"></pagination>
  </div>
</template>

<script>
import $ from 'jquery'
import EditCoupon from '@/components/EditCoupon.vue'
import DelCoupon from '@/components/DelCoupon.vue'
import Pagination from '@/components/Pagination.vue'
export default {
  data () {
    return {
      coupons: [],
      tempCoupon: {
        title: '',
        code: '',
        percent: 100,
        enabled: false,
        deadline_at: ''
      },
      isNew: false,
      pagination: {},
      isLoading: false
    }
  },
  components: {
    Pagination,
    EditCoupon,
    DelCoupon
  },
  created () {
    this.getCoupons()
  },
  methods: {
    getCoupons (num = 1) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupons?page=${num}`
      this.$http
        .get(url)
        .then((res) => {
          this.coupons = res.data.data
          this.pagination = res.data.meta.pagination
          this.isLoading = false
        })
        .catch((err) => {
          console.log(err.response)
          this.isLoading = false
        })
    },
    openModal (isNew, item) {
      switch (isNew) {
        case 'new': {
          // 新增
          this.tempCoupon = {}
          this.isNew = true
          $('#editCoupon').modal('show')
          break
        }
        case 'edit': {
          // 編輯
          this.isNew = false
          this.$refs.editCoupon.editDetails(item.id)
          // editDetails 要去 editcoupon methods
          break
        }
        case 'delete': {
          // 刪除
          this.tempCoupon = Object.assign({}, item) // 淺拷貝
          $('#delCoupon').modal('show')
          break
        }
        default: {
          break
        }
      }
    }
  }
}
</script>
