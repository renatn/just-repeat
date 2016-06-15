import React from 'react';
import classnames from 'classnames';

const Landing = ({ isVisible, onClick }) => (
  <div className={classnames({ hidden: isVisible, container: true })}>
    <div className="app-header__description">
      <p>
        Интервальные повторения — техника удержания в памяти,
        заключающаяся в повторении запомненного учебного
        материала по определённым, постоянно возрастающим интервалам
      </p>
    </div>

    <div className="call-to-action">
      <button
        className="btn btn--accent"
        onClick={onClick}
      >
        Добавить колоду
      </button>
    </div>
  </div>
);

Landing.propTypes = {
  isVisible: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};

export default Landing;
