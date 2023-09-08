import { Request, Response } from "express";

import Product from "../models/product";
import Pack from "../models/pack";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll();

        res.status(200).json(products);
    } catch (error: any) {
        res.status(404).json({
            error: "404",
            message: error.message
        });
    }
};

export const updateProducts = async (req: Request, res: Response) => {
    const data = req.body.data as productUpdate[];

    const error = (message: string) => {
        console.log(message);
        res.status(400).json({
            error: "400",
            message: message
        });
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
        const newPriceCalcG = Number(price) + (Number(price) / 10);
        const newPriceCalcM = Number(price) - (Number(price) / 10);

        return newPrice <= newPriceCalcG || newPrice >= newPriceCalcM;
    };

    const packValidation = async (item: productUpdate, pack: pack[]) => {
        let componentsPrice = 0;

        await pack.forEach(async (packItem: pack) => {
            const productPack = await Product.findOne({ where: { code: packItem.product_id } });

            if (productPack) {
                componentsPrice = Number(componentsPrice) + (findProductUpdate(packItem.product_id) * packItem.qty);
            } else {
                error("Um dos componentes do pack " + item.product_code + " não foi encontrado");
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
                    error("Novo preço do produto código " + item.product_code + " é menor que o seu custo");
                } else if (!marketingValidation(product.sales_price, item.new_price)) {
                    error("Novo preço do produto código " + item.product_code + " possui ajuste diferente de 10%");
                } else if (pack && pack.length > 0) {
                    if (!packValidation(item, pack)) {
                        error("Novo preço do produto código " + item.product_code + " não atende ao requisito de ajuste de pacotes");
                    } else {
                        console.log("YAAAAAS!");

                        res.status(200);
                    }
                } else {
                    await product.update({ sales_price: item.new_price });

                    res.status(200);
                }
            } else {
                res.status(404).json({
                    error: "404",
                    message: "Produto código" + item.product_code + "não encontrado"
                });
            }
        });
    } else {
        res.status(400).json({
            error: "404",
            message: "Dados em formato incorreto"
        });
    }
};