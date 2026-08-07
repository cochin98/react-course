import axios from 'axios'
import { useState, useEffect, Fragment } from 'react'
import './OrdersPage.css'
import { Header } from '../components/Header'
import BuyAgainIcon from '../assets/images/icons/buy-again.png';
import dayjs from 'dayjs';
import { formatMoney } from '../utils/money'


export function OrdersPage({ cart }) {

    const [orders, setOrders] = useState([])

    useEffect(() => {

        axios.get('/api/orders?expand=products')
            .then((response) => {
                setOrders(response.data)
            })
    }, [])

    const order1 = {
    "id": "27cba69d-4c3d-4098-b42d-ac7fa62b7664",
    "orderTimeMs": 1723456800000,
    "totalCostCents": 3506,
    "products": [
      {
        "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        "quantity": 1,
        "estimatedDeliveryTimeMs": 1723716000000,
        "product": {
          "keywords": [
            "socks",
            "sports",
            "apparel"
          ],
          "id": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          "image": "images/products/athletic-cotton-socks-6-pairs.jpg",
          "name": "Black and Gray Athletic Cotton Socks - 6 Pairs",
          "rating": {
            "stars": 4.5,
            "count": 87
          },
          "priceCents": 1090,
          "createdAt": "2026-08-04T11:44:26.204Z",
          "updatedAt": "2026-08-04T11:44:26.204Z"
        }
      },
      {
        "productId": "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        "quantity": 2,
        "estimatedDeliveryTimeMs": 1723456800000,
        "product": {
          "keywords": [
            "tshirts",
            "apparel",
            "mens"
          ],
          "id": "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
          "image": "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
          "name": "Adults Plain Cotton T-Shirt - 2 Pack",
          "rating": {
            "stars": 4.5,
            "count": 56
          },
          "priceCents": 799,
          "createdAt": "2026-08-04T11:44:26.206Z",
          "updatedAt": "2026-08-04T11:44:26.206Z"
        }
      }
    ],
    "createdAt": "2026-08-04T11:44:26.204Z",
    "updatedAt": "2026-08-04T11:44:26.204Z"
  }

  console.log(order1)

    return (

        <>
            <title>Orders</title>
            <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />

            <Header cart={cart} />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <div className="orders-grid">

                    {orders.map((order) => {

                        return (
                            <div className="order-container">

                                <div key={order.id} className="order-header">
                                    <div className="order-header-left-section">
                                        <div className="order-date">
                                            <div className="order-header-label">Order Placed:</div>
                                            <div>{dayjs(order.orderTimeMs).format('MMMM D')}</div>
                                        </div>
                                        <div className="order-total">
                                            <div className="order-header-label">Total:</div>
                                            <div>{formatMoney(order.totalCostCents)}</div>
                                        </div>
                                    </div>

                                    <div className="order-header-right-section">
                                        <div className="order-header-label">Order ID:</div>
                                        <div>{order.id}</div>
                                    </div>
                                </div>

                                <div className="order-details-grid">
                                    {order.products.map((orderProduct) => {
                                        return (
                                            <Fragment key={orderProduct.product.id}>
                                                <div className="product-image-container">
                                                    <img src={orderProduct.product.image} />
                                                </div>

                                                <div className="product-details">
                                                    <div className="product-name">
                                                        {orderProduct.product.name}
                                                    </div>
                                                    <div className="product-delivery-date">
                                                        Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                                                    </div>
                                                    <div className="product-quantity">
                                                        Quantity: {orderProduct.quantity}
                                                    </div>
                                                    <button className="buy-again-button button-primary">
                                                        <img className="buy-again-icon" src={BuyAgainIcon} />
                                                        <span className="buy-again-message">Add to Cart</span>
                                                    </button>
                                                </div>

                                                <div className="product-actions">
                                                    <a href="/tracking">
                                                        <button className="track-package-button button-secondary">
                                                            Track package
                                                        </button>
                                                    </a>
                                                </div>
                                            </Fragment>
                                        )
                                    })}
                                    
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </>
    )
}