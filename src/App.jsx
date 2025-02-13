import React, { useEffect, useState } from 'react';
import { getPosts } from './api/postapi';
import Allcomponets from './components/AllComponents';
// the promise will not give data directly promise-pending  --> resolve()-> .then()  --> reject->.catch()  ----> settled -> .finally()
// For fetch the fetched you need to again convert into the res.json()
function App() {
  const [data, setData] = useState([]); // Store API response

  const getPostdata = async () => {
    try {
      const res = await getPosts();
      setData(res.data); // Update state with API response
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getPostdata();
  }, []);

  return (
    <div>
      <Allcomponets data={data} /> {/* Pass fetched data */}
    </div>
  );
}

export default App;