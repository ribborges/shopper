interface productUpdate {
    product_code: number,
    new_price: number
}

interface pack {
    id: number,
    pack_id: number,
    product_id: number,
    qty: number
}

interface product {
    code: number,
    name: string,
    cost_price: number,
    sales_price: number
}