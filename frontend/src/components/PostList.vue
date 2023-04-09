<script setup lang="ts">
import AuthorLink from '../components/AuthorLink.vue'
import {computed} from 'vue'

const props = defineProps({
    posts:{type:Array,required: false, default: true},
    showAuthor: {type: Boolean,required: false,default: true}
})

const publishedPosts = computed(()=>{
      return props.posts.filter((post) => post.published)
})

function displayableDate (date:string) {
      return new Intl.DateTimeFormat(
        'en-US',
        { dateStyle: 'full' },
      ).format(new Date(date))
}

</script>

<template>
    <div>
      <ol class="post-list">
        <li class="post" v-for="post in publishedPosts" :key="post.title">
          <span>{{ post.title }}</span>
            <span class="post__title">
              <router-link
                :to="`/post/${post.slug}`"
              >{{ post.title }}: {{ post.subtitle }}</router-link>
            </span>
            <span v-if="showAuthor">
              by <AuthorLink :author="post.author" />
            </span>
            <div class="post__date">{{ displayableDate(post.publishDate) }}</div>
          <p class="post__description">{{ post.metaDescription }}</p>
          <ul>
            <li class="post__tags" v-for="tag in post.tags" :key="tag.name">
              <router-link :to="`/tag/${tag.name}`">#{{ tag.name }}</router-link>
            </li>
          </ul>
        </li>
      </ol>
    </div>
</template>



<style>
.post-list {
  list-style: none;
}

.post {
  border-bottom: 1px solid #ccc;
  padding-bottom: 1rem;
}

.post__title {
  font-size: 1.25rem;
}

.post__description {
  color: #777;
  font-style: italic;
}

.post__tags {
  list-style: none;
  font-weight: bold;
  font-size: 0.8125rem;
}
</style>

