"use strict";

//!============================== Start UI Class to create and clear cards ==============================!//
export class MealUI {
  //!============================== Start function to clear all cards in container ==============================!//
  static clearContainer = function (containerName) {
    while (containerName.firstElementChild) {
      containerName.removeChild(containerName.firstElementChild);
    }
  };
  //!==============================  End function to clear all cards in container ==============================!//

  //!============================== Start function to create meal in card ==============================!//
  static createMealCard = (imageURL, mealTitle) => {
    const columnElement = document.createElement("div");
    columnElement.classList = "col";

    const itemElement = document.createElement("div");
    itemElement.classList = "item rounded-2";
    columnElement.append(itemElement);

    const imageElement = document.createElement("img");
    imageElement.src = imageURL;
    imageElement.alt = "meal image";
    imageElement.classList = "w-100";
    itemElement.append(imageElement);

    const mealTiltleElement = document.createElement("div");
    mealTiltleElement.classList = "meal-title p-2";
    itemElement.append(mealTiltleElement);

    const titleElement = document.createElement("h2");
    titleElement.classList = "h3 rounded-2";
    titleElement.textContent = mealTitle;
    mealTiltleElement.append(titleElement);
    return columnElement;
  };
  //!==============================  End function to create meal in card  ==============================!//

  //!============================== Start function to Display details meal ==============================!//
  static displayMealDetails = (meal) => {
    const image = document.querySelector(".details img");
    const mealTitle = document.querySelector(".details h2.meal-title");
    const instructionsDescription = document.querySelector(
      ".details .instructions p"
    );
    const area = document.querySelector(
      ".details .area-and-category h3:nth-child(1)"
    );
    const category = document.querySelector(
      ".details .area-and-category h3:nth-child(2)"
    );
    const recipesList = document.querySelector(".details .recipes ul");
    const tagsList = document.querySelector(".details .tags ul");
    const sourceBtn = document.querySelector(".details .btn.btn-success");
    const youtubeBtn = document.querySelector(".details .btn.btn-danger");

    image.src = meal.strMealThumb;
    mealTitle.textContent = meal.strMeal;
    instructionsDescription.textContent = meal.strInstructions;

    const areaSpan = document.createElement("span");
    areaSpan.classList.add("fw-bolder");
    areaSpan.textContent = "Area : ";
    area.replaceChildren(areaSpan, meal.strArea);

    const categorySpan = document.createElement("span");
    categorySpan.classList.add("fw-bolder");
    categorySpan.textContent = "Category : ";
    category.replaceChildren(categorySpan, meal.strCategory);

    sourceBtn.href = meal.strSource;
    youtubeBtn.href = meal.strYoutube;
    MealUI.clearContainer(recipesList);
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        const recipesListItem = document.createElement("li");
        recipesListItem.classList = "alert alert-info m-2 p-1";
        recipesListItem.textContent = `${meal[`strMeasure${i}`]} ${
          meal[`strIngredient${i}`]
        }`;
        recipesList.append(recipesListItem);
      }
    }

    MealUI.clearContainer(tagsList);
    const tagHeader = document.querySelector(".tags");
    if (meal.strTags) {
      let tagsArr = meal.strTags.split(",");
      tagHeader.classList.remove("d-none");
      for (let i = 0; i < tagsArr.length; i++) {
        const tagListItem = document.createElement("li");
        tagListItem.classList = "alert alert-danger m-2 p-1";
        tagListItem.textContent = tagsArr[i];
        tagsList.append(tagListItem);
      }
    } else {
      tagHeader.classList.add("d-none");
    }
  };
  //!==============================  End function to Display details meal  ==============================!//

  //!============================== Start function to create Category in card ==============================!//
  static createMealCategory = (imageURL, title, categoryDescription) => {
    const column = document.createElement("div");
    column.classList = "col-md-3";

    const meal = document.createElement("div");
    meal.classList = "meal rounded-2";
    column.append(meal);

    const image = document.createElement("img");
    image.classList = "w-100";
    image.src = imageURL;
    image.alt = `${title} image`;
    meal.append(image);

    const mealLayer = document.createElement("div");
    mealLayer.classList = "meal-layer text-center text-black p-2";
    meal.append(mealLayer);

    const mealTitle = document.createElement("h3");
    mealTitle.classList = "mx-auto";
    mealTitle.textContent = title;
    mealLayer.append(mealTitle);
    const description = document.createElement("p");
    description.textContent = categoryDescription
      .split(" ")
      .slice(0, 20)
      .join(" ");

    mealLayer.append(description);

    return column;
  };
  //!==============================  End function to create Category in card  ==============================!//

  //!============================== Start function to create Ingredient in card  ==============================!//
  static createMealIngredients = (title, description) => {
    const column = document.createElement("div");
    column.classList = "col-md-3";

    const ingredients = document.createElement("div");
    ingredients.classList = "rounded-2 text-center cursor-pointer";
    column.append(ingredients);

    const icon = document.createElement("i");
    icon.classList = "fa-solid fa-drumstick-bite fa-4x";
    ingredients.append(icon);

    const ingredientsTitle = document.createElement("h3");
    ingredientsTitle.textContent = title;
    ingredients.append(ingredientsTitle);
    const ingredientsDescription = document.createElement("p");
    ingredientsDescription.textContent = description
      .split(" ")
      .slice(0, 20)
      .join(" ");

    ingredients.append(ingredientsDescription);

    return column;
  };
  //!==============================  End function to create Ingredient in card   ==============================!//

  //!============================== Start function to create Area in card ==============================!//
  static createMealArea = (area) => {
    const column = document.createElement("div");
    column.classList = "col-md-3";

    const mealArea = document.createElement("div");
    mealArea.classList = "meal-area cursor-pointer rounded-2 text-center";
    column.append(mealArea);

    const icon = document.createElement("i");
    icon.classList = "fa-solid fa-house-laptop fa-4x";
    mealArea.append(icon);

    const areaName = document.createElement("h3");
    areaName.textContent = area;
    mealArea.append(areaName);

    return column;
  };
  //!==============================  End function to create Area in card  ==============================!/
}
//!==============================  End UI Class to create and clear cards  ==============================!//
