import { getIsLoading } from "@store/contacts-data/selectors";
import { AppMessage, AppRoute } from "@utils/constant";
import { useAppSelector } from "@utils/hooks";
import { useNavigate } from "react-router-dom";

function ErrorMessage(): JSX.Element {
    const isLoading = useAppSelector(getIsLoading);
    const navigate = useNavigate();
    const handleRedirect = () => {
      navigate(AppRoute.Main);
    };
    if(isLoading){
        return <></>;
    } 
       return (
      <div className="error-message">
        <p className="error-message__info">{AppMessage.Error}</p>
        <p className="error-message__back-link" onClick={handleRedirect}>На главную</p>
        </div>
    );
  }
  export default ErrorMessage;