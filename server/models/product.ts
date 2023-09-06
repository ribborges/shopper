import { DataTypes, Model, Optional } from 'sequelize'
import { connection } from "../config";

interface ProductModel {
    code: number;
    name: string;
    cost_price: number;
    sales_price: number;
}

class Product extends Model<ProductModel> implements ProductModel {
    declare code: number;
    declare name: string;
    declare cost_price: number;
    declare sales_price: number;
}

Product.init({
    code: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cost_price: {
        type: DataTypes.DECIMAL(9, 2),
        allowNull: false

    },
    sales_price: {
        type: DataTypes.DECIMAL(9, 2),
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize: connection,
    paranoid: true
})

export default Product;