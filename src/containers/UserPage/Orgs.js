import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Grid} from '@material-ui/core';
import UserAvatar from 'react-user-avatar';
import Center from 'react-center';
import Button from '@material-ui/core/Button';

const styles = {
  card: {
    minWidth: 275,
    paddingBottom: 20,
    paddingTop: 20
  },
  cardinner: {
    minWidth: 200,
    maxHeigth: 200,
    height: 200,
    padding: 0,
    paddingTop: 0,
    paddingBottom: 100,
    paddingLeft: 0,
    marginTop: 10,
    textAlign: 'center',
    '&:hover': {
      boxShadow: '1px 6px 20px 6px rgba(0,0,0,0.35)'
    }
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  type: {
    color: 'black'
  },
  Heading: {
    paddingLeft: 10
  },
  butt: {
    float: 'right'
  }
};

function SimpleCard(props) {
  const {classes} = props;

  return (
    <Card className={classes.card}>
      <Grid container spacing={8}>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <Typography variant="display1" className={classes.Heading}>
            ORGANIZATIONS
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6} >
          <Button className={classes.butt}>SEE MORE</Button>
        </Grid>
        <Grid item lg={2} md={2} sm={6} xs={6}>
          <Card className={classes.cardinner}>
            <Center>
              <CardContent>
                <Center>
                  <UserAvatar size="140" name="Society for the Welfare ..." src="https://i.postimg.cc/nh2GRKcZ/SWITS_Logo.png" />
                </Center>,
                <Center>
                  <Typography variant="caption" className={classes.type}>
                SOCIETY FOR THE WELFARE OF INFORMATION TECHNOLOGY STUDENTS
                  </Typography>
                </Center>,
              </CardContent>
            </Center>,
          </Card>
        </Grid>

        <Grid item lg={2} md={2} sm={6} xs={6}>
          <Card className={classes.cardinner}>
            <Center>
              <CardContent>
                <Center>
                  <UserAvatar size="140" name="Society for the Welfare ..." src="https://i.postimg.cc/bYgRyct8/CICT.png" />
                </Center>,
                <Center>
                  <Typography variant="body2" className={classes.type}>
                COLLEGE OF INFORMATION AND COMMUNICATIONS TECHNOLOGY
                  </Typography>
                </Center>,
              </CardContent>
            </Center>,
          </Card>
        </Grid>

        <Grid item lg={2} md={2} sm={6} xs={6}>
          <Card className={classes.cardinner}>
            <Center>
              <CardContent>
                <Center>
                  <UserAvatar size="140" name="Society for the Welfare ..." src="https://i.postimg.cc/rFpNzn14/CAL.png" />
                </Center>,
                <Center>
                  <Typography variant="body2" className={classes.type}>
                COLLEGE OF ARTS AND LETTERS
                  </Typography>
                </Center>,
              </CardContent>
            </Center>,
          </Card>
        </Grid>

        <Grid item lg={2} md={2} sm={6} xs={6}>
          <Card className={classes.cardinner}>
            <Center>
              <CardContent>
                <Center>
                  <UserAvatar size="140" name="Society for the Welfare ..." src="https://i.postimg.cc/rFpNzn14/CAL.png" />
                </Center>,
                <Center>
                  <Typography variant="body2" className={classes.type}>
                COLLEGE OF ARTS AND LETTERS
                  </Typography>
                </Center>,
              </CardContent>
            </Center>,
          </Card>
        </Grid>

        <Grid item lg={2} md={2} sm={6} xs={6}>
          <Card className={classes.cardinner}>
            <Center>
              <CardContent>
                <Center>
                  <UserAvatar size="140" name="Society for the Welfare ..." src="https://i.postimg.cc/rFpNzn14/CAL.png" />
                </Center>,
                <Center>
                  <Typography variant="body2" className={classes.type}>
                COLLEGE OF ARTS AND LETTERS
                  </Typography>
                </Center>,
              </CardContent>
            </Center>,
          </Card>
        </Grid>

        <Grid item lg={2} md={2} sm={6} xs={6}>
          <Card className={classes.cardinner}>
            <Center>
              <CardContent>
                <Center>
                  <UserAvatar size="140" name="Society for the Welfare ..." src="https://i.postimg.cc/rFpNzn14/CAL.png" />
                </Center>,
                <Center>
                  <Typography variant="body2" className={classes.type}>
                COLLEGE OF ARTS AND LETTERS
                  </Typography>
                </Center>,
              </CardContent>
            </Center>,
          </Card>
        </Grid>
      </Grid>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
