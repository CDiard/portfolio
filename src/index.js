import './styles/main.css';
import {router, setupLinks} from "./router";


document.addEventListener('DOMContentLoaded', async () => {
    setupLinks();
    await router();
});