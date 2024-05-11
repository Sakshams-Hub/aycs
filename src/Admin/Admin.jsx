// import React, { useState, useEffect } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import { fireDB } from '../firebase'; // Assuming you have a firebase configuration file

// function Admin() {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(fireDB, 'orders')); // Replace 'your_collection' with your actual collection name
//         const newData = [];
//         querySnapshot.forEach((doc) => {
//           newData.push(doc.data());
//         });
//         setData(newData);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Admin Panel</h1>
//       {isLoading ? (
//         <p>Loading data...</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Size</th>
//               <th>Tshirt</th>
//               <th>Design</th>
//               <th>VideoSKU</th>
             
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item, index) => (
//               <tr key={index}>
//                 <td>{index + 1000}</td>
//                 <td>{item.name}</td>
//                 <td>{item.email}</td>
//                 <td>{item.size}</td>
//                 <td>{item.tshirt}</td>
//                 <td>{item.design}</td>
//                 <td>{item.videoSKU}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default Admin;


