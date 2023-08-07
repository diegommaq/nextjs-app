import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (endpoint, endpointTotal, limit, page) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);

  async function fetchData() {
    const response = await axios.get(endpoint);
    setData(response.data);

    const all = await axios.get(endpointTotal);
    setTotal(all.data.length);
    let numberPages = Math.trunc(total / limit);
    if (total % limit > 0) {
      numberPages++;
    }
    setPages(numberPages);
  }

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [page]);

  return { data: data, total: total, pages: pages };
};

export default useFetch;
