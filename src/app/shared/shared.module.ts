import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SearchPipe } from '@app/shared/helper/search.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [SearchPipe],
    schemas: [NO_ERRORS_SCHEMA],
    exports: [SearchPipe]
})
export class SharedModule { }