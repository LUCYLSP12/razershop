import axios from "axios";
import {createContext, useContext, useEffect, useState } from "react";

const initContext = createContext();





export const Context = ({children}) => {

  const PRODUCTS_URL = 'http://localhost:4090/products'
    const [user, setUser] = useState({
        email: "",
    })
    const [products, setProducts] = useState([])
    

    const fetchData = async ()=> {
      const {data} = await axios(PRODUCTS_URL);
      setProducts(data)
    }

    useEffect(()=> {
        if(localStorage.getItem('user') !== null){
          setUser(JSON.parse(localStorage.getItem("user")))
        
        }
        fetchData()
    }, [])

  






  return (
    <initContext.Provider value={{user, setUser, products, setProducts}}>{children}</initContext.Provider>
  )
}




export const GetContext = ()=> {
    return useContext(initContext)
}