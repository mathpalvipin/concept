import axios from "axios";
import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
const fetch = async ({ pageParam }) => {
  console.log(pageParam);
  var res = await axios.get(`http://localhost:5000/getTask?page=${pageParam}`);
  return res.data;
};
const Task = () => {
  // const { isLoading, data: Tasks } = useQuery({
  //   queryKey: ["task"],
  //   queryFn: fetch,
  //   staleTime: 100000,

  // });
  const { ref, inView } = useInView();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching: isLoading,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["task"],
    queryFn: fetch,
    staleTime: 100000,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  useEffect(() => {
    // console.log( isFetchingNextPage+ "fetching  next page ....." );
    // console.log(inView);
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);
  return (
    <>
      <div className="showContainer h-full w-full flex flex-col items-center mt-2">
        {data?.pages.map((tasks) =>
          tasks?.data.map((t) => (
            <div
              className="w-5/6 h-auto flex  flex-col justify-evenly border-2 rounded-md shadow-sm shadow-gray-500 text-sm mb-6"
              key={t._id}
            >
              <div className="flex justify-around items-center">
                {" "}
                <div className="text-lg">{t.TaskName}</div>
                <div className="text-lg">{t.TaskType}</div>
              </div>
              <div className="text-lg flex justify-center items-center bg-blue-200  ">
                {t.DateTime}
              </div>
            </div>
          ))
        )}
        <div ref={ref} className="bg-black text-white w-full  flex justify-center">
          <button disabled={!hasNextPage || isFetchingNextPage}>
            {(isFetchingNextPage)
              ? "Loading more..."
              : hasNextPage || (isLoading && !isFetchingNextPage)
              ? "Data "
              : "Nothing more to load"}
          </button>
      
          <div>{isLoading && !isFetchingNextPage ? "Fetching..." : null}</div>
            </div>
      
      </div>
    </>
  );
};

export default Task;
