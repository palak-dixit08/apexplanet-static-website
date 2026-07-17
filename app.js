// app.js
import { initMenuToggle, initThemeToggle, initWeatherUI, initTodoList } from './ui.js';
import { initSlider } from './utils.js';
import { fetchUserData, fetchWeatherData } from './api.js';

// Central initialization sequence
document.addEventListener('DOMContentLoaded', () => {
    // Basic UI components
    initMenuToggle();
    initThemeToggle();
    fetchUserData();
    
    // 1. Image slider
    if (document.querySelector('.slide')) {
        initSlider();
    }
    
    // 2. Weather interface
    if (document.getElementById('weather-form')) {
        initWeatherUI(fetchWeatherData);
    }

    // 3. Todo List interface
    if (document.getElementById('todo-form')) {
        initTodoList();
    }
});