var _a, _b, _c;
import { jsonToTodosModel, todosModelToJson } from './model.js';
// store all todo details
let todos = {
    categories: []
};
// check whether there are any todos in localstorage
function checkTodos() {
    const todosString = localStorage.getItem("todos");
    console.log(todosString);
    let noContentItem = document.getElementById("no-categories-landing");
    if (todos.categories.length == 0 && (todosString == null || (todosString != null && (todosString === null || todosString === void 0 ? void 0 : todosString.length)) == 0)) {
        console.log("no contents");
        noContentItem.classList.remove("hidden");
        noContentItem.classList.add("flex");
        return;
    }
    if (todosString && todosString.length != 0) {
        const _todos = jsonToTodosModel(todosString);
        if (_todos == null) {
            todos = {
                categories: []
            };
        }
        else {
            todos = _todos;
        }
    }
    console.log(todos);
    noContentItem.classList.remove("flex");
    noContentItem.classList.add("hidden");
    showDataSection();
    return;
}
checkTodos();
const addCategoryButton = document.getElementById("add-category");
const addNewCategoryButton = document.getElementById("add-new-category");
// open add category popup
function showAddCategoryPopup() {
    const createCategoryPopup = document.getElementById("create-category-popup");
    createCategoryPopup.classList.remove("hidden");
    createCategoryPopup.classList.add("grid");
}
addCategoryButton.addEventListener('click', showAddCategoryPopup);
addNewCategoryButton.addEventListener('click', showAddCategoryPopup);
//close add category popup
function hideAddCategoryPopup() {
    const createCategoryPopup = document.getElementById("create-category-popup");
    createCategoryPopup.classList.remove("grid");
    createCategoryPopup.classList.add("hidden");
}
const cancelAddingCategoryButton = document.getElementById("cancel-add-category-button");
cancelAddingCategoryButton.addEventListener('click', hideAddCategoryPopup);
//add new category
function addNewCategory() {
    var _a;
    const categoryNameField = document.getElementById("category-name-field");
    let categoryName = categoryNameField.value;
    console.log(categoryName);
    if (categoryName.length == 0) {
        categoryNameField.classList.add("border-red-500");
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Category name cannot be empty";
        errorMessage.classList.add("text-red-500", "text-sm", "mt-1");
        errorMessage.id = "category-name-error";
        // remove existing error message
        const existingError = document.getElementById("category-name-error");
        if (existingError) {
            existingError.remove();
        }
        (_a = categoryNameField.parentNode) === null || _a === void 0 ? void 0 : _a.appendChild(errorMessage);
        return;
    }
    const categoryModel = {
        name: categoryName,
        todos: []
    };
    todos.categories.push(categoryModel);
    console.log(todos.categories);
    saveToLocalStorage();
    checkTodos();
    hideAddCategoryPopup();
    handleCategoyNamesList();
}
//save to localstorage
function saveToLocalStorage() {
    const todosJson = todosModelToJson(todos);
    localStorage.setItem("todos", todosJson);
}
// submit category name button handle
const submitCategoryNameButton = document.getElementById("submit-category-name");
submitCategoryNameButton.addEventListener('click', addNewCategory);
// show data section
function showDataSection() {
    const dataSection = document.getElementById("data-section");
    dataSection.classList.remove("hidden");
    dataSection.classList.add("flex");
}
const categoryNamesList = document.getElementById("category-names-list");
const todosListElement = document.getElementById("todo-list");
let currentCategoryIndex = 0;
function changeCategory(newIndex) {
    currentCategoryIndex = newIndex;
    handleCategoyNamesList();
    handleTodosList();
}
function handleCategoyNamesList() {
    categoryNamesList.innerHTML = '';
    todos.categories.map((category, categoryIndex) => {
        const categoryNameTile = document.createElement("div");
        categoryNameTile.classList.add("px-3", "cursor-pointer");
        if (categoryIndex == currentCategoryIndex) {
            categoryNameTile.classList.add("text-blue-500", "border-b-3", "py-2", "font-bold");
        }
        categoryNameTile.innerHTML = `
            <h5>${category.name}</h5>
        `;
        categoryNameTile.addEventListener('click', () => {
            changeCategory(categoryIndex);
        });
        categoryNamesList.appendChild(categoryNameTile);
        category.todos.map((todo, todoIndex) => {
        });
    });
}
handleCategoyNamesList();
function handleTodosList() {
    todosListElement.innerHTML = '';
    if (todos.categories.length == 0)
        return;
    todos.categories[currentCategoryIndex].todos.map((todo, todoIndex) => {
        if (!todo.isCompleted) {
            const todoTile = document.createElement("div");
            todoTile.classList.add("w-64", "h-auto", "flex", "items-center", "justify-between", "leading-tight", "bg-blue-100", "p-2", "rounded-md", "shadow-md", "flex-shrink-0", "relative");
            todoTile.innerHTML = `
                        <div class="flex">
                            <span class="pr-2">
                                &#8226
                            </span>
                            <div>
                                <span>${todo.name}</span><br>
                                ${todo.date.length == 0 ? '' : `<span class="text-xs text-gray-500 leading-0">${todo.date}</span><br>`}
                                ${todo.time.length == 0 ? "" : `<span class="text-xs text-gray-500 leading-0">12-06-2025</span>`}
                            </div>
                        </div>
                `;
            const modifyElement = document.createElement('div');
            modifyElement.classList.add("flex", "gap-2");
            const deleteButton = document.createElement("button");
            deleteButton.classList.add("size-fit", "cursor-pointer", "scale-75");
            deleteButton.innerHTML = `
            <span class="material-symbols-outlined ">
                                    delete </span>
            `;
            const editButton = document.createElement("buttonn");
            editButton.classList.add("size-fit", "cursor-pointer", "scale-75");
            editButton.innerHTML = `
                <span class="material-symbols-outlined text-blue-700">
                                    check </span>
            `;
            deleteButton.addEventListener('click', () => {
                todos.categories[currentCategoryIndex].todos.splice(todoIndex, 1);
                handleTodosList();
            });
            editButton.addEventListener('click', () => {
                todos.categories[currentCategoryIndex].todos[todoIndex].isCompleted = true;
                handleTodosList();
            });
            modifyElement.appendChild(deleteButton);
            modifyElement.appendChild(editButton);
            todoTile.appendChild(modifyElement);
            todosListElement.appendChild(todoTile);
        }
    });
    todos.categories[currentCategoryIndex].todos.map((todo, todoIndex) => {
        if (todo.isCompleted) {
            const todoTile = document.createElement("div");
            todoTile.classList.add("w-64", "h-auto", "flex", "items-center", "justify-between", "leading-tight", "bg-green-100", "p-2", "rounded-md", "shadow-md", "flex-shrink-0", "relative");
            todoTile.innerHTML = `
                        <div class="flex">
                            <span class="pr-2">
                                &#8226
                            </span>
                            <div>
                                <span>${todo.name}</span><br>
                                ${todo.date.length == 0 ? '' : `<span class="text-xs text-gray-500 leading-0">${todo.date}</span><br>`}
                                ${todo.time.length == 0 ? "" : `<span class="text-xs text-gray-500 leading-0">12-06-2025</span>`}
                            </div>
                        </div>
                `;
            const modifyElement = document.createElement('div');
            modifyElement.classList.add("flex", "gap-2");
            const deleteButton = document.createElement("button");
            deleteButton.classList.add("size-fit", "cursor-pointer", "scale-75");
            deleteButton.innerHTML = `
            <span class="material-symbols-outlined ">
                                    delete </span>
            `;
            const editButton = document.createElement("buttonn");
            editButton.classList.add("size-fit", "cursor-pointer", "scale-75");
            editButton.innerHTML = `
                <span class="material-symbols-outlined text-red-300">
                                    close </span>
            `;
            deleteButton.addEventListener('click', () => {
                todos.categories[currentCategoryIndex].todos.splice(todoIndex, 1);
                handleTodosList();
            });
            editButton.addEventListener('click', () => {
                todos.categories[currentCategoryIndex].todos[todoIndex].isCompleted = false;
                handleTodosList();
            });
            modifyElement.appendChild(deleteButton);
            modifyElement.appendChild(editButton);
            todoTile.appendChild(modifyElement);
            todosListElement.appendChild(todoTile);
        }
    });
    saveToLocalStorage();
}
handleTodosList();
// create todo popup handle
function showCreateTodoPopup() {
    const createTodoPopup = document.getElementById("create-todo-popup");
    createTodoPopup.classList.remove('hidden');
    createTodoPopup.classList.add('grid');
}
function hideCreateTodoPopup() {
    const createTodoPopup = document.getElementById("create-todo-popup");
    createTodoPopup.classList.remove('grid');
    createTodoPopup.classList.add('hidden');
}
(_a = document.getElementById("cancel-creating-todo")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    hideCreateTodoPopup();
});
(_b = document.getElementById("create-new-todo-button")) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
    console.log("clicked");
    showCreateTodoPopup();
});
// create todo
(_c = document.getElementById("submit-creating-todo")) === null || _c === void 0 ? void 0 : _c.addEventListener('click', createNewTodo);
function createNewTodo() {
    const todoNameField = document.getElementById("todo-name-field");
    const todoDateField = document.getElementById("todo-date-field");
    const todoTimeField = document.getElementById("todo-time-field");
    const todoName = todoNameField.value;
    const todoDate = todoDateField.value;
    const todoTime = todoTimeField.value;
    console.log(todoName);
    console.log(todoDate);
    console.log(todoTime);
    const todo = {
        name: todoName,
        date: todoDate,
        time: todoTime,
        isCompleted: false
    };
    todos.categories[currentCategoryIndex].todos.push(todo);
    handleTodosList();
    saveToLocalStorage();
    hideCreateTodoPopup();
}
