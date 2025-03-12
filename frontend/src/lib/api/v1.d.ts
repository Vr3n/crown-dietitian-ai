/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/customers/": {
        parameters: {
            query?: never;
            header?: never;
            path?: { skip: 0, limit: 100 };
            cookie?: never;
        };
        /**
         * Get All Customers
         * @description Fetch all customers with pagination.
         *
         *     Args:
         *         skip (int): Number of customers to skip.
         *         limit (int): Maximum number of customers to return.
         *         service (CustomerService): The customer service dependency.
         *
         *     Returns:
         *         List[CustomerPublic]: List of customers.
         */
        get: operations["get_all_customers_customers__get"];
        put?: never;
        /**
         * Create Customer
         * @description Create a new customer.
         *
         *     Args:
         *         customer (CustomerCreate): The customer data to create.
         *         service (CustomerService): The customer service dependency.
         *
         *     Returns:
         *         CustomerPublicResponse: The created customer.
         *
         *     Raises:
         *         HTTPException: If a customer with the same email or mobile already exists.
         */
        post: operations["create_customer_customers__post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/customers/{customer_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Customer
         * @description Fetch a specific customer by ID.
         *
         *     Args:
         *         customer_id (UUID): The ID of the customer to fetch.
         *         service (CustomerService): The customer service dependency.
         *
         *     Returns:
         *         CustomerPublicResponse: The requested customer.
         *
         *     Raises:
         *         HTTPException: If the customer is not found.
         */
        get: operations["get_customer_customers__customer_id__get"];
        /**
         * Update Customer
         * @description Update a specific customer.
         *
         *     Args:
         *         customer_id (UUID): The ID of the customer to update.
         *         customer (CustomerUpdate): The updated customer data.
         *         service (CustomerService): The customer service dependency.
         *
         *     Returns:
         *         CustomerPublicResponse: The updated customer.
         *
         *     Raises:
         *         HTTPException: If the customer is not found or if updating the email/mobile
         *                       would conflict with an existing customer.
         */
        put: operations["update_customer_customers__customer_id__put"];
        post?: never;
        /**
         * Delete Customer
         * @description Delete a specific customer.
         *
         *     Args:
         *         customer_id (UUID): The ID of the customer to delete.
         *         service (CustomerService): The customer service dependency.
         *
         *     Raises:
         *         HTTPException: If the customer is not found.
         */
        delete: operations["delete_customer_customers__customer_id__delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/customers/email/{email}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Customer By Email
         * @description Fetch a customer by email address.
         *
         *     Args:
         *         email (str): The email of the customer to fetch.
         *         service (CustomerService): The customer service dependency.
         *
         *     Returns:
         *         CustomerPublicResponse: The requested customer.
         *
         *     Raises:
         *         HTTPException: If the customer is not found.
         */
        get: operations["get_customer_by_email_customers_email__email__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/customers/mobile/{mobile_number}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Customer By Mobile
         * @description Fetch a customer by mobile number.
         *
         *     Args:
         *         mobile_number (str): The mobile number of the customer to fetch.
         *         service (CustomerService): The customer service dependency.
         *
         *     Returns:
         *         CustomerPublicResponse: The requested customer.
         *
         *     Raises:
         *         HTTPException: If the customer is not found.
         */
        get: operations["get_customer_by_mobile_customers_mobile__mobile_number__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/customers/age-range/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Customers By Age Range
         * @description Fetch customers within a specific age range.
         *
         *     Args:
         *         min_age (int): The minimum age in the range.
         *         max_age (int): The maximum age in the range.
         *         service (CustomerService): The customer service dependency.
         *
         *     Returns:
         *         List[CustomerPublicResponse]: List of customers within the specified age range.
         *
         *     Raises:
         *         HTTPException: If the min_age is greater than max_age.
         */
        get: operations["get_customers_by_age_range_customers_age_range__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Root */
        get: operations["root__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/{name}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Read Name */
        get: operations["read_name__name__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** BodyMeasurementMaster */
        BodyMeasurementMaster: {
            /**
             * Customer Id
             * Format: uuid
             */
            customer_id: string;
            /**
             * Measured On
             * Format: date
             */
            measured_on?: string;
            /** Height */
            height: number;
            /** Weight */
            weight: number;
            /** Body Fat Percentage */
            body_fat_percentage?: number | null;
            /** Waist Circumference */
            waist_circumference?: number | null;
            /** Hip Circumference */
            hip_circumference?: number | null;
            /** Chest Circumference */
            chest_circumference?: number | null;
            /** Arm Circumference */
            arm_circumference?: number | null;
            /** Thigh Circumference */
            thigh_circumference?: number | null;
            /**
             * Id
             * Format: uuid
             */
            id?: string;
            /**
             * Created At
             * Format: date-time
             */
            created_at?: string;
            /**
             * Updated At
             * Format: date-time
             */
            updated_at?: string;
        };
        /** CustomerCreate */
        CustomerCreate: {
            /** Name */
            name: string;
            /**
             * Date Of Birth
             * Format: date
             */
            date_of_birth: string;
            gender: components["schemas"]["Gender"];
            /** Email */
            email: string | null;
            /** Alternate Email */
            alternate_email: string | null;
            /** Mobile Number */
            mobile_number?: string | null;
            /** Alternate Mobile Number */
            alternate_mobile_number?: string | null;
            /**
             * Preferences
             * @default {}
             */
            preferences: Record<string, never>;
            /**
             * Allergies
             * @default {}
             */
            allergies: Record<string, never>;
        };
        /** CustomerPublicResponse */
        CustomerPublicResponse: {
            id: string;
            /** Name */
            name: string;
            /**
             * Date Of Birth
             * Format: date
             */
            date_of_birth: string;
            gender: components["schemas"]["Gender"];
            /** Email */
            email: string | null;
            /** Alternate Email */
            alternate_email: string | null;
            /** Mobile Number */
            mobile_number?: string | null;
            /** Alternate Mobile Number */
            alternate_mobile_number?: string | null;
            /**
             * Preferences
             * @default {}
             */
            preferences: Record<string, never>;
            /**
             * Allergies
             * @default {}
             */
            allergies: Record<string, never>;
            /**
             * Body Measurements
             * @default []
             */
            body_measurements: components["schemas"]["BodyMeasurementMaster"][];
            /**
             * Injuries
             * @default []
             */
            injuries: components["schemas"]["InjuryMaster"][];
            /**
             * Diseases
             * @default []
             */
            diseases: components["schemas"]["DiseaseMaster"][];
        };
        /** CustomerUpdate */
        CustomerUpdate: {
            /** Name */
            name: string;
            /**
             * Date Of Birth
             * Format: date
             */
            date_of_birth: string;
            gender: components["schemas"]["Gender"];
            /** Email */
            email: string | null;
            /** Alternate Email */
            alternate_email: string | null;
            /** Mobile Number */
            mobile_number?: string | null;
            /** Alternate Mobile Number */
            alternate_mobile_number?: string | null;
            /**
             * Preferences
             * @default {}
             */
            preferences: Record<string, never>;
            /**
             * Allergies
             * @default {}
             */
            allergies: Record<string, never>;
            /**
             * Id
             * Format: uuid
             */
            id?: string;
            /**
             * Created At
             * Format: date-time
             */
            created_at?: string;
            /**
             * Updated At
             * Format: date-time
             */
            updated_at?: string;
        };
        /** DiseaseMaster */
        DiseaseMaster: {
            /**
             * Customer Id
             * Format: uuid
             */
            customer_id: string;
            /** Name */
            name: string;
            /** Description */
            description?: string | null;
            /**
             * From Date
             * Format: date
             */
            from_date?: string;
            /** To Date */
            to_date?: string | null;
            /** Severity */
            severity?: string | null;
            /** Diagnosis Date */
            diagnosis_date?: string | null;
            /**
             * Medications
             * @default {}
             */
            medications: Record<string, never>;
            /**
             * Impact On Diet
             * @default {}
             */
            impact_on_diet: Record<string, never>;
            /**
             * Id
             * Format: uuid
             */
            id?: string;
            /**
             * Created At
             * Format: date-time
             */
            created_at?: string;
            /**
             * Updated At
             * Format: date-time
             */
            updated_at?: string;
        };
        /**
         * Gender
         * @enum {string}
         */
        Gender: "male" | "female" | "OTHER";
        /** HTTPValidationError */
        HTTPValidationError: {
            /** Detail */
            detail?: components["schemas"]["ValidationError"][];
        };
        /** InjuryMaster */
        InjuryMaster: {
            /**
             * Customer Id
             * Format: uuid
             */
            customer_id: string;
            /** Name */
            name: string;
            /** Description */
            description?: string | null;
            /**
             * From Date
             * Format: date
             */
            from_date?: string;
            /** To Date */
            to_date?: string | null;
            /** Severity */
            severity?: string | null;
            /** Injury Type */
            injury_type?: string | null;
            /** Affected Body Part */
            affected_body_part?: string | null;
            /**
             * Impact On Diet
             * @default {}
             */
            impact_on_diet: Record<string, never>;
            /**
             * Id
             * Format: uuid
             */
            id?: string;
            /**
             * Created At
             * Format: date-time
             */
            created_at?: string;
            /**
             * Updated At
             * Format: date-time
             */
            updated_at?: string;
        };
        /** ValidationError */
        ValidationError: {
            /** Location */
            loc: (string | number)[];
            /** Message */
            msg: string;
            /** Error Type */
            type: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    get_all_customers_customers__get: {
        parameters: {
            query?: {
                /** @description Number of customers to skip. */
                skip?: number;
                /** @description Maximum number of customers to return. */
                limit?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CustomerPublicResponse"][];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    create_customer_customers__post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CustomerCreate"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CustomerPublicResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_customer_customers__customer_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                customer_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CustomerPublicResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    update_customer_customers__customer_id__put: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                customer_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CustomerUpdate"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CustomerPublicResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    delete_customer_customers__customer_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                customer_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_customer_by_email_customers_email__email__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                email: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CustomerPublicResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_customer_by_mobile_customers_mobile__mobile_number__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                mobile_number: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CustomerPublicResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_customers_by_age_range_customers_age_range__get: {
        parameters: {
            query: {
                /** @description Minimum age */
                min_age: number;
                /** @description Maximum age */
                max_age: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CustomerPublicResponse"][];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    root__get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    read_name__name__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                name: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
}
