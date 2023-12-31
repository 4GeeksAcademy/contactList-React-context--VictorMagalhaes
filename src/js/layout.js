import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home  from "./views/home.js";
import injectContext from "./store/appContext";
import CreateContact from "./views/createcontact.js";
import SingleContact from "./views/singlecontact.js";
import EditContact from "./views/editcontact.js";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/createcontact" element={<CreateContact />} />
						<Route path="/contact/:id" element={<SingleContact />} />
						<Route path="/edit-contact/:id" element={<EditContact />} />
						<Route path="*" element={<h1>Not found!</h1>} />
					</Routes>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
