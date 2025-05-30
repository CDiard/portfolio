const routes = {
    '/': () => import('./components/home/home.js')
};

function loadRoute(path) {
    const route = routes[path] || routes['/'];
    route().then(module => {
        document.getElementById('app').innerHTML = '';
        document.getElementById('app').appendChild(module.default());
    });
}

window.addEventListener('popstate', () => loadRoute(location.pathname));

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', e => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            history.pushState(null, '', e.target.href);
            loadRoute(location.pathname);
        }
    });

    loadRoute(location.pathname);
});
