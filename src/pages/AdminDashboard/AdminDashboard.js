import React, { useState } from 'react';
import './AdminDashboard.css';

function AdminDashboard() {
   const [formData, setFormData] = useState({
       name: '',
       species: 'Velociraptor',
       history: '',
       price: '',
       location: '',
       temperament: '',
       stock: 1,
       image: null,
       imagePreview: null
   });

   const handleImageUpload = (e) => {
       const file = e.target.files[0];
       if (file) {
           const reader = new FileReader();
           reader.onloadend = () => {
               setFormData({
                   ...formData,
                   imagePreview: reader.result,
                   image: file
               });
           };
           reader.readAsDataURL(file);
       }
   };

   const handleSubmit = async (e) => {
       e.preventDefault();
       const formDataToSend = new FormData();
       
       Object.keys(formData).forEach(key => {
           if (key !== 'imagePreview') {
               formDataToSend.append(key, formData[key]);
           }
       });

       try {
           const response = await fetch('http://localhost:3001/api/dinosaurs', {
               method: 'POST',
               body: formDataToSend
           });

           if (response.ok) {
               alert('Velociraptor cadastrado com sucesso!');
               setFormData({
                   name: '',
                   species: 'Velociraptor',
                   history: '',
                   price: '',
                   location: '',
                   temperament: '',
                   stock: 1,
                   image: null,
                   imagePreview: null
               });
           } else {
               throw new Error('Erro ao cadastrar');
           }
       } catch (error) {
           alert('Erro ao cadastrar velociraptor: ' + error.message);
       }
   };

   return (
       <div className="admin-dashboard">
           <div className="admin-dashboard__header">
               <h1>Painel Administrativo</h1>
           </div>
           
           <div className="admin-dashboard__content">
               <form onSubmit={handleSubmit} className="admin-form">
                   <div className="form-group">
                       <label>Nome do Velociraptor</label>
                       <input
                           type="text"
                           value={formData.name}
                           onChange={(e) => setFormData({...formData, name: e.target.value})}
                           required
                       />
                   </div>

                   <div className="form-group">
                       <label>História</label>
                       <textarea
                           value={formData.history}
                           onChange={(e) => setFormData({...formData, history: e.target.value})}
                           required
                       />
                   </div>

                   <div className="form-group">
                       <label>Preço</label>
                       <input
                           type="number"
                           value={formData.price}
                           onChange={(e) => setFormData({...formData, price: e.target.value})}
                           required
                           min="0"
                           step="0.01"
                       />
                   </div>

                   <div className="form-group">
                       <label>Localização</label>
                       <select
                           value={formData.location}
                           onChange={(e) => setFormData({...formData, location: e.target.value})}
                           required
                       >
                           <option value="">Selecione a localização</option>
                           <option value="Zona Sul">Zona Sul</option>
                           <option value="Zona Norte">Zona Norte</option>
                           <option value="Zona Oeste">Zona Oeste</option>
                           <option value="Centro">Centro</option>
                       </select>
                   </div>

                   <div className="form-group">
                       <label>Temperamento</label>
                       <select
                           value={formData.temperament}
                           onChange={(e) => setFormData({...formData, temperament: e.target.value})}
                           required
                       >
                           <option value="">Selecione o temperamento</option>
                           <option value="Dócil">Dócil</option>
                           <option value="Agitado">Agitado</option>
                           <option value="Territorial">Territorial</option>
                       </select>
                   </div>

                   <div className="form-group">
                       <label>Quantidade em Estoque</label>
                       <input
                           type="number"
                           value={formData.stock}
                           onChange={(e) => setFormData({...formData, stock: e.target.value})}
                           required
                           min="1"
                       />
                   </div>

                   <div className="form-group">
                       <label>Imagem</label>
                       <div 
                           className="image-upload"
                           onClick={() => document.getElementById('imageInput').click()}
                       >
                           {formData.imagePreview ? (
                               <img 
                                   src={formData.imagePreview} 
                                   alt="Preview" 
                                   className="image-preview"
                               />
                           ) : (
                               <p>Clique para fazer upload da imagem</p>
                           )}
                           <input
                               id="imageInput"
                               type="file"
                               accept="image/*"
                               onChange={handleImageUpload}
                               style={{ display: 'none' }}
                           />
                       </div>
                   </div>

                   <div className="form-actions">
                       <button type="submit" className="btn btn-primary">
                           Cadastrar Velociraptor
                       </button>
                   </div>
               </form>
           </div>
       </div>
   );
}

export default AdminDashboard;