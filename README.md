# E-Commerce Backend

![GitHub repo size](https://img.shields.io/github/repo-size/Hammarou/E-Commerce_Backend)
![GitHub contributors](https://img.shields.io/github/contributors/Hammarou/E-Commerce_Backend)
![GitHub stars](https://img.shields.io/github/stars/Hammarou/E-Commerce_Backend?style=social)
![GitHub forks](https://img.shields.io/github/forks/Hammarou/E-Commerce_Backend?style=social)
![GitHub issues](https://img.shields.io/github/issues/Hammarou/E-Commerce_Backend)
![GitHub](https://img.shields.io/github/license/Hammarou/E-Commerce_Backend)
![GitHub last commit](https://img.shields.io/github/last-commit/Hammarou/E-Commerce_Backend)

## Description

-Greetings!

This is a back-end for an e-commerce site built with Node.js, Express, Sequelize, and PostgreSQL. It provides RESTful API endpoints for managing categories, products, and tags with CRUD operations with associations between entities.

![screenshot1](/assets/screenshot.png)

## Table of Contents
- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [Database Setup](#database-setup)
- [Routes](#routes)
- [Technologies](#technologies)
- [Demonstration Video](#demonstration-video)
- [GitHub Deployment Location (HTTPS)](#github-deployment-location-https)
- [GitHub Repository Location (HTTPS)](#github-repository-location-https)
- [Contribution](#contribution)
- [License](#license)



## Features

- **RESTful API Endpoints**: Provides CRUD functionality for managing products, categories, and tags.
- **Database Management with Sequelize**: Utilizes Sequelize ORM for modeling, querying, and managing relationships between tables.
- **Product Management**: Supports creation, reading, updating, and deletion of products, with support for associated categories and tags.
- **Category Management**: Manage product categories, including creating, updating, deleting, and retrieving categories along with their associated products.
- **Tag Management**: Enables tagging of products, with routes to manage tag data and product associations.
- **Many-to-Many Relationships**: Implements complex associations between products and tags using a junction table for flexible data modeling.
- **Environment Configuration**: Supports `.env` files for database and server configuration.
- **Data Validation**: Ensures data integrity and validation through Sequelize model definitions.
- **Modular Routing**: Organized API routes for easy maintenance and scalability.
- **Error Handling**: Consistent error handling with meaningful status codes and messages.


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Hammarou/E-Commerce_Backend
   ```

2. Navigate to the project directory:

   ```bash
   cd E-Commerce_Backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the root directory and add your database credentials:

     ```plaintext
     DB_NAME=ecommerce_db
     DB_USER=<your-database-username>
     DB_PASSWORD=<your-database-password>
     DB_HOST=localhost
     DB_DIALECT=postgres

## Usage

1. Create the database schema:
   - You can run the `psql -U your_username -f db/schema.sql` command to create the `ecommerce_db` database using a PostgreSQL client and the provided schema SQL file.

2. Seed the database (optional):
   - To seed data, use the following command:

     ```bash
     npm run seed
     ```

3. Start the application:

   ```bash
   npm start
   ```

   By default, the server runs on `http://localhost:3001`.


## Database / Models

The database is created using Sequelize models. It consists of the following tables:

- `Category`
- `Product`
- `Tag`
- `ProductTag` (join table for `Product` and `Tag`)

## Routes / Endpoints

### Category Routes

- `GET /api/categories` - Get all categories, including associated products.
- `GET /api/categories/:id` - Get a single category by its `id`.
- `POST /api/categories` - Create a new category.
- `PUT /api/categories/:id` - Update a category by its `id`.
- `DELETE /api/categories/:id` - Delete a category by its `id`.

### Product Routes

- `GET /api/products` - Get all products, including associated categories and tags.
- `GET /api/products/:id` - Get a single product by its `id`.
- `POST /api/products` - Create a new product.
- `PUT /api/products/:id` - Update a product by its `id`.
- `DELETE /api/products/:id` - Delete a product by its `id`.

### Tag Routes

- `GET /api/tags` - Get all tags, including associated products.
- `GET /api/tags/:id` - Get a single tag by its `id`.
- `POST /api/tags` - Create a new tag.
- `PUT /api/tags/:id` - Update a tag by its `id`.
- `DELETE /api/tags/:id` - Delete a tag by its `id`.

## Technologies

- **Node.js
- Express.js
- Sequelize (ORM)
- PostgreSQL

## Demonstration Video

A walkthrough video demonstrating the functionality of this e-commerce back-end application is available. This video covers:

- Setting up the project and database
- Using the API routes for categories, products, and tags
- Demonstrating CRUD operations with Insomnia

[Watch the Demonstration Video](https://drive.google.com/file/d/1uCzaQX-iPp1yRDZYfuTvGPjI0d2exZw-/view?usp=drive_link)


## GitHub Deployment Location (HTTPS)

N/A

* Note: The **E-Commerce Backend** is a node.js command line interface (CLI) application. Therefore, it cannot be hosted through an internet browser. 


## GitHub Repository Location (HTTPS)

https://github.com/Hammarou/E-Commerce_Backend


## Credits

N/A

## Contribution

Feel free to fork this application, submit issues, or make pull requests if you have suggestions or improvements. Contributions are welcome!

## License

This application is licensed under the [MIT](LICENSE)  License.

