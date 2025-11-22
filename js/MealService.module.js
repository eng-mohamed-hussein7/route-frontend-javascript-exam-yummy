"use strict";

//!============================== Start import module js ==============================!//
import { MealUI } from "./UI-Model.module.js";
//!==============================  End import module js  ==============================!//

//!============================== Start DOM Elements ==============================!//
const searchForMael = document.getElementById("search-for-mael");
//!==============================  End DOM Elements  ==============================!//

//!============================== Start Class to get Meals ==============================!//
export class MealManager {
  //!============================== Start constructor to intiate DOM Elements ==============================!//
  constructor() {
    this.loading = document.querySelector(".loading");
    this.mealContainer = document.getElementById("meal-container");
    this.allMealsSection = document.querySelector("section.allMeals");
    this.detailsSection = document.querySelector("section.details");
    this.categoriesSection = document.getElementById(
      "categoriesAreaIngredients"
    );
  }
  //!==============================  End constructor to intiate DOM Elements  ==============================!//
  //!============================== Start Helper Methods ==============================!//
  //!============================== Start private Method to show or hide loaders spinners ==============================!//
  #toggleLoading(show) {
    show
      ? this.loading.classList.remove("d-none")
      : this.loading.classList.add("d-none");
  }
  //!==============================  End private Method to show or hide loaders spinners ==============================!//

  //!============================== Start Private Method to Reset container and hide other sections ==============================!//
  #resetUI() {
    if (this.mealContainer.hasChildNodes()) {
      MealUI.clearContainer(this.mealContainer);
    }
    this.detailsSection.classList.add("d-none");
    this.allMealsSection.classList.remove("d-none");
    this.categoriesSection?.classList.add("d-none");
  }
  //!==============================  End Private Method to Reset container and hide other sections  ==============================!//

  //!============================== Start Private puch meals in container ==============================!//
  #renderMeals(mealsList) {
    if (mealsList) {
      mealsList.forEach((element) => {
        const mealCard = MealUI.createMealCard(
          element.strMealThumb,
          element.strMeal
        );
        this.mealContainer.append(mealCard);

        mealCard.addEventListener("click", () => {
          this.getMealsDetails(element.idMeal);
        });
      });
    } else {
      window.alert("no meals found");
    }
  }
  //!==============================  End Private puch meals in container  ==============================!//
  //!==============================  End Helper Methods  ==============================!//

  //!============================== Start Main Methods ==============================!//

  //!============================== Start get meal from API By Name ==============================!//
  async getMeals(mealName = "") {
    this.#toggleLoading(true);
    this.#resetUI();

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
      );
      const result = await response.json();

      this.#renderMeals(result.meals);
    } catch (error) {
      console.error(error);
    } finally {
      this.#toggleLoading(false);
    }
  }
  //!==============================  End get meal from API By Name  ==============================!//
  //!============================== Start get meal from API By Letter ==============================!//
  async getMealsByLetter(firstLetter) {
    this.#toggleLoading(true);
    this.#resetUI();

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`
      );
      const result = await response.json();

      this.#renderMeals(result.meals);
    } catch (error) {
      console.error(error);
    } finally {
      this.#toggleLoading(false);
    }
  }
  //!==============================  End get meal from API By Letter  ==============================!//

  //!============================== Start get meal details from API By ID ==============================!//
  async getMealsDetails(idMeal) {
    this.#toggleLoading(true);
    this.allMealsSection.classList.add("d-none");
    searchForMael.classList.add("d-none");
    this.detailsSection.classList.remove("d-none");

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
      );
      const result = await response.json();

      MealUI.displayMealDetails(result.meals[0]);
    } catch (error) {
      console.error(error);
    } finally {
      this.#toggleLoading(false);
    }
  }
  //!==============================  End get meal details from API By ID  ==============================!//
  //!==============================  End Main Methods  ==============================!//
}
//!==============================  End Class to get Meals  ==============================!//

//!============================== Start Class to get Filter Meals ==============================!//
export class MealFilterManager {
  //!============================== Start constructor to intiate DOM Elements ==============================!//
  constructor() {
    this.loading = document.querySelector(".loading");
    this.mealContainer = document.getElementById("meal-container");
    this.allMealsSection = document.querySelector("section.allMeals");
    this.categoriesSection = document.getElementById(
      "categoriesAreaIngredients"
    );
    this.filterContainer = document.querySelector(
      "#categoriesAreaIngredients .container .row"
    );
    this.detailsSection = document.querySelector("section.details");
  }
  //!==============================  End constructor to intiate DOM Elements  ==============================!//
  //!============================== Start Helper Methods ==============================!//
  //!============================== Start private Method to show or hide loaders spinners ==============================!//
  #toggleLoading(show) {
    show
      ? this.loading.classList.remove("d-none")
      : this.loading.classList.add("d-none");
  }
  //!==============================  End private Method to show or hide loaders spinners  ==============================!//

  //!============================== Start private Method to clear container ==============================!//
  #prepareUI() {
    this.#toggleLoading(true);
    if (this.mealContainer.hasChildNodes()) {
      MealUI.clearContainer(this.mealContainer);
    }
    this.allMealsSection.classList.add("d-none");
    this.categoriesSection.classList.remove("d-none");
    MealUI.clearContainer(this.filterContainer);
  }
  //!==============================  End private Method to clear container  ==============================!//
  //!==============================  End Helper Methods  ==============================!//

  //!============================== Start Main Methods ==============================!//

  //!============================== Start Method to get all Categories ==============================!//
  async getAllCategories() {
    this.#prepareUI();
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/categories.php`
      );
      const result = await response.json();

      result.categories.forEach((element) => {
        const card = MealUI.createMealCategory(
          element.strCategoryThumb,
          element.strCategory,
          element.strCategoryDescription
        );
        this.filterContainer.append(card);

        card.addEventListener("click", () =>
          this.getMealsByFilter("c", element.strCategory)
        );
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.#toggleLoading(false);
    }
  }
  //!==============================  End Method to get all Categories  ==============================!//

  //!============================== Start Method to get all Areas ==============================!//
  async getAllAreas() {
    this.#prepareUI();
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
      );
      const result = await response.json();

      result.meals.forEach((element) => {
        const card = MealUI.createMealArea(element.strArea);
        this.filterContainer.append(card);

        card.addEventListener("click", () =>
          this.getMealsByFilter("a", element.strArea)
        );
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.#toggleLoading(false);
    }
  }
  //!==============================  End Method to get all Areas  ==============================!//

  //!============================== Start Method to get all Ingredients ==============================!//
  async getAllIngredients() {
    this.#prepareUI();
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
      );
      const result = await response.json();

      result.meals.slice(0, 20).forEach((element) => {
        const card = MealUI.createMealIngredients(
          element.strIngredient,
          element.strDescription
        );
        this.filterContainer.append(card);

        card.addEventListener("click", () =>
          this.getMealsByFilter("i", element.strIngredient)
        );
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.#toggleLoading(false);
    }
  }
  //!==============================  End Method to get all Ingredients  ==============================!//

  //!============================== Start Method to get meals by filter ==============================!//
  async getMealsByFilter(type, query) {
    this.#toggleLoading(true);
    this.categoriesSection.classList.add("d-none");
    this.allMealsSection.classList.remove("d-none");
    MealUI.clearContainer(this.mealContainer);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?${type}=${query}`
      );
      const result = await response.json();
      const mealManager = new MealManager();
      if (result.meals) {
        result.meals.forEach((element) => {
          const meal = MealUI.createMealCard(
            element.strMealThumb,
            element.strMeal
          );
          this.mealContainer.append(meal);
          meal.addEventListener("click", () => {
            mealManager.getMealsDetails(element.idMeal);
          });
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.#toggleLoading(false);
    }
  }
  //!==============================  End Method to get meals by filter  ==============================!//

  //!============================== Start Main Methods ==============================!//
}
//!==============================  End Class to get Filter Meals  ==============================!//
