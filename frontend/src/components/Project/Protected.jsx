import { useSelector } from "react-redux";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { selectUser } from "../../Redux/slices/userSlice";

export const Protected = () => {
  const { isOwner } = useSelector(selectUser);
  const { projectId } = useParams();
  return (
    <>{isOwner ? <Outlet /> : <Navigate to={`/project/${projectId}`} />}</>
  );
};
