// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
// Initialize the Product model by defining its structure and configuration
Product.init(
  {
    // define columns
    id: {
      // Define the 'id' column as an integer data type
      type: DataTypes.INTEGER,
      // Ensure 'id' is not nullable, making it a required field
      allowNull: false,
      // Set 'id' as the primary key for uniquely identifying each record
      primaryKey: true,
      // Enable automatic increment of the 'id' value with new entries
      autoIncrement: true,
    },
    product_name: {
      // Define the 'product_name' column as a string data type
      type: DataTypes.STRING,
      // Ensure 'product_name' cannot be null, marking it as essential
      allowNull: false,
    },
    price: {
      // Define the 'price' column using a decimal data type for precision
      type: DataTypes.DECIMAL,
      // Make 'price' a non-nullable field to ensure a value must be provided
      allowNull: false,
      // Validate that 'price' values are indeed decimals and not whole numbers
      validate: {
        isDecimal: true,
      },
    },
    stock: {
      // Set 'stock' as an integer, indicating available inventory quantity
      type: DataTypes.INTEGER,
      // Prevent nullability in 'stock' to ensure this information is always filled
      allowNull: false,
      // Default stock to 10 if no value is explicitly provided during creation
      defaultValue: 10,
      // Validate that the 'stock' value entered is a numeric type
      validate: {
        isNumeric: true,
      },
    },
    category_id: {
      // Define 'category_id' as an integer for relationship purposes
      type: DataTypes.INTEGER,
      // Create a foreign key referencing the 'category' model/table's 'id'
      references: {
        model: 'category',
        key: 'id',
      },
    },
  },
  {
    // Provide the initialized Sequelize instance to bridge this model with the database
    sequelize,
    // Disable automatic addition of timestamps on records
    timestamps: false,
    // Preserve table name exactly as defined without pluralizing or altering
    freezeTableName: true,
    // Use underscores in place of camelCasing for column names across the board
    underscored: true,
    // Define the internal model name as 'product' for Sequelize operations
    modelName: 'product',
  }
);

// Export the configured Product model for use in other parts of the application
module.exports = Product;
