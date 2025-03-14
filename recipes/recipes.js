document.addEventListener('DOMContentLoaded', () => {
    const addRecipeBtn = document.getElementById('addRecipeBtn');
    const modal = document.getElementById('recipeModal');
    const closeBtn = modal.querySelector('.close-btn');
    const recipeForm = document.getElementById('recipeForm');
    const addIngredientBtn = document.getElementById('addIngredientBtn');
    const ingredientsList = document.getElementById('ingredientsList');
    const cancelBtn = modal.querySelector('.secondary-btn');

    // Sample data structure for recipes
    let recipes = [];

    function createIngredientRow() {
        const row = document.createElement('div');
        row.className = 'ingredient-row';
        row.innerHTML = `
            <input type="text" placeholder="Ingredient" required>
            <input type="number" placeholder="Amount" required>
            <select required>
                <option value="g">g</option>
                <option value="kg">kg</option>
                <option value="ml">ml</option>
                <option value="L">L</option>
            </select>
            <button type="button" class="remove-ingredient">×</button>
        `;
        return row;
    }

    function addIngredient() {
        const row = createIngredientRow();
        ingredientsList.appendChild(row);
        
        row.querySelector('.remove-ingredient').addEventListener('click', () => {
            row.remove();
        });
    }

    function renderRecipes() {
        const recipeGrid = document.querySelector('.recipe-grid');
        recipeGrid.innerHTML = '';

        recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'recipe-card';
            card.innerHTML = `
                <div class="recipe-header">
                    <h3 class="recipe-title">${recipe.name}</h3>
                    <span class="hydration-badge">${recipe.hydration}% Hydration</span>
                </div>
                <ul class="ingredients-list">
                    ${recipe.ingredients.map(ing => 
                        `<li>${ing.amount}${ing.unit} ${ing.name}</li>`
                    ).join('')}
                </ul>
                <div class="method">${recipe.method}</div>
            `;
            recipeGrid.appendChild(card);
        });
    }

    // Event Listeners
    addRecipeBtn.addEventListener('click', () => {
        modal.classList.add('active');
        recipeForm.reset();
        ingredientsList.innerHTML = '';
        addIngredient(); // Add one ingredient row by default
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    cancelBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    addIngredientBtn.addEventListener('click', addIngredient);

    recipeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const recipe = {
            name: document.getElementById('recipeName').value,
            hydration: document.getElementById('hydration').value,
            ingredients: [],
            method: document.getElementById('method').value
        };

        // Collect ingredients
        const rows = ingredientsList.querySelectorAll('.ingredient-row');
        rows.forEach(row => {
            const inputs = row.querySelectorAll('input, select');
            recipe.ingredients.push({
                name: inputs[0].value,
                amount: inputs[1].value,
                unit: inputs[2].value
            });
        });

        recipes.push(recipe);
        renderRecipes();
        modal.classList.remove('active');
    });

    // Initialize with sample recipe
    recipes.push({
        name: "Basic Sourdough Bread",
        hydration: 75,
        ingredients: [
            { name: "Bread Flour", amount: 1000, unit: "g" },
            { name: "Water", amount: 750, unit: "ml" },
            { name: "Salt", amount: 20, unit: "g" },
            { name: "Starter", amount: 200, unit: "g" }
        ],
        method: "1. Mix ingredients\n2. Bulk ferment 4-6 hours\n3. Shape\n4. Cold proof 12-16 hours\n5. Bake at 250°C"
    });
    renderRecipes();
});
