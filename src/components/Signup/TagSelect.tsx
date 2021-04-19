import React from 'react';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
// types
import { Tag } from '../../dtos/entity/tag.entity';

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

const names = [
  'Understanding',
  'Kind',
  'Diligent',
  'Sincere',
  'Honest',
  'Loyalty',
  'Truthful',
  'Trustworthy'
];

function getStyles(name: string, tags: Tag[], theme: Theme) {
  const aTag = tags.find((tag: Tag) => tag.value === name) 
  return {
    fontWeight:
      aTag
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

// Declare the type of the props
type CarProps = {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<any>>;
}

const TagSelect: React.FC<CarProps> = ({ tags, setTags }) => {
  const classes = useStyles();
  const theme = useTheme();
  // const [personName, setPersonName] = React.useState<string[]>(["Understanding", "Kind", "Diligent"]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTags(event.target.value as string[]);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Tags</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={tags}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, tags, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default TagSelect