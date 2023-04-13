<script setup lang="ts">
import HomeView from './views/HomeView.vue';
import HelloWorld from './components/HelloWorld.vue';
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import { computed } from '@vue/reactivity';

const {result,loading,error} =  useQuery(gql`
  query getTags{
    tags {
          name
    }
  }
`)

const tags = computed(()=>{
  let tagsArray = []
  if (result.value){
    result.value?.tags.forEach(tagName => {
      let tagInfo = {path:"/tag/"+tagName.name,name:tagName.name}
      tagsArray.push(tagInfo)
    });
  }
  return tagsArray

})

</script>
<template>
  <el-config-provider namespace="ep" >
    <BaseHeader :tagItems="tags"/>
    <div style="display: flex">
      <BaseSide />
      <div>
        <!-- <HelloWorld msg="Hello Vue 3.0 + Element Plus + Vite" @changeTags ='changTags'/>  -->
        <RouterView/> 
      </div>
    </div>
  </el-config-provider>
</template>

<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
}

.element-plus-logo {
  width: 50%;
}
</style>
