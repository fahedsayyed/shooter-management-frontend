import { createSlice } from '@reduxjs/toolkit';

interface SlideOne {
    gender: string;
    stateUnit: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    placeOfBirth: string;
    contactNumber: string;
    alternateContactNumber: string,
    education: string;
    mainEvent: string;
    playingEvents: {
        rifle: boolean;
        pistol: boolean;
        shotgun: boolean;
        bigbore: boolean;
    };
    profilePhoto: any,
    actionPhoto: any,
    birthProof: any,
}

interface SlideTwo {
    motherName: string,
    fatherName: string,
    maritalStatus: string,
    spouseName: string,
    height: string,
    weight: string,
    trackSuit: string,
    tshirtSize: string,
    shoeSize: string,
    address: string,
    pincode: string,
    cityName: string,
    stateName: string,
    addressProof: any,

}

interface SlideThreeFireArm {
    weapon_type: string;
    make: string;
    model: string;
    calibre: string;
    sticker: string;
    serial_no: string;
}

interface SlideThreeCoachDetail {
    coach_name: string;
    from_date: string;
    to_date: string;
}

interface SlideThree {
    passportNumber: string;
    passportImage: any;
    dateOfIssue: string;
    passportIssueAuthority: string;
    main: string;
    type: string;
    subtype: string;
    membershipNumber: string;
    dateOfExpiry: string;
    placeOfIssue: string;
    arjunaAwardee: string;
    internationalAwardee: string;
    fireArms: SlideThreeFireArm[];
    membershipAssociationCertificate: any;
    coachDetails: SlideThreeCoachDetail[];
    bondSubmissionDate: string;
    paymentRemark: string;
    arjunaAwardeeCertificate: any,
    internationalAwardeeCertificate: any,
    indemnityBond: any,
    validity: string
}

interface InitialState {
    slideOne: SlideOne;
    slideTwo: SlideTwo;
    slideThree: SlideThree;
    athlete :any;
    loading:any
    response:any,
    error:any
}

// const initialState: InitialState = {
//     slideOne: {
//         gender: "",
//         state_unit: "",
//         firstName: "",
//         lastName: "",
//         email: "",
//         dob: "",
//         birthPlace: "",
//         contactNo: "",
//         education: "",
//         mainEvent: "",
//     },
//     slideTwo: {
//         state: "Maharashtra",
//         maritalStatus: "single",
//         motherName: "",
//         fatherName: "",
//         spauseName: "",
//         address: "",
//         pincode: "",
//         weight: "",
//         height: "",
//         tshirtSize: "",
//         trackSuit: "",
//         shoesSize: "",
//     },
//     slideThree: {
//         passportNumber: "",
//         passportDateIssue: "",
//         passportDateAuthority: "",
//         membertype: "",
//         membershipType: "",
//         rifleClubDistrict: "",
//         nameOfRifleClubDistrict: "",
//         selectLifeOthers: "",
//         membershipNumber: "",
//         nraiShooterId: "",
//         passportDateExpiry: "",
//         passportPlaceIssue: "",
//         passportValidity: "",
//         arjunaAwardee: "",
//         internationalAwardee: "",
//         fireArms: [{ gunType: "", make: "", model: "", caliber: "", serialNo: "", sticker: "" }],
//         coachDetails: [{ coachName: "", coachFromDate: "", coachToDate: "" }],
//         bondSubmissionDate: "",
//         paymentRemark: "",
//         gender: "",
//         city: "",
//         state: "",
//     },
// };

const initialState: InitialState = {
    slideOne: {
        stateUnit: "",
        firstName: "",
        lastName: "",
        mainEvent: "rifle",
        playingEvents: {
            rifle: false,
            pistol: false,
            shotgun: false,
            bigbore: false,
        },
        education: "",
        dateOfBirth: "",
        placeOfBirth: "",
        email: "",
        contactNumber: "",
        alternateContactNumber: "",
        gender: "male",
        profilePhoto: null,
        actionPhoto: null,
        birthProof: null,
    },
    slideTwo: {
        motherName: "",
        fatherName: "",
        maritalStatus: "",
        spouseName: "",
        height: "",
        weight: "",
        trackSuit: "",
        tshirtSize: "",
        shoeSize: "",
        address: "",
        pincode: "",
        cityName: "",
        stateName: "",
        addressProof: null,
    },
    slideThree: {
        passportNumber: "",
        passportImage: null,
        dateOfIssue: "",
        passportIssueAuthority: "",
        main: "",
        type: "",
        subtype: "",
        membershipNumber: "",
        membershipAssociationCertificate: null,
        // nraiShooterId: "",
        dateOfExpiry: "",
        placeOfIssue: "",
        validity: "",
        arjunaAwardee: "",
        internationalAwardee: "",
        arjunaAwardeeCertificate: null,
        internationalAwardeeCertificate: null,
        fireArms: [{ weapon_type: "", make: "", model: "", calibre: "", sticker: "", serial_no: "" }],
        coachDetails: [{ coach_name: "", from_date: "", to_date: "" }],
        bondSubmissionDate: "",
        paymentRemark: "",
        indemnityBond: null,

    },
    athlete : [],
    response : null,
    loading : false,
    error:null
};

export const AthleteFormDataSlice = createSlice({
    name: 'athleteRegisterForm',
    initialState,
    reducers: {
        setSlideOneFormData: (state: any, action: any) => {
            return {
                ...state,
                slideOne: {
                    ...state.slideOne,
                    ...action.payload
                }
            }

        },
        setSlideTwoFormData: (state: any, action: any) => {
            return {
                ...state,
                slideTwo: {
                    ...state.slideTwo,
                    ...action.payload
                }
            }

        },
        setSlideThreeFormData: (state: any, action: any) => {
            return {
                ...state,
                slideThree: {
                    ...state.slideThree,
                    ...action.payload
                }
            }

        },
        setFiles: (state: any, action: any) => {
            const { slideName, fileType, fileData } = action.payload;

            return {
                ...state,
                [slideName]: {
                    ...state[slideName],
                    [fileType]: fileData,
                },
            };
        },

  

    },
});

export const {
    setSlideOneFormData,
    setSlideTwoFormData,
    setSlideThreeFormData, setFiles,
} = AthleteFormDataSlice.actions;

export default AthleteFormDataSlice.reducer;
