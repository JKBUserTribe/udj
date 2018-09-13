export interface Product {
  success: boolean,
  products: Products[]
}

export interface Products {
  _id: string,
  name: string,
  description: string,
  brand: string,
  info: Information[],
  stock: number
}

export interface Information {
  test: any
}
