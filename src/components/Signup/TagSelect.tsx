import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
// types
import { Tag } from '../../common/entity/tag.entity';
// icons
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ClearIcon from '@material-ui/icons/Clear';
// generate UUIDs
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
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

/** 
 * Component for selecting tags representing company values.
 * @param TagSelectProps tags
 * @returns 
 */
const TagSelect: React.FC<TagSelectProps> = ({ tags, setTags, count, setCount }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState('');

  const handleDeleteTag = (id: number) => {
    setTags(tags.filter((tag) => tag.tagId !== id))
  }
  const handleCreateTag = (tagValue: string) => {
    setTags(tags.concat({
      tagId: count,
      value: tagValue
    }));
    setCount(count + 1);
  }

  return (
    <div>
      <Typography variant="h5" id="demo-mutiple-chip-label" style={{ textAlign: 'center' }}>Core Values</Typography>
      <div className={classes.chips}>
        {tags.map((tag) => (
          <Chip label={tag.value} className={classes.chip} onDelete={() => handleDeleteTag(tag.tagId)} deleteIcon={<ClearIcon />} />
        ))}
      </div>
      <br />
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