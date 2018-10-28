import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275
  }
};

function Content(props) {
  const {classes} = props;

  return (
    <Card className={classes.card} nowrap>
      <CardContent>
        <Typography variant="h6" >
          ANNOUNCEMENT TITLE
        </Typography>
        <Typography variant="subtitle1">
                Posted by: Jerico San Pablo
        </Typography>
        <Typography variant="subtitle1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus feugiat ante eget tristique pellentesque. Proin vehicula velit dolor, eget malesuada erat congue ac. Duis ultrices mi in sapien viverra dictum. Donec consectetur at nulla at consequat. Proin dictum est risus, sit amet imperdiet velit lobortis sed. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis bibendum interdum hendrerit. Aenean pellentesque est et tellus iaculis, vel eleifend quam sollicitudin. Curabitur tristique arcu arcu, non imperdiet sem sodales ut. Duis et congue nibh. Mauris tincidunt magna vel urna interdum, ornare posuere ipsum tristique. Vestibulum molestie malesuada lorem, id porta lacus vulputate sed. Aliquam vel odio rutrum, feugiat metus eu, mattis mauris.
        </Typography>
      </CardContent>
    </Card>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Content);
