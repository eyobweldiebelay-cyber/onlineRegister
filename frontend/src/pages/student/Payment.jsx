import React, { useEffect, useState } from "react";
import api from "../../api";


function Payment() {

  const [payment, setPayment] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [message, setMessage] = useState("");


  // GET PAYMENT
  const getPayment = async () => {

    try {

      const response = await api.get("/payments");

      setPayment(response.data.payment);

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Failed to load payment"
      );

    }
  };


  useEffect(() => {
    getPayment();
  }, []);


  // CREATE PAYMENT
  const makePayment = async () => {

    if (!paymentMethod) {

      setMessage("Please select payment method");

      return;
    }


    try {

      const response = await api.post("/payments",{paymentMethod: paymentMethod});

      setMessage(response.data.message);

      getPayment();
      
    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Payment failed"
      );

    }
  };


  // TEST PAYMENT
  const testPayment = async () => {

    try {

      const response = await api.post("/payments/test");

      setMessage(response.data.message);

     getPayment()

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Test payment failed"
      );

    }
  };


  return (
    <div>

      <h3 className="h3">PAYMENT</h3>


      <p className="p">
        Registration Fee: 5,000 ETB
      </p>


      <p className="p">
        Payment Status:
        {" "}
        {payment?.payment_status || "PENDING"}
      </p>


      <h3 className="h3">Payment Method</h3>


      <select className="select"
        value={paymentMethod}
        onChange={(e) =>
          setPaymentMethod(e.target.value)
        }
        disabled={payment?.payment_status === "paid"}
      >
        <option value="">
          Select Payment Method
        </option>

        <option value="telebirr">
          Telebirr
        </option>

        <option value="CBE">
          CBE
        </option>

      </select>


      <br />
      <br />


      {/* CREATE PENDING PAYMENT */}

      <button className="button"
        onClick={makePayment}
        disabled={
          !paymentMethod ||
          payment?.payment_status === "pending" ||
          payment?.payment_status === "paid"
        }
      >
        MAKE PAYMENT
      </button>


      <br />
      <br />


      {/* TEST PAYMENT */}

      <button
        onClick={testPayment}
        disabled={
          payment?.payment_status !== "pending"
        }
      >
        TEST PAYMENT
      </button>


      {message && (
        <p className="p">
          {message}
        </p>
      )}

    </div>
  );
}

export default Payment;