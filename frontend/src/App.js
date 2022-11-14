/* eslint-disable linebreak-style */
import './App.css';
import { useState } from 'react';
import { Users } from './components/Users';
import { postUser } from './query/user';

function App() {
	const [name, setName] = useState([]);

	function handlePost(event) {
		event.preventDefault();
		console.log(name);
		// eslint-disable-next-line no-console
		postUser(name).then((u) => console.log(u));
	}
	return (
		<div className="App">
			<Users />
			<form onSubmit={handlePost}>
				<input
					type="text"
					name="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default App;