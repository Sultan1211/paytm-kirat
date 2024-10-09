export function InputBox({title,placeholder}){
    return <div className="flex flex-col mt-2">
      <div className="font-semibold text-left py-2">{title}</div>
      <div><input className="w-full border rounded" placeholder={placeholder}></input></div>
      
  
    </div>
  }
  