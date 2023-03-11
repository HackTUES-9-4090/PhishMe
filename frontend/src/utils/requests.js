import axios from "axios";
import { serverURL } from "../config";

const instance = axios.create({ baseURL: serverURL, withCredentials: true });

export default async function request(method, request, body, config = null) {
	try {
		return {
			isSuccessful: true,
			data: (await instance[method](request, body, config)).data,
		};
	} catch (err) {
		const message = err.response.data?.message;
		return {
			isSuccessful: false,
			errors: message?.length ? message : [message] || [err.message],
		};
	}
}
