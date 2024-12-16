import React, { useState, useEffect } from 'react';
 import axios from 'axios';
 import './App.css';

 function App() {
   const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
   const [employees, setEmployees] = useState([]);
   const [isSubmitted, setIsSubmitted] = useState(false);

   const handleChange = (e) => {
     const { name, value } = e.target;
     setFormData({ ...formData, [name]: value });
   };

   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       const response = await axios.post('https://jsonplaceholder.typicode.com/users', formData);
       console.log(response.data);
       setIsSubmitted(true);
     } catch (error) {
       console.error('There was an error submitting the form!', error);
     }
   };

   useEffect(() => {
     const fetchEmployees = async () => {
       try {
         const response = await axios.get('https://jsonplaceholder.typicode.com/users');
         setEmployees(response.data);
       } catch (error) {
         console.error('There was an error fetching the employee data!', error);
       }
     };

     fetchEmployees();
   }, []);

   return (
     <div className="App">
       {isSubmitted ? (
         <div>Form submitted successfully!</div>
       ) : (
        <div>
       <h1 className='container'>Registration Form</h1>
         <form onSubmit={handleSubmit} className='form'>
           <div className='Input'>
             <label>Name:</label>
             <input className="place" type="text" name="name" value={formData.name} onChange={handleChange} required />
           </div>
           <div className='Input'>
             <label>Email:</label>
             <input className="place" type="email" name="email" value={formData.email} onChange={handleChange} required />
           </div>
           <div className='Input'>
             <label>Phone:</label>
             <input className="place" type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
           </div>
           <button type="submit">Register</button>
         </form>
       </div>
       )
       }
     
       <h2 className="App" style={{textAlign:'center'}}>Employee List</h2>
       <div className="App">
       <table>
         <thead>
           <tr>
             <th>ID</th>
             <th>Name</th>
             <th>Email</th>
           </tr>
         </thead>
         <tbody>
           {employees.map((employee) => (
             <tr key={employee.id}>
               <td>{employee.id}</td>
               <td>{employee.name}</td>
               <td>{employee.email}</td>
             </tr>
           ))}
         </tbody>
         </table>
         </div>
     </div>

   );
 }

 export default App;
