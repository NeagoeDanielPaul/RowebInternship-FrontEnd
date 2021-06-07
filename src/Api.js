import Product from './models/product';
import Category from './models/category'


const API_HOST = 'https://localhost:44304'


const ApiClient = {
    get: (url, params = {}, header = {}) => {
        return ApiClient.makeRequest(`${API_HOST}/${url}`, "GET", params, header, false);
    },
    post: (url, params = {}, header = {}, isMultipart = false) => {
        return ApiClient.makeRequest(`${API_HOST}/${url}`, "POST", params, header, isMultipart);
    },
    put: (url, params = {}, header = {}) => {
        return ApiClient.makeRequest(`${API_HOST}/${url}`, "PUT", params, header, false);
    },
    delete: (url, params = {}, header = {}) => {
        return ApiClient.makeRequest(`${API_HOST}/${url}`, "DELETE", params, header, false);
    },

    makeRequest: async (
        url,
        type,
        params = {},
        headers = {},
        isMultipart = false
      ) => {
        try {
          type = type.toUpperCase();
          const request = {
            method: type,
            headers: headers,
          };
          if (type === "POST" || type === "PUT") {
            request.body = isMultipart ? params : JSON.stringify(params);
          }
    
          const result = await fetch(url, request);
          if (isMultipart) return await result.text();
          return await result.json();
        } catch (error) {
          throw error.message;
        }
      }
};


const CategoryRepository = {
    all: async (offset, limit) => {
        const  categories  = await ApiClient.get(`category?offset=${offset}&limit=${limit}`);

        return categories.map((x) => new Category(x.categoryId, x.name, x.description ));
    }
};

const ProductRepository = {
  all: async(id) => {
    const products = await ApiClient.get(`product/${id}`);

    return products.map((x)=> new Product(x.productId, x.name, x.description, x.price, x.basePrice, x.image, x.ctId));
  },
  allProducts: async() => {
    const products = await ApiClient.get(`product`);

    return products.map((x)=> new Product(x.productId, x.name, x.description, x.price, x.basePrice, x.image, x.ctId));
  },
  addProduct: async(product) => {
    const response = await ApiClient.post(`product`,product, {'Content-Type' : 'application/json'},false);
    return response;
  },
  updateProduct: async(id,product) => {
    await ApiClient.put(`product?id=${id}`, product, {'Content-Type': 'application/json'}, false);
  },
  deleteProduct: async(id) => {
    await ApiClient.delete(`product?id=${id}`)
  },
  uploadImage: async(id,image) => {
    await ApiClient.post(`product/photo?id=${id}`,image, {},true);
  }
}

const AdminRepository = {
  addCategory: async(category) => {
    const response = await ApiClient.post(`category` , category, {'Content-Type' : 'application/json'}, false);
    return response;
  },
  deleteCategory: async(id) => {
    await ApiClient.delete(`category?id=${id}`)
  },
  updateCategory: async(id,category) =>{
    await ApiClient.put(`category?id=${id}`, category, {'Content-Type': 'application/json'},false);
  }
}



const Api = {
    ApiClient: ApiClient,
    CategoryRepository: CategoryRepository,
    ProductRepository: ProductRepository,
    AdminRepository:AdminRepository
}


export default Api;