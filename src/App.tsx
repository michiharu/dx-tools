import React, { useState } from "react";
import _ from "lodash";
import {
  makeStyles,
  createStyles,
  Theme,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  Slide,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Container,
  Divider,
  ExpansionPanelActions,
  Fab,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import Typography from "@material-ui/core/Typography";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import WordCard from "./WordCard";
import MediaCard from "./MediaCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      paddingTop: theme.spacing(3),
    },
    exheading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    exSecondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type QA = {
  question: string;
  choices: string[];
};

type SelectedQA = QA & { selected: number };

const qaList: QA[] = [
  {
    question: "新しいことをはじめたい気分ですか？",
    choices: ["はい", "いいえ"],
  },
  {
    question: "次のものをアレンジするのはどうでしょう？",
    choices: [
      "筋トレ",
      "季節のコーデ",
      "シューズペインティング",
      "ファッションお悩み相談",
    ],
  },
];

const nextQA: QA = {
  question: "これは追加の質問です。（選択しても反応しません。）",
  choices: ["はい", "いいえ"],
};

function createDummyRoughSummary() {
  const imageTypes = [
    "nature",
    "water",
    "toy",
    "book",
    "sun",
    "snow",
    "tree",
    "forest",
    "coffee",
    "house",
    "lake",
  ];

  return {
    imageUrl:
      "https://source.unsplash.com/400x300/?" + _.shuffle(imageTypes)[0],
    name: "Something special♡",
  };
}

type MediaData = {
  imageUrl: string;
  name: string;
};

export default function App() {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(true);
  const [nextDialogOpen, setNextDialogOpen] = useState(false);
  const [qaIndex, setQAIndex] = useState(0);

  const [selectedQAList, setSelectedQAList] = useState<SelectedQA[]>([]);

  const handleDialogClose = () => setDialogOpen(false);
  const handleNextDialogClose = () => setNextDialogOpen(false);
  const handleSelect = (selected: number) => () => {
    const sqa: SelectedQA = { ...qaList[qaIndex], selected };
    setSelectedQAList(selectedQAList.concat([sqa]));

    if (qaIndex !== qaList.length - 1) {
      setQAIndex(qaIndex + 1);
    } else {
      setDialogOpen(false);
    }
  };
  const handleReSelect = (index: number, selected: number) => () => {
    setSelectedQAList(
      selectedQAList.map((sqa, i) => (i === index ? { ...sqa, selected } : sqa))
    );
  };
  const handleDeleteSelection = (index: number) => () => {
    setSelectedQAList(selectedQAList.filter((_, i) => i !== index));
  };
  const [data, setData] = useState([...Array(10)].map(() => createDummyRoughSummary()));
  const handleResetData = () => setData([...Array(10)].map(() => createDummyRoughSummary()));

  const qa = qaList[qaIndex];
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            DX Tools
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <Container maxWidth="md">
          <Dialog
            fullWidth
            maxWidth="md"
            open={dialogOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleDialogClose}
          >
            <DialogTitle>{qa.question}</DialogTitle>
            <DialogContent>
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
                spacing={3}
              >
                {qa.choices.map((c, i) => {
                  const is2of2 = qa.choices.length === 2 && i + 1 === 2;
                  return (
                    <Grid item xs={3}>
                      <Button
                        variant="contained"
                        color={is2of2 ? "secondary" : "primary"}
                        fullWidth
                        onClick={handleSelect(i)}
                      >
                        {c}
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                質問をスキップ
              </Button>
              <Button onClick={handleDialogClose} color="primary">
                OK
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            fullWidth
            maxWidth="md"
            open={nextDialogOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleNextDialogClose}
          >
            <DialogTitle>{nextQA.question}</DialogTitle>
            <DialogContent>
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
                spacing={3}
              >
                {nextQA.choices.map((c, i) => {
                  const is2of2 = qa.choices.length === 2 && i + 1 === 2;
                  return (
                    <Grid item xs={3}>
                      <Button
                        variant="contained"
                        color={is2of2 ? "secondary" : "primary"}
                        fullWidth
                      >
                        {c}
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleNextDialogClose} color="primary">
                質問をスキップ
              </Button>
              <Button onClick={handleNextDialogClose} color="primary">
                OK
              </Button>
            </DialogActions>
          </Dialog>
          {selectedQAList.length !== 0 && (
            <Box pb={3}>
              {selectedQAList.map((sqa, i) => (
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Box flexGrow={1}>
                      <Typography className={classes.exheading}>
                        {sqa.question}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography className={classes.exSecondaryHeading}>
                        {sqa.choices[sqa.selected]}
                      </Typography>
                    </Box>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Grid
                      container
                      direction="row"
                      justify="space-around"
                      alignItems="center"
                    >
                      {sqa.choices.map((c, j) => {
                        const is2of2 = sqa.choices.length === 2 && i + 1 === 2;
                        return (
                          <Grid item>
                            <Button
                              variant={
                                sqa.selected === j ? "contained" : "text"
                              }
                              color={is2of2 ? "secondary" : "primary"}
                              onClick={handleReSelect(i, j)}
                            >
                              {c}
                            </Button>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </ExpansionPanelDetails>
                  <Divider />
                  <ExpansionPanelActions>
                    <Button size="small" onClick={handleDeleteSelection(i)}>
                      この質問を削除
                    </Button>
                  </ExpansionPanelActions>
                </ExpansionPanel>
              ))}
            </Box>
          )}

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            mb={3}
          >
            <Fab variant="extended" onClick={() => setNextDialogOpen(true)}>
              <AddIcon className={classes.extendedIcon} />
              質問を追加
            </Fab>
          </Box>

          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            spacing={3}
          >
            {[0, 1, 2].map(() => (
              <Grid item xs={4}>
                <WordCard />
              </Grid>
            ))}
          </Grid>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            my={3}
          >
            <Fab variant="extended" onClick={handleResetData}>
              <AutorenewIcon className={classes.extendedIcon} />
              キーワードをリフレッシュ
            </Fab>
          </Box>

          <Grid container justify="center" spacing={3}>
            {data.map((d, key) => {
                return (
                  <Grid key={key} item xs={12} sm={6} md={4}>
                    <Box display="flex" justifyContent="center" width="100%">
                      <MediaCard {...d} />
                    </Box>
                  </Grid>
                );
              })}
          </Grid>
        </Container>
      </main>
    </div>
  );
}
