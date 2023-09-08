import { Request, Response } from "express";

import Product from "../models/product";
import Pack from "../models/pack";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll();

        res.status(200).json(products);
    } catch (error: any) {
        res.status(404).json({
            error: false,
            message: error.message
        });
    }
};

export const validateProducts = async (req: Request, res: Response) => {
    const data = req.body.data as productUpdate[];

    let error = {
        error: false,
        message: "Arquivo validado"
    };

    const findProductUpdate = (cod: number) => {
        data.forEach((item: productUpdate) => {
            if (item.product_code == cod) {
                return item.new_price;
            }
        });

        return 0;
    };

    const financialValidation = (newPrice: number, cost: number) => {
        return newPrice > cost;
    };

    const marketingValidation = (price: number, newPrice: number) => {
        const newPriceCalcG = Math.round((Number(price) + (Number(price) / 10)) * 1e2) / 1e2;
        const newPriceCalcM = Math.round((Number(price) - (Number(price) / 10)) * 1e2) / 1e2;

        return newPrice <= newPriceCalcG || newPrice >= newPriceCalcM;
    };

    const packValidation = async (item: productUpdate, pack: Pack[]) => {
        let componentsPrice = 0;

        await pack.forEach(async (packItem: pack) => {
            const productPack = await Product.findOne({ where: { code: packItem.product_id } });

            if (productPack) {
                componentsPrice = Number(componentsPrice) + (findProductUpdate(packItem.product_id) * packItem.qty);
            } else {
                return false;
            }
        });

        console.log("Soma dos components: " + componentsPrice + " Novo preço: " + item.new_price);

        if (Number(componentsPrice) === Number(item.new_price)) {
            return true;
        } else {
            return false;
        }
    };

    if (data) {
        data.forEach(async (item: productUpdate) => {
            const product = await Product.findOne({ where: { code: item.product_code } });
            const pack = await Pack.findAll({ where: { pack_id: item.product_code } });

            if (product) {
                if (!financialValidation(item.new_price, product.cost_price)) {
                    error.error = true;
                    error.message = "Novo preço do produto código " + item.product_code + " é menor que o seu custo";
                } else if (!marketingValidation(product.sales_price, item.new_price)) {
                    error.error = true;
                    error.message = "Novo preço do produto código " + item.product_code + " possui ajuste diferente de 10%";
                } else if (pack && pack.length > 0) {
                    if (!packValidation(item, pack)) {
                        error.error = true;
                        error.message = "Novo preço do produto código " + item.product_code + " não atende ao requisito de ajuste de pacotes";
                    }
                }
            } else {
                error.error = true;
                error.message = "Produto código" + item.product_code + "não encontrado";
            }
        });

        res.status(200).json(error);
    } else {
        res.status(200).json({
            error: true,
            message: "Dados em formato incorreto"
        });
    }
};

export const updateProducts = async (req: Request, res: Response) => {
    let data: product[] = [];

    try {
        for (const item of req.body.data) {
            const product = await Product.findOne({ where: { code: item.product_code } });

            if (product) {
                await product.update({ sales_price: item.new_price });

                data = [...data, {
                    code: product.code,
                    name: product.name,
                    cost_price: product.cost_price,
                    sales_price: item.new_price
                }]
            }
        }

        res.status(200).json({
            error: false,
            message: "Dados atualizados",
            data: [...data]
        });
    } catch (error) {
        res.status(404).json({
            error: true,
            message: "404"
        });
    }
}