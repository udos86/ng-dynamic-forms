import {
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicDatePickerModel,
    DynamicFormControlModel,
    DynamicFormGroupModel,
    DynamicInputModel,
    DynamicRadioGroupModel,
    DynamicRatingModel,
    DynamicSelectModel,
    DynamicTextAreaModel,
    DynamicTimePickerModel
} from "@ng-dynamic-forms/core";

export const NG_BOOTSTRAP_SAMPLE_FORM_MODEL: DynamicFormControlModel[] = [

    new DynamicFormGroupModel({

        id: "stay",
        group: [
            new DynamicDatePickerModel({

                id: "arrivalDate",
                inline: false,
                label: "Arrival",
                placeholder: "Date of Arrival",
                toggleIcon: "./assets/calendar-icon.svg"
            }),

            new DynamicDatePickerModel({

                id: "departureDate",
                inline: false,
                label: "Departure",
                placeholder: "Date of Departure",
                toggleIcon: "./assets/calendar-icon.svg"
            })
        ]
    }),

    new DynamicFormGroupModel({

        id: "room",
        group: [
            new DynamicSelectModel({

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
            }),

            new DynamicInputModel({

                id: "roomQuantity",
                inputType: "number",
                label: "Quantity",
                placeholder: "Quantity",
                hint: "Maximum: 5",
                max: 5,
                min: 0,
                value: 1
            })
        ]
    }),

    new DynamicInputModel({

        id: "firstName",
        label: "First Name",
        placeholder: "First Name",
        validators: {
            required: null
        },
        errorMessages: {
            required: "{{ label }} is required"
        }
    }),

    new DynamicInputModel({

        id: "lastName",
        label: "Last Name",
        placeholder: "Last Name",
        validators: {
            required: null
        },
        errorMessages: {
            required: "{{ label }} is required"
        }
    }),

    new DynamicInputModel({

        id: "email",
        label: "E-Mail",
        placeholder: "E-Mail",
        validators: {
            email: null
        },
        errorMessages: {
            email: "{{ label }} is not valid"
        }
    }),

    new DynamicInputModel({

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
    }),

    new DynamicFormGroupModel({

        id: "addressStreet",
        group: [
            new DynamicInputModel({

                id: "streetName",
                label: "Street Name",
                placeholder: "Street Name"
            }),
            new DynamicInputModel({

                id: "streetNumber",
                label: "Street Number",
                placeholder: "Number"
            })
        ]
    }),

    new DynamicFormGroupModel({

        id: "addressLocation",
        group: [
            new DynamicInputModel({

                id: "zipCode",
                label: "Zip Code",
                placeholder: "ZIP"
            }),
            new DynamicInputModel({

                id: "state",
                label: "State",
                placeholder: "State"
            }),
            new DynamicInputModel({

                id: "city",
                label: "City",
                placeholder: "City"
            })
        ]
    }),

    new DynamicCheckboxGroupModel({

        id: "extras",
        label: "Extras",
        group: [
            new DynamicCheckboxModel({

                id: "extraBreakfast",
                label: "Breakfast"
            }),
            new DynamicCheckboxModel({

                id: "extraTV",
                label: "TV",
            }),
            new DynamicCheckboxModel({

                id: "extraWiFi",
                label: "WiFi"
            }),
            new DynamicCheckboxModel({

                id: "extraParking",
                label: "Parking Lot"
            }),
            new DynamicCheckboxModel({

                id: "extraBalcony",
                label: "Balcony"
            })
        ]
    }),

    new DynamicRadioGroupModel({

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
    }),

    new DynamicTimePickerModel({

        id: "arrivalTime",
        label: "Estimated Arrival Time"
    }),

    new DynamicTextAreaModel({

        id: "notes",
        label: "Personal Note",
        placeholder: "Personal Note",
        autoComplete: "field_personal_note",
        rows: 5
    }),

    new DynamicInputModel({

        id: "attachments",
        inputType: "file",
        label: "Attachments"
    }),

    new DynamicRatingModel({

        id: "feedback",
        label: "How did you like this form?",
        additional: {
            cancel: false
        }
    }),

    new DynamicCheckboxModel({

        id: "confirm",
        label: "I confirm the information given above"
    })
];