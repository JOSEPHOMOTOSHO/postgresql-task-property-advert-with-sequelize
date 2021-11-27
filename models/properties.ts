"use strict";
const { Model, DataTypes } = require("sequelize");
import db from "../config/config";

interface PropertyAtrributes {
  id: number;
  owner: number;
  status: string;
  price: string;
  state: string;
  city: string;
  address: string;
  type: string;
  image_url: string;
}
export class Properties
  extends Model<PropertyAtrributes>
  implements PropertyAtrributes
{
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  id!: number;
  owner!: number;
  status!: string;
  price!: string;
  state!: string;
  city!: string;
  address!: string;
  type!: string;
  image_url!: string;
}
Properties.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    owner: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "available",
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: null,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize: db,
    modelName: "Properties",
  }
);
