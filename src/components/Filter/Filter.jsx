import css from './Filter.module.scss';
import PropTypes from 'prop-types';

const Filter = function ({ filter, onChangeFilter }) {
  return (
    <div className={css.filter}>
      <p>Find contacts by name</p>
      <input
        className={css.input}
        type="text"
        name="filter"
        value={filter}
        onChange={onChangeFilter}
      />
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;
