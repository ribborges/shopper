import api from "./api";

export const getProducts = async () => {
    return await api.get("/product/all");
};

export const updateProducts = async (data: productUpdate[]) => {
    return await api.post("/product/update", { data });
};