<script setup lang="ts">
  import PostList from '../components/PostList.vue'
  import gql from 'graphql-tag';
  import { useQuery } from '@vue/apollo-composable';
  import { computed } from '@vue/reactivity';

  const {result,loading,error} =  useQuery(gql`
    query getAllPosts{
      allPosts {
          title
          subtitle
          publishDate
          published
          metaDescription
          slug
          author {
            user {
              username
              firstName
              lastName
            }
          }
          tags {
            name
          }
      }
    }
  `)

 const allPosts = computed(() =>{return result.value?.allPosts})

</script>

<template>
    <div>
      
      <h2 v-if="loading">Loading....</h2>
      <div v-else>
        <h2 >Recent Posts</h2>
        <PostList v-if="allPosts" :posts="allPosts" ></PostList>
      </div>
    </div>
</template>
  

