import Errors from "../../components/Errors/Errors";
import Loading from "../../components/Loading/Loading";
import { useAppContext } from "../../contexts/ContextProvider";

export default function MetaProvider({ children }) {
  const {
    loading: {
      loadingState: { loading },
    },
    error: {
      errorState: { errors },
    },
  } = useAppContext();

  return (
    <>
      {loading ? <Loading /> : null}
      {children}
      {errors ? <Errors errors={errors} /> : null}
    </>
  );
}
