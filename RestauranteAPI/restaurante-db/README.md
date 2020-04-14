# restaurante-mongodb

## Usage

```js
const service = require("restaurante-mongodb");
const productoCollection = "producto";

const ProductoApi = servicio(productoCollection);

console.log(
  ProductoApi.getAll({})
    .then((data) => console.log(data))
    .catch((err) => console.err(err))
);
```
