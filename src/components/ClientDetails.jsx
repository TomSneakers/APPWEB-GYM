import {useEffect, useState} from "react";
import {FetchRequest} from "../services/fetchRequest";
import {useParams, Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {
	Box,
	Button,
	ButtonGroup, Center, Flex, FormControl, Heading,
	Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td, Text,
	Th,
	Thead,
	Tr, useDisclosure
} from "@chakra-ui/react";
import {AddIcon, DeleteIcon, ViewIcon} from "@chakra-ui/icons";

const ClientDetails = () => {
	const {clientId} = useParams();
	const [client, setClient] = useState(null);
	const [workouts, setWorkouts] = useState([]);
	const {isOpen, onOpen, onClose} = useDisclosure();

	const [showForm, setShowForm] = useState(false); // État pour gérer l'affichage du formulaire
	const [newWorkout, setNewWorkout] = useState({
													 name: "",
													 exercises: [],
												 });

	useEffect(() => {
		const fetchClientDetails = async () => {
			try {
				const clientResponse = await FetchRequest.get(`/api/users/${clientId}`)
														 .withAuthorization()
														 .send();
				setClient(clientResponse);

				const workoutsResponse = await FetchRequest.get(
					`/api/clients/${clientId}/workouts-coach`
				)
														   .withAuthorization()
														   .send();
				setWorkouts(workoutsResponse);
			} catch (error) {
				toast.error(
					"Erreur lors de la récupération des informations du client."
				);
			}
		};

		fetchClientDetails();
	}, [clientId]);

	const handleCreateWorkout = async (response) => {
			setWorkouts([...workouts, response]); // Ajoute le nouvel entraînement à la liste
			setNewWorkout({name: "", exercises: []});
			setShowForm(false);
			onClose();
			toast.success("Entraînement créé avec succès !");
	};

	if (!client) {
		return <p>Chargement des détails du client...</p>;
	}

	return (
		<div>
			<Box bgColor={"gray.200"} width={"30%"} ml={"30"} p={5} borderRadius={20} mb={10}>
				<Center>
					<Heading as={"h3"} fontSize={"lg"}>
						Détails du client
					</Heading>
				</Center>
				<Flex justifyContent={"space-between"}>
					<Text>Nom : {client.firstName} {client.lastName}</Text>
					<Text>Tel : {client.phone}</Text>
				</Flex>
				<Flex justifyContent={"center"}>
					<Text>Email : {client.email}</Text>
				</Flex>
			</Box>

			<h3>Liste des entraînements</h3>
			{workouts.length > 0 ? (
				<TrainingsList trainings={workouts} clientId={clientId} onOpen={onOpen} onDelete={workoutId => setWorkouts(workouts.filter((workout) => workout._id !== workoutId))}/>
			) : (
				<p>Aucun entraînement trouvé pour ce client.</p>
			)}
			<CreateWorkoutModal clientId={clientId} onWorkoutAdded={handleCreateWorkout} isOpen={isOpen} onClose={onClose} />
		</div>
	);
};

function TrainingsList({trainings, clientId, onOpen, onDelete}) {
	const navigate = useNavigate();

	const handleDeleteWorkout = async (workoutId) => {
		if (
			!window.confirm("Êtes-vous sûr de vouloir supprimer cet entraînement ?")
		) {
			return;
		}

		try {
			await FetchRequest.delete(`/api/workouts-coach/${workoutId}`)
							  .withAuthorization()
							  .send();
			onDelete(workoutId);
			toast.success("Entraînement supprimé avec succès !");
		} catch (error) {
			toast.error("Erreur lors de la suppression de l'entraînement.");
		}
	};

	return (
		<TableContainer>
			<Box>
				<Button leftIcon={<AddIcon/>} onClick={onOpen}>Ajouter un entrainement</Button>
			</Box>
			<Table variant="simple">
				<Thead>
					<Tr>
						<Th>Name</Th>
						<Th>Nombres d'exercices</Th>
						<Th>Durée totale</Th>
						<th>Actions</th>
					</Tr>
				</Thead>
				<Tbody>
					{trainings.map((training) => (
						<Tr>
							<Td>{training.name}</Td>
							<Td>{training.exercises.length}</Td>
							<Td>{training.exercises.reduce(
								(total, exercise) => total + exercise.duration,
								0
							)}</Td>
							<Td>
								<ButtonGroup>
									<Button colorScheme={"red"} LeftIcon={<DeleteIcon/>}
											onClick={() => handleDeleteWorkout(training._id)}>Supprimer</Button>
									<Button colorScheme={"blue"} LeftIcon={<ViewIcon/>}
											onClick={() => navigate(`/clients/${clientId}/workouts/${training._id}`)}>Details</Button>
								</ButtonGroup>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
}

function CreateWorkoutModal({isOpen, onClose, clientId, onWorkoutAdded}) {
	const [workoutName, setWorkoutName] = useState("");

	async function addWorkout() {
		try {
			const response = await FetchRequest.post("/api/workouts-coach")
											   .withAuthorization()
											   .withBody({
															 name: workoutName,
															 exercises: [],
															 clientId
														 })
											   .send();
			onWorkoutAdded(response);
			toast.success("Entraînement créé avec succès !");
		} catch (error) {
			toast.error("Erreur lors de la création de l'entraînement.");
		}
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay/>
			<ModalContent>
				<ModalHeader>Création d'entrainement</ModalHeader>
				<ModalCloseButton/>
				<ModalBody>
					<FormControl>
						<Text>Quel nom pour cet entrainement ?</Text>
						<Input placeholder={"ex. dos/biceps"} onChange={e => setWorkoutName(e.target.value)}/>
					</FormControl>
				</ModalBody>

				<ModalFooter>
					<Button colorScheme="red" mr={3} onClick={onClose}>
						Close
					</Button>
					<Button colorScheme={"blue"} onClick={addWorkout}>Créer l'entrainement</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default ClientDetails;
