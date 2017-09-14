import {
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicDatePickerModel,
    DynamicFormControlModel,
    DynamicFormGroupModel,
    DynamicInputModel,
    DynamicRadioGroupModel,
    DynamicSelectModel,
    DynamicTextAreaModel,
    DynamicTimePickerModel
} from "@ng-dynamic-forms/core";

export const NG_BOOTSTRAP_SAMPLE_FORM_MODEL: DynamicFormControlModel[] = [

    new DynamicFormGroupModel(
        {
            id: "stay",
            group: [

                new DynamicDatePickerModel(
                    {
                        id: "arrivalDate",
                        inline: false,
                        label: "Arrival",
                        placeholder: "Date of Arrival",
                        toggleIcon: "./assets/calendar-icon.svg"
                    },
                    {
                        element: {
                            container: "p-0",
                            label: "col-form-label"
                        },
                        grid: {
                            host: "col-sm-4"
                        }
                    }
                ),

                new DynamicDatePickerModel(
                    {
                        id: "departureDate",
                        inline: false,
                        label: "Departure",
                        placeholder: "Date of Departure",
                        toggleIcon: "./assets/calendar-icon.svg"
                    },
                    {
                        element: {
                            container: "p-0",
                            label: "col-form-label"
                        },
                        grid: {
                            host: "col-sm-4"
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
            id: "room",
            group: [

                new DynamicSelectModel(
                    {
                        id: "roomSize",
                        label: "Room Size",
                        options: [
                            {
                                label: "Single Room",
                                value: "single-room"
                            },
                            {
                                label: "Double Room",
                                value: "double-room"
                            },
                            {
                                label: "Business Suite",
                                value: "business-suite"
                            },
                            {
                                label: "Presidential Suite",
                                value: "presidential-suite"
                            },
                            {
                                label: "Storeroom",
                                value: "storeroom"
                            }
                        ],
                        value: "single-room"
                    },
                    {
                        element: {
                            label: "col-form-label"
                        },
                        grid: {
                            host: "col-sm-6"
                        }
                    }
                ),
                new DynamicInputModel(
                    {
                        id: "roomQuantity",
                        inputType: "number",
                        label: "Quantity",
                        placeholder: "Quantity",
                        hint: "Maximum: 5",
                        max: 5,
                        min: 0,
                        value: 1
                    },
                    {
                        element: {
                            container: "text-center",
                            label: "col-form-label"
                        },
                        grid: {
                            host: "col-sm-2"
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

    new DynamicInputModel(
        {
            id: "firstName",
            label: "First Name",
            placeholder: "First Name",
            validators: {
                required: null
            },
            errorMessages: {
                required: "{{ label }} is required"
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
                required: "{{ label }} is required"
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
            id: "email",
            label: "E-Mail",
            placeholder: "E-Mail",
            validators: {
                email: null
            },
            errorMessages: {
                email: "{{ label }} is not valid"
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
            id: "phone",
            inputType: "tel",
            label: "Phone Number",
            placeholder: "Phone Number",
            hint: "Add your country code first",
            prefix: "+",
            validators: {
                required: null
            },
            errorMessages: {
                required: "{{ label }} is required"
            }
        }
    ),

    new DynamicFormGroupModel(
        {
            id: "addressStreet",
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
                            host: "col-sm-10"
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
                            host: "col-sm-2"
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
            id: "addressLocation",
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

    new DynamicCheckboxGroupModel(
        {
            id: "extras",
            label: "Extras",
            group: [
                new DynamicCheckboxModel(
                    {
                        id: "extraBreakfast",
                        label: "Breakfast"
                    },
                    {
                        element: {
                            control: "btn-primary"
                        }
                    }
                ),
                new DynamicCheckboxModel(
                    {
                        id: "extraTV",
                        label: "TV",
                    },
                    {
                        element: {
                            control: "btn-primary"
                        }
                    }
                ),
                new DynamicCheckboxModel(
                    {
                        id: "extraWiFi",
                        label: "WiFi"
                    },
                    {
                        element: {
                            control: "btn-primary"
                        }
                    }
                ),
                new DynamicCheckboxModel(
                    {
                        id: "extraParking",
                        label: "Parking Lot"
                    },
                    {
                        element: {
                            control: "btn-primary"
                        }
                    }
                ),
                new DynamicCheckboxModel(
                    {
                        id: "extraBalcony",
                        label: "Balcony"
                    },
                    {
                        element: {
                            control: "btn-primary"
                        }
                    }
                )
            ]
        }
    ),

    new DynamicRadioGroupModel(
        {
            id: "payment",
            label: "Payment Method",
            options: [
                {
                    label: "Credit Card",
                    value: "cc"
                },
                {
                    label: "PayPal",
                    value: "paypal"
                },
                {
                    label: "Cash",
                    value: "cash"
                },
                {
                    label: "Bitcoin",
                    value: "bitcoin"
                }
            ],
            value: "cc"
        },
        {
            element: {
                label: "col-form-label",
                option: "btn-primary"
            }
        }
    ),

    new DynamicTimePickerModel(
        {
            id: "arrivalTime",
            label: "Estimated Arrival Time"
        },
        {
            element: {
                container: "pt-2 mb-0",
                label: "col-form-label"
            }
        }
    ),

    new DynamicTextAreaModel(
        {
            id: "notes",
            label: "Personal Note",
            placeholder: "Personal Note",
            rows: 5
        },
        {
            element: {
                label: "col-form-label"
            }
        }
    ),

    new DynamicInputModel(
        {
            id: "attachments",
            inputType: "file",
            label: "Attachments"
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
            label: "I confirm the information given above"
        }
    )
];