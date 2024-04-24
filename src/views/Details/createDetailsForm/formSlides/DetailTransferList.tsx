import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Grid, List, ListItem, ListItemIcon, ListItemText, Button, Paper } from "@mui/material";
import CustomCheckbox from "src/utils/theme-elements/CustomCheckbox";
import { IconChevronRight, IconChevronLeft, IconChevronsLeft, IconChevronsRight } from "@tabler/icons";

interface DetailTransferListProps {
  details: {
    dropdown_one: string;
    dropdown_two: string;
  };
  total_details:any;
  athletesOfcompetitionAndMatchGroup:any;
}

interface DetailList {
  athlete_id: number;
  full_name: string;
}

const intersection = (a: number[], b: number[]) => a.filter((value) => b.indexOf(value) !== -1);
const not = (a: number[], b: number[]) => a.filter((value) => b.indexOf(value) === -1);

const DetailTransferList: React.FC<DetailTransferListProps> = ({ details,total_details,athletesOfcompetitionAndMatchGroup }) => {
  const [checked, setChecked] = useState<number[]>([]);
  const [originalLeft, setOriginalLeft] = useState<DetailList[]>(athletesOfcompetitionAndMatchGroup);

  const [left, setLeft] = useState<(DetailList | null)[]>([...originalLeft]);

  const [right, setRight] = useState<(DetailList | null)[]>([

  ]);

  const { dropdown_one, dropdown_two } = details;

  console.log(dropdown_one, dropdown_two);

  const changeDetails = () => {
    const temp = [...originalLeft];
    let tempLeft = [];
    
    if (left.length > 0) {
      tempLeft = temp.map((item) => {
        if (right.some(({ athlete_id }: any) => athlete_id === item.athlete_id)) {
          return null;
        } else {
          return { ...item, detail_number: parseInt(dropdown_one, 10) };
        }
      });
    } else {
      tempLeft = temp.map((item) => ({ ...item, detail_number: parseInt(dropdown_one, 10) }));
    }
  
    // Assign detail number for the second dropdown
    const tempRight = temp.map((item) => ({ ...item, detail_number: parseInt(dropdown_two, 10) }));
  
    // Update tempLeft to include athletes from both detail numbers
    const athletesPerDetail = tempLeft.length / total_details;
    const selectedDetail1 = parseInt(dropdown_one, 10);
    const selectedDetail2 = parseInt(dropdown_two, 10);
    const startIdx1 = (selectedDetail1 - 1) * athletesPerDetail;
    const endIdx1 = startIdx1 + athletesPerDetail;
    const startIdx2 = (selectedDetail2 - 1) * athletesPerDetail;
    const endIdx2 = startIdx2 + athletesPerDetail;
  
    const selectedAthletes1 = tempLeft.slice(startIdx1, endIdx1);
    const selectedAthletes2 = tempRight.slice(startIdx2, endIdx2);
  
    // Combine athletes from both detail numbers
    const selectedAthletes = [...selectedAthletes1, ...selectedAthletes2];
    setLeft(selectedAthletes);
    console.log(tempLeft,"tempLeft")
  };
  
  
  console.log(left,"left")
  

  useEffect(() => {
    console.log(dropdown_one)
    changeDetails();
  }, [dropdown_one]);

  console.log(left, "----left");

  const leftChecked = intersection(
    checked,
    left?.map((item:any) => item && item.athlete_id),
  );
  const rightChecked = intersection(
    checked,
    right?.map((item:any) => item && item.athlete_id),
  );

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight([...right, ...left]);
    setLeft([]);
  };

  const handleCheckedRight = () => {
    const itemsToMove = left.filter((item:any) => item && leftChecked.includes(item.athlete_id));
    const newLeft = left.filter((item:any) => item && !leftChecked.includes(item.athlete_id));
    const itemsToAdd = itemsToMove.filter((item:any) => item && !right.some((rItem:any) => rItem && rItem.athlete_id === item.athlete_id));

    setRight([...right, ...itemsToAdd]);
    setLeft(newLeft);
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    const itemsToMove = right.filter((item:any) => item && rightChecked.includes(item.athlete_id));
    const newRight = right.filter((item:any) => item && !rightChecked.includes(item.athlete_id));
    const itemsToAdd = itemsToMove.filter((item:any) => item && !left.some((lItem:any) => lItem && lItem.athlete_id === item.athlete_id));

    setLeft([...left, ...itemsToAdd]);
    setRight(newRight);
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft([...left, ...right]);
    setRight([]);
  };


  const handleSubmit = () => {
    const detail1Data = left.map((athlete) => ({ detail_number: parseInt(dropdown_one), source_dropdown: 'dropdown_one', ...athlete }));
    const detail2Data = right.map((athlete) => ({ detail_number: parseInt(dropdown_two), source_dropdown: 'dropdown_two', ...athlete }));
  
    const combinedData = [...detail1Data, ...detail2Data];
    
    console.log(combinedData,'combinedData');
  
  };
  
  const theme = useTheme();
  const borderColor = theme.palette.divider;

  const customList = (items: (DetailList|null)[], listName: string) => (
    <Paper variant="outlined" sx={{ width: 200, height: 230, overflow: "auto", border: `1px solid ${borderColor}` }}>
      <List dense component="div" role="list">
        {items.map((item) => {
          if(item){
            const labelId = `transfer-list-item-${item.athlete_id}-label`;
  
            return (
              <ListItem key={item.athlete_id} role="listitem" button onClick={handleToggle(item.athlete_id)}>
                <ListItemIcon>
                  <CustomCheckbox
                    tabIndex={-1}
                    disableRipple
                    checked={checked.indexOf(item.athlete_id) !== -1}
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={item.full_name} />
              </ListItem>
            );
          }
        })}
        <ListItem />
      </List>
    </Paper>
  );

  const saveDetails = () => {
    const detail1 = left.map((item:any) => item.athlete_id);
    const detail2 = right.map((item:any) => item.athlete_id);
    console.log("detail1:", detail1);
    console.log("detail2:", detail2);
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList(left, "left")}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button sx={{ my: 0.5 }} variant="outlined" size="small" onClick={handleAllRight} disabled={left.length === 0} aria-label="move all right">
            <IconChevronsRight width={20} height={20} />
          </Button>
          <Button sx={{ my: 0.5 }} variant="outlined" size="small" onClick={handleCheckedRight} disabled={leftChecked.length === 0} aria-label="move selected right">
            <IconChevronRight width={20} height={20} />
          </Button>
          <Button sx={{ my: 0.5 }} variant="outlined" size="small" onClick={handleCheckedLeft} disabled={rightChecked.length === 0} aria-label="move selected left">
            <IconChevronLeft width={20} height={20} />
          </Button>
          <Button sx={{ my: 0.5 }} variant="outlined" size="small" onClick={handleAllLeft} disabled={right.length === 0} aria-label="move all left">
            <IconChevronsLeft width={20} height={20} />
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleSubmit}
            aria-label="save details"
          >
            Save Details
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right, "right")}</Grid>
    </Grid>
  );
};

export default DetailTransferList;
