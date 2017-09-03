import {
    DynamicCheckboxModel,
    DynamicDatePickerModel,
    DynamicFormControlModel,
    DynamicFormGroupModel,
    DynamicInputModel,
    DynamicRadioGroupModel,
    DynamicSelectModel,
    DynamicTextAreaModel
} from "@ng2-dynamic-forms/core";

export const NG_BOOTSTRAP_EXAMPLE_MODEL: DynamicFormControlModel[] = [

    new DynamicRadioGroupModel(
        {
            id: "sex",
            label: "Sex",
            options: [
                {
                    label: "Female",
                    value: "female"
                },
                {
                    label: "Male",
                    value: "male"
                },
            ],
            value: "female"
        },
        {
            element: {
                control: "btn-primary",
                label: "col-form-label"
            }
        }
    ),

    new DynamicSelectModel(
        {
            id: "degree",
            label: "Degree",
            options: [
                {
                    label: "Bachelor of Arts (B.A.)",
                    value: "BA"
                },
                {
                    label: "Bachelor of Science (B.S.)",
                    value: "BS"
                },
                {
                    label: "Master of Arts (M.A.)",
                    value: "MA"
                },
                {
                    label: "Master of Science (M.S.)",
                    value: "MS"
                },
                {
                    label: "Doctor of Philosophy (Ph.D.)",
                    value: "PhD"
                }
            ],
            value: "BA"
        },
        {
            element: {
                label: "col-form-label"
            },
            grid: {
            }
        }
    ),

    new DynamicInputModel(
        {
            id: "firstName",
            hint: "Just a hint",
            label: "First Name",
            placeholder: "First Name",
            prefix: "Prefix",
            suffix: "Suffix",
            validators: {
                required: null
            },
            errorMessages: {
                required: "Field is required"
            }
        },
        {
            element: {
                label: "col-form-label"
            }
        }
    ),

    new DynamicInputModel(
        {
            id: "lastName",
            label: "Last Name",
            placeholder: "Last Name",
            validators: {
                required: null
            },
            errorMessages: {
                required: "Field is required"
            }
        },
        {
            element: {
                label: "col-form-label"
            }
        }
    ),

    new DynamicDatePickerModel(
        {
            id: "birthday",
            inline: false,
            label: "Date of Birth",
            placeholder: "Date of Birth",
            toggleIcon: "../../assets/calendar-icon.svg"
        },
        {
            element: {
                label: "col-form-label"
            }
        }
    ),

    new DynamicInputModel(
        {
            id: "email",
            label: "E-Mail",
            placeholder: "E-Mail",
            validators: {
                required: null
            },
            errorMessages: {
                required: "Field {{ id }} is required"
            }
        },
        {
            element: {
                label: "col-form-label"
            }
        }
    ),

    new DynamicFormGroupModel(
        {
            id: "street",
            group: [

                new DynamicInputModel(
                    {
                        id: "streetName",
                        label: "Street Name",
                        placeholder: "Street Name"
                    },
                    {
                        element: {
                            label: "col-form-label"
                        },
                        grid: {
                            host: "col-sm-9"
                        }
                    }
                ),

                new DynamicInputModel(
                    {
                        id: "streetNumber",
                        label: "Street Number",
                        placeholder: "Number"
                    },
                    {
                        element: {
                            label: "col-form-label"
                        },
                        grid: {
                            host: "col-sm-3"
                        }
                    }
                )
            ]
        },
        {
            element: {
                control: "form-row"
            }
        }
    ),

    new DynamicFormGroupModel(
        {
            id: "address",
            group: [

                new DynamicInputModel(
                    {
                        id: "zipCode",
                        label: "Zip Code",
                        placeholder: "ZIP"
                    },
                    {
                        element: {
                            label: "col-form-label"
                        },
                        grid: {
                            host: "col-sm-2"
                        }
                    }
                ),

                new DynamicInputModel(
                    {
                        id: "state",
                        label: "State",
                        placeholder: "State"
                    },
                    {
                        element: {
                            label: "col-form-label"
                        },
                        grid: {
                            host: "col-sm-4"
                        }
                    }
                ),

                new DynamicInputModel(
                    {
                        id: "city",
                        label: "City",
                        placeholder: "City"
                    },
                    {
                        element: {
                            label: "col-form-label"
                        },
                        grid: {
                            host: "col-sm-6"
                        }
                    }
                )
            ]
        },
        {
            element: {
                control: "form-row"
            }
        }
    ),

    new DynamicTextAreaModel(
        {
            id: "bio",
            label: "Bio",
            placeholder: "Bio",
            rows: 5
        },
        {
            element: {
                label: "col-form-label"
            }
        }
    ),

    new DynamicCheckboxModel(
        {
            id: "confirm",
            label: "I confirm that the information given above is correct"
        }
    )
];