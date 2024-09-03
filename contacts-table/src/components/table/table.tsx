import Arrow from '@assets/icon/arrow.svg';
import { Contact } from '@frontend-types/contact.interface';
import { setCurrentSorting } from '@store/contacts-data/contacts-data';
import { getSorting } from '@store/contacts-data/selectors';
import { ContactFieldName, sortingParams } from '@utils/constant';
import { useAppDispatch, useAppSelector } from '@utils/hooks';
import { useEffect } from 'react';
import TableRow from './table-row';

type TableProps = {
  contacts: Contact[]|null;
};

function Table({contacts}:TableProps): JSX.Element {
  const dispatch = useAppDispatch()
  const sorting  = useAppSelector(getSorting)
  const arrowClassName = !sorting ? 'sort-arrow--none' : sorting === sortingParams[0] ? 'sort-arrow--reverse' : 'sort-arrow';
 
  const handleSortingChange =()=> {
  switch (sorting) {
    case sortingParams[0]:
      dispatch(setCurrentSorting(sortingParams[1]));
      break;
    case sortingParams[1]:
      dispatch(setCurrentSorting(sortingParams[0]));
      break;
    default:
      dispatch(setCurrentSorting(sortingParams[1]));
      break;
  }
 }

 useEffect(()=>{},[sorting])
  return (
      <div className='main-page__table contacts-table'>
        <div className='main-page__table-wrapper'>
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
      </div>
  );
}
export default Table;
