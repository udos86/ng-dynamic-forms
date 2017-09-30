import {
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
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
import { customDateRangeValidator } from "../app.validators";

export const PRIME_NG_SAMPLE_FORM_MODEL = [

    new DynamicFormGroupModel(
        {
            id: "stay",
            validator: {
                customDateRangeValidator: {
                    name: customDateRangeValidator.name,
                    args: null
                }
            },
            errorMessages: {
                customDateRangeValidator: "Invalid period of time selected"
            },
            group: [
                new DynamicDatePickerModel(
                    {
                        id: "arrivalDate",
                        format: "mm/dd/yy",
                        inline: false,
                        label: "Arrival",
                        placeholder: "Date of Arrival"
                    },
                    {
                        element: {
                            label: "ui-widget"
                        },
                        grid: {
                            host: "ui-g-4"
                        }
                    }
                ),
                new DynamicDatePickerModel(
                    {
                        id: "departureDate",
                        format: "mm/dd/yy",
                        inline: false,
                        label: "Departure",
                        placeholder: "Date of Departure"
                    },
                    {
                        element: {
                            label: "ui-widget"
                        },
                        grid: {
                            host: "ui-g-4"
                        }
                    }
                )
            ]
        },
        {
            grid: {
                control: "ui-g"
            }
        }
    ),

    new DynamicFormGroupModel(
        {
            id: "room",
            group: [

                new DynamicSelectModel<string>(
                    {
                        id: "roomSize",
                        label: "Room Size",
                        placeholder: "Room Size",
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
                            label: "ui-widget"
                        },
                        grid: {
                            host: "ui-g-4",
                        }
                    }
                ),

                new DynamicInputModel(
                    {
                        id: "roomQuantity",
                        inputType: "number",
                        label: "Quantity",
                        placeholder: "Quantity",
                        max: 5,
                        min: 0
                    },
                    {
                        element: {
                            label: "ui-widget"
                        },
                        grid: {
                            host: "ui-g-2",
                        }
                    }
                )
            ]
        },
        {
            grid: {
                control: "ui-g"
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
                label: "ui-widget"
            },
            grid: {
                host: "ui-g",
                container: "ui-g-7"
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
                label: "ui-widget"
            },
            grid: {
                host: "ui-g",
                container: "ui-g-7"
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
                label: "ui-widget"
            },
            grid: {
                host: "ui-g",
                container: "ui-g-7"
            }
        }
    ),

    new DynamicInputModel(
        {
            id: "phone",
            label: "Phone Number",
            placeholder: "Phone Number",
            mask: "+(99) 999-9999",
            validators: {
                required: null
            },
            errorMessages: {
                required: "{{ label }} is required"
            }
        },
        {
            element: {
                label: "ui-widget"
            },
            grid: {
                host: "ui-g",
                container: "ui-g-7"
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
                            label: "ui-widget"
                        },
                        grid: {
                            host: "ui-g-7"
                        }
                    }
                ),

                new DynamicInputModel(
                    {
                        id: "streetNumber",
                        label: "Number",
                        placeholder: "Number"
                    },
                    {
                        element: {
                            label: "ui-widget"
                        },
                        grid: {
                            host: "ui-g-2",
                        }
                    }
                )
            ]
        },
        {
            grid: {
                control: "ui-g"
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
                        label: "ZIP",
                        placeholder: "ZIP"
                    },
                    {
                        element: {
                            label: "ui-widget"
                        },
                        grid: {
                            host: "ui-g-2"
                        }
                    }
                ),

                new DynamicInputModel(
                    {
                        id: "state",
                        label: "State",
                        placeholder: "State",
                        list: ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
                    },
                    {
                        element: {
                            label: "ui-widget"
                        },
                        grid: {
                            host: "ui-g-4",
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
                            label: "ui-widget"
                        },
                        grid: {
                            host: "ui-g-5",
                        }
                    }
                )
            ]
        },
        {
            grid: {
                control: "ui-g"
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
                            label: "ui-widget",
                        },
                        grid: {
                            host: "ui-g-3"
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
                            label: "ui-widget",
                        },
                        grid: {
                            host: "ui-g-3"
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
                            label: "ui-widget",
                        },
                        grid: {
                            host: "ui-g-3"
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
                            label: "ui-widget",
                        },
                        grid: {
                            host: "ui-g-3"
                        }
                    }
                )
            ]
        },
        {
            element: {
                label: "ui-widget"
            },
            grid: {
                label: "ui-g",
                control: "ui-g"
            }
        }
    ),

    new DynamicRadioGroupModel<string>(
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
                label: "ui-widget"
            },
            grid: {
                label: "ui-g",
                control: "ui-g",
                option: "ui-g-3"
            }
        }
    ),

    new DynamicTimePickerModel(
        {
            id: "arrivalTime",
            label: "Estimated Arrival Time",
            showSeconds: false
        },
        {
            element: {
                label: "ui-widget"
            },
            grid: {
                host: "ui-g",
                container: "ui-g-4"
            }
        }
    ),

    new DynamicTextAreaModel(
        {
            id: "note",
            label: "Personal Note",
            rows: 5,
            placeholder: "Personal Note",
        },
        {
            element: {
                label: "ui-widget"
            },
            grid: {
                host: "ui-g",
                container: "ui-g-8"
            }
        }
    ),

    new DynamicSwitchModel(
        {
            id: "reminder",
            label: "Send me a reminder",
            offLabel: "Off",
            onLabel: "On",
            value: false
        },
        {
            element: {
                label: "ui-widget"
            },
            grid: {
                label: "order-1",
                container: "ui-g"
            }
        }
    ),

    new DynamicSwitchModel(
        {
            id: "newsletter",
            label: "Subscribe to newsletter",
            offLabel: "Off",
            onLabel: "On",
            value: true
        },
        {
            element: {
                label: "ui-widget"
            },
            grid: {
                label: "order-1",
                container: "ui-g"
            }
        }
    ),

    new DynamicRatingModel(
        {
            id: "feedback",
            label: "How did you like this form?"
        },
        {
            element: {
                label: "ui-widget"
            },
            grid: {
                container: "ui-g"
            }
        }
    ),

    new DynamicCheckboxModel(
        {
            id: "confirm",
            label: "I confirm the information given above"
        },
        {
            element: {
                label: "ui-widget"
            }
        }
    )
];