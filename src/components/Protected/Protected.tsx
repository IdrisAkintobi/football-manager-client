import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../../redux/hooks";
import { selectToken } from "../../redux/reducers/user.slice";

const Protected = () => {
  const token = useAppSelector(selectToken);
  return !token ? <Navigate to={"/"} /> : <Outlet />;
};

export default Protected;
