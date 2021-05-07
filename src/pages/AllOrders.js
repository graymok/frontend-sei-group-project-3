import { UserContext } from '../contexts/UserContext'
import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import SingleOrder from '../components/SingleOrder'

const AllOrders = () => {

    const {userState} = useContext(UserContext)
    const [user] = userState

    const [allOrders, setAllOrders] = useState([])

    const getAllOrders = async () => {
        const userId = localStorage.getItem('userId')
        let response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}orders`, {
            headers: {
                Authorization: userId
            }
        })
        console.log(response.data.orders)
        setAllOrders(response.data.orders)
    }

    useEffect(() => {
        getAllOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps  
    }, [])    

    return (
        <div className="orders-container">
            { allOrders ? allOrders.length === 0 ? <h1>no orders</h1> : allOrders.map((item, i) => {
                return (
                    <div key={i}>
                        <span>{item.address}</span>
                        <div>
                            {item.cart_items.map((cartItem, i) => {
                                return (
                                    <div key={i}>
                                        {cartItem.product.name}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            }) : <h1>Getting orders</h1>}
        </div>
    )
}


export default AllOrders