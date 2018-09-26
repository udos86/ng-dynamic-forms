import {
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicColorPickerModel,
    DynamicDatePickerModel,
    DynamicFormGroupModel,
    DynamicInputModel,
    DynamicRadioGroupModel,
    DynamicRatingModel,
    DynamicSelectModel,
    DynamicSwitchModel,
    DynamicTextAreaModel,
    DynamicTimePickerModel
} from "@ng-dynamic-forms/core";

export const PRIME_NG_SAMPLE_FORM_MODEL = [

    new DynamicFormGroupModel({

        id: "stay",
        group: [
            new DynamicDatePickerModel({

                id: "arrivalDate",
                format: "mm/dd/yy",
                inline: false,
                hint: "This is tooltip hint",
                label: "Arrival",
                placeholder: "Date of Arrival"
            }),

            new DynamicDatePickerModel({

                id: "departureDate",
                format: "mm/dd/yy",
                inline: false,
                hint: "This is tooltip hint",
                label: "Departure",
                placeholder: "Date of Departure"
            })
        ],
        validators: {
            customDateRangeValidator: null
        },
        errorMessages: {
            customDateRangeValidator: "Invalid period of time selected"
        }
    }),

    new DynamicFormGroupModel({

        id: "room",
        group: [
            new DynamicSelectModel<string>({

                id: "roomSize",
                label: "Room Size",
                placeholder: "Room Size",
                hint: "This is tooltip hint",
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
            }),

            new DynamicInputModel({

                id: "roomQuantity",
                inputType: "number",
                label: "Quantity",
                hint: "This is tooltip hint",
                placeholder: "Quantity",
                max: 5,
                min: 0
            })
        ]
    }),

    new DynamicColorPickerModel({

        id: "roomColor",
        label: "Room Color",
        value: "#FFFFFF",
        hint: "This is tooltip hint",

    }),

    new DynamicInputModel({

        id: "firstName",
        label: "First Name",
        hint: "This is tooltip hint",
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
        hint: "This is tooltip hint",

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
        hint: "This is tooltip hint",
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
        label: "Phone Number",
        placeholder: "Phone Number",
        hint: "This is tooltip hint",
        mask: "+(99) 999-9999",
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
                label: "Number",
                placeholder: "Number"
            })
        ]
    }),

    new DynamicFormGroupModel({

        id: "addressLocation",
        group: [
            new DynamicInputModel({

                id: "zipCode",
                label: "ZIP",
        hint: "This is tooltip hint",
        placeholder: "ZIP"
            }),
            new DynamicInputModel({

                id: "state",
                label: "State",
        hint: "This is tooltip hint",
        placeholder: "State",
                list: ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
            }),
            new DynamicInputModel({

                id: "city",
        hint: "This is tooltip hint",
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
                hint: "This is tooltip hint",
                label: "Breakfast"
            }),
            new DynamicCheckboxModel({

                id: "extraTV",
                hint: "This is tooltip hint",
                label: "TV",
            }),
            new DynamicCheckboxModel({

                id: "extraWiFi",
                hint: "This is tooltip hint",
                label: "WiFi"
            }),
            new DynamicCheckboxModel({

                id: "extraParking",
                hint: "This is tooltip hint",
                label: "Parking Lot"
            })
        ]
    }),

    new DynamicRadioGroupModel<string>({

        id: "payment",
        hint: "This is tooltip hint",
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
        hint: "This is tooltip hint",
        label: "Estimated Arrival Time",
        showSeconds: false
    }),

    new DynamicTextAreaModel({

        id: "note",
        hint: "This is tooltip hint",
        label: "Personal Note",
        rows: 5,
        placeholder: "Personal Note",
    }),

    new DynamicSwitchModel({

        id: "reminder",
        hint: "This is tooltip hint",
        label: "Send me a reminder",
        offLabel: "Off",
        onLabel: "On",
        value: false
    }),

    new DynamicSwitchModel({

        id: "newsletter",
        hint: "This is tooltip hint",
        label: "Subscribe to newsletter",
        offLabel: "Off",
        onLabel: "On",
        value: true
    }),

    new DynamicRatingModel({

        id: "feedback",
        hint: "This is tooltip hint",
        label: "How did you like this form?",
        additional: {
            cancel: false
        }
    }),

    new DynamicCheckboxModel({

        id: "confirm",
        hint: "This is tooltip hint",
        label: "I confirm the information given above"
    })
];