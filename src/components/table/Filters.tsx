import React from 'react';
import { Input } from 'reactstrap';

interface FilterProps {
  column: any; // Replace 'any' with the actual column type if available
}

export const Filter: React.FC<FilterProps> = ({ column }) => {
  return (
    <div style={{ marginTop: 5 }}>
      {column.canFilter && column.render('Filter')}
    </div>
  );
};

interface DefaultColumnFilterProps {
  column: {
    filterValue: any; // Replace 'any' with the appropriate type
    setFilter: (value: any) => void; // Replace 'any' with the appropriate type
    preFilteredRows: {
      length: number;
    };
  };
}

export const DefaultColumnFilter: React.FC<DefaultColumnFilterProps> = ({
  column: {
    filterValue,
    setFilter,
    preFilteredRows: { length },
  },
}) => {
  return (
    <Input
      value={filterValue || ''}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`search (${length}) ...`}
    />
  );
};

interface SelectColumnFilterProps {
  column: {
    filterValue: any; // Replace 'any' with the appropriate type
    setFilter: (value: any) => void; // Replace 'any' with the appropriate type
    preFilteredRows: any[]; // Replace 'any[]' with the actual type
    id: string; // Replace 'string' with the appropriate type
  };
}

export const SelectColumnFilter: React.FC<SelectColumnFilterProps> = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <Input
      id='custom-select'
      type='select'
      value={filterValue}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value=''>All</option>
      {options.map((option:any) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Input>
  );
};
