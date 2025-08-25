import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import BrowseClasses from '../views/BrowseClasses.vue';
import CalendarView from '../views/calendar/CalendarView.vue';
import AdminPanel from '../views/AdminPanel.vue';
import AccountView from '../views/AccountView.vue';
import NewAccount from '../views/NewAccount.vue';
import AdminClasses from '../views/AdminClasses.vue';
import ClassEdit from '../views/ClassEdit.vue';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import { getCurrentUser } from '../../data/database';
import NewClass from '../views/NewClass.vue';
import AdminReservations from '../views/AdminReservations.vue';
import AdminIssues from '../views/AdminIssues.vue';

const routes = [
  {
    path: '/',
    name: 'homePage',
    component: HomePage,
  },
  {
    path: '/classes',
    name: 'classes',
    component: BrowseClasses,
  },
  {
    path: '/calendar/:roomNumber',
    name: 'calendar',
    component: CalendarView,
  },
  {
    path: '/admin-panel',
    name: 'admin-panel',
    component: AdminPanel,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin-account',
    name: 'admin-account',
    component: AccountView,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin-new-account',
    name: 'admin-new-account',
    component: NewAccount,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin-classes',
    name: 'admin-classes',
    component: AdminClasses,
    meta: { requiresAuth: true },
  },
  {
    path: '/edit-class/:roomNumber',
    name: 'edit-class',
    component: ClassEdit,
    meta: { requiresAuth: true },
  },
  {
    path: '/new-class',
    name: 'new-class',
    component: NewClass,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin-reservations',
    name: 'admin-reservations',
    component: AdminReservations,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin-issues',
    name: 'admin-issues',
    component: AdminIssues,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
