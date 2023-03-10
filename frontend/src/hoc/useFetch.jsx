import { useAppContext } from "../contexts/ContextProvider";
import request from "../utils/requests";

function useFetch() {
	const {
		loading: { setLoadingState },
		error: { setErrorState },
	} = useAppContext();

	async function fetchData(method, url, body) {
		setLoadingState(true);

		const { isSuccessful, errors, data } = await request(method, url, body);

		setLoadingState(true);

		if (isSuccessful) return data;

		setErrorState({ errors });
	}

	return { fetchData };
}

export default useFetch;
