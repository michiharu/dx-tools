import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);

export default function WordCard() {
  const classes = useStyles();
  const [fix, setFix] = React.useState(false);

  const handleClick = () => setFix(!fix);

  return (
    <Card className={classes.root} raised={!fix}>
      <CardHeader
        action={
          <IconButton onClick={handleClick}>
            {fix ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="h2" component="p">
          ランダムワード
        </Typography>
      </CardContent>
      <Box display="flex" flexDirection="row" justifyContent="center" pb={1}>
        <IconButton>
          <AutorenewIcon />
        </IconButton>
      </Box>
    </Card>
  );
}
