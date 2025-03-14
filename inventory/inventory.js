document.addEventListener('DOMContentLoaded', () => {
    const addItemBtn = document.getElementById('addItemBtn');
    const modal = document.getElementById('inventoryModal');
    const closeBtn = modal.querySelector('.close-btn');
    const inventoryForm = document.getElementById('inventoryForm');
    const cancelBtn = modal.querySelector('.secondary-btn');
    const searchInput = document.getElementById('searchInput');
    const viewToggleBtns = document.querySelectorAll('.view-toggle button');

    // Sample data structure for inventory
    let inventory = [];

    function renderInventory(items = inventory) {
        const grid = document.querySelector('.inventory-grid');
        const tableBody = document.querySelector('.inventory-table tbody');
        
        // Render grid view
        grid.innerHTML = '';
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'inventory-card';
            card.innerHTML = `
                <div class="inventory-card-header">
                    <h3 class="inventory-title">${item.name}</h3>
                    <span class="category-badge">${item.category}</span>
                </div>
                <div class="inventory-details">
                    <div class="detail-item">
                        <span class="detail-label">Current Stock</span>
                        <span class="detail-value">${item.quantity}${item.unit}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Min Stock</span>
                        <span class="detail-value">${item.minStock}${item.unit}</span>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });

        // Render table view
        tableBody.innerHTML = '';
        items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td><span class="category-badge">${item.category}</span></td>
                <td>${item.quantity}</td>
                <td>${item.unit}</td>
                <td>${item.minStock}</td>
                <td>
                    <div class="table-actions">
                        <button onclick="editItem(${item.id})">
                            <span class="material-icons">edit</span>
                        </button>
                        <button onclick="deleteItem(${item.id})">
                            <span class="material-icons">delete</span>
                        </button>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // View toggle functionality
    viewToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update button states
            viewToggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update view
            const view = btn.dataset.view;
            document.querySelector('.inventory-grid').classList.remove('active-view');
            document.querySelector('.inventory-table').classList.remove('active-view');
            
            if (view === 'grid') {
                document.querySelector('.inventory-grid').classList.add('active-view');
            } else {
                document.querySelector('.inventory-table').classList.add('active-view');
            }
        });
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredItems = inventory.filter(item => 
            item.name.toLowerCase().includes(searchTerm) ||
            item.category.toLowerCase().includes(searchTerm)
        );
        renderInventory(filteredItems);
    });

    // Modal functionality
    addItemBtn.addEventListener('click', () => {
        modal.classList.add('active');
        inventoryForm.reset();
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    cancelBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    inventoryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const item = {
            id: inventory.length + 1,
            name: document.getElementById('itemName').value,
            category: document.getElementById('category').value,
            quantity: parseFloat(document.getElementById('quantity').value),
            unit: document.getElementById('unit').value,
            minStock: parseFloat(document.getElementById('minStock').value)
        };

        inventory.push(item);
        renderInventory();
        modal.classList.remove('active');

        // Check if stock is below minimum
        if (item.quantity < item.minStock) {
            alert(`Warning: ${item.name} is below minimum stock level!`);
        }
    });

    // Initialize with sample data
    inventory.push(
        {
            id: 1,
            name: "Bread Flour",
            category: "flour",
            quantity: 25,
            unit: "kg",
            minStock: 10
        },
        {
            id: 2,
            name: "Sea Salt",
            category: "salt",
            quantity: 5,
            unit: "kg",
            minStock: 2
        },
        {
            id: 3,
            name: "Whole Wheat Flour",
            category: "flour",
            quantity: 15,
            unit: "kg",
            minStock: 5
        }
    );
    renderInventory();

    // Global functions for table actions
    window.editItem = (id) => {
        const item = inventory.find(i => i.id === id);
        if (item) {
            // Implement edit functionality
            console.log('Edit item:', item);
        }
    };

    window.deleteItem = (id) => {
        if (confirm('Are you sure you want to delete this item?')) {
            inventory = inventory.filter(i => i.id !== id);
            renderInventory();
        }
    };
});
