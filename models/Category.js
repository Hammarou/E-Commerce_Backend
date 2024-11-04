// Import Model and DataTypes from the Sequelize library
const { Model, DataTypes } = require('sequelize');

// Import the configured Sequelize instance from the connection file
const sequelize = require('../config/connection.js');

// Define a new class 'Category' that extends the Sequelize Model class
class Category extends Model {}

// Initialize the 'Category' model with its attributes and options
Category.init(
  {
    // Define an 'id' column as an integer type
    id: {
      type: DataTypes.INTEGER,
      // 'allowNull: false' means this column cannot be null
      allowNull: false,
      // Set as the primary key for this table
      primaryKey: true,
      // Automatically increment the value of this column for new entries
      autoIncrement: true,
    },
    // Define a 'category_name' column as a string type
    category_name: {
      type: DataTypes.STRING,
      // 'allowNull: false' means this column cannot be null
      allowNull: false,
    },
  },
  {
    // Pass the imported Sequelize instance to associate the model with our database connection
    sequelize,
    // Disable automatic creation of timestamps (createdAt and updatedAt fields)
    timestamps: false,
    // Prevent Sequelize from pluralizing the table name
    freezeTableName: true,
    // Use underscores instead of camelCasing for automatically added attributes
    underscored: true,
    // Set the name of the model as 'category'
    modelName: 'category',
  }
);

// Export the 'Category' model to use it in other parts of the application
module.exports = Category;
