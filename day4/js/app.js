import { getTodos, saveTodos } from "./storage.js";
import { renderTodos } from "./ui.js";
import { debounce } from "./utils.js";

const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const searchInput = document.getElementById("searchInput");

// Always treat IDs as STRINGS (prevents mismatch bugs)
let todos = getTodos().map(todo => ({
  ...todo,
  id: String(todo.id)
}));

renderTodos(todos, todoList);

// ADD TODO
addBtn.addEventListener("click", () => {
  const text = todoInput.value.trim();
  if (!text) return;

  const newTodo = {
    id: Date.now().toString(), // store as string always
    text,
    completed: false
  };

  todos = [...todos, newTodo];

  saveTodos(todos);
  renderTodos(todos, todoList);

  todoInput.value = "";
});

// DELETE + EDIT (SAFE VERSION)
todoList.addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (!button) return;

  const id = button.dataset.id; // already string

  // DELETE
  if (button.classList.contains("delete")) {
    todos = todos.filter(todo => todo.id !== id);
  }

  // EDIT
  if (button.classList.contains("edit")) {
    const todoToEdit = todos.find(todo => todo.id === id);
    if (!todoToEdit) return;

    const updatedText = prompt("Edit Todo:", todoToEdit.text);

    if (updatedText !== null && updatedText.trim() !== "") {
      todos = todos.map(todo =>
        todo.id === id
          ? { ...todo, text: updatedText.trim() }
          : todo
      );
    }
  }

  saveTodos(todos);
  renderTodos(todos, todoList);
});

// SEARCH (Debounced)
searchInput.addEventListener(
  "input",
  debounce((e) => {
    const value = e.target.value.toLowerCase();
    const filtered = todos.filter(todo =>
      todo.text.toLowerCase().includes(value)
    );
    renderTodos(filtered, todoList);
  }, 300)
);
