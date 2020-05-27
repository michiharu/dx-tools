import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

const useMediaStyles = makeStyles((theme: Theme) => ({
  card: {
    maxWidth: 300,
    zIndex: 1000,
  },
  media: {
    height: 200,
  },
  profileBox: {
    bottom: theme.spacing(2),
    right: -theme.spacing(2),
    width: `calc(100% + ${theme.spacing(4)}px)`,
    height: theme.spacing(3.4),
    backgroundColor: '#0009'
  },
  profileText: {
    textAlign: 'right',
    paddingRight: theme.spacing(2),
    color: 'white'
  }
}));

interface MediaCardProps { 
  imageUrl: string;
  name: string;
}

export default function MediaCard(props: MediaCardProps) {
  const { imageUrl, name　} = props;
  const classes = useMediaStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          style={{ backgroundPositionY: '0%' }}
          image={imageUrl}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Box display="flex" flexDirection="row">
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Box flexGrow={1} />
          </Box>

          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}