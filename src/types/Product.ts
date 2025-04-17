export type Product = {
    id: string;
    nombre: string;
    descripcion: string;
    precio: string;
    stock: string;
    imgUrl?: string;
    productBrand: {
      id: string;
      nombre: string;
      descripcion: string;
    };
    productClass: {
      id: string;
      name: string;
      description: string;
    };
    category?: {
      id: string;
      nombre: string;
    };
  };