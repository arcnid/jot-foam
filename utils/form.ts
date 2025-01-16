import JotForm from "jotform";

export const createFormFromTemplate = async ({
	templateForm,
	userData,
	client,
}: {
	templateForm: string;
	userData: any;
	client: JotForm;
}) => {
	//template form is going to be an id that we can use to extract all of the data from teh jotform form
	//userdata is going to be the data that we want to populate the form with
	//we wanna first gather all the fields from the template form

	const formActionMapping = {
		"250130089394152": () => {
			updateFormWithUserData({});
		},
	};

	const clone = await client.form.clone(templateForm);

	const newForm = clone.content.id as string;

	const currentName = clone.content.title;

	const newName = `${userData.employee} - ${currentName}`;

	console.log("NewName", newName);
	console.log("newForm", newForm);

	// const questions = await client.form.getQuestions(newForm);
	// const webhook = await client.form.getWebhooks(newForm);
	// const properties = await client.form.getProperties(newForm);

	const sendObject = {
		properties: {
			title: newName,
		},
	};
	const fetchDetails = await fetch(
		"https://api.jotform.com/form/" + newForm + "/properties",
		{
			method: "PUT",
			headers: {
				APIKEY: "bbae8f2589097111e283fbc1648fd8f2",
				"content-type": "application/json",
			},
			body: JSON.stringify(sendObject),
		}
	);

	const fetchResponse = await fetchDetails.json();

	const formDetails = await client.form.get(newForm);

	const newLink = await updateFormWithUserData({
		client,
		newForm,
		userData,
	});

	const newFormDetails = {
		newForm,
		formDetails,
		fetchResponse,
		newLink,
	};

	return newFormDetails;
};

interface UserData {
	first_ame: string;
	last_ame: string;
	email: string;
	address1: string;
	address2: string;
	city: string;
	state: string;
	zip: string;
	phone: string;
	position: string;
	team: string;
}

const formatString = (str: string): string => {
	return encodeURIComponent(str).replace(/%20/g, "%");
};

const updateFormWithUserData = async ({
	client,
	newForm,
	userData,
}: {
	client: JotForm;
	newForm: string;
	userData: UserData;
}) => {
	//get a list of all questions on the form before we do anything, just to ensure we can map them all or cause an error if not
	const questions = await client.form.getQuestions(newForm);

	//create an array of all the questions
	const newLink = `https://form.jotform.com/${newForm}?fullName[first]=${userData.first_name}&fullName[last]=${userData.last_name}&contactNumber=(555)%20123-4567&emailAddress=${userData.email}&address[addr_line1]=123%20Main%20St&address[city]=New%20York&address[state]=NY&address[postal]=10001&whatServices=I%20am%20interested%20in%20consultation%20services.&wouldYou=Yes&anyOther=01-15-2025%2010:00%20AM`;

	return newLink;
};
