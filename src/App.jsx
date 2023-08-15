import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import CardItem from "./components/CardItem";

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isHasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    if (isLoading) {
      // Don't make a new API call if one is already pending
      return;
    }
    setIsLoading(true);
    setError(null);

    setIsLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:3000/orkes?page=${page}`
      );
      const data = response.data;
      console.log(data);
      console.log(page);
      setIsLoading(false);

      if (data.length === 0) {
        setHasMore(false);
      }
      setItems((prevItems) => [...prevItems, ...data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      setError(error);
    }
  };

  //initial render
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-center w-[full] items-center mt-[100px] mb-[100px]">
        <div className="flex justify-center w-[800px]">
          <InfiniteScroll
            dataLength={items.length}
            next={fetchData}
            hasMore={isHasMore}
            loader={<p>Loading...</p>}
            endMessage={<p>No more data to load.</p>}
          >
            <ul>
              {items.map((item, i) => (
                <>
                  <div key={item?.node?.nid}>
                    <CardItem
                      title={item?.node?.title}
                      imageUrl={item?.node?.field_photo_image_section}
                      last_update={item?.node?.last_update}
                      id={item?.node?.nid}
                    />
                  </div>
                </>
              ))}
            </ul>
          </InfiniteScroll>
          {error && <p>Error: {error.message}</p>}
        </div>
      </div>
    </>
  );
}

export default App;
