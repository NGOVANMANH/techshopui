import { Home, Login, Cart, Signup, News, Products, Product, Search, Profile, Forget, Checkout, ResetPassword, OrderGuest } from '../pages';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/cart', component: Cart },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/news', component: News },
    { path: '/product/:id', component: Product },
    { path: '/product/:id/:color', component: Product },
    { path: '/products/:category', component: Products },
    { path: '/products/:category/:brand', component: Products },
    { path: '/search/:searchValue', component: Search },
    { path: '/search', component: Search },
    { path: '/forget', component: Forget },
    { path: '/forget/reset', component: ResetPassword },
    { path: '/checkout', component: Checkout },
    { path: '/orderguest', component: OrderGuest },
];
const privateRoutes = [
    { path: '/', component: Home },
    { path: '/cart', component: Cart },
    { path: '/news', component: News },
    { path: '/product/:id', component: Product },
    { path: '/product/:id/:color', component: Product },
    { path: '/products/:category/:brand', component: Products },
    { path: '/products/:category', component: Products },
    { path: '/search/:searchValue', component: Search },
    { path: '/search', component: Search },
    { path: '/profile', component: Profile },
    { path: '/profile/:activeKey', component: Profile },
    { path: '/checkout', component: Checkout },
];

export { publicRoutes, privateRoutes };