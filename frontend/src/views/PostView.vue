<script setup lang="ts">
  import AuthorLink from '../components/AuthorLink.vue'

  import { useRoute } from 'vue-router'
  import { useQuery } from '@vue/apollo-composable'
  import gql from 'graphql-tag'
  import { computed } from '@vue/reactivity'

  let postSlug = useRoute().params.slug

  const {result,loading,error} = useQuery(gql`
    query getPostBySlug($slug: String!) {
          postBySlug(slug: $slug) {
            title
            subtitle
            publishDate
            metaDescription
            slug
            body
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
    `,{slug:postSlug})

  const post = computed(()=>result.value?.postBySlug)

  function displayableDate (date:string) {
    return new Intl.DateTimeFormat(
      'en-US',
      { dateStyle: 'full' },
    ).format(new Date(date))
  }

</script>

<template>
    <h2 v-if="loading">Loading...</h2>
    <div class="post" v-if="post">
        <h2>{{ post.title }}: {{ post.subtitle }}</h2>
        By <AuthorLink :author="post.author" />
        <div>{{ displayableDate(post.publishDate) }}</div>
      <p class="post__description">{{ post.metaDescription }}</p>
      <article>
        {{ post.body }}
      </article>
      <ul>
        <li class="post__tags" v-for="tag in post.tags" :key="tag.name">
          <router-link :to="`/tag/${tag.name}`">#{{ tag.name }}</router-link>
        </li>
      </ul>
    </div>
</template>
  
