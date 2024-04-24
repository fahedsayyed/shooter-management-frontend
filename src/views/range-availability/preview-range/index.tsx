import React from "react";
import BackLink from "src/components/back-link";
import { Box, Stepper, Step, styled, StepLabel, Button, Stack, Grid, Typography, Avatar } from "@mui/material";
import APP_ROUTES from "src/routes/routePaths";
import "./style.scss";
import PageContainer from "src/components/page-container/PageContainer";
import userimg from "src/assets/images/profile/user-1.jpg";
import { useNavigate } from "react-router";

const PreviewRange = () => {
  const navigate = useNavigate();
  const ProfileImage = styled(Box)(() => ({
    width: "145px",
    height: "145px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
  }));

  const steps = ["Applicant Info", "Range Usage Application Form", "Charges for usage of weapons"];

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  // const isStepOptional = (step:any) => step === 1;
  const isStepSkipped = (step: any) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSteps = (step: any) => {
    switch (step) {
      case 0:
        return (
          <>
            <div className="affilates">
              <div className="range-heading">
                <h3 className="text-center">Range Usage Application form</h3>
              </div>
              <div className="range-data">
                <div className="profile-display">
                  <div>
                    <p>
                      To,
                      <br />
                      The General Secretary
                      <br />
                      Maharashtra Rifle Association
                      <br />
                      Worli Seaface(N)
                      <br />
                      Mumbai - 400025
                    </p>
                  </div>
                  <Box>
                    <ProfileImage>
                      <Avatar
                        src={userimg}
                        alt={userimg}
                        sx={{
                          width: "140px",
                          height: "140px",
                          border: "2px solid #fff",
                        }}
                      />
                    </ProfileImage>
                  </Box>
                </div>
                <br />
                <p>Subject: Permission for use of MRA Shooting ranges.</p>
                <br />
                <p>Madam/Sir,</p>
                <p>
                  I <b>ARUN VIKAS</b> presently residing at{" "}
                  <b>FLAT NO 3, B BLOCK , GARDEN VIEW APARTMENTS, B BLOCK , NEXT TO GSB SEVA, BEHIND SION FORT, OPPOSITE TO HIGHWAY APAT, ROAD NO 29, SION EAST</b> Mobile no.{" "}
                  <b>8652748990</b> Email ID <b>ARUN007NAVY@yopmail.com</b> desirous of using the MRA Shooting ranges for target practise.
                </p>

                <p>I am a member of following Rifle Club:</p>
                <p>
                  Name of the Rifle Club : <b>SWATANTRA VEER SAVARKAR AIR RIFLE CLUB</b>
                </p>
                <p>
                  Membership type / No : <b>MRA AFFILIATED</b>
                </p>
                <p>
                  Member upto : <b>LIFE</b>
                </p>
                <p>Hence I may be extended the MRA shooting range facility for target practise.</p>
                <p>I am willing to pay the requisite charges for the same. Thanking you in anticipation.</p>
                <br />
                <br />
                <p>Yours Truly,</p>
                <br />
                <p>
                  <b>ARUN VIKAS</b>
                </p>

                <br />
                <br />
                <p>
                  Date:{" "}
                  <b>
                    <span className="date">2022-05-23</span>
                  </b>
                </p>
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className="comm_form3">
              <div className="range-heading">
                <h3>
                  National Rifle Association
                  <br />
                  NRAI Shooting Ranges, Worli Sea Face, north Mumbai - 400030
                  <br />
                  Tel. 022 2432736 / 24930064
                  <br />
                  <span className="caps">Private &amp; Confidential</span>
                </h3>
              </div>
              <div className="range-data">
                <ol>
                  <li className="spacer">
                    <p>
                      Name of Applicant : <b>ARUN VIKAS</b>
                    </p>
                    <p>
                      Address: <b>FLAT NO 3, B BLOCK , GARDEN VIEW APARTMENTS, B BLOCK , NEXT TO GSB SEVA, BEHIND SION FORT, OPPOSITE TO HIGHWAY APAT, ROAD NO 29, SION EAST</b>
                    </p>
                    <p>
                      Tel / E-mail Id: <b>ARUN007NAVY@yopmail.com</b>
                    </p>
                  </li>
                  <li className="spacer">
                    <p>
                      Qualification: SSC/HSC/Post Graduate/Other qualifications
                      <br />
                      Education qualification showing places of education with year in school
                    </p>
                    <table className="table table-bordered darkborder" id="school_preview_tbl">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Address</th>
                          <th>Date of Entering</th>
                          <th>Date of Leaving</th>
                          <th>Examinations passed</th>
                          <th>Telephone Number</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>NAVAL PUBLIC SCHOOL</td>
                          <td>PORT BLAIR, ANDAMAN ISLAND</td>
                          <td>01-06-2006</td>
                          <td>30-06-2007</td>
                          <td>TILL CLASS 7</td>
                          <td>0319222558</td>
                        </tr>

                        <tr>
                          <td>RAJKUMAR MAT HR SEC SCHOOL</td>
                          <td>MADIPAKKAM, CHENNAI</td>
                          <td>01-07-2007</td>
                          <td>30-06-2010</td>
                          <td>SECONDARY AND HIGHER SECONDARY</td>
                          <td>0442242139</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="college_div">
                      Education qualification showing places of education with year in college
                      <table className="table table-bordered darkborder" id="college_preview_tbl">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Date of Entering</th>
                            <th>Date of Leaving</th>
                            <th>Examinations passed</th>
                            <th>Telephone Number</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>GLASGOW COLLEGE OF NAUTICAL STUDIESGLASGOW COLLEGE OF NAUTICAL STUDIES</td>
                            <td>GLASGOW, SCOTLAND,UNITED KINGDOM</td>
                            <td>22-07-2010</td>
                            <td>31-07-2012</td>
                            <td>HND NAUTICAL STUDIES</td>
                            <td>1413575555</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    Self attested copy of marksheet/certificate:
                    <a href="javascript:void(0)">
                      <span title="Preview">
                        <i className="fa fa-eye" aria-hidden="true"></i>
                      </span>
                    </a>
                    <p></p>
                  </li>
                  <li className="spacer">
                    <p>
                      Brief Details of Business / Profession / Job :{" "}
                      <b>
                        <span className="business_details">I AM AN EX MERCHANT MARINER NOW AN MARINE RISK UNDERWRITER IN A REPUTED GENERAL INSURANCE COMPANY</span>
                      </b>
                    </p>
                    <br />
                    <p>
                      Monthly / Yearly Income:{" "}
                      <b>
                        <span className="income">1500000</span>
                      </b>
                    </p>
                  </li>
                  <li className="spacer">
                    <p>Detail of family member staying with the applicant</p>
                    <p></p>
                    <table className="table table-bordered darkborder" id="relation_tbl">
                      <thead>
                        <tr>
                          <th>NAME</th>
                          <th>AGE</th>
                          <th>OCCUPATION</th>
                          <th>RELATION</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>ISAIARASI JEEVA</td>
                          <td>33</td>
                          <td>SOFWARE ENGINEER, ACCENTURE INDIA PRIVATE LIMITED</td>
                          <td>Husband/Wife</td>
                        </tr>
                      </tbody>
                    </table>
                    <p></p>
                  </li>
                  <li className="spacer">
                    <p>
                      Whether Arms License is applied?{" "}
                      <b>
                        <span className="license_applied">NO</span>
                      </b>{" "}
                      <b>
                        <span className="arm_result"></span>
                      </b>
                    </p>
                    <p>
                      Whether Application is Pending or License was Granted / Rejected :{" "}
                      <b>
                        <span className="arm_application_status">PENDING</span>
                      </b>
                    </p>
                    <p className="col-md-3">Details of Arms: </p>
                    <p className="col-md-3">
                      No:{" "}
                      <b>
                        <span className="license_no">NA</span>
                      </b>
                    </p>
                    <p className="col-md-3">
                      Issued By:{" "}
                      <b>
                        <span className="issued_by">NA</span>
                      </b>
                    </p>
                    <p className="col-md-3">
                      Valid Up to:{" "}
                      <b>
                        <span className="valid_upto">29-05-2024</span>
                      </b>
                    </p>
                  </li>
                  <li className="spacer">
                    <p>Details Of Arms</p>
                    <p></p>
                    <table className="table table-bordered darkborder" id="arm_tbl">
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Sr.no</th>
                          <th>Caliber</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Rifle</td>
                          <td>0002637</td>
                          <td>.177</td>
                        </tr>
                      </tbody>
                    </table>
                    <p></p>
                  </li>
                  <li className="spacer">
                    <p>
                      Details of arms license and weapon possessed by each above mentioned members:
                      <a href="javascript:void(0)">
                        <span title="Preview">
                          <i className="fa fa-eye" aria-hidden="true"></i>
                        </span>
                      </a>
                    </p>
                  </li>
                  <li className="spacer">
                    <p>
                      Experience in Using Firearms:{" "}
                      <b>
                        <span className="experience_in_firearms">AIR RIFLE AND SMALL BORE FIREARMS</span>
                      </b>
                    </p>
                    <p>
                      Details of Course Attended in Handling of Guns:{" "}
                      <b>
                        <span className="details_of_course">RIFLE CLUB SAFTEY COURSE, MRA SAFETY COURSE AND ON GOING ADVANCE RIFLE CLASSES IN RIFLE CLUB</span>
                      </b>
                    </p>
                  </li>
                  <li className="spacer">
                    <p>
                      Details of other sports activities if any:{" "}
                      <b>
                        <span className="details_of_sports">AIR RIFLE AND SMALL BORE .22LR 50 METERS PRONE</span>
                      </b>
                    </p>
                  </li>
                  <li className="spacer">
                    <p>
                      Other Information:{" "}
                      <b>
                        <span className="other_information">NA</span>
                      </b>{" "}
                    </p>
                  </li>
                </ol>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <fieldset id="demo-p-2" role="tabpanel" aria-labelledby="demo-h-2" className="body current" aria-hidden="false">
              <p></p>
              <b>
                <h3>CHARGES FOR USAGE OF MRA RANGES / WEAPONS.</h3>
              </b>
              <p></p>
              <b>
                <span className="discount">(25% discount is applied for juniors who pay yearly charges)</span>
              </b>
              <table className="table table-bordered whitebg">
                <tbody>
                  <tr className="blueshade">
                    <th></th>
                    <th>PERIOD</th>
                    <th>CHARGE</th>
                    <th>
                      EXPIRY DATE
                      <br />
                      <span className="expiry_heading"></span>
                    </th>
                  </tr>
                  <tr className="">
                    <td>Range Enrollment fees</td>
                    <td>YEARLY</td>
                    <td>₹ 4000</td>
                    <td>
                      <span className="expiry_date"></span>2024-08-03
                    </td>
                  </tr>

                  <tr className="">
                    <td>All Ranges</td>
                    <td>YEARLY</td>
                    <td>₹ 4000</td>
                    <td>
                      <span className="expiry_date1"></span>2024-08-03
                    </td>
                  </tr>
                  <tr className="">
                    <td>AC</td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      <span className="expiry_date2"></span>-
                    </td>
                  </tr>
                  <tr className="">
                    <td>Suis Ascor per 2 hours</td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      <span className="expiry_date3"></span>-
                    </td>
                  </tr>
                  <tr className="blueshade">
                    <td>
                      <b>RENTAL ARMS</b>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr className="">
                    <td>.22 alustcok GSP Walther .22/.32 Free Pistol - Toz</td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      <span className="expiry_date4"></span>-
                    </td>
                  </tr>
                  <tr className="">
                    <td>.22 Pardini /.22 Free Pistol Morini /.32 GSP Expert</td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      <span className="expiry_date5"></span>-
                    </td>
                  </tr>
                  <tr className="">
                    <td>.177 Air Pistol Pardini</td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      <span className="expiry_date6"></span>-
                    </td>
                  </tr>
                  <tr className="">
                    <td>Air Rifle /.22 Wodden Stock/.22 Brno</td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      <span className="expiry_date7"></span>-
                    </td>
                  </tr>
                  <tr className="">
                    <td>Orientation fees for all New shooters using MRA ranges</td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      <span className="expiry_date8"></span>-
                    </td>
                  </tr>
                  <tr className="">
                    <td>Firearm weapon handling orientation</td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      <span className="expiry_date9"></span>-
                    </td>
                  </tr>
                  <tr className="">
                    <td>Suitcase</td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      <span className="expiry_date10"></span>-
                    </td>
                  </tr>
                  <tr className="blueshade">
                    <td>
                      <b>LOCKER SIZE</b>
                    </td>
                    <td></td>
                    <td>-</td>
                    <td></td>
                  </tr>
                  <tr className="">
                    <td>Locker</td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      <span className="expiry_date11"></span>-
                    </td>
                  </tr>
                  <tr className="blueshade">
                    <td>
                      <b>TOTAL AMOUNT</b>
                    </td>
                    <td></td>
                    <td className="final_total">₹8000</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <div className="col-sm-12 full_width"></div>
            </fieldset>
          </>
        );
      default:
        break;
    }
  };

  {
    activeStep === steps.length ? navigate(`${APP_ROUTES.RANGE_AVAILABILTY}`) : null;
  }

  return (
    <>
      <BackLink title="Back to range availability" route={`${APP_ROUTES.RANGE_AVAILABILTY}`} />
      <PageContainer title="Login" description="this is Login page">
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} lg={12} xl={12} mb={2} display="flex" justifyContent="center" alignItems="center">
            <Box sx={{ width: "100%", boxShadow: "2px 2px 4px #ccc", background: "linear-gradient(317deg, rgba(255,255,254,1) 0%, rgba(249,251,253,1) 40%)" }} p={3}>
              <Stepper sx={{ paddingBottom: "20px" }} activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps: { completed?: boolean } = {};
                  const labelProps: {
                    optional?: React.ReactNode;
                  } = {};
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }

                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? null : (
                <>
                  <Box>{handleSteps(activeStep)}</Box>

                  <Stack direction="row" justifyContent="center" spacing={3} mt={4}>
                    <Button size="large" disabled={activeStep === 0} onClick={handleBack} variant="contained" color="inherit">
                      <Typography variant="subtitle2" ml={1}>
                        previous
                      </Typography>
                    </Button>
                    <Button size="large" onClick={handleNext} variant="contained" color={activeStep === steps.length - 1 ? "success" : "primary"}>
                      <Typography variant="subtitle2" mr={1}>
                        {" "}
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Typography>
                    </Button>
                  </Stack>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </PageContainer>
    </>
  );
};

export default PreviewRange;
