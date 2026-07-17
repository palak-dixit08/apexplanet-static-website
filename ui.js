// ui.js

export function initMenuToggle() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
    }
}

export function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    const updateButtonUI = (isDark) => {
        if (themeBtn) themeBtn.innerHTML = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    };

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        updateButtonUI(true);
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateButtonUI(isDark);
        });
    }
}

export function initWeatherUI(fetchWeatherDataFunction) {
    const weatherForm = document.getElementById('weather-form');
    const cityInput = document.getElementById('city-input');
    const displayCity = document.getElementById('display-city');
    const displayTemp = document.getElementById('display-temp');
    const displayDesc = document.getElementById('display-desc');
    const weatherImg = document.getElementById('weather-img');

    if (weatherForm && cityInput) {
        weatherForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const city = cityInput.value.trim();
            if (!city) return;
            
            displayCity.textContent = "Loading...";
            const result = await fetchWeatherDataFunction(city);

            if (result.error) {
                displayCity.textContent = "Error";
                displayDesc.textContent = result.message;
                return;
            }

            displayCity.textContent = `${result.data.name}, ${result.data.sys.country}`;
            displayTemp.textContent = `${Math.round(result.data.main.temp)}°C`;
            displayDesc.textContent = result.data.weather[0].description;
            if (weatherImg) {
                weatherImg.src = `https://openweathermap.org/img/wn/${result.data.weather[0].icon}@2x.png`;
                weatherImg.style.display = 'inline-block';
            }
            localStorage.setItem('lastCity', city);
        });
    }
}

export function initTodoList() {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoListContainer = document.getElementById('todo-list-container');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all';

    const saveAndRender = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        render();
    };

   const render = () => {
    if (!todoListContainer) return;
    todoListContainer.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${task.completed ? 'completed' : ''}`;
        
        // Added the Edit button here
        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <div class="todo-actions">
                <button class="btn-edit">✏️</button>
                <button class="btn-complete">${task.completed ? '↩️' : '✅'}</button>
                <button class="btn-delete">🗑️</button>
            </div>
        `;

        // Logic for Edit
        li.querySelector('.btn-edit').addEventListener('click', () => {
            const span = li.querySelector('.task-text');
            const newText = prompt("Edit your task:", task.text);
            if (newText !== null && newText.trim() !== "") {
                task.text = newText;
                saveAndRender();
            }
        });

        // Logic for Complete
        li.querySelector('.btn-complete').addEventListener('click', () => {
            task.completed = !task.completed;
            saveAndRender();
        });

        // Logic for Delete
        li.querySelector('.btn-delete').addEventListener('click', () => {
            tasks.splice(index, 1);
            saveAndRender();
        });

        todoListContainer.appendChild(li);
    });
};

    if (todoForm) {
        todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = todoInput.value.trim();
            if (!text) return;
            tasks.push({ text: text, completed: false });
            todoInput.value = '';
            saveAndRender();
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            render();
        });
    });

    render();
}