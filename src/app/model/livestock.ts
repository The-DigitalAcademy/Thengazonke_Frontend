import { FormControl } from '@angular/forms';
export interface Livestock {
    UserID:FormControl<Number | null>,
    address?:FormControl<string | null>,
    agetype?:FormControl<string | null>,
    age?:FormControl<Number | null>,
    breedID?:FormControl<Number | null>,
    categoryID?:FormControl<Number | null>,
    categoryName?:FormControl<string | null>,
    breedName?:FormControl<string | null>,
    color?:FormControl<string | null>,
    createdAT?:FormControl<string | null>,
    description?:FormControl<string | null>,
    gender?:FormControl<string | null>,
    image?:FormControl<string | null>,
    livestockID?:FormControl<Number | null>,
    price?:FormControl<Number | null>,
    quantity?:FormControl<Number | null>,
    status?:FormControl<string | null>,
    weight?:FormControl<Number | null>
}
