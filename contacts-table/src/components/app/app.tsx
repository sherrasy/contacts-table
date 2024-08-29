import { RouteObject, RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { AppMessages, AppRoute } from '@utils/constant';
import MainPage from '@pages/main-page';
import AddContactPage from '@pages/add-contact-page';
import { useAppDispatch } from '@utils/hooks';
import { useEffect } from 'react';
import { fetchContacts } from '@store/contacts-data/api-actions';

const routes: RouteObject[] = [
  {
    path: AppRoute.Main,
    element: <MainPage />,
    errorElement: <p>{AppMessages.Error}</p>,
  },
  {
    path: AppRoute.AddContact,
    element: <AddContactPage />,
  },
];

const router = createBrowserRouter(routes);

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
