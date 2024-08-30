import { ContactFieldName, sortingParams } from '@/utils/constant';
import Arrow from '@assets/icon/arrow.svg';
import { useState } from 'react';
import TableRow from './table-row';
import { Contact } from '@frontend-types/contact.interface';

type TableProps = {
  contacts: Contact[]|null;
};

function Table({contacts}:TableProps): JSX.Element {
  const [sorting, setSorting]  = useState<null|string>(null)
  const arrowClassName = !sorting ? 'sort-arrow--none' : sorting === sortingParams[0] ? 'sort-arrow--reverse' : 'sort-arrow';
 
  const handleSortingChange =()=> {
  switch (sorting) {
    case sortingParams[0]:
      setSorting(sortingParams[1]);
      break;
    case sortingParams[1]:
      setSorting(sortingParams[0]);
      break;
    default:
      setSorting(sortingParams[1]);
      break;
  }
 }
  return (
    <>
      <div className='main-page__table contacts-table'>
        <div className='contacts-table__header-row'>
          <p className='contacts-table__header-row-cell'onClick={handleSortingChange}>
            <span >{ContactFieldName.Name}</span> 
            <img className={arrowClassName} src={Arrow} alt="" />
          </p>
          <p className='contacts-table__header-row-cell'>{ContactFieldName.Email}</p>
          <p className='contacts-table__header-row-cell'>{ContactFieldName.Phone}</p>
        </div>
        {contacts?.map((contact) => <TableRow contact={contact} key={contact.id}/>)}
      </div>
    </>
  );
}
export default Table;
