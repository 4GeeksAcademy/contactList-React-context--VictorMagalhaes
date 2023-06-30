import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "../../styles/home.css";

const Home = () => {
	const {store, actions} = useContext(Context);
	const [contactList,setContactList] = useState([])
	const navigate = useNavigate()

	useEffect(() => {	
		initializeAgenda()	
		getContacts()
	},[])

	const initializeAgenda = () => {
		actions.changeAgenda('4Geeks_Agenda')
	}

	const getContacts = () => {
		fetch('https://assets.breatheco.de/apis/fake/contact/agenda/' + store.agenda,  {
      	method: 'get',
      	headers: {
        "Content-Type": "application/json"
      	}
    	})
    	.then((res) => { 
			console.log(res.ok); // will be true if the response is successfull
			console.log(res.status); // the status code = 200 or code = 400 etc.
			console.log(res); 
			return res.json();
		})
		.then((data) => { 
			console.log("até aqui bem");
			setContactList(data);		
		})
		.catch(error=> {
			console.log(error);
		});
    }

	const deleteContact=(contactId) => {
		fetch('https://assets.breatheco.de/apis/fake/contact/' + contactId,  {
		method: 'delete',
		headers: {
			"Content-Type": "application/json"
		}
    	})
		.then(res => {
			console.log(res.ok); // will be true if the response is successfull
			console.log(res.status); // the status code = 200 or code = 400 etc.
			console.log(res); 
			console.log(res.ok); 
			return res.json(); 
		})
		.then(data => {
			console.log(data);
			getContacts("")
			alert('Contact deleted with succes')
		})
		.catch(error => {
			console.log(error);
		});
	}

	const allContacts = () => {
		return contactList.map((item, index) => {
			return (
				<li
					key={index}
					className="list-group-item d-flex"
					>
						<div>
							<img className="avatar" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"></img>
						</div>
						<div className="contact_data">
							<div className="contact_name">
								<Link to={'/contact/' + item.id}>
								<p>{item.full_name}</p>
								</Link>
							</div>
							<div className="contacts_data">
								<p><i class="fas fa-envelope"></i> {item.email}</p>
								<p><i class="fas fa-phone"></i>  {item.phone}</p>
								<p><i class="fas fa-map-marker-alt"></i>  {item.address}</p>
							</div>
							
						</div>
						<div className="contact_buttons">
							<button className="btn m-2" onClick={() => navigate('/edit-contact/' + item.id)}>
								<i class="fas fa-pencil-alt"></i>
							</button>
							<button className="btn" onClick={() => deleteContact(item.id)}>
								<i class="fas fa-trash-alt"></i>
							</button>
						</div>
				</li>
			)			
		})
	
	}
	
	return(
		<div className="home_container">
				<div className="home_title d-flex justify-content-between">
					<h1>4Geeks Contact List</h1>
					<div className="add_contact">
						<button className="btn btn-success" onClick={() => navigate('/createcontact')}>
						Add new Contact
						</button>
					</div>
				</div>
				<div className="contacts_list">
					<ul className="contacts">
						{allContacts()}
					</ul>
				</div>	
		</div>
	);
};

export default Home;
