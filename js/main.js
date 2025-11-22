"use strict";
//!============================== Start import module js ==============================!//
import { FormValidator } from "./Contact.module.js";
import { MealFilterManager, MealManager } from "./MealService.module.js";
//!==============================  End import module js  ==============================!//

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

const mealManager = new MealManager();
const filterManager = new MealFilterManager();
const validator = new FormValidator();

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

mealManager.getMeals();

const contactInputs = document.querySelectorAll("#contactUs input");
contactInputs.forEach((input) => {
  input.addEventListener("keyup", ({ target }) => validator.validate(target));
});

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

// // ======================================== Start import modules ============================================= //
// import { FormValidator } from "./contact.module.js";
// import { MealFilterManager, MealManager } from "./MealService.module.js";
// // ========================================  End import modules ============================================= //

// const allMealsSection = document.querySelector("section.allMeals");

// const getcategoriesSection = document.getElementById(
//   "categoriesAreaIngredients"
// );
// const closeDetailsSection = document.querySelector(".details button");
// const detailsSection = document.querySelector("section.details");

// closeDetailsSection.addEventListener("click", () => {
//   detailsSection.classList.add("d-none");
//   allMealsSection.classList.remove("d-none");
// });

// const mealManager = new MealManager();
// mealManager.getMeals();
// // navbar
// const navbarIcon = document.querySelector(".my-navbar .bar");
// const iconElement = document.querySelector(".my-navbar .bar i");
// const navLinksContainer = document.querySelector(".my-navbar");

// navbarIcon.addEventListener("click", () => {
//   openCloseNavbar();
// });
// function openCloseNavbar() {
//   navLinksContainer.classList.toggle("my-d-none-navbar");
//   navLinksContainer.classList.toggle("show-menu");
//   iconElement.classList.toggle("fa-bars");
//   iconElement.classList.toggle("fa-x");
// }

// const searchForMael = document.getElementById("search-for-mael");

// const search = document.querySelector(
//   ".my-navbar .linkList .links ul li:nth-child(1)"
// );
// search.addEventListener("click", () => {
//   openCloseNavbar();
//   allMealsSection.classList.add("d-none");
//   getcategoriesSection.classList.add("d-none");
//   contactUs.classList.add("d-none");
//   detailsSection.classList.add("d-none");

//   searchForMael.classList.remove("d-none");
// });

// const SearchByName = document.getElementById("SearchByName");
// SearchByName.addEventListener("blur", async (e) => {
//   await mealManager.getMeals(e.target.value);
// });
// const SearchByFirstLetter = document.getElementById("SearchByFirstLetter");
// SearchByFirstLetter.addEventListener("input", async ({ target }) => {
//   await mealManager.getMealsByLetter(target.value);
// });

// const filterManager = new MealFilterManager();

// const categories = document.querySelector(
//   ".my-navbar .linkList .links ul li:nth-child(2)"
// );

// categories.addEventListener("click", async () => {
//   openCloseNavbar();

//   allMealsSection.classList.add("d-none");
//   searchForMael.classList.add("d-none");
//   detailsSection.classList.add("d-none");
//   contactUs.classList.add("d-none");
//   getcategoriesSection.classList.remove("d-none");

//   await filterManager.getAllCategories();
// });

// const area = document.querySelector(
//   ".my-navbar .linkList .links ul li:nth-child(3)"
// );

// area.addEventListener("click", async () => {
//   openCloseNavbar();
//   allMealsSection.classList.add("d-none");
//   searchForMael.classList.add("d-none");
//   detailsSection.classList.add("d-none");
//   contactUs.classList.add("d-none");
//   getcategoriesSection.classList.remove("d-none");

//   await filterManager.getAllAreas();
// });

// const ingredients = document.querySelector(
//   ".my-navbar .linkList .links ul li:nth-child(4)"
// );
// ingredients.addEventListener("click", async () => {
//   openCloseNavbar();
//   allMealsSection.classList.add("d-none");
//   detailsSection.classList.add("d-none");
//   contactUs.classList.add("d-none");

//   getcategoriesSection.classList.remove("d-none");

//   await filterManager.getAllIngredients();
// });
// const contact = document.querySelector(
//   ".my-navbar .linkList .links ul li:nth-child(5)"
// );

// const contactUs = document.getElementById("contactUs");

// contact.addEventListener("click", () => {
//   openCloseNavbar();
//   allMealsSection.classList.add("d-none");
//   searchForMael.classList.add("d-none");
//   detailsSection.classList.add("d-none");
//   getcategoriesSection.classList.add("d-none");

//   contactUs.classList.remove("d-none");

//   const validator = new FormValidator();

//   const inputs = document.querySelectorAll("#contactUs input");

//   inputs.forEach((input) => {
//     input.addEventListener("keyup", ({ target }) => {
//       validator.validate(target);
//     });
//   });
// });
