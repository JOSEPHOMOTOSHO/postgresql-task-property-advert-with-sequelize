"use strict";
const { Model, DataTypes } = require("sequelize");
import db from "../config/config";

interface UserAttributes {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  phoneNumber: string;
  address: string;
  is_admin: boolean;
}
export class Users extends Model<UserAttributes> implements UserAttributes {
  id!: number;
  email!: string;
  first_name!: string;
  last_name!: string;
  password!: string;
  phoneNumber!: string;
  address!: string;
  is_admin!: boolean;
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
  },
  {
    sequelize: db,
    modelName: "Users",
  }
);
