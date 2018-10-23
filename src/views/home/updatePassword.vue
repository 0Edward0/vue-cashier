<template>
<div class="updatePassword">
  <el-form :model="passwordForm" status-icon :rules="formRules" ref="passwordForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="原密码" prop="oldPassword">
      <el-input type="password" v-model="passwordForm.oldPassword" clearable placeholder="请输入旧密码"
                autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="newPassword">
      <el-input type="password" v-model="passwordForm.newPassword" clearable placeholder="请输入新密码"
                autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input type="password" v-model="passwordForm.confirmPassword" clearable placeholder="确认新密码"
                autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">提交</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import {updateUserPassword} from '@/api/login'
import {message} from '@/utils/message'

export default {
  name: 'updatePassword',
  data () {
    let passwordForm = {
      oldPassword: null,
      newPassword: null,
      confirmPassword: null
    }

    var validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error('密码长度不能小于6位数，不能大于20位数'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error('密码长度不能小于6位数，不能大于20位数'))
      } else {
        if (this.passwordForm.confirmPassword !== '') {
          this.$refs.passwordForm.validateField('confirmPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passwordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      passwordForm: passwordForm,
      formRules: {
        oldPassword: [
          {validator: validateOldPass, trigger: 'blur'}
        ],
        newPassword: [
          {validator: validatePass, trigger: 'blur'}
        ],
        confirmPassword: [
          {validator: validatePass2, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm: function () {
      const vm = this
      this.$refs['passwordForm'].validate((valid) => {
        if (valid) {
          let obj = vm.passwordForm
          updateUserPassword(obj).then(res => {
            if (res === true) {
              message('密码修改成功，下次登录请使用新密码', 'error')
            } else {
              message(`密码修改失败：${res.msg}`, 'error')
            }
          })
        } else {
          message('密码验证失败，请检查', 'error')
          return false
        }
      })
    },
    resetForm: function () {
      this.$refs['passwordForm'].resetFields()
    }
  }
}
</script>

<style scoped>

</style>
