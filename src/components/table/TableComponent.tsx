import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { styled } from '@mui/system';

import { Card } from "@mui/material";
import { useSelector } from "react-redux";
import { AppState } from "src/store/Store";
import { useEffect, useState } from "react";

interface DataTableProps {
  rows: Array<{ [key: string]: any }>;
  columns: GridColDef[];
  checkbox?: boolean;
}


const StyledContainer = styled('div')({
  height: 'fit-content',
  overflowY: 'scroll',
  width: '100%',
  '@media screen and (min-width: 1000px)': {
    width: '100%',
  },
});

const CollapsedContainer = styled(StyledContainer)({
  width: '100% !important',
});

const DataTable: React.FC<DataTableProps> = ({ rows, columns, checkbox }) => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const [, forceUpdate] = useState({});

  const customStyles = {
    card: {
      fontSize: "15px",
      boxShadow: "lg",
      "&:hover": {
        border: "1px solid #fff",
      },
    },
  };

  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById("data-table-container");
      console.log(container, "cont");

      if (container) {
        container.style.width = "100%";
        forceUpdate({});
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (

    <Card sx={{ boxShadow: 'lg' }}>
      {customizer?.isCollapse ? (
        <CollapsedContainer id="data-table-container">
          <DataGrid
            key={Date.now()}
            checkboxSelection={checkbox}
            autoHeight
            sx={customStyles.card}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 20, 30, 40, 50]}
          />
        </CollapsedContainer>
      ) : (
        <StyledContainer id="data-table-container">
          <DataGrid
            key={Date.now()}
            checkboxSelection={checkbox}
            autoHeight
            sx={customStyles.card}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 20, 30, 40, 50]}
          />
        </StyledContainer>
      )}
    </Card>
  );
};

export default DataTable;
