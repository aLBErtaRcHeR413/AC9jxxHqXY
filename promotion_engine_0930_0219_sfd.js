// 代码生成时间: 2025-09-30 02:19:21
// Define a PromotionRule interface
class PromotionRule {
    constructor(name) {
        this.name = name;
    }

    // Applies the promotion rule to a product
    apply(products) {
        throw new Error('Method apply() must be implemented.');
    }
}

// Define a specific promotion rule, e.g., 10% off for products over $100
class PercentageDiscountRule extends PromotionRule {
    constructor(name, percentage) {
        super(name);
        this.percentage = percentage;
    }

    apply(products) {
        return products.map(product => {
            if (product.price >= 100) {
                product.discountedPrice = product.price * (1 - this.percentage / 100);
            }
            return product;
        });
    }
}

// Define a Product class
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.discountedPrice = 0;
    }
}

// PromotionEngine class that applies rules to products
class PromotionEngine {
    constructor() {
        this.rules = [];
    }

    // Add a promotion rule to the engine
    addRule(rule) {
        if (!(rule instanceof PromotionRule)) {
            throw new Error('Only instances of PromotionRule are allowed.');
        }
        this.rules.push(rule);
    }

    // Apply all promotion rules to the given products
    applyRules(products) {
        let updatedProducts = products;
        this.rules.forEach(rule => {
            updatedProducts = rule.apply(updatedProducts);
        });
        return updatedProducts;
    }
}

// Example usage
const products = [
    new Product(1, 'Laptop', 1200),
    new Product(2, 'Smartphone', 800),
    new Product(3, 'Tablet', 500)
];

const engine = new PromotionEngine();
engine.addRule(new PercentageDiscountRule('10% off over $100', 10));

try {
    const discountedProducts = engine.applyRules(products);
    console.log('Discounted Products:', discountedProducts);
} catch (error) {
    console.error('An error occurred:', error.message);
}