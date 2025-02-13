import React, { useEffect, useState } from 'react';
import { getPosts } from './api/postapi';
import Allcomponets from './components/AllComponents';
// the promise will not give data directly promise-pending  --> resolve()-> .then()  --> reject->.catch()  ----> settled -> .finally()
// For fetch the fetched you need to again convert into the res.json()
function App() {
  const [data, setData] = useState([]); 

  const getPostdata = async () => {
    try {
      const res = await getPosts();
      setData(res.data); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getPostdata();
  }, []);
// Sending props and displaying data
  return (
    <div>
      <Allcomponets data={data} />  
    </div>
  );
}

export default App;