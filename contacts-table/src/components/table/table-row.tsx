import { AppRoute } from '@utils/constant';
import { Contact } from '@frontend-types/contact.interface';
import { useNavigate } from 'react-router-dom';
import { formatPhoneNumber } from '@/utils/helpers';

type TableRowProps = {
    contact: Contact;
};

function TableRow({ contact }: TableRowProps): JSX.Element {
    const { id, name, email, phone } = contact;
    const formattedPhone = formatPhoneNumber(phone,'view')
    const navigate = useNavigate();
    const handleRedirect = () => {
      navigate(`${AppRoute.EditContact}/${id}`);
    };
    return (
        <div className='contacts-table__row' onClick={handleRedirect}>
            <p className='contacts-table__row-cell'>{name}</p>
            <p className='contacts-table__row-cell'>{email}</p>
            <p className='contacts-table__row-cell'>{formattedPhone}</p>
        </div>
    );
}
export default TableRow;
