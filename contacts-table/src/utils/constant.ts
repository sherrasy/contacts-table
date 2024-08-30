export const sortingParams = ['asc', 'desc'];

export const ApiConnectParam = {
    Url: 'https://my-json-server.typicode.com/sherrasy/mock_api/contacts',
    Timeout: 5000
  };

  export const AppMessage = {
    Loading: 'Загрузка...',
    Error: 'Произошла ошибка. Попробуйте снова.',
  } as const;

  export const ContactFieldName = {
    Name: 'Имя',
    Email: 'Email',
    Phone: 'Телефон',
  } as const;

  export const FormFieldName = {
    Name: 'name',
    Email: 'email',
    Phone: 'phone',
  } as const;

  export const ValidationPattern = {
    Email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,5}$/,
    Phone: '',
  } as const;

  export const AppRoute = {
    Main: '/',
    AddContact: '/add-contact',
    EditContact: '/edit-contact',
  } as const;

export const REDUCER_NAME = 'CONTACTS'

  export const ApiActionName = {
    FetchContacts: 'fetch-contacts',
    AddContact: 'add-contact',
    EditContact: 'edit-contact',
  } as const;
  