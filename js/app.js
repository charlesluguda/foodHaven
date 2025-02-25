const getElement = (selector) => {
  const element = document.querySelector(selector)

  if (element) return element
  throw Error(
    `Please double check your class names, there is no ${selector} class`
  )
}

const links = getElement('.nav-links')
const navBtnDOM = getElement('.nav-btn')

navBtnDOM.addEventListener('click', () => {
  links.classList.toggle('show-links')
})

document.addEventListener("DOMContentLoaded", () => {
  const recipesList = document.querySelector(".recipes-list");

  // Fetch recipes from an API (Replace with your actual API URL)
  async function fetchRecipes() {
    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
      const data = await response.json();
      displayRecipes(data.meals);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      recipesList.innerHTML = "<p>Failed to load recipes. Please try again later.</p>";
    }
  }

  // Display recipes dynamically
  function displayRecipes(recipes) {
    if (!recipes) {
      recipesList.innerHTML = "<p>No recipes found.</p>";
      return;
    }

    recipesList.innerHTML = recipes
      .slice(0, 6) // Show only 4 recipes (adjust as needed)
      .map((recipe) => {
        return `
          <a href="single-recipe.html?id=${recipe.idMeal}" class="recipe">
            <img src="${recipe.strMealThumb}" class="img recipe-img" alt="${recipe.strMeal}" />
            <h5>${recipe.strMeal}</h5>
            <p>Category: ${recipe.strCategory || "N/A"}</p>
          </a>
        `;
      })
      .join("");
  }

  // Update the footer date dynamically
  document.getElementById("date").textContent = new Date().getFullYear();

  // Fetch recipes on page load
  fetchRecipes();
});



const date = getElement('#date')
const currentYear = new Date().getFullYear()
date.textContent = currentYear
