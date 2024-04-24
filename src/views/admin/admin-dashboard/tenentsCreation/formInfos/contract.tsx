import React, { useState, useEffect } from "react";
import { Grid, MenuItem } from "@mui/material";
import CustomSelect from "src/utils/theme-elements/CustomSelect";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import { useDispatch } from "react-redux";
import { getSubscriptionAndPlanRequest, setSlideThreeFormData } from "src/store/reducers/TenentSlice";
import { useSelector } from "react-redux";
import { AppState } from "src/store/Store";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import { RequiredStar } from "src/components/required-star";
import { SlideThreeInterface } from "src/types/superAdmin";

interface ContractInfoProps {
  disabled: boolean;
  params: any;
  createFieldHandlersSlideThree: (fieldName: any) => { onBlur: () => void };
  errors: any;
}

const Contract: React.FC<ContractInfoProps> = ({ createFieldHandlersSlideThree, errors }) => {
  console.log(errors,"errors in third slide")
  const subscriptionAndPlans = useSelector((state: AppState) => state.tenent.subscriptionsAndPlans);
  const dispatch = useDispatch();
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [transactionId, setTransactionId] = useState<string>("");

  useEffect(() => {
    dispatch(getSubscriptionAndPlanRequest());
  }, []);

  const handlePlanSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedDuration = event.target.value as string;
    const selected = subscriptionAndPlans.find((plan: any) => plan.duration === selectedDuration);
    if (selected) {
      setSelectedPlan(selected);
      setSelectedPrice(selected.price);
      dispatch(setSlideThreeFormData({ subscriptionAndPlanId: selected.id }));
    }
  };

  const handleTransactionIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionId(event.target.value);
    dispatch(setSlideThreeFormData({ transactionNumber: event.target.value }));
  };

  return (
    <>
      <Grid container spacing={2}>
        <div style={{ marginTop: "20px", width: "100%" }}>
          <CustomFormLabel>
            Subscription & Plan <RequiredStar />
          </CustomFormLabel>
          <CustomSelect
            sx={{ width: "50%" }}
            className="custom-select"
            id="tenent-type"
            variant="outlined"
            name="subscriptionAndPlanId"
            error={!!errors.subscriptionAndPlanId}
            helperText={errors.subscriptionAndPlanId}
            {...createFieldHandlersSlideThree("subscriptionAndPlanId")}
            value={selectedPlan ? selectedPlan.duration : ""}
            onChange={handlePlanSelect}
            required
          >
            {subscriptionAndPlans?.map((plan: any) => (
              <MenuItem key={plan.id} value={plan.duration}>
                {`${plan.plan_name} \u00A0 (${plan.duration})`}
              </MenuItem>
            ))}
          </CustomSelect>
          <br />
          {selectedPlan && (
            <div>
              <p>Selected Plan: {selectedPlan.plan_name}</p>
              <p>Price: {selectedPrice}</p>
            </div>
          )}
        </div>
      </Grid>
      <Grid container spacing={2}>
        <div style={{ marginTop: "20px", width: "100%" }}>
          <CustomFormLabel>Transaction Id</CustomFormLabel>
          <CustomTextField
            fullWidth
            sx={{ width: "50%" }}
            value={transactionId}
            error={!!errors.transactionNumber}
            helperText={errors.transactionNumber}
            name ="transactionNumber"
            {...createFieldHandlersSlideThree("transactionNumber")}
            onChange={handleTransactionIdChange}
          />
        </div>
      </Grid>
    </>
  );
};

export default Contract;
