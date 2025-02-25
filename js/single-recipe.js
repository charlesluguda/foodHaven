document.addEventListener("DOMContentLoaded", async () => {
    const recipePage = document.querySelector(".recipe-page");
  
    // Function to get the recipe ID from the URL
    function getRecipeIdFromUrl() {
      const params = new URLSearchParams(window.location.search);
      return params.get("id"); // Get the 'id' parameter from URL
    }
  
    // Fetch recipe details from API
    async function fetchRecipeDetails(recipeId) {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
        const data = await response.json();
        displayRecipe(data.meals[0]);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        recipePage.innerHTML = "<p>Failed to load recipe details.</p>";
      }
    }
  
    // Display Recipe Details
    function displayRecipe(recipe) {
      if (!recipe) {
        recipePage.innerHTML = "<p>Recipe not found.</p>";
        return;
      }
  
      document.querySelector(".recipe-hero-img").src = recipe.strMealThumb;
      document.querySelector(".recipe-info h2").textContent = recipe.strMeal;
      document.querySelector(".recipe-info p").textContent = recipe.strInstructions;
  
      // Update recipe meta (prep time, cook time, servings)
      document.querySelector(".recipe-icons").innerHTML = `
        <article>
          <i class="fas fa-clock"></i>
          <h5>prep time</h5>
          <p>~ 30 min.</p>
        </article>
        <article>
          <i class="far fa-clock"></i>
          <h5>cook time</h5>
          <p>~ 15 min.</p>
        </article>
        <article>
          <i class="fas fa-user-friends"></i>
          <h5>serving</h5>
          <p>~ 4 servings</p>
        </article>
      `;
  
      // Update Tags
      document.querySelector(".recipe-tags").innerHTML = `
        Tags: <a href="#">${recipe.strCategory}</a> <a href="#">${recipe.strArea}</a>
      `;
  
      // Update Instructions
      const instructionsHtml = recipe.strInstructions.split(". ").map((step, index) => {
        return `
          <div class="single-instruction">
            <header>
              <p>Step ${index + 1}</p>
              <div></div>
            </header>
            <p>${step}.</p>
          </div>
        `;
      }).join("");
  
      document.querySelector(".recipe-content article:first-child").innerHTML = `<h4>Instructions</h4>${instructionsHtml}`;
  
      // Update Ingredients
      const ingredientsHtml = [];
      for (let i = 1; i <= 20; i++) {
        if (recipe[`strIngredient${i}`]) {
          ingredientsHtml.push(`<p class="single-ingredient">${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}</p>`);
        }
      }
      document.querySelector(".second-column div:first-child").innerHTML = `<h4>Ingredients</h4>${ingredientsHtml.join("")}`;
    }
  
    // Get Recipe ID and Fetch Details
    const recipeId = getRecipeIdFromUrl();
    if (recipeId) {
      fetchRecipeDetails(recipeId);
    } else {
      recipePage.innerHTML = "<p>Invalid Recipe ID.</p>";
    }
  
    // Update footer date
    document.getElementById("date").textContent = new Date().getFullYear();
  });
  