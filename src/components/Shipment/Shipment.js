import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = data => {
        // console.log('form submitted', data);
        const savedCart = getDatabaseCart();
        const orderDetails = { ...loggedInUser, products: savedCart, shiptment: data, orderTime: new Date() };


        fetch('https://rocky-waters-29487.herokuapp.com/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    processOrder();
                    alert('your order placed successfully')
                }
            })
    };
    console.log(watch("example"));

    return (
        < form className="ship-form" onSubmit={handleSubmit(onSubmit)} >
            < input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
            { errors.name && <span className="error">Name is required</span>}

            < input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your email" />
            { errors.email && <span className="error">Email is required</span>}

            < input name="address" defaultValue={loggedInUser.address} ref={register({ required: true })} placeholder="Your address" />
            { errors.address && <span className="error">Address is required</span>}

            < input name="phone" defaultValue={loggedInUser.phone} ref={register({ required: true })} placeholder="Your phone Number" />
            { errors.phone && <span className="error">Phone is required</span>}

            <input type="submit" />
        </form >
    );
};

export default Shipment;