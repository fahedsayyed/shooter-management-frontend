import React from "react";
import { mkConfig, generateCsv } from "export-to-csv";
import { Button } from "@mui/material";

interface CsvDownloaderProps {
  data: any[];
  filename: string;
  buttonTitle?: string;
}
const CsvDownloader: React.FC<CsvDownloaderProps> = ({ data, filename, buttonTitle }) => {
  const csvConfig = mkConfig({
    fieldSeparator: ",",
    useKeysAsHeaders: true,
  });

  const handleDownload = () => {
    const csvData: any = generateCsv(csvConfig)(data);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button variant="contained" color="primary" size="medium" onClick={handleDownload}>
      {buttonTitle ? buttonTitle : "Export CSV Data"}
    </Button>
  );
};
export default CsvDownloader;
