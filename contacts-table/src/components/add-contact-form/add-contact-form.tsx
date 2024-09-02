import { validateFormData } from '@/utils/helpers';
import { addContact } from '@store/contacts-data/api-actions';
import { getIsPosting } from '@store/contacts-data/selectors';
import {
  AppRoute,
  ContactFieldName,
  FormFieldName
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
  const isPosting = useAppSelector(getIsPosting);
  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const validationResults = validateFormData(formData);
    const isValid = !Object.values(validationResults).includes(false);
    if (isValid) {
      dispatch(addContact(formData)).then(
        (res) =>
          res.meta.requestStatus === 'fulfilled' && navigate(AppRoute.Main)
      );
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
          <span>Добавить контакт</span>
        </button>
      </form>
    </div>
  );
}
export default AddContactForm;
