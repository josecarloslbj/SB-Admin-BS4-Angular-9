import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { DropClearDirective } from './drop-clear/drop-clear.directive';
// import { DropClearService } from './drop-clear/drop-clear.service';
// import { DropClearComponent } from './drop-clear/drop-clear.component';
// import { DropClearFactoryService } from './drop-clear/drop-clear-factory.service';

@NgModule({
  declarations: [
    // DropClearComponent,
    // DropClearDirective
  ],
  imports: [CommonModule],
  exports: [
    // DropClearComponent,
    // DropClearDirective
  ],
  providers: [
  ],
  entryComponents: [
    // DropClearComponent
  ]
})
export class DirectivesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DirectivesModule,
    //   providers: [
    //     DropClearFactoryService,
    //     DropClearService
    //   ]
    };
  }
}
