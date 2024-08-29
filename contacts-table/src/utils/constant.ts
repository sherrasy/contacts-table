export const sortingParams = ['asc', 'desc'];

export const ApiConnectParam = {
    Url: 'https://my-json-server.typicode.com/sherrasy/mock_api/contacts',
    Timeout: 5000
  };

  export const AppMessages = {
    Loading: 'Загрузка...',
    Error: 'Произошла ошибка. Попробуйте снова.',
  } as const;

  export const AppRoute = {
    Main: '/',
    AddContact: '/add-contact',
  } as const;

export const REDUCER_NAME = 'CONTACTS'

  export const ApiActionName = {
    FetchContacts: 'fetch-contacts',
    AddContact: 'add-contact',
    EditContact: 'edit-contact',
  } as const;
  