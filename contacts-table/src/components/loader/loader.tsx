import { AppMessage } from "@/utils/constant";

function Loader(): JSX.Element {
    return (
      <div className="main-page__loader"><p>{AppMessage.Loading}</p></div>
    );
  }
  export default Loader;