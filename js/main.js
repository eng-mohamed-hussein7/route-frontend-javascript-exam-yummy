"use strict";
//!============================== Start import module js ==============================!//
import { FormValidator } from "./Contact.module.js";
import { MealFilterManager, MealManager } from "./MealService.module.js";
//!==============================  End import module js  ==============================!//

//!============================== Start initate DOM Elements  ==============================!//
const sections = {
  main: document.querySelector("section.allMeals"),
  details: document.querySelector("section.details"),
  search: document.getElementById("search-for-mael"),
  categories: document.getElementById("categoriesAreaIngredients"),
  contact: document.getElementById("contactUs"),
};

const navLinks = {
  search: document.querySelector(
    ".my-navbar .linkList .links ul li:nth-child(1)"
  ),
  categories: document.querySelector(
    ".my-navbar .linkList .links ul li:nth-child(2)"
  ),
  area: document.querySelector(
    ".my-navbar .linkList .links ul li:nth-child(3)"
  ),
  ingredients: document.querySelector(
    ".my-navbar .linkList .links ul li:nth-child(4)"
  ),
  contact: document.querySelector(
    ".my-navbar .linkList .links ul li:nth-child(5)"
  ),
};

const navbarElements = {
  container: document.querySelector(".my-navbar"),
  icon: document.querySelector(".my-navbar .bar"),
  iconSymbol: document.querySelector(".my-navbar .bar i"),
};

const closeDetailsBtn = document.querySelector(".details button");
//!==============================  End initate DOM Elements  ==============================!//

//!============================== Start initate Instances ==============================!//
const mealManager = new MealManager();
const filterManager = new MealFilterManager();
const validator = new FormValidator();
//!==============================  End initate Instances  ==============================!//

//!============================== Start Helper Functions ==============================!//
function showSection(sectionName) {
  if (navbarElements.container.classList.contains("show-menu")) {
    toggleNavbar();
  }

  Object.values(sections).forEach((section) => section.classList.add("d-none"));

  sections[sectionName].classList.remove("d-none");
}

function toggleNavbar() {
  navbarElements.container.classList.toggle("my-d-none-navbar");
  navbarElements.container.classList.toggle("show-menu");
  navbarElements.iconSymbol.classList.toggle("fa-bars");
  navbarElements.iconSymbol.classList.toggle("fa-x");
}
//!==============================  End Helper Functions  ==============================!//

//!============================== Start Main Logic ==============================!//
mealManager.getMeals();

const contactInputs = document.querySelectorAll("#contactUs input");
contactInputs.forEach((input) => {
  input.addEventListener("keyup", ({ target }) => validator.validate(target));
});
//!==============================  End Main Logic  ==============================!//

//!============================== Start Event Listeners ==============================!//
navbarElements.icon.addEventListener("click", toggleNavbar);

closeDetailsBtn.addEventListener("click", () => {
  showSection("main");
});

navLinks.search.addEventListener("click", () => {
  showSection("search");
});

const searchByNameInput = document.getElementById("SearchByName");
searchByNameInput.addEventListener("input", async (e) => {
  await mealManager.getMeals(e.target.value);
  sections.main.classList.remove("d-none");
});

const searchByLetterInput = document.getElementById("SearchByFirstLetter");
searchByLetterInput.addEventListener("input", async ({ target }) => {
  if (target.value) {
    await mealManager.getMealsByLetter(target.value);
    sections.main.classList.remove("d-none");
  }
});

navLinks.categories.addEventListener("click", async () => {
  showSection("categories");
  await filterManager.getAllCategories();
});

navLinks.area.addEventListener("click", async () => {
  showSection("categories");
  await filterManager.getAllAreas();
});

navLinks.ingredients.addEventListener("click", async () => {
  showSection("categories");
  await filterManager.getAllIngredients();
});

navLinks.contact.addEventListener("click", () => {
  showSection("contact");
});
//!==============================  End Event Listeners  ==============================!//
