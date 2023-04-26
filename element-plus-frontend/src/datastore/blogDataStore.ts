import {defineStore} from 'pinia'
import { ref,computed } from 'vue'
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';

export const useBlogData = defineStore("blogData",()=>{
    const {result,loading,error} =  useQuery(gql`
        query getTags{
            tags {
                name
            }
        }
    `)

    const tagsMenu = computed(()=>{
        let tagArray = []
        result.value?.tags.forEach(tagName => {
            
            let tagInfo = {path:"/tag/"+tagName.name,name:tagName.name}
            tagArray.push(tagInfo)
        });
         
        return tagArray
    })

    return {tagsMenu}
})