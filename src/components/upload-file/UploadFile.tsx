import React, { useEffect, useState } from "react";
import { Button, IconButton, Typography, Tooltip, styled, Card, Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery, useTheme, FormControl } from "@mui/material";
import { CloudUpload, Visibility } from "@mui/icons-material";
import { RequiredStar } from "../required-star";
import { IconInfoCircle } from "@tabler/icons";
import { notifyMessage } from "src/utils/toastNotify";

interface FileUploadProps {
  onFileUpload: (files: File[] | null) => void;
  updateImageFunction?: (file: File) => void;
  updatePdfFunction?: (file: File) => void;
  title?: string;
  required: boolean;
  editFiles?: any;
  name?: string;
  encType?: any;
  viewUploaded?: any;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const StyledLabel = styled("label")({
  cursor: "pointer",
});

const MAX_FILE_SIZE = 200 * 1024;

const FileUpload: React.FC<FileUploadProps> = ({ title, required, onFileUpload, viewUploaded, editFiles, name, updateImageFunction, updatePdfFunction }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [viewFile, setViewFile] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const fileId = React.useRef(`file-upload-${Math.random().toString(36).substring(7)}`);

  useEffect(() => {
    if (editFiles) {
      setSelectedFiles([editFiles]);
    }
  }, [editFiles]);
  // console.log(selectedFiles, "selected files");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const allowedFormats = ["application/pdf", "image/jpeg", "image/png"];
      const fileList: File[] = Array.from(files);
      const invalidFiles = fileList.filter((file) => !allowedFormats.includes(file.type));

      if (invalidFiles.length === 0) {
        const fileSize = fileList.reduce((acc, file) => acc + file.size, 0);

        if (fileSize > MAX_FILE_SIZE) {
          setSelectedFiles([]);
          setError("File size exceeds the limit (200KB).");
        } else {
          setSelectedFiles(fileList);
          onFileUpload(fileList);
          setError(null);
        }
      } else {
        setSelectedFiles([]);
        setError("Unsupported file format. Please select a PDF or PNG/JPG file.");
      }
    } else {
      setSelectedFiles([]);
      onFileUpload(null);
      setError("Please select a file.");
    }
  };

  const handleUpdate = () => {
    if (selectedFiles && selectedFiles.length > 0) {
      const updatedFile = selectedFiles[0];

      if (updatedFile.type.startsWith("image") && updateImageFunction) {
        updateImageFunction(updatedFile);
      } else if (updatedFile.type === "application/pdf" && updatePdfFunction) {
        updatePdfFunction(updatedFile);
      }
    }

    handleClose();
  };

  const handleShowFile = () => {
    setViewFile(true);
  };

  const handleInfoClick = () => {
    notifyMessage.warning("Supported formats: PDF, PNG, JPG");
  };

  const handleClose = () => {
    setViewFile(false);
  };

  const handleUploadButtonClick = () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      setTimeout(() => {
        setError("Please select a file.");
      }, 800);
    }
  };

  const renderFileContent = (files: File[] | null) => {
    // console.log(files, "file from common");
    // console.log(files,"fileUpload")

    if (viewUploaded) {
      return <img src={viewUploaded} alt="file " style={{ maxWidth: "100%", maxHeight: "100%" }} />;
    }

    if (!files || files.length === 0) {
      return null;
    }

    const file = files[0];

    if (file.type.startsWith("image")) {
      return <img src={URL.createObjectURL(file)} alt="Uploaded File" style={{ maxWidth: "100%", maxHeight: "100%" }} />;
    }

    if (file.type === "application/pdf") {
      return <iframe src={URL.createObjectURL(file)} title="Uploaded PDF" style={{ maxWidth: "100%", height: "500px" }} />;
    }

    return null;
  };
  // form

  return (
    <div>
      <Card sx={{ marginTop: "25px", padding: 0, boxShadow: "none" }}>
        <Typography variant="h5" fontSize="15px" marginBottom={1} sx={{}}>
          {title} {required && <RequiredStar />}
        </Typography>
        <form encType="multipart/form-data">
          <VisuallyHiddenInput type="file" onChange={handleFileChange} style={{ display: "none" }} accept=".pdf,.jpg,.jpeg,.png" id={fileId.current} name={name} />
        </form>
        <div>
          <StyledLabel htmlFor={fileId.current}>
            <Button variant="contained" color="primary" onClick={handleUploadButtonClick} component="span" startIcon={<CloudUpload />}>
              {viewUploaded ? 'Update' : 'Upload'}
            </Button>
          </StyledLabel>

          {viewUploaded ? (
            <IconButton sx={{ marginLeft: "9px" }} onClick={handleShowFile}>
              <Visibility />
            </IconButton>
          ) : (
            <IconButton sx={{ marginLeft: "9px" }} onClick={handleShowFile} disabled={!selectedFiles || selectedFiles.length === 0}>
              <Visibility />
            </IconButton>
          )}

          <Tooltip title="Supported Formats: PDF, PNG, JPG">
            <IconButton onClick={handleInfoClick}>
              <IconInfoCircle size={22} />
            </IconButton>
          </Tooltip>

          {error && (
            <Typography variant="caption" color="error" style={{ marginTop: "8px" }}>
              {error}
            </Typography>
          )}
        </div>
        {selectedFiles && selectedFiles.length > 0 && (
          <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
            Selected File: {selectedFiles[0].name}
          </Typography>
        )}
        {/* {viewUploaded ? (
          <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
            uploaded document: {title}
          </Typography>
        ) : (
          null
        )} */}
      </Card>

      <Dialog fullScreen={fullScreen} open={viewFile} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        {viewUploaded ? <DialogTitle id="responsive-dialog-title">Check Your {title} ..</DialogTitle> : <DialogTitle id="responsive-dialog-title">Uploaded Document ..</DialogTitle>}
        <DialogContent>{renderFileContent(selectedFiles)}</DialogContent>
        <DialogActions>
          {/* {viewUploaded && (
            <Button color="success" onClick={handleUpdate} autoFocus>
              Update
            </Button>
          )} */}
          <Button onClick={handleClose} autoFocus>Continue</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FileUpload;
