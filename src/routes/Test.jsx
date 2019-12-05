import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router'
function Test(props) {
  console.log(props.test)
  return (
    <div>
      <Link to="/">Home</Link>
    </div>
  );
}

Test.propTypes = {
};

export default connect(({ test }) => ({
  test,
}))(Test);
