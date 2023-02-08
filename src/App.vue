<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
.el-input-number--mini{
	max-width:130px ;
	width: auto;
}
.sale-order-btn{
	display: flex;
	align-items: center;
	justify-content: space-between;
.form-pay-btn{
	min-width: 230px;
	height: 80px;
	padding: 10px 0;
	margin-right: 20px;
	&-box{
		display: flex;
		align-items: center;
	}
	&-left{
		font-size: 24px;
		white-space: pre-wrap;
		white-space: break-spaces;
		width: 66px;
		border-right: 1px solid #fff
	}
	&-right{
		font-size: 26px;
		flex: 1;
	}
}
}
.ticket-form-btn button{
    margin-bottom: 5px;
}

</style>
