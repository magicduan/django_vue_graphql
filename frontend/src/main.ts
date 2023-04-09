import { createApp,provide,h } from 'vue'
//import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'

import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const app = createApp({
    setup () {
      provide(DefaultApolloClient, apolloClient)
    },
  
    render: () => h(App),
  })
//const app = createApp(App)
//app.use(createPinia())
app.use(router)

app.mount('#app')
