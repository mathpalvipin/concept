

const Cell =({i,j,index})=>{
    const number= (i)*10+j;
    return (
        <div className=" h-full w-full flex justify-center text-xs items-center border border-black-500">
           {i},{j} ,{index }
        </div>
    )
}
export default Cell;