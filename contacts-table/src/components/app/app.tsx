import { RouteObject, RouterProvider} from 'react-router-dom';
import { createBrowserRouter } from "react-router-dom";
import { AppMessages, AppRoute } from "@utils/constant";
import MainPage from '@/pages/main-page';
import AddContactPage from '@/pages/add-contact-page';
const routes : RouteObject[] = [{
    path:AppRoute.Main,
    element:<MainPage />,
    errorElement: <p>{AppMessages.Error}</p>
}, {
    path:AppRoute.AddContact,
    element:<AddContactPage />
}, 
]
const router = createBrowserRouter(routes);


function App(): JSX.Element {
    return <RouterProvider router={router}/>;
}

export default App;
