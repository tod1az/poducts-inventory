import { type Product } from "@/lib/types"

type ProductFromDB = {
  id: string
  description: string
  total: number
}

export function adaptProduct(products: ProductFromDB[]) {
  const adaptedProducts: Product[] = products.map((product) => {
    const adaptedProduct: Product = {
      code: product.id,
      description: product.description,
      quantity: product.total,
      family: product.id.slice(0, 3),
      section: product.description,
    }
    return adaptedProduct
  })
  return adaptedProducts
}
