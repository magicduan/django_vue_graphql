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
    <div class="post" style="min-width: 500px;margin-left: 20px;" v-if="post">
        <h2>{{ post.title }}</h2>
        <el-descriptions class="margin-top" size="large" :column="3">
          <template #title> 
           <el-text type="primary">Subtitle:&nbsp;&nbsp;{{ post.subtitle }} </el-text>
          </template>
          <el-descriptions-item label="Poster:">
                  <AuthorLink :author="post.author" />
          </el-descriptions-item>
          <el-descriptions-item label="Tags:" align="right">
            <span v-for="tag in post.tags" :key="tag.name">
              <el-link :href="`/tag/${tag.name}`" type="primary">#{{ tag.name }}</el-link> &nbsp;&nbsp;  
            </span>
          </el-descriptions-item>
          <el-descriptions-item label = "Date:" align="right">
            <el-text type="success"> {{ displayableDate(post.publishDate) }} </el-text>
          </el-descriptions-item>
          <el-descriptions-item label="Description:" :span="3"> 
            <el-text >{{ post.metaDescription }}</el-text>
          </el-descriptions-item>
        </el-descriptions>
          <el-card>
          <article>
            {{ post.body }}
          </article>
        </el-card>
    </div>
</template>
  
