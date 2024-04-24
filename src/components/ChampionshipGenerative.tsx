import React, { useEffect, useState } from "react";
import { Grid, FormControl, Button, FormGroup, Paper } from "@mui/material";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { RequiredStar } from "./required-star";
import validateForm, { generateErrorInitialState } from "src/utils/FormValidate";

interface Organiser {
  secretary_name: string;
  post: string;
}

interface FormData {
  organisers: Organiser[];
}

interface ChampionshipGenerativeProps {
  step: number;
  onOrganisersChange: (organisers: Organiser[]) => void;
  initialOrganisers?: Organiser[]; // Make initialOrganisers optional
}

const ChampionshipGenerative: React.FC<ChampionshipGenerativeProps> = ({ step, onOrganisersChange, initialOrganisers }) => {
  console.log(initialOrganisers, "org");

  const [formData, setFormData] = useState<FormData>({
    organisers: [{ secretary_name: "", post: "" }],
  });

  const errorInitialState: any = generateErrorInitialState(formData.organisers);
  const [error, setError] = useState(errorInitialState);

  const initializeFormData = () => {
    if (initialOrganisers) {
      setFormData({ organisers: initialOrganisers });
    }
  };

  useEffect(() => {
    initializeFormData();
  }, [initialOrganisers]);

  const createFieldHandlers = (index: number, fieldName: keyof Organiser) => ({
    onBlur: () => checkError(index, fieldName),
  });

  const checkError = (index: number, fieldName: keyof Organiser) => {
    const newErrors: any = validateForm({ [fieldName]: formData.organisers[index][fieldName] });
    setError((prevErrors: any) => {
      const updatedErrors = { ...prevErrors };
      if (!updatedErrors.organisers) {
        updatedErrors.organisers = Array.from({ length: formData.organisers.length }, () => ({}));
      }
      updatedErrors.organisers[index] = { ...updatedErrors.organisers[index], [fieldName]: newErrors[fieldName] };

      return updatedErrors;
    });
  };

  const wholeError = () => {
    if (step > 0) {
      const newErrors = formData.organisers.map((field) => validateForm(field));
      setError((prevErrors: any) => {
        const updatedErrors = { ...prevErrors };
        if (!updatedErrors.organisers) {
          updatedErrors.organisers = Array.from({ length: formData.organisers.length }, () => ({}));
        }
        formData.organisers.forEach((field: any, index) => {
          updatedErrors.organisers[index] = { ...updatedErrors.organisers[index], ...newErrors[index] };
        });

        return updatedErrors;
      });
    } else {
      setError(generateErrorInitialState(formData.organisers));
    }
  };

  console.log(formData, "form");

  useEffect(() => {
    wholeError();
  }, [formData, step]);

  const handleAddFields = () => {
    setFormData((prev) => ({
      ...prev,
      organisers: [...prev.organisers, { secretary_name: "", post: "" }],
    }));
  };

  const handleRemoveFields = () => {
    if (formData.organisers.length > 1) {
      setFormData((prev) => ({
        ...prev,
        organisers: prev.organisers.slice(0, -1),
      }));
    }
  };

  const organisersChange = (index: number, fieldName: keyof Organiser, value: string) => {
    setFormData((prev) => {
      const updatedOrganisers = prev.organisers.map((organiser, i) => {
        if (i === index) {
          return { ...organiser, [fieldName]: value };
        }

        return organiser;
      });

      return { ...prev, organisers: updatedOrganisers };
    });

    const updatedOrganisers = [...formData.organisers];
    updatedOrganisers[index][fieldName] = value;
    onOrganisersChange(updatedOrganisers);
  };

  return (
    <Grid item xs={12} lg={12}>
      <FormGroup sx={{ position: "relative" }}>
        <Paper sx={{ background: "none", boxShadow: "none" }}>
          <Grid container justifyContent="flex-end">
            <Grid>
              <div style={{ display: "flex", alignItems: "center", position: "absolute", right: 0 }}>
                <Button variant="outlined" sx={{ width: "20px", textAlign: "center", marginRight: 0.5 }} onClick={handleAddFields}>
                  <AddIcon />
                </Button>
                {formData.organisers.length > 1 && (
                  <Button variant="outlined" sx={{ width: "20px", textAlign: "center", marginRight: 0.5 }} onClick={handleRemoveFields}>
                    <RemoveIcon />
                  </Button>
                )}
              </div>
            </Grid>
          </Grid>
          {formData.organisers.map((organiser, i) => (
            <Grid container spacing={2} key={i}>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor={`secretary_name-${i}`}>
                  Secretary Name
                  <RequiredStar />
                </CustomFormLabel>
                <FormControl fullWidth>
                  <CustomTextField
                    id={`secretary_name-${i}`}
                    label="Secretary Name"
                    name="secretary_name"
                    value={organiser.secretary_name}
                    error={!!error.organisers && !!error.organisers[i]?.secretary_name}
                    helperText={error.organisers && error.organisers[i]?.secretary_name}
                    {...createFieldHandlers(i, "secretary_name")}
                    onChange={(e: any) => organisersChange(i, "secretary_name", e.target.value)}
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor={`post-${i}`}>
                  Post
                  <RequiredStar />
                </CustomFormLabel>
                <FormControl fullWidth>
                  <CustomTextField
                    id={`post-${i}`}
                    label="Post"
                    name="post"
                    value={organiser.post}
                    error={!!error.organisers && !!error.organisers[i]?.post}
                    helperText={error.organisers && error.organisers[i]?.post}
                    {...createFieldHandlers(i, "post")}
                    onChange={(e: any) => organisersChange(i, "post", e.target.value)}
                    fullWidth
                  />
                </FormControl>
              </Grid>
            </Grid>
          ))}
        </Paper>
      </FormGroup>
    </Grid>
  );
};

export default ChampionshipGenerative;
