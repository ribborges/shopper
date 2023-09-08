import { DataTypes, Model, Optional } from 'sequelize'
import { connection } from "../config";

interface PackModel {
    id: number;
    pack_id: number;
    product_id: number;
    qty: number;
}

class Pack extends Model<PackModel> implements PackModel {
    declare id: number;
    declare pack_id: number;
    declare product_id: number;
    declare qty: number;
}

Pack.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    pack_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    product_id: {
        type: DataTypes.BIGINT,
        allowNull: false

    },
    qty: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize: connection,
    paranoid: true
})

export default Pack;