import React from 'react';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
// types
import { Tag } from '../../dtos/entity/tag.entity';
// icons
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
// <AddItem itemList={itemList} setItemList={setItemList} />
// Declare the type of the props
type TagSelectProps = {
  tags: any[];
  setTags: React.Dispatch<React.SetStateAction<any>>;
}

const TagSelect: React.FC<TagSelectProps> = ({ tags, setTags }) => {
  const classes = useStyles();
  const theme = useTheme();
  // const [personName, setPersonName] = React.useState<string[]>(["Understanding", "Kind", "Diligent"]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTags(event.target.value as any[]);
  };
  const handleCreate = (event: React.ChangeEvent<{ value: unknown }>) => {

  }
  console.log(tags)

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Core Values</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={tags}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {(selected as any[]).map((tag) => (
                <Chip key={tag.value} label={tag.value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
          inputProps={{ readOnly: true }}
        >
          {tags.map((tag: any) => {
            console.log(tag)
            const { value } = tag;
            console.log(value)
            return (
              <MenuItem key={value} value={value} style={{
                fontWeight: theme.typography.fontWeightRegular
              }}>
                {value}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
      <div className={classes.flexRow}>
        <InputBase
          className={classes.input}
          placeholder="Search Google Maps"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton color="primary" className={classes.iconButton} aria-label="directions">
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default TagSelect