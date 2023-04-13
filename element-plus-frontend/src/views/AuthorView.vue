<script setup lang="ts">
  import PostList from '../components/PostList.vue'
  import {computed} from 'vue'
  import gql from 'graphql-tag';
  import { useQuery } from '@vue/apollo-composable';
  import { useRoute } from 'vue-router';

  let p_username = useRoute().params.username
  const {result,loading,error} = useQuery(gql`
      query getAuthorByUsername($username:String!){
        authorByUsername(username: $username) {
          website
          bio
          user {
            firstName
            lastName
            username
          }
          postSet {
            title
            subtitle
            publishDate
            published
            metaDescription
            slug
            tags {
              name
            }
          }
        }
      }
  `,{username:p_username})

  const author = computed(() => result.value?.authorByUsername)

  function getDisplayName(){
    if (author && author.value.user){
      return (
          author.value.user.firstName &&
          author.value.user.lastName &&
          `${author.value.user.firstName} ${author.value.user.lastName}`
        ) || `${author.value.user.username}`
    }else{
      return ""
    }
  }
</script>

<template>
    <div v-if="loading">Page Loading </div>
    <div v-else>
      <div v-if="author" >
        <h2>{{ getDisplayName() }}</h2>
        <div class="left">
          <el-link :href="author.website"> Website:{{author.website  }}</el-link>
          <p>{{ author.bio }}</p>
        </div>
        <PostList :posts="author.postSet" :showAuthor="false" />
      </div>
    </div>
</template>
  
