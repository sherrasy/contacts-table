import { formatPhoneNumber, validateFormData } from '@/utils/helpers';
import { addContact } from '@store/contacts-data/api-actions';
import {
  getHasPostingError,
  getIsPosting,
} from '@store/contacts-data/selectors';
import {
  AppMessage,
  AppRoute,
  ContactFieldName,
  FormFieldName,
} from '@utils/constant';
import { useAppDispatch, useAppSelector } from '@utils/hooks';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddContactForm(): JSX.Element {
  const contactDataDefault = {
    name: '',
    email: '',
    phone: '',
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(contactDataDefault);
  const [invalidMessage, setInvalidMessage] = useState('');
  const isPosting = useAppSelector(getIsPosting);
  const hasError = useAppSelector(getHasPostingError);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const getValidationErrorMessage = (validationResults: {
    [key: string]: boolean;
  }) => {
    const fields = Object.entries(validationResults).reduce((acc: string[], [key, value]) => {
      if (value === false) {
        acc.push(` ${key}`);
      }
      return acc;
    }, []);
    return `${AppMessage.ErrorValidation}:${fields}.`
  }

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const validationResults = validateFormData(formData);
    const isValid = !Object.values(validationResults).includes(false);
    if (isValid) {
      setInvalidMessage('');
      dispatch(addContact({ ...formData, phone: formatPhoneNumber(formData.phone) })).then(
        (res) =>
          res.meta.requestStatus === 'fulfilled' && navigate(AppRoute.Main)
      );
    } else {
      const message = getValidationErrorMessage(validationResults);
      setInvalidMessage(message);
    }
  };

  return (
    <div className='contact-form'>
      <form method='post' action='/' onSubmit={handleFormSubmit}>
        <div className='contact-form__input form-input'>
          <label htmlFor={FormFieldName.Name}>
            <span className='form-input__label'>{ContactFieldName.Name}</span>
            <span className='form-input__label-required'>*</span>
          </label>
          <input
            type='text'
            name={FormFieldName.Name}
            className='form-input__input'
            placeholder='Иванов Иван Иванович'
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='contact-form__input form-input'>
          <label htmlFor={FormFieldName.Email}>
            <span className='form-input__label'>{ContactFieldName.Email}</span>
            <span className='form-input__label-required'>*</span>
          </label>
          <input
            type='email'
            name={FormFieldName.Email}
            className='form-input__input'
            placeholder='example@mail.com'
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='contact-form__input form-input'>
          <label htmlFor={FormFieldName.Phone}>
            <span className='form-input__label'>{ContactFieldName.Phone}</span>
            <span className='form-input__label-required'>*</span>
          </label>
          <input
            type='tel'
            name={FormFieldName.Phone}
            className='form-input__input'
            placeholder='+7 999 999-99-99'
            onChange={handleInputChange}
            value={formData.phone}
            required
          />
        </div>
        <button
          className='contact-form__button'
          type='submit'
          disabled={isPosting}
        >
          <span className='contact-form__button-text'>Добавить контакт</span>
        </button>
        {hasError && <p className='contact-form__error'>{AppMessage.Error}</p>}
        {invalidMessage && <p className='contact-form__error' >{invalidMessage}</p>}
      </form>
    </div>
  );
}
export default AddContactForm;
