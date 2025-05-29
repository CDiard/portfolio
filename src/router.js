import HomeController from './controllers/HomeController';
import AboutController from './controllers/AboutController';

const routes = {
    '/': {
        view: 'home',
        controller: HomeController
    },
    '/about': {
        view: 'about',
        controller: AboutController
    },
};

export async function navigateTo(url) {
    history.pushState(null, null, url);
    await router();
}

export async function router() {
    const path = window.location.pathname;
    const route = routes[path] || routes['/'];
    document.getElementById('app').innerHTML = route.view;
    route.controller.init();
}

export function setupLinks() {
    document.body.addEventListener('click', e => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    window.addEventListener('popstate', router);
}
