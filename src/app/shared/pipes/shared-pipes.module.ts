import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: []
})
export class SharedPipesModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedPipesModule
        };
    }
}
