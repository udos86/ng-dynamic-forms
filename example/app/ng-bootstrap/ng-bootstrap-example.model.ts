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
} from "@ng2-dynamic-forms/core";

export const NG_BOOTSTRAP_EXAMPLE_MODEL: DynamicFormControlModel[] = [

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
                        toggleIcon: "../../assets/calendar-icon.svg"
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
                        toggleIcon: "../../assets/calendar-icon.svg"
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
            ]
        },
        {
            element: {
                control: "form-row"
            }
        }
    ),

    new DynamicSelectModel(
        {
            id: "room",
            label: "Room",
            placeholder: "Select Room",
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
            ]
        },
        {
            element: {
                label: "col-form-label"
            }
        }
    ),

    new DynamicInputModel(
        {
            id: "firstName",
            hint: "Just a hint",
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
            prefix: "Prefix",
            suffix: "Suffix",
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
                            host: "col-sm-9"
                        }
                    }
                ),

                new DynamicInputModel(
                    {
                        id: "streetNumber",
                        inputType: "number",
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
                control: "btn-primary",
                label: "col-form-label"
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
            label: "Notes",
            placeholder: "Additional Notes",
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
            label: "I confirm the information given above"
        }
    )
];