<script setup lang="ts">
  import PostList from '../components/PostList.vue'
  import {computed} from 'vue'
  import gql from 'graphql-tag';
  import { useQuery } from '@vue/apollo-composable';
  import { useRoute } from 'vue-router';

  let p_tag = useRoute().params.tag
  const {result,loading,error} = useQuery(gql`
      query getPostsBytag($tag:String!){
        postsByTag(tag: $tag) {
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
      }`,
      {
        tag: p_tag
      }      
  )

  const posts = computed(()=>result.value?.postsByTag)

</script>

<template>
    <div>      
      <h2>Posts in tag #{{ $route.params.tag }}</h2>
      <h2 v-if="loading">Loading page</h2>
      <PostList :posts="posts" v-if="posts" />
    </div>
</template>
  

