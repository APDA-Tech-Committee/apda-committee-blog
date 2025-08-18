import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/committees',
      name: 'committees',
      component: () => import('../views/CommitteesView.vue'),
    },
    {
      path: '/committees/:slug',
      name: 'committee-detail',
      component: () => import('../views/CommitteeDetailView.vue'),
    },
    {
      path: '/committees/:slug/about',
      name: 'committee-about',
      component: () => import('../views/CommitteeAboutView.vue'),
    },
    {
      path: '/committees/:slug/blog',
      name: 'committee-blog',
      component: () => import('../views/CommitteeBlogView.vue'),
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogView.vue'),
    },
    {
      path: '/blog/:slug',
      name: 'blog-post',
      component: () => import('../views/BlogPostView.vue'),
    },
  ],
})

export default router
