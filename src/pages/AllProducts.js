import { UserContext } from '../contexts/UserContext'
import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import ProductList from '../components/ProductList'



const AllProducts = () => {

    const {userState} = useContext(UserContext)
    const [user] = userState

    const [allProducts, setAllProducts] = useState([])

    const getAllProducts = async () => {
        const userId = localStorage.getItem('userId')
        let response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}products`, {
            headers: {
                Authorization: userId
            }
        })
        console.log(response)
        setAllProducts(response.data.products)
    }

    useEffect(() => {
        getAllProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps  
    }, [])


    return (
        <div className="all-products-container">
            { allProducts.length > 0 ?
            <ProductList allProducts={allProducts} /> 
            :
            <div>Loading...</div>
            }
        </div>
    )
}


export default AllProducts