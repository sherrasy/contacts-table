import { createHashRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { AppRoute } from '@utils/constant';
import MainPage from '@pages/main-page/main-page';
import AddContactPage from '@pages/add-contact-page/add-contact-page';
import { useAppDispatch } from '@utils/hooks';
import { useEffect } from 'react';
import { fetchContacts } from '@store/contacts-data/api-actions';
import EditContactPage from '@/pages/edit-contact-page/edit-contact-page';
import ErrorMessage from '../error-message/error-message';

const routes: RouteObject[] = [
  {
    path: AppRoute.Main,
    element: <MainPage />,
    errorElement: <ErrorMessage/>,
  },
  {
    path: AppRoute.AddContact,
    element: <AddContactPage />,
    errorElement: <ErrorMessage/>,
  },
  {
    path: `${AppRoute.EditContact}/:id`,
    element: <EditContactPage />,
    errorElement: <ErrorMessage/>,
  },
];

const router = createHashRouter(routes);

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
