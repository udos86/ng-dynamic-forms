import {
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicDatePickerModel,
    DynamicFileUploadModel,
    DynamicFormGroupModel,
    DynamicInputModel,
    DynamicRadioGroupModel,
    DynamicSelectModel,
    DynamicSwitchModel,
    DynamicTextAreaModel,
    DynamicTimePickerModel
} from "@ng-dynamic-forms/core";
import { customDateRangeValidator } from "../app.validators";

export const KENDO_SAMPLE_FORM_MODEL = [

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
                        inline: false,
                        label: "Arrival",
                        placeholder: "Date of Arrival"
                    }
                ),

                new DynamicDatePickerModel(
                    {
                        id: "departureDate",
                        inline: false,
                        label: "Departure",
                        placeholder: "Date of Departure"
                    }
                ),
            ]
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
                    }
                ),

                new DynamicInputModel(
                    {
                        id: "roomQuantity",
                        inputType: "number",
                        label: "Quantity",
                        placeholder: "Quantity",
                        hint: "Maximum: 5",
                        min: 0,
                        max: 5,
                        step: 1,
                        value: 1
                    }
                )
            ]
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
                required: "{{label}} is required"
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
                required: "{{label}} is required"
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
                email: "{{label}} is not valid"
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
            mask: "+(99) 0000000000000",
            validators: {
                required: null
            },
            errorMessages: {
                required: "Field is required"
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
                    }
                ),

                new DynamicInputModel(
                    {
                        id: "streetNumber",
                        label: "Street Number",
                        placeholder: "Number"
                    }
                )
            ]
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
                    }
                ),

                new DynamicInputModel(
                    {
                        id: "state",
                        label: "State",
                        list: ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
                        placeholder: "State"
                    }
                ),

                new DynamicInputModel(
                    {
                        id: "city",
                        label: "City",
                        placeholder: "City"
                    }
                )
            ]
        }
    ),

    new DynamicCheckboxGroupModel(
        {
            id: "extras",
            legend: "Extras",
            group: [
                new DynamicCheckboxModel(
                    {
                        id: "extraBreakfast",
                        label: "Breakfast"
                    }
                ),
                new DynamicCheckboxModel(
                    {
                        id: "extraTV",
                        label: "TV",
                    }
                ),
                new DynamicCheckboxModel(
                    {
                        id: "extraWiFi",
                        label: "WiFi"
                    }
                ),
                new DynamicCheckboxModel(
                    {
                        id: "extraParking",
                        label: "Parking Lot"
                    }
                ),
                new DynamicCheckboxModel(
                    {
                        id: "extraBalcony",
                        label: "Balcony"
                    }
                )
            ]
        }
    ),

    new DynamicRadioGroupModel<string>(
        {
            id: "payment",
            legend: "Payment Method",
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
        }
    ),

    new DynamicTimePickerModel(
        {
            id:"arrivalTime",
            label: "Estimated Arrival Time",
            placeholder: "Time",
            format: "HH:mm"
        }
    ),

    new DynamicTextAreaModel(
        {
            id: "note",
            label: "Personal Note",
            rows: 5,
            placeholder: "Personal Note"
        }
    ),

    new DynamicFileUploadModel(
        {
            autoUpload: true,
            id: "attachments",
            label: "Attachments",
            multiple: true,
            removeUrl: "removeUrl",
            url: "saveUrl"
        }
    ),

    new DynamicSwitchModel(
        {
            id: "reminder",
            label: "Send me a reminder",
            offLabel: " ",
            onLabel: " ",
            value: false
        },
        {
            element: {
                container: "display-flex",
                label: "order-1"
            }
        }
    ),

    new DynamicSwitchModel(
        {
            id: "newsletter",
            label: "Subscribe to newsletter",
            offLabel: " ",
            onLabel: " ",
            value: true
        },
        {
            element: {
                container: "display-flex",
                label: "order-1"
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