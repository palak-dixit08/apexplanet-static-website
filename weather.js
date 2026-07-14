// ==================== WEATHER APPLICATION LOGIC ====================
const apiKey = "69713bf835894fcda838775844810c9f";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const displayCity = document.getElementById("display-city");
const displayTemp = document.getElementById("display-temp");
const displayDesc = document.getElementById("display-desc");
const weatherIcon = document.getElementById("weather-icon");

function getWeatherEmoji(mainCondition) {
  if (!mainCondition) return "🌍";
  const condition = mainCondition.toLowerCase().trim(); 

  if (condition === "clear") return "☀️";
  if (condition.includes("rain") || condition.includes("drizzle")) return "🌧️";
  if (condition.includes("thunder")) return "⛈️";
  if (condition.includes("snow")) return "❄️";
  if (condition.includes("mist") || condition.includes("smoke") || condition.includes("haze") || condition.includes("fog")) return "🌫️";
  if (condition.includes("cloud")) return "☁️";
  
  return "🌍"; 
}

async function checkWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (response.status === 404 || data.cod === "404") {
      displayCity.textContent = "City Not Found";
      displayTemp.textContent = "--°C";
      displayDesc.textContent = "Please check your spelling and try again.";
      weatherIcon.textContent = "❌";
      return; 
    }

    if (data.cod === 200) {
      displayCity.textContent = data.name;
      displayTemp.textContent = `${Math.round(data.main.temp)}°C`;
      displayDesc.textContent = data.weather[0].description;
      weatherIcon.textContent = getWeatherEmoji(data.weather[0].main);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

searchBtn.addEventListener("click", () => {
  const cityValue = cityInput.value.trim();
  if (cityValue) checkWeather(cityValue);
});

cityInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && cityInput.value.trim()) checkWeather(cityInput.value.trim());
});


// ==================== DAYS 19-20: TODO LIST LOGIC ====================
const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("add-todo-btn");
const todoListContainer = document.getElementById("todo-list-container");
const filterButtons = document.querySelectorAll(".filter-btn");

// Read saved tasks from localStorage right away when the app fires up
let todos = JSON.parse(localStorage.getItem("dashboard-todos")) || [];
let currentFilter = "all";

// Persist the tasks securely in localStorage
function saveTodos() {
  localStorage.setItem("dashboard-todos", JSON.stringify(todos));
}

// Render dynamic item lists based on chosen filters
function renderTodos() {
  todoListContainer.innerHTML = "";
  
  const filteredTodos = todos.filter(todo => {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true;
  });

  filteredTodos.forEach(todo => {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? "completed" : ""}`;
    
    li.innerHTML = `
      <span>${todo.text}</span>
      <div class="todo-actions">
        <button class="btn-complete" onclick="toggleTodo(${todo.id})">✓</button>
        <button class="btn-edit" onclick="editTodo(${todo.id})">✎</button>
        <button class="btn-delete" onclick="deleteTodo(${todo.id})">✕</button>
      </div>
    `;
    todoListContainer.appendChild(li);
  });
}

// CREATE functionality
function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;

  todos.push({
    id: Date.now(),
    text: text,
    completed: false
  });

  todoInput.value = "";
  saveTodos();
  renderTodos();
}

// UPDATE (Toggle Status) functionality
window.toggleTodo = function(id) {
  todos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
  saveTodos();
  renderTodos();
};

// DELETE functionality
window.deleteTodo = function(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  renderTodos();
};

// UPDATE (Text Edit) functionality
window.editTodo = function(id) {
  const todo = todos.find(t => t.id === id);
  if (!todo) return;
  
  const newText = prompt("Edit your task:", todo.text);
  if (newText !== null && newText.trim() !== "") {
    todo.text = newText.trim();
    saveTodos();
    renderTodos();
  }
};

addTodoBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addTodo();
});

// Setup filter switches (All, Active, Completed)
filterButtons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    filterButtons.forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    currentFilter = e.target.getAttribute("data-filter");
    renderTodos();
  });
});


// ==================== INITIAL STARTUP BOOT ====================
document.addEventListener("DOMContentLoaded", () => {
  checkWeather("Delhi");
  renderTodos(); // Renders local storage items safely on page bootup
});