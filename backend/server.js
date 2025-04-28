const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000; // Important for Render!!

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample clothing product data
const products = [
    {
        id: 1,
        name: 'Men\'s Black T-shirt',
        category: 'men',
        image: 'https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2024/SEPTEMBER/7/iE2ey9bX_5ad7ed1b902a49398e3823eae0c579e3.jpg',
        price: '₹499',
        description: 'Comfortable and stylish black T-shirt, perfect for casual wear.',
        stock: 50,
        fabric: 'Cotton',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White', 'Gray']
    },
    {
        id: 2,
        name: 'Women\'s Floral Dress',
        category: 'women',
        image: 'https://claura.in/cdn/shop/files/017A8404_1_1.jpg?v=1732947444',
        price: '₹999',
        description: 'Elegant floral dress, perfect for summer events.',
        stock: 30,
        fabric: 'Silk',
        sizes: ['M', 'L', 'XL'],
        colors: ['Red', 'Blue', 'Pink']
    },
    {
        id: 3,
        name: 'Women\'s Leather Jacket',
        category: 'women',
        image: 'https://classyleatherbags.com/cdn/shop/collections/Leather-Jaxcket-Women_9ed03401-9be1-43e0-8dcd-eaaf09912f2a_1350x1350.jpg?v=1683775316',
        price: '₹2499',
        description: 'Stylish leather jacket for a chic, edgy look.',
        stock: 40,
        fabric: 'Leather',
        sizes: ['S', 'M', 'L'],
        colors: ['Black', 'Brown']
    },
    {
        id: 4,
        name: 'Men\'s Blue Jeans',
        category: 'men',
        image: 'http://www.rockstarjeans.com/cdn/shop/products/RDQ0003_1.jpg?v=1673620233',
        price: '₹1299',
        description: 'Classic blue jeans, a must-have in every wardrobe.',
        stock: 25,
        fabric: 'Denim',
        sizes: ['30', '32', '34', '36'],
        colors: ['Blue']
    },
    {
        id: 5,
        name: 'Women\'s Red Heels',
        category: 'women',
        image: 'https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/17127134/2022/5/13/044328f0-af05-4b08-ac88-c6c5f45530311652443041241MonrowRedBlockHeels11.jpg',
        price: '₹1799',
        description: 'Elegant red heels perfect for parties or evening events.',
        stock: 60,
        fabric: 'Synthetic',
        sizes: ['6', '7', '8', '9'],
        colors: ['Red', 'Black']
    }
];

// Default Route
app.get('/', (req, res) => {
    res.send('Backend server is running successfully!');
});

// Routes
app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

app.post('/api/orders', (req, res) => {
    const order = req.body;
    console.log('New order received:', order);
    res.json({
        message: 'Order received successfully',
        orderId: Date.now(),
        orderDetails: order
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
