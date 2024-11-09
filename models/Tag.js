// Import Model and DataTypes modules from Sequelize for ORM functionality
const { Model, DataTypes } = require('sequelize');

// Import the configured database connection instance
const sequelize = require('../config/connection.js');

// Define a new class 'Tag' that extends Sequelize's Model class
class Tag extends Model {}

// Initialize the Tag model by defining its structure and configuration
Tag.init(
  {
    // define columns
    id: {
      // Set 'id' as an integer type for unique identification
      type: DataTypes.INTEGER,
      // Ensure 'id' cannot be null, making it a required field
      allowNull: false,
      // Designate 'id' as the primary key for this table
      primaryKey: true,
      // Enable automatic increment of the 'id' value with new entries
      autoIncrement: true,
    },
    tag_name: {
      // Define 'tag_name' as a string to store the name of the tag
      type: DataTypes.STRING,
      // Optional: Could add validation or constraints here (not specified in current code)
    },
  },
  {
    // Connect the initialized model to the database using Sequelize instance
    sequelize,
    // Disable automatic timestamps on records (createdAt and updatedAt will not be generated)
    timestamps: false,
    // Preserve the table name as 'tag', preventing pluralization by Sequelize
    freezeTableName: true,
    // Use underscores in column names instead of camelCasing
    underscored: true,
    // Assign the internal model name as 'tag'
    modelName: 'tag',
  }
);

// Export the configured Tag model so it can be used across other parts of the application
module.exports = Tag;
