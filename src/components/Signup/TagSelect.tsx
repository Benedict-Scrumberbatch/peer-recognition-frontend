import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
// types
import { Tag } from '../../dtos/entity/tag.entity';
// icons
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: theme.spacing(40),
      maxWidth: theme.spacing(45),
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
    flexRow: {
      padding: '2px 4px',
      display: 'flex',
      border: '1px solid #000000'
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);

type TagSelectProps = {
  tags: any[];
  setTags: React.Dispatch<React.SetStateAction<any>>;
}

const TagSelect: React.FC<TagSelectProps> = ({ tags, setTags }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState()

  const handleDeleteTag = (id: any) => {
    setTags(tags.filter((tag) => tag.id !== id))
  }
  const handleCreateTag = (tagValue: any) => {
    setTags(tags.concat({
      id: uuidv4(),
      value: tagValue
    }))
  }

  return (
    <div>
      <InputLabel id="demo-mutiple-chip-label">Core Values</InputLabel>
      <div className={classes.chips}>
        {tags.map((tag) => (
          <div key={tag.value} onClick={() => handleDeleteTag(tag.id)}>
            <Chip label={tag.value} className={classes.chip} />
          </div>
        ))}
      </div>
      <div className={classes.flexRow}>
        <InputBase
          className={classes.input}
          placeholder="Add New Company Value"
          inputProps={{ 'aria-label': 'add new company value' }}
          onChange={(event: React.ChangeEvent<{ value: any }>) => {
            setValue(event.target.value)
          }}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={() => handleCreateTag(value)}>
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default TagSelect