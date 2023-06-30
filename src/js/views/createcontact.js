import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/createcontact.css";


const CreateContact = () => {

	const { store, actions } = useContext(Context);
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");

	const onSubmit = () => {
		if (fullName === "") {
			alert('Enter Full Name');
		} else if (email === "" || !email.includes('@')) {
			alert('Enter correct Email');
		} else if (phone === "" || phone.length !== 10) {
			alert('Enter correct Phone Number');
		} else if (address === "") {
			alert('Enter a valid Adress');
		} else {

			const contact = {
				"full_name": fullName,
				"email": email,
				"agenda_slug": store.agenda,
				"address": address,
				"phone": phone
			};

			fetch('https://assets.breatheco.de/apis/fake/contact/', {
				method: 'post',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(contact)
			})
				.then(res => {
					console.log(res.ok); // will be true if the response is successfull
					console.log(res.status); // the status code = 200 or code = 400 etc.
					console.log(res); // will try return the exact result as string
					return res.json();
				})
				.then(() => {
					console.log("até aqui bem");
					setFullName('');
					setEmail('');
					setPhone('');
					setAddress('');
					alert('Contact added succesfully');
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	return (
		<div className="AddContact">
			<div className="newContact">New Contact</div>
			<div className="container">
				<div class="row g-3 mt-5">
					<div class="col-12">
						<label for="fullName" class="form-label">Full Name</label>
						<input
							type="text"
							class="form-control"
							placeholder="Enter your Full Name"
							id="fullName"
							value={fullName}
							onChange={(e) => setFullName(e.target.value)} />
					</div>
					<div class="col-12">
						<label for="email" class="form-label">Email</label>
						<input
							type="text"
							class="form-control"
							placeholder="Enter Email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)} />
					</div>
					<div class="col-12">
						<label for="phone" class="form-label">Phone</label>
						<input
							type="text"
							class="form-control"
							placeholder="Enter Phone"
							id="phone"
							value={phone}
							onChange={(e) => setPhone(e.target.value)} />
					</div>
					<div class="col-12">
						<label for="address" class="form-label">Address</label>
						<input
							type="text"
							class="form-control"
							placeholder="Enter Adress"
							id="address"
							value={address}
							onChange={(e) => setAddress(e.target.value)} />
					</div>
					<div className="d-grid">
						<button type="submit" onClick={onSubmit} class="btn btn-primary">Save</button>
					</div>				
				</div>
			</div>
			<div className="backContacts">
						<Link to="/">Get back to contacts</Link>
			</div>
		</div>
	);
}

export default CreateContact;
