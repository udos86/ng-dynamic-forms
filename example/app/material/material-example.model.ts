import {
    DynamicCheckboxModel,
    DynamicDatePickerModel,
    DynamicFormGroupModel,
    DynamicInputModel,
    DynamicRadioGroupModel,
    DynamicSelectModel,
    DynamicSliderModel,
    DynamicSwitchModel,
    DynamicTextAreaModel
} from "@ng2-dynamic-forms/core";

export const MATERIAL_EXAMPLE_MODEL = [

    new DynamicRadioGroupModel<string>(
        {
            id: "sex",
            options: [
                {
                    label: "Female",
                    value: "female",
                },
                {
                    disabled: true,
                    label: "Male",
                    value: "male"
                }
            ],
            value: "female"
        }
    ),

    new DynamicSelectModel<string>(
        {
            id: "degree",
            placeholder: "Degree",
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
            ]
        }
    ),

    new DynamicInputModel(
        {
            id: "firstName",
            maxLength: 25,
            placeholder: "First Name",
            validators: {
                required: null
            },
            errorMessages: {
                required: "Field is required"
            }
        }
    ),

    new DynamicInputModel(
        {
            id: "lastName",
            maxLength: 50,
            placeholder: "Last Name",
            validators: {
                required: null
            },
            errorMessages: {
                required: "Field is required"
            }
        }
    ),

    new DynamicDatePickerModel(
        {
            id: "birthday",
            placeholder: "Date of Birth"
        }
    ),

    new DynamicInputModel(
        {
            id: "email",
            hint: "Just a hint",
            placeholder: "E-Mail",
            validators: {
                required: null
            },
            errorMessages: {
                required: "Field {{ is }} required"
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
                        placeholder: "Street Name"
                    }
                ),

                new DynamicInputModel(
                    {
                        id: "streetNumber",
                        placeholder: "Street Number",
                        inputType: "number"
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
                        placeholder: "ZIP"
                    }
                ),

                new DynamicInputModel(
                    {
                        id: "state",
                        hint: "Autocomplete",
                        placeholder: "State",
                        list: ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
                    }
                ),

                new DynamicInputModel(
                    {
                        id: "city",
                        placeholder: "City"
                    }
                )
            ]
        }
    ),

    new DynamicSelectModel<string>(
        {
            id: "interests",
            placeholder: "Interests",
            multiple: true,
            options: [
                    {
                        label: "Music",
                        value: "interestMusic"
                    },
                    {
                        label: "Sports",
                        value: "interestSports"
                    },

                    {
                        label: "Literature",
                        value: "interestLiterature"
                    },
                    {
                        label: "Photography",
                        value: "interestPhotography"
                    },
                    {
                        label: "Traveling",
                        value: "interestTraveling"
                    }
            ]
        }
    ),

    new DynamicTextAreaModel(
        {
            id: "bio",
            rows: 3,
            placeholder: "Short Bio"
        }
    ),

    new DynamicSwitchModel(
        {
            id: "newsletter",
            offLabel: "Subscribe to newsletter",
            onLabel: "Subscribe to newsletter",
            value: true
        }
    ),

    new DynamicSwitchModel(
        {
            id: "advertising",
            offLabel: "Receive personalized ads",
            onLabel: "Receive personalized ads",
            value: false
        }
    ),

    new DynamicSliderModel(
        {
            id: "rating",
            label: "Rating",
            min: 0,
            max: 10,
            step: 1,
            value: 3,
            vertical: false
        }
    ),

    new DynamicCheckboxModel(
        {
            id: "confirm",
            label: "I confirm the information given above"
        }
    )
];
