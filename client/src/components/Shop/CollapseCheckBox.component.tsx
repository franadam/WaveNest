import React, { useEffect, useState } from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Collapse,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material';
import { CheckBox } from '@mui/icons-material';
import { Shopping } from 'interfaces/Filter.interface';

interface Props {
  title: string;
  initState: boolean;
  filter: Shopping;
  list: any[];
  handleBrands: React.Dispatch<React.SetStateAction<number[]>>;
  handleFrets: React.Dispatch<React.SetStateAction<number[]>>;
}

export const CollapseCheckBox: React.FC<Props> = ({
  title,
  initState,
  list,
  filter,
  handleBrands,
  handleFrets,
}) => {
  const [isOpen, setIsOpen] = useState(initState);
  const [checked, setChecked] = useState<number[]>([]);

  const handleCollapse = () => setIsOpen((isOpen) => !isOpen);

  const initChecked = () => {
    if (title.includes('frets')) {
      console.log('frets');
      setChecked(filter.frets);
    } else {
      console.log('brands');
      setChecked(filter.brands);
    }
  };

  useEffect(() => {
    initChecked();
  }, [filter.brands, filter.frets]);

  const handleToggle = (id: number) => {
    console.log('handleToggle>> id :>> ', id, title.includes('frets'), checked);
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);

    if (title.includes('frets')) {
      console.log('frets');
      handleFrets(newChecked);
    } else {
      console.log('brands');
      handleBrands(newChecked);
    }
  };

  const renderList = () =>
    list.length &&
    list.map((item) => (
      <ListItem key={item.id}>
        <ListItemText primary={item.name} />
        <ListItemSecondaryAction>
          <input
            type={'checkbox'}
            checked={checked.indexOf(item.id) !== -1}
            onChange={() => handleToggle(item.id)}
            style={{ cursor: 'pointer' }}
          />
          {/* <CheckBox
            // component="div"
            checked={checked.indexOf(item.id) !== -1}
            color="primary"
            onChange={() => handleToggle(item.id)}
          /> */}
        </ListItemSecondaryAction>
      </ListItem>
    ));

  return (
    <div className="collapse_items_wrapper">
      <List>
        <ListItem onClick={handleCollapse}>
          <ListItemText className="collapse_title" primary={title} />
          {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </ListItem>
        <Collapse in={isOpen} timeout="auto">
          <List component="div" disablePadding>
            {renderList()}
          </List>
        </Collapse>
      </List>
    </div>
  );
};
