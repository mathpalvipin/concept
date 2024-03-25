import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
const Task = () => {
  const fetch = async () => {
    const res = await axios.get("http://localhost:5000/getEvent");
    // console.log(res.data.Tasks);
    return res.data.Tasks;
  };
  const { isLoading, data:Tasks } = useQuery({
    queryKey: ["event"],
    queryFn: fetch,
    staleTime:10000
  });
  
  
 
  return (
    <>

      <div className="showContainer h-full w-full flex flex-col items-center mt-2">
      {isLoading ? <div>...loading </div> :
         Tasks.map((t)=>{
         return (<div className="w-5/6 h-auto flex justify-evenly border-2 rounded-md shadow-sm shadow-gray-500 text-sm mb-6">
          <div>{t.TaskName}</div>
          <div>{t.TaskType}</div>
          <div>{t.DateTime}</div>
        </div>)
        })
}
      </div>
    </>
  );
};

export default Task;
