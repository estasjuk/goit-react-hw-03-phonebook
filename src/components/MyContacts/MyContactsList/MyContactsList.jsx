import PropTypes from 'prop-types';

import css from './MyContactsList.module.css';

const MyContactList = ({ removeContact, contacts }) => {
  const items = contacts.map(({ id, name, number }) => (
    <li className={css.item} key={id}>
      {name}: {number}
      <button
        className={css.btn}
        onClick={() => removeContact(id)}
        type="button"
      >
        Delete
      </button>
    </li>
  ));

  return <ol className={ css.list}>{items}</ol>;
};

export default MyContactList;

MyContactList.defaultProps = {
  contacts: [],
};

MyContactList.propTypes = {
  removeContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
