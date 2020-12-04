<template>
	<transition name="scale">
		<div class="modal" v-if="showingAddModel">
			<div class="modalContainer">
				<div class="modalHeader">
					<p class="fleft">{{modelHeading}}</p>
					<p class="fright modalClose" @click = "$emit('modelClose')">X</p>
					<div class="clear"></div>
				</div>
				<div class="modalContainer">
					<slot></slot>					
				</div>
				<div class="modalFooter">
					<button class="fright btnClose" @click = "$emit('modelClose')">Close</button>
					<div class="clear"></div>
				</div>
			</div>
		</div>
	</transition>
</template>



<script>
export default {
  name: 'model',
  computed : {
  	showingAddModel()
  	{
  		return this.cond;
  	}
  },
  props: ['cond', 'modelHeading']
  
}
</script>
