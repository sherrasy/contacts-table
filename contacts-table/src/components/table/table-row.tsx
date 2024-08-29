import { Contact } from '@frontend-types/contact.interface';

type TableRowProps = {
    contact: Contact;
};

function TableRow({ contact }: TableRowProps): JSX.Element {
    const { name, email, phone } = contact;
    return (
        <div className='contacts-table__row' >
            <p>{name}</p>
            <p>{email}</p>
            <p>{phone}</p>
        </div>
    );
}
export default TableRow;
