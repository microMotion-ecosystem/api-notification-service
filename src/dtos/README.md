### Data Transfer Object (DTO)

A **DTO** is an object that defines how data is sent over the network. It is mainly used to encapsulate data and send it from one subsystem of an application to another, or between an application and its client. DTOs help in defining the input and output specifications typically at the API layer.

*   **Purpose**: DTOs are used for data encapsulation and are typically implemented to transfer data between parts of an application or between systems. They do not usually contain any business logic, aside from simple validation logic.
*   **Location**: DTOs are generally used at the boundary of the application to define the shape of data as it enters or exits an application, like in API requests and responses.
*   **Usage**: DTOs simplify and secure the data transfer between clients and servers by ensuring only necessary data is exposed or communicated. They can also be configured to meet specific data transfer requirements such as serialization formats and validation rules.

### Example of a DTO:

```ts
import { IsEmail, IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @IsInt()
    @Min(0)
    age: number;
}

```
### Key Differences

*   **Responsibilities**: Models handle data access, storage structures, and potentially business rules, while DTOs focus on data transport and structure as needed for specific operations.
*   **Logic Containment**: Models can contain business logic; DTOs should be lean and focused only on data structure without business logic.
*   **Interaction with External Systems**: Models are typically not exposed directly to clients or external systems, whereas DTOs are designed for this purpose to decouple the internal data representation from the data sent to or received from external systems.

By properly leveraging both models and DTOs, developers can create more secure, maintainable, and scalable applications that effectively separate concerns between the core data handling in the application and the layers that interact with the external world.
