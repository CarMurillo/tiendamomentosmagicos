
import React, { useState } from 'react';
import '../CSS/Form.css';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const FormProduct = ({ onAddProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
    categoria: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    categoria: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    const fileValue = type === 'file' ? files[0] : value;
    setFormData({ ...formData, [name]: fileValue });
    setErrorMessages({ ...errorMessages, [name]: '' });
    
  };

  const validateForm = () => {
    let isValid = true;
    const newErrorMessages = {};

    // Validar que todos los campos obligatorios estén llenos
    Object.keys(formData).forEach((key) => {
      if (key !== 'image' && formData[key] === '') {
        newErrorMessages[key] = 'Este campo es obligatorio';
        isValid = false;
      }
    });

    // Validar que el precio sea numérico
    if (isNaN(formData.price)) {
      newErrorMessages.price = 'El precio debe ser numérico';
      isValid = false;
    }

    if (!formData.image) {
      newErrorMessages.image = 'Selecciona una imagen';
      isValid = false;
    }

    setErrorMessages(newErrorMessages);
    return isValid;
  };

  const handleAddProduct = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Subir la imagen a Firebase Storage
      const storage = getStorage();
      const storageReference = storageRef(storage, `images/${formData.image.name}`);
      await uploadBytes(storageReference, formData.image);

      // Obtener la URL de la imagen
      const imageUrl = await getDownloadURL(storageReference);

      // Llamar a onAddProduct con la información actualizada
      onAddProduct({
        name: formData.name,
        price: formData.price,
        description: formData.description,
        image: imageUrl,
        categoria: formData.categoria,
      });

      // Puedes reiniciar el estado del formulario después de agregar el producto si es necesario
      setFormData({
        name: '',
        price: '',
        description: '',
        image: null,
        categoria: '',
      });
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };

  return (
    <form className="product-formukario">
      <div>
        <label>Nombre:</label>
        <input
          className="form-control"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        {errorMessages.name && <p className="error-message">{errorMessages.name}</p>}
      </div>
      <div>
        <label>Precio:</label>
        <input
          className="form-control"
          type="text"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />
        {errorMessages.price && <p className="error-message">{errorMessages.price}</p>}
      </div>
      <div>
        <label>Descripción:</label>
        <input
          className="form-control"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
        {errorMessages.description && <p className="error-message">{errorMessages.description}</p>}
      </div>
      <div>
        <label>Imagen:</label>
        <input className="form-control" type="file" name="image" onChange={handleInputChange} />
        {errorMessages.image && <p className="error-message">{errorMessages.image}</p>}
      </div>
      <div className="form-group">
        <label>Categoría:</label>
        <select
          className="form-control"
          name="categoria"
          value={formData.categoria}
          onChange={handleInputChange}
        >
          <option value="">Seleccionar Categoría</option>
          <option value="chocolates">Chocolates</option>
          <option value="peluches">Peluches</option>
          <option value="licores">Licores</option>
          <option value="desayunos">Desayunos</option>
          <option value="posillos">Posillos</option>
        </select>
        {errorMessages.categoria && <p className="error-message">{errorMessages.categoria}</p>}
      </div>
      <button type="button" onClick={handleAddProduct}>
        Añadir Producto
      </button>
    </form>
  );
};

export default FormProduct;