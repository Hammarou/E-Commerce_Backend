// Import Model and DataTypes from Sequelize to utilize ORM features
const { Model, DataTypes } = require('sequelize');

// Import the existing database connection configuration
const sequelize = require('../config/connection');

// Define a new class 'ProductTag' that extends Sequelize's Model class
class ProductTag extends Model {}

// Initialize the ProductTag model by defining its structure
ProductTag.init(
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
    product_id: {
      // Define 'product_id' as an integer for foreign key reference
      type: DataTypes.INTEGER,
      // Establish a reference to the 'product' model through 'id'
      references: {
        model: 'product',
        key: 'id',
      },
    },
    tag_id: {
      // Define 'tag_id' as an integer for foreign key reference
      type: DataTypes.INTEGER,
      // Establish a reference to the 'tag' model through 'id'
      references: {
        model: 'tag',
        key: 'id',
      },
    },
  },
  {
    // Associate the initialized Sequelize instance to connect this model to the database
    sequelize,
    // Disable automatic timestamps on records (createdAt and updatedAt will not be generated)
    timestamps: false,
    // Preserve the table name exactly as 'product_tag', without alteration
    freezeTableName: true,
    // Utilize underscores in place of camelCasing for column names
    underscored: true,
    // Assign the internal model name as 'product_tag'
    modelName: 'product_tag',
  }
);

// Export the configured ProductTag model so it can be used in other files of the application
module.exports = ProductTag;
