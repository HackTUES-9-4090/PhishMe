import { useAppContext } from "../contexts/ContextProvider";
import request from "../utils/requests";

function useFetch() {
	const {
		loading: { setLoadingState },
		error: { setErrorState },
	} = useAppContext();

	async function fetchData(method, url, body) {
		setLoadingState({ loading: true });
		setErrorState({ errors: [] });

		const { isSuccessful, errors, data } = await request(method, url, body);

		setLoadingState({ loading: false });
		console.log(data);
		if (isSuccessful) return data;

		setErrorState({ errors });

		return null;
	}

	return { fetchData };
}

export default useFetch;
