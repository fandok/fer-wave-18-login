import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        navigate("/login");
      }

      try {
        const response = await fetch(
          "https://api-car-rental.binaracademy.org/customer/v2/order",
          {
            headers: {
              access_token: user.access_token,
            },
          }
        );
        const dataOrders = await response.json();
        setOrders(dataOrders.orders);
      } catch (e) {
        console.error(e);
      }
    };

    fetchOrders();
  }, [navigate]);

  return (
    <ul>
      {orders.map((order, index) => {
        return <li key={index}>{order.total_price}</li>;
      })}
    </ul>
  );
};

export default Dashboard;
