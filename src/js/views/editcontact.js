import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";


import "../../styles/editcontact.css";

const EditContact = () => {

	const { store, actions } = useContext(Context);
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const params = useParams();

	useEffect(() => {
        fetchSingleContact();
    }, [])

    const fetchSingleContact = () =>{
        fetch('https://assets.breatheco.de/apis/fake/contact/' + params.id, {
      	method: 'get',
      	headers: {
        "Content-Type": "application/json"
      	}
    	})
    	.then(res =>{
			console.log(res.ok); // will be true if the response is successfull
			console.log(res.status); // the status code = 200 or code = 400 etc.
			console.log(res); // will try return the exact result as string
			return res.json();
			})
		.then(data =>{ 
			console.log(data);		
            setFullName(data.full_name);
			setEmail(data.email);
			setPhone(data.phone);
			setAddress(data.address)
		})
		.catch((error)=>{
			console.log(error);
		});
    }

	const onSubmit = () => {
		if(fullName === "" ) {
			alert ('Enter Full Name')
		} else if(email === "" || !email.includes('@')){
			alert ('Enter correct Email')
		} else if(phone === "" || phone.length !== 10){
			alert ('Enter correct Phone Number')
		} else if(address === ""){
			alert ('Enter a valid Adress')
		} else{

			const contact = {
				"full_name": fullName,
				"email": email,
				"agenda_slug": store.agenda,
				"address": address,
				"phone": phone
		}
		fetch('https://assets.breatheco.de/apis/fake/contact/'+ params.id, {
			method: 'put',			
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(contact)
			})
			.then(res =>{
			console.log(res.ok); // will be true if the response is successfull
			console.log(res.status); // the status code = 200 or code = 400 etc.
			console.log(res); // will try return the exact result as string
			return res.json();
			})
			.then(data => {		 
				console.log(data); 
				setFullName('');
				setEmail('');
				setPhone('');
				setAddress('');
				alert('Changes made succesfully')
			})
			.catch((error) => {
				console.log(error);
			});
		}
	}

	return (
		<div className="AddContact">
			<div className="newContact">Edit Contact</div>
			<div className="container">
					<div class="row g-3 mt-5">
						<div class="col-12">
							<label for="fullName" class="form-label">Full Name</label>
							<input 
								type="text" 
								class="form-control" 
								placeholder="Enter full name"
								id="fullName" 
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
								/>					
						</div>
						<div class="col-12">
							<label for="email" class="form-label">Email</label>
							<input 
								type="text" 
								class="form-control" 
								placeholder="Enter email"
								id="email" 
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>					
						</div>
						<div class="col-12">
							<label for="phone" class="form-label">Phone</label>
							<input 
								type="text" 
								class="form-control" 
								placeholder="Enter your phone"
								id="phone" 
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>	
						</div>
						<div class="col-12">
							<label for="address" class="form-label">Address</label>
							<input 
								type="text" 
								class="form-control" 
								placeholder="Enter your address"
								id="address" 
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>					
						</div>
						<div className="d-grid">
						<button type="submit" onClick={onSubmit} class="btn btn-primary">Update</button>
						</div>
					</div>		
			</div>
			<div className="backContacts">
					<Link to="/">Get back to contacts</Link>
			</div>
		</div>
	);
};

export default EditContact;