import React, {useState, useEffect} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import OpenInNewIcon from '@material-ui/icons/OpenInNew'

import semanticScholarLogo from '../../images/semanticscholar-logo.svg';
import litApi from '../../services/litApi';

const useStyles = makeStyles({
  loadingContainer: {
    height: '100%',
  },
  columnsWrapper: {
    height: '100%',
    display: 'flex',
  },
  column: {
    flex: 1,
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    '&:last-child': {
      borderRight: 'none',
    },
  },
  scrollWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  scroll: {
    flexGrow: 1,
    overflow: 'auto'
  },
});

function PaperList({label, papers}) {
  const classes = useStyles();

  return (
    <div className={classes.scrollWrapper}>
      <Box p={2} pb={0}>
        <Typography variant="h6" component="h3">
          {label}
        </Typography>
      </Box>
      <Box className={classes.scroll}>
        <List>
          {/* TODO: Pagination */}
          {papers.slice(0, 500).map((paper, index)  => {
            return (
              <ListItem key={index} divider>
                <div style={{display: 'flex', width: '100%', alignItems: 'center'}}>
                  <Box pr={1} style={{flex: 1}}>
                    {(
                    paper.id
                    ? <Link component={RouterLink} to={'/paper/' + paper.id}>{paper.title}</Link>
                    : paper.title
                    )}
                  </Box>
                  <ButtonGroup>
                    <Button color="primary" size="small">
                      <BookmarkBorderIcon />
                    </Button>
                    <Button color="secondary" size="small">
                      <NotInterestedIcon />
                    </Button>
                  </ButtonGroup>
                </div>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </div>
  );
}

function PaperInfo({paper}) {
  const classes = useStyles();

  return (
    <div className={classes.scrollWrapper}>
      <Box p={2} className={classes.scroll} style={{flex: 1}}>
        <Box pb={1}>
          <Typography variant="h5" component="h2">
            {paper.title}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" component="span">
            {paper.year} • {paper.authors.join(', ')} • {paper.venue}
          </Typography>
        </Box>
        <Box>
          <Link href={paper.url} target="_blank">
            View paper <OpenInNewIcon style={{width: '0.6em', verticalAlign: 'middle'}} />
          </Link>
        </Box>
        <Box pt={1}>
          {paper.abstract}
        </Box>
      </Box>
      <Box p={1} style={{textAlign: 'right'}}>
        Data sourced from <Link href="https://www.semanticscholar.org/?utm_source=api">
          <img alt="Semantic Scholar Logo" src={semanticScholarLogo} height="14" />
          Semantic Scholar
        </Link>.
      </Box>
    </div>
  );
}

function Paper() {
  const { paperId } = useParams();
  const classes = useStyles();
  const [paper, setPaper] = useState(null);

  useEffect(function() {
    const fetch = async function() {
      const paper = await litApi.getPaper(paperId);
      setPaper(paper);
      console.log(paper);
    };
    fetch();
  }, [paperId]);

  // Loading state
  if (!paper) {
    return (
      <Grid container direction="column"
            justify="center" alignItems="center"
            className={classes.loadingContainer}>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }

  return (
    <div className={classes.columnsWrapper}>
      <div className={classes.column}>
        <PaperList label="References" papers={paper.refs} />
      </div>
      <div className={classes.column}>
        <PaperInfo paper={paper} />
      </div>
      <div className={classes.column}>
        <PaperList label="Citations" papers={paper.cites} />
      </div>
    </div>
  );
}

export default Paper;
