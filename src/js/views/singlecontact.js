import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles/singlecontact.css";

const SingleContact = () => {
    const params = useParams();
    const [contact, setContact] = useState()

    useEffect(() => {
        fetchSingleContact();
    }, [])

    const fetchSingleContact = () =>{
        fetch('https://assets.breatheco.de/apis/fake/contact/' + params.id,  {
      	method: 'get',
      	headers: {
        "Content-Type": "application/json"
      	}
    	})
    	.then((res) => res.json())
		.then(data =>{ 
			console.log(data);		
            setContact(data)
		})
		.catch((error)=>{
			console.log(error);
		});
    }


    return(
       <div className="singlecontact_page"> 
        <div className="contact">
                <div>
					<img className="avatar_singlecontact" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"></img>
				</div>
                <div className="text">
                    {contact ? (
                        <div>
                            <h1>{contact.full_name}</h1>
                            <h2><i class="fas fa-envelope"></i> {contact.email}</h2>
                            <h2><i class="fas fa-phone"></i> {contact.phone}</h2>
                            <h2><i class="fas fa-map-marker-alt"></i> {contact.address}</h2>
                        </div>
                    ) : (
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    )
                    }
                </div>
                </div>
            <div>		
                <Link to="/" className="singlecontact_link">Get back to contacts</Link>
            </div>
        </div>
    )

};

export default SingleContact;