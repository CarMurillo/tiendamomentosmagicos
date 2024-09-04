import React, { useState, useEffect } from 'react';
import FormProduct from './FormProduct';
import FilterChange from './FilterChange';
import { getDatabase, ref, push, update, get } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../CSS/Product.css';

const ProductList = ({ addToCart }) => {
  const [showForm, setShowForm] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [newlyAddedProduct, setNewlyAddedProduct] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [initialProducts, setInitialProducts] = useState([]);
  const [products, setProducts] = useState([
    { id: 1, name: 'Oso Blanco', price: 19000, description: 'Oso blanco de lana antipolergenico, 30 CM', image: './src/img/oso1.jpg', categoria: 'Peluches' },
    { id: 2, name: 'Peluche cuerpoespin', price: 29000, description: 'cuerpoespin antipolergenico 20 CM', image: './src/img/oso2.jpg', categoria: 'Peluches' },
    { id: 3, name: 'Ferrero Rocher X3 UND', price: 19000, description: 'Chocolate ferrero rocher x3', image: './src/img/chocolate1.jpg', categoria: 'Chocolates' },
    { id: 4, name: 'Montblanc Fresa', price: 29000, description: 'Barra Chocolate MontBlanc Fresa', image: './src/img/chocolate4.jpg', categoria: 'Chocolates' },
    { id: 5, name: 'Oso Naranja', price: 19000, description: 'Peluche tipo oso naranja antipolergenico 30 CM', image: './src/img/oso3.jpg', categoria: 'Peluches' },
    { id: 6, name: 'Pareja de Osos', price: 29000, description: 'Peluches tipo osos marron antipolergenico 50 CM', image: './src/img/oso4.jpg', categoria: 'Peluches' },
    { id: 7, name: 'MontBlanc X3 UND', price: 19000, description: 'Chocolate MontBlanc X3 UND', image: './src/img/chocolate3.png', categoria: 'Chocolates' },
    { id: 8, name: 'Tequila Rancho Grande', price: 80000, description: 'Tequila rancho grande, caja con tres copas', image: './src/img/licor.png', categoria: 'Licores' },
    { id: 9, name: 'J.P CHENET', price: 19000, description: 'Champaña JP CHENET Espumosa Manzana', image: './src/img/champaña.png', categoria: 'Licores' },
    { id:10, name: 'Taza de chayane', price: 40000 ,description:'Una taza blanca con una imagen de chayane' , image:'https://http2.mlstatic.com/D_NQ_NP_992726-MLM45801141145_052021-O.webp' , categoria:'Tazas' },
    { id:11, name:'Taza que dice te Amo', price:20000 ,description:'Una taza de porcelana con fondo blanco que tiene el mensaje de te amo' , image:'https://www.minutosdeamor.com/wp-content/uploads/2015/09/amor-y-amista-osogrande_1.jpg' , categoria:'Tazas'  },
    { id:12, name:'Caja de chocolates', price:10000 ,description:'Una caja de chocolates grande ' , image:'https://www.promohit.co/images//Dulces-chocolates.jpg' , categoria:'Chocolates',},
    { id:13, name:'Desayuno sorpresas', price:60000 ,description:'Un desayuno sorpresa, con un peluche y globos' , image:'https://desayunosdeamordiscos.com.co/wp-content/uploads/2022/02/desayuno-sorpresa-3.jpg' , categoria:'Desayunos' },
    { id:14, name:'Chocolates kinder', price:100000 ,description:'Una caja llenas de chocolates kinder' , image:'https://www.afuegolento.com/img_db/timthumb.php?src=img_db/articles/2022/05/article-627e37ad8964e.jpg&w=800&z=1' , categoria:'Chocolates' },
    { id:15, name:'Jack Daniels', price:94900 ,description:'Jack Daniels media de 350ml' , image: 'https://carulla.vtexassets.com/arquivos/ids/4133769/Whisky-Jack-Daniels-X-375ml-369292_a.jpg?v=1781231064', categoria:'Licores'},
    { id:16, name:'Whisky Johnnie Walker Blue Label', price:900000 ,description:'Whisky Blue label de Johnnie Walker es un elixir' , image:'https://diageocol.vtexassets.com/arquivos/ids/158049/whisky-johnnie-walker-blue-label-750-ml-5000267114279-2.jpg?v=638189169132930000' , categoria:'Licores' },
    { id:17, name:'Peluche de Stitch ', price:149000 ,description:'Peluche de stitch cabezon de 55cm' , image:'https://falabella.scene7.com/is/image/FalabellaCO/gsc_124055883_3601861_1?wid=800&hei=800&qlt=70' , categoria:'Peluches'},
    { id:18, name:'Taza blanca con mensaje del mejor papa', price:13000 ,description:'Taza blanca para regalar a tu papa ' , image: 'https://mugs.com.co/wp-content/uploads/2023/04/dia-del-padre-2.png', categoria:'Tazas'},
    { id:19, name:'Desayuno sorpresa de feliz cumpleaños', price:60000 ,description:'Un desayuno sorpresa, con un globo que dice feliz cumpleaños' , image:'https://www.floristeriadfranco.com/821-large_default/desayuno-sorpresa-para-hombre-.jpg' , categoria:'Desayunos' },
    { id:20, name:'Whisky Jack Daniels Jesses Honey', price:120000 ,description:'Whysky Jack Daniels con 35% grados de alcohol' , image:'https://alternativebeer.com.co/wp-content/uploads/2021/09/Whiskey-Jack-Daniels-Honey-1.png' , categoria:'Licores' },
    { id:21, name:'Rosa Preservada Roja', price: 150000, description:'Rosa preservada color rojo con duracion de mas de 4 años', image: './src/img/flor1.jpg', categoria: 'Flores' },
    { id:22, name:'Bandeja Surtida', price: 48000, description:'Bandeja de comida surtida, variado de fruta, dulces y roolo de pollo', image: './src/img/bandeja.jpg', categoria: 'Desayunos' },
    { id:23, name:'Detalle Surtido', price: 60000, description:'Huacal surtido de sulces y chocolates al gusto, decorado personalizado', image: './src/img/regalo.jpg', categoria: 'Detalles' },
    { id:24, name:'Desayuno Sorpresa', price: 70000, description:'Desayuno sorpresa, omellet de huevo, ensalada de frutas y aperitivos... Decorado Personalizado', image: './src/img/desayunom1.jpg', categoria: 'Desayunos' },
    { id:25, name:'Rosas en forma de Corazon', price: 120000, description:'Caja en forma de corazon con una docena de rosas y aperitivos al gusto', image: './src/img/flores1.jpg', categoria: 'Flores' },
    { id:26, name:'Pareja Stitch y Angel', price: 450000, description:'Pareja de stitch y angel 60 cm material antipolergenico', image: './src/img/parejastich.jpg', categoria: 'Peluches' },
    { id:27, name:'Rosa Preservada Rosa + J.P CHENET', price: 150000, description:'Regalo con rosa preservada + champan J.P CHENET y chocolates', image: './src/img/rosa2.jpg', categoria: 'Detalles' },
    { id:28, name:'Ramo de Rosas Rojas', price: 48000, description:'Ramo de rosas de una docena con decorado personalizado', image: './src/img/rosa3.jpg', categoria: 'Flores' },
    { id:29, name:'Ramo de Rosas Blancas + Chocolates Ferreros Corazon', price: 90000, description:'Ramo de rosas balncas, una docena con decorado personalizado mas chocolates ferreros en forma de corazon x8UND', image: './src/img/rosa4.jpg', categoria: 'Flores' },
    { id:30, name:'Caja Corazon Rosas', price: 160000, description:'Caja en forma de corazon con una docena de rosas mas frutas y chocolates, decoracion personalizada', image: './src/img/rosa5.jpg', categoria: 'Flores' },
    { id:31, name:'Ramo de Girasoles', price: 90000, description:'Ramo de 6 girasoles, decorado personalizado', image: './src/img/girasol.jpg', categoria: 'Flores' },
    { id:32, name:'Detalle Globo Burbuja', price: 50000, description:'Detalle con globo burbuja mas chocolates', image: './src/img/detalle3.jpg', categoria: 'Detalles' },
  ]);

  useEffect(() => {
    const loadProducts = async () => {
      const database = getDatabase();
      const productsRef = ref(database, 'products');
      const snapshot = await get(productsRef);
      const productList = [];
      snapshot.forEach((childSnapshot) => {
        productList.push(childSnapshot.val());
      });
      setProducts(productList);
      setInitialProducts(productList);
    };
    loadProducts();
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleAddProduct = async (productData) => {
    try {
      // Agrega el nuevo producto al estado local
      setProducts([...products, productData]);
  
      // Sube la imagen a Firebase Storage
      const storage = getStorage();
      const storageReference = storageRef(storage, `images/${productData.image.name}`);
      await uploadBytes(storageReference, productData.image);
  
      // Obtiene la URL de la imagen
      const imageUrl = await getDownloadURL(storageReference);
  
      // Actualiza el producto con la URL de la imagen en Firebase Realtime Database
      const database = getDatabase();
      const productsRef = ref(database, 'products');
      const newProductRef = push(productsRef);
  
      const updatedProduct = { ...productData, image: imageUrl };
      await update(newProductRef, updatedProduct);
  
      // Establece el producto recién agregado en el estado
      setNewlyAddedProduct(updatedProduct);
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };

  const handleAdminVerification = () => {
    const correctPassword = '1234567890';

    if (adminPassword === correctPassword) {
      setAdminMode(false);
      setShowForm(true);
    } else {
      alert('Contraseña incorrecta. Acceso denegado.');
    }
  };

  const handleFilterChange = (newFilters) => {
    setCategoryFilter(newFilters);
    setShowAllProducts(false);
  };

  const filteredProducts =
    categoryFilter && Object.values(categoryFilter).some(Boolean) && !showAllProducts
      ? products.filter((product) => categoryFilter[product.categoria])
      : products;

  const handleSearch = (e) => {
    e.preventDefault();
    // Filtrar productos por nombre o categoría según el término de búsqueda
    const filteredProducts = products.filter((product) => (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    ));
    setProducts(filteredProducts);
  };

  const handleCancelSearch = () => {
    setProducts(initialProducts); // Reemplaza 'initialProducts' con tu lista original de productos
    setSearchTerm('');
  };
  
  return (
    <>
    <FilterChange onFilterChange={handleFilterChange} setShowAllProducts={setShowAllProducts} />
    <div className="product-list">
      {newlyAddedProduct && (
        <div>
          <h2>Nuevo Producto Agregado</h2>
          <p>Nombre: {newlyAddedProduct.name}</p>
          <p>Precio: {newlyAddedProduct.price}</p>
          <p>Descripción: {newlyAddedProduct.description}</p>
          <p>Categoría: {newlyAddedProduct.categoria}</p>
          <img src={newlyAddedProduct.image} alt={newlyAddedProduct.name} />
        </div>
      )}

      {filteredProducts.map((product) => (
        <div className="product-item" key={product.name}>
          <img className="product-image" src={product.image} alt={product.name} />
          <div className="product-name">{product.name}</div>
          <div className="product-description">{product.description}</div>
          <div className="product-price">${product.price}</div><br />
          <button className="product-button" onClick={() => addToCart(product)}>
            Añadir al carrito
          </button>
        </div>
      ))}

      {!adminMode && !showForm && (
        <div>
          <button className="button-product" onClick={() => setAdminMode(true)}>
            Admin
          </button>
        </div>
      )}
      {adminMode && !showForm && (
        <div>
          <input
            type="password"
            placeholder="Ingrese la contraseña"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
          <button onClick={handleAdminVerification}>Verificar</button>
        </div>
      )}
      {showForm && <FormProduct onAddProduct={handleAddProduct} onCancel={toggleForm} />}
    </div></>
  );
};

export default ProductList; 