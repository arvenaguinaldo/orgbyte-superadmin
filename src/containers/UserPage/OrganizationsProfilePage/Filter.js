import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Center from 'react-center';
import Icon from './Icon';
import OrgDetails from './OrgDetails';

const styles = {
  card: {
    minWidth: 275
  },
  pos: {
    marginBottom: 12
  },
  text: {
    width: '100%'
  }
};

function SimpleCard(props) {
  const {classes} = props;

  return (
    <Card className={classes.card} nowrap>
      <CardContent>
        <Center>
          <Icon />
        </Center>
        <OrgDetails />
      </CardContent>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
