import Swiper from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import data from '/src/assets/data/swiper-data.json';

import './swiper.css';

class AppSwiper extends HTMLElement {
    connectedCallback() {
        this.renderSlides();
    }

    renderSlides() {
        this.innerHTML = `
        <div class="content-swiper">
            <div class="swiper-button-prev">
                <app-svg icon="arrow_back"></app-svg>
            </div>
            <div class="swiper">
                <div class="swiper-wrapper">
                    ${data.map((item, index) => `
                        <div class="swiper-slide position-relative">
                            <div class="h-100 w-100 d-flex flex-column justify-content-between align-items-stretch pb-3 position-static">
                                <div class="image-swiper w-100 d-flex flex-column justify-content-center align-items-center overflow-hidden">
                                    <img src="${item.image}" class="img-fluid" alt="${item.title}" />
                                </div>
                                <div class="d-flex flex-column justify-content-start align-items-start gap-2 p-3">
                                    <p class="m-0"><strong>${item.title}</strong></p>
                                    <p class="subtext text-justify m-0">${item.description}</p>
                                </div>
                                <button class="mx-auto btn btn-secondary stretched-link" data-id="${index}" data-bs-toggle="modal" data-bs-target="#slideModal" title="En savoir plus sur la réalisation">
                                    <span>
                                        En savoir plus
                                        <app-svg icon="arrow_right"></app-svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="swiper-button-next">
                <app-svg icon="arrow_forward"></app-svg>
            </div>
        </div>

        <div class="modal-swiper modal fade" id="slideModal" tabindex="-1" aria-labelledby="modalTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalTitle">Détails</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
                    </div>
                    <div class="modal-body" id="modalContent">
                        Chargement...
                    </div>
                </div>
            </div>
        </div>`;

        requestAnimationFrame(() => {
            const swiperElement = this.querySelector('.content-swiper .swiper');
            if (swiperElement) {
                new Swiper(swiperElement, {
                    modules: [Navigation],
                    loop: true,
                    navigation: {
                        nextEl: this.querySelector('.content-swiper .swiper-button-next'),
                        prevEl: this.querySelector('.content-swiper .swiper-button-prev'),
                    },
                    slidesPerView: 3,
                    spaceBetween: 16,
                    breakpoints: {
                        0: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        992: {
                            slidesPerView: 3,
                        },
                    },
                });
            } else {
                console.warn('<app-swiper> : élément .swiper introuvable');
            }
        });

        this.addEventListener('click', e => {
            const btn = e.target.closest('button[data-id]');
            if (btn) {
                const id = parseInt(btn.getAttribute('data-id'));
                const slide = data[id];
                const title = this.querySelector('#modalTitle');
                const content = this.querySelector('#modalContent');
                if (slide && title && content) {
                    title.textContent = slide.title;
                    content.innerHTML = `
                        <p class="mb-4">${slide.description}</p>
                        <img src="${slide.image}" class="img-fluid mb-4" alt="${slide.title}" />
                        <div>${slide.details}</div>
                    `;
                }
            }
        });
    }
}

customElements.define('app-swiper', AppSwiper);
