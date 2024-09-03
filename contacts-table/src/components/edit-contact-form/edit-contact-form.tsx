import { FormData } from '@/types/form-data.type';
import { validateFormData } from '@/utils/helpers';
import { Contact } from '@frontend-types/contact.interface';
import { editContact } from '@store/contacts-data/api-actions';
import { getHasPostingError, getIsPosting } from '@store/contacts-data/selectors';
import { AppMessage, AppRoute, ContactFieldName, FormFieldName } from '@utils/constant';
import { useAppDispatch, useAppSelector } from '@utils/hooks';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type EditContactFormProps = {
  contact: Contact;
};

function EditContactForm({ contact }: EditContactFormProps): JSX.Element {
  const {id, name, email, phone } = contact;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({name,phone,email});
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

  const handleFormSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const validationResults = validateFormData(formData);
    const isValid = !Object.values(validationResults).includes(false);
    if (isValid) {
      setInvalidMessage('');
      await dispatch(editContact({...formData, id})).then(
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
            defaultValue={name}
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
            defaultValue={email}
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
            defaultValue={phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          className='contact-form__button'
          type='submit'
          disabled={isPosting}
        >
          <span>Редактировать контакт</span>
        </button>
        {hasError && <p className='contact-form__error'>{AppMessage.Error}</p>}
        {invalidMessage && <p className='contact-form__error' >{invalidMessage}</p>}
      </form>
    </div>
  );
}
export default EditContactForm;
