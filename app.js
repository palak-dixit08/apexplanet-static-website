import { initMenuToggle, initThemeToggle } from './ui.js';
import { initSlider } from './utils.js';
import { fetchUserData } from './api.js';

// Central initialization sequence
document.addEventListener('DOMContentLoaded', () => {
    initMenuToggle();
    initThemeToggle();
    initSlider();
    fetchUserData();
});