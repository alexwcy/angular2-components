/* Please don't specify any providers (services) in this module or else they'll get created everytime a module is lazy loaded leaving you with multiple instances of a "singleton" ironically. */
/* Also don't include any module or component which is specific to a certain component only. */

import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from '@angular/common';

import { MdPaginationModule } from "./components/pagination";

/* Shared Components */
import { OdTableComponent } from "./components/od-table/od-table.component";
// import { TinymceEditorComponent } from "./components/tinymce-editor/tinymce-editor.component";
import { ChooserComponent } from "./components/combos/chooser/chooser.component";
import { MultiSelectComponent } from "./components/combos/multi-select/multi-select.component";
// import { ChipsComponent } from "./components/combos/chips/chips.component";
import { StarRatingComponent } from "./components/star-rating/star-rating.component";
import { CannedResponseComponent } from "./components/canned-response/canned-response.component";
import { EditableTextComponent } from './components/editable-text/editable-text.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { SentimentBoxComponent } from './components/sentiment-box/sentiment-box.component';
import { EmailBoxComponent } from './components/email-box/email-box.component';
import { ImgFallbackDirective } from './directives/img-fallback.directive';
import { PopoverModule } from './components/popover/popover.module';

/* Modules (for directives). Please Note Service Modules like HttpModule has been omitted since services share the same root injector. */
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "@angular/material";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MomentModule } from "angular2-moment";
import { RouterModule } from '@angular/router';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { ShowStarRatedComponent } from './components/show-star-rated/show-star-rated.component';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { ContentPlaceholderComponent } from './components/content-placeholder/content-placeholder.component';
import { ChipsPlainComponent } from './components/combos/chips-plain/chips-plain.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { FilesAttachmentFooterComponent } from './components/files-attachment-footer/files-attachment-footer.component';
import { ShowDirective } from './directives/show.directive';
import { DateTimePickerModule } from "./components/date-time-picker/lib/picker.module";
import { NguiDatetimePickerModule } from "./components/datetime-picker/datetime-picker.module";
import { LightboxComponent } from './components/lightbox/lightbox.component';
import { ChooserPlainComponent } from './components/combos/chooser-plain/chooser-plain.component';
import { PlaystoreVersionComponent } from './components/dialogs/playstore-version/playstore-version.component';
import { PlaystoreStarRatingComponent } from './components/playstore-star-rating/playstore-star-rating.component';

import { AutoSuggestComponent } from './components/combos/auto-suggest/auto-suggest.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { DropdownButtonComponent } from './components/dropdown-button/dropdown-button.component';
import { MyDateRangePicker } from './components/my-date-range-picker/my-date-range-picker.component';
import { ParseHtmlDirective } from './directives/parse-html.directive';
import { MyDateRangePickerModule } from './components/my-date-range-picker/my-date-range-picker.module';
import { AutoSuggestTextareaComponent } from './components/combos/auto-suggest-textarea/auto-suggest-textarea.component';
import { FluidHeightDirective } from './directives/fluid-height.directive';
import { LinkyModule } from "./pipes/angular-linky/index";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule,
        MomentModule,
        RouterModule,
        MdPaginationModule,
        NguiDatetimePickerModule
    ],
    providers: [
    ],
    exports: [
        MdPaginationModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule,
        MomentModule,
        RouterModule,
        OdTableComponent,
        MultiSelectComponent,
        ChooserComponent,
        // ChipsComponent,
        // TinymceEditorComponent,
        CommonModule,
        StarRatingComponent,
        CannedResponseComponent,
        EditableTextComponent,
        ConfirmationDialogComponent,
        SentimentBoxComponent,
        EmailBoxComponent,
        ImgFallbackDirective,
        ShowStarRatedComponent,
        SafeUrlPipe,
        InfiniteScrollDirective,
        ContentPlaceholderComponent,
        ChipsPlainComponent,
        SafeHtmlPipe,
        FilesAttachmentFooterComponent,
        ShowDirective,
        DateTimePickerModule,
        LightboxComponent,
        ChooserPlainComponent,
        PlaystoreStarRatingComponent,
        AutoSuggestComponent,
        DropdownComponent,
        DropdownButtonComponent,
        MyDateRangePickerModule,
        ParseHtmlDirective,
        AutoSuggestTextareaComponent,
        //LinkyPipe,
        LinkyModule
    ],
    declarations: [
        OdTableComponent,
        MultiSelectComponent,
        ChooserComponent,
        // ChipsComponent,
        // TinymceEditorComponent,
        StarRatingComponent,
        CannedResponseComponent,
        EditableTextComponent,
        ConfirmationDialogComponent,
        SentimentBoxComponent,
        EmailBoxComponent,
        ImgFallbackDirective,
        ShowStarRatedComponent,
        SafeUrlPipe,
        InfiniteScrollDirective,
        ContentPlaceholderComponent,
        ChipsPlainComponent,
        SafeHtmlPipe,
        FilesAttachmentFooterComponent,
        ShowDirective,
        LightboxComponent,
        ChooserPlainComponent,
        PlaystoreVersionComponent,
      
        PlaystoreStarRatingComponent,
        AutoSuggestComponent,
        DropdownComponent,
        DropdownButtonComponent,
        ParseHtmlDirective,
        AutoSuggestTextareaComponent,
        FluidHeightDirective,
      
        // MyDateRangePicker
    ],
    entryComponents: [
        EmailBoxComponent,
        ConfirmationDialogComponent,
        CannedResponseComponent,
        LightboxComponent,
        PlaystoreVersionComponent,
    
    ]
})
export class SharedModule { }
