import api from "./api";

export const getProducts = async () => {
    return await api.get("/product/all");
};

export const validateProducts = async (data: productUpdate[]) => {
    return await api.post("/product/validate", { data });
};

export const updateProducts = async (data: productUpdate[]) => {
    return await api.post("/product/update", { data });
};