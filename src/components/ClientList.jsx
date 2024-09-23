// src/components/ClientList.js

import {useState, useEffect} from "react";
import {FetchRequest} from "../services/fetchRequest";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
import {
	Box,
	Button,
	ButtonGroup,
	Input,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr
} from "@chakra-ui/react";
import {DeleteIcon, ViewIcon} from "@chakra-ui/icons";

const ClientList = () => {
	const [loading, setLoading] = useState(true);
	const [clients, setClients] = useState([]);

	useEffect(() => {
		const fetchClients = async () => {
			try {
				const userId = localStorage.getItem("userId");
				const response = await FetchRequest.get(`/api/users/${userId}/clients`)
												   .withAuthorization()
												   .send();
				setClients(response);
				setLoading(false);
			} catch (error) {
				toast.error("Erreur lors de la récupération des clients.");
				setLoading(false);
			}
		};

		fetchClients();
	}, [setClients]);

	if (loading) {
		return <p>Chargement des clients...</p>;
	}

	return (
		<div className="client-list-container">
			<h2>Mes Clients</h2>
			{clients.length > 0 ? (<CustomerTable clients={clients}/>) :
				(<p>Vous n'avez pas encore de clients.</p>)}
		</div>
	);
};

function CustomerTable({clients}) {
	const [displayedClients, setDisplayedClients] = useState(clients);
	const [filter, setFilter] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const filtered = clients.filter(client => client.firstName.toLowerCase().includes(filter.toLowerCase())
			|| client.lastName.toLowerCase().includes(filter.toLowerCase())
			|| client.email.toLowerCase().includes(filter.toLowerCase())
			|| client.phone.toLowerCase().includes(filter.toLowerCase()));

		setDisplayedClients(filtered);
	}, [filter]);

	const handleRemoveClient = async (clientId) => {
		if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) {
			return;
		}

		try {
			const userId = localStorage.getItem("userId");
			console.log(
				`Removing client. Coach ID: ${userId}, Client ID: ${clientId}`
			);

			await FetchRequest.delete(
				`/api/users/${userId}/remove-client/${clientId}`
			)
							  .withAuthorization()
							  .send();

			setDisplayedClients(clients.filter((client) => client._id !== clientId));
			toast.success("Client supprimé avec succès !");
		} catch (error) {
			console.error("Erreur lors de la suppression du client:", error);
			toast.error("Erreur lors de la suppression du client.");
		}
	};

	return (
		<TableContainer>
			<Box>
				<Input placeholder='Search for a customer' onChange={(e) => setFilter(e.target.value)}/>
			</Box>
			<Table variant="simple">
				<Thead>
					<Tr>
						<Th>First name</Th>
						<Th>Last name</Th>
						<Th>Email</Th>
						<Th>Phone</Th>
						<th>Actions</th>
					</Tr>
				</Thead>
				<Tbody>
					{displayedClients.map((client) => (
						<Tr>
							<Td>{client.firstName}</Td>
							<Td>{client.lastName}</Td>
							<Td>{client.email}</Td>
							<Td>{client.phone}</Td>
							<Td>
								<ButtonGroup>
									<Button colorScheme={"red"} LeftIcon={<DeleteIcon/>}
											onClick={() => handleRemoveClient(client._id)}>Supprimer</Button>
									<Button colorScheme={"blue"} LeftIcon={<ViewIcon/>}
											onClick={() => navigate(`/clients/${client._id}`)}>Details</Button>
								</ButtonGroup>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
}

export default ClientList;
