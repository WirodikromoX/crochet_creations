// MATERIALS 
const materials = [
    { id: 1, name: "Pink Yarn",      type: "Yarn",      quantity: 80,  unit: "g",   minStock: 100 },
    { id: 2, name: "White Yarn",     type: "Yarn",      quantity: 500, unit: "g",   minStock: 100 },
    { id: 3, name: "Brown Yarn",     type: "Yarn",      quantity: 200, unit: "g",   minStock: 100 },
    { id: 4, name: "Black Yarn",     type: "Yarn",      quantity: 250, unit: "g",   minStock: 100 },
    { id: 5, name: "Yellow Yarn",    type: "Yarn",      quantity: 150, unit: "g",   minStock: 100 },
    { id: 6, name: "Green Yarn",     type: "Yarn",      quantity: 120, unit: "g",   minStock: 100 },
    { id: 7, name: "Safety Eyes",    type: "Accessory", quantity: 6,   unit: "pcs", minStock: 10 },
    { id: 8, name: "Stuffing",       type: "Filling",   quantity: 600, unit: "g",   minStock: 200 },
    { id: 9, name: "Crochet Hooks",  type: "Tool",       quantity: 10,  unit: "pcs", minStock: 3 },
    { id: 10, name: "Stitch Markers", type: "Tool",      quantity: 20,  unit: "pcs", minStock: 10 }
];

// PRODUCTS 
const products = [
    // ---- Keychain: Fruits ----
    { id: 1,  name: "Watermelon Keychain", category: "Keychain", subcategory: "Fruits",  price: 75, stock: 10, sold: 12, recipe: [] },
    { id: 2,  name: "Cherries Keychain",   category: "Keychain", subcategory: "Fruits",  price: 75, stock: 10, sold: 7,  recipe: [] },
    { id: 3,  name: "Strawberry Keychain", category: "Keychain", subcategory: "Fruits",  price: 75, stock: 10, sold: 9,  recipe: [] },

    // ---- Keychain: Animals ----
    { id: 4,  name: "Whale Keychain",   category: "Keychain", subcategory: "Animals", price: 75, stock: 10, sold: 5,  recipe: [] },
    { id: 5,  name: "Turtle Keychain",  category: "Keychain", subcategory: "Animals", price: 75, stock: 10, sold: 6,  recipe: [] },
    { id: 6,  name: "Bunny Keychain",   category: "Keychain", subcategory: "Animals", price: 75, stock: 10, sold: 8,  recipe: [] },
    { id: 7,  name: "Octopus Keychain", category: "Keychain", subcategory: "Animals", price: 75, stock: 10, sold: 4,  recipe: [] },
    { id: 8,  name: "Bear Keychain",    category: "Keychain", subcategory: "Animals", price: 75, stock: 10, sold: 10, recipe: [] },
    { id: 9,  name: "Duck Keychain",    category: "Keychain", subcategory: "Animals", price: 75, stock: 10, sold: 3,  recipe: [] },

    // ---- Keychain: Flowers ----
    { id: 10, name: "Tulip Keychain",    category: "Keychain", subcategory: "Flowers", price: 75, stock: 10, sold: 6,  recipe: [] },
    { id: 11, name: "Rose Keychain",     category: "Keychain", subcategory: "Flowers", price: 75, stock: 5,  sold: 15, recipe: [] },
    { id: 12, name: "Lily Keychain",     category: "Keychain", subcategory: "Flowers", price: 75, stock: 10, sold: 5,  recipe: [] },
    { id: 13, name: "Lavender Keychain", category: "Keychain", subcategory: "Flowers", price: 75, stock: 10, sold: 4,  recipe: [] },

    // ---- Keychain: Hearts ----
    { id: 14, name: "Heart Keychain 1", category: "Keychain", subcategory: "Hearts", price: 75, stock: 10, sold: 6, recipe: [] },
    { id: 15, name: "Heart Keychain 2", category: "Keychain", subcategory: "Hearts", price: 75, stock: 10, sold: 5, recipe: [] },
    { id: 16, name: "Heart Keychain 3", category: "Keychain", subcategory: "Hearts", price: 75, stock: 10, sold: 3, recipe: [] },
    { id: 17, name: "Heart Keychain 4", category: "Keychain", subcategory: "Hearts", price: 75, stock: 10, sold: 2, recipe: [] },

    // ---- Pillow (no subcategory) ----
    { id: 18, name: "Heart Pillow",  category: "Pillow", subcategory: null, price: 150, stock: 6, sold: 4, recipe: [] },
    { id: 19, name: "Square Pillow", category: "Pillow", subcategory: null, price: 130, stock: 6, sold: 3, recipe: [] }
];

// ORDERS 
const orders = [
    {
        id: 1,
        customer: "Sarah Johnson",
        items: [
            { product: "Bear Keychain", quantity: 1 },
            { product: "Rose Keychain", quantity: 2 }
        ],
        orderDate: "2026-07-10",
        deadline: "2026-07-18",
        status: "New"
    },
    {
        id: 2,
        customer: "Michael Brown",
        items: [
            { product: "Heart Pillow", quantity: 1 }
        ],
        orderDate: "2026-07-09",
        deadline: "2026-07-30",
        status: "Open"
    },
    {
        id: 3,
        customer: "Emma Davis",
        items: [
            { product: "Bunny Keychain", quantity: 2 }
        ],
        orderDate: "2026-07-08",
        deadline: "2026-07-14",
        status: "Completed"
    },
    {
        id: 4,
        customer: "Liam Wilson",
        items: [
            { product: "Watermelon Keychain", quantity: 2 },
            { product: "Strawberry Keychain", quantity: 1 }
        ],
        orderDate: "2026-07-14",
        deadline: "2026-07-17",
        status: "New"
    },
    {
        id: 5,
        customer: "Olivia Martinez",
        items: [
            { product: "Heart Keychain 1", quantity: 5 }
        ],
        orderDate: "2026-07-12",
        deadline: "2026-07-22",
        status: "Open"
    }
];

// LOAD SAVED DATA (localStorage) 
const DATA_VERSION = "2026-07-23-products-v2";
const savedVersion = localStorage.getItem("dataVersion");

if (savedVersion !== DATA_VERSION) {
    // Stale or first-time data — start fresh from the sample data
    // above and stamp the new version.
    localStorage.setItem("dataVersion", DATA_VERSION);
    localStorage.removeItem("orders");
    localStorage.removeItem("products");
    localStorage.removeItem("materials");
} else {
    const savedOrders = localStorage.getItem("orders");
    const savedProducts = localStorage.getItem("products");
    const savedMaterials = localStorage.getItem("materials");

    if (savedOrders) {
        orders.length = 0;
        orders.push(...JSON.parse(savedOrders));
    }

    if (savedProducts) {
        products.length = 0;
        products.push(...JSON.parse(savedProducts));
    }

    if (savedMaterials) {
        materials.length = 0;
        materials.push(...JSON.parse(savedMaterials));
    }
}
