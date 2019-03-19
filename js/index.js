var About = { template: '<h1>About</h1>' };
var Dashboard = { template: '<div><h1>Dashboard</h1><router-link to="/logout">Logout</router-link></div>' };

var Auth = {
  loggedIn: false,
  login: function() { this.loggedIn = true },
  logout: function() { this.loggedIn = false }
}

var Login = {
  template: '<input type="submit" value="Login" v-on:click="login">',
  methods: {
    login: function() {
      Auth.login();
      router.push(this.$route.query.redirect);
    }
  }
};

var Logout = {
  template: '<input type="submit" value="Logout" v-on:click="logout">',
  methods: {
    logout: function() {
      Auth.logout();
      router.push('/');
    }
  }
}

var routes = [
  { path: '/about', component: About },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
  { path: '/logout', component: Logout },
];

var router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !Auth.loggedIn) {
    next({ path: '/login', query: { redirect: to.fullPath }});
  } else {
    next();
  }
});


var app = new Vue({
  el: '#app',
  // components: {
  //   'About': About
  // },
  router
});