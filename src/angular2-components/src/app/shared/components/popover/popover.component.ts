import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { PopoverCloseDirective } from "./popover-close.directive";
import { PopoverService } from "./popover.service";

@Component({
  selector: '[app-popover]',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {

  @Input() title;
  something: string = "something here";
  showActionButton: boolean = true;
  subscription: Subscription;

  constructor(private popoverService: PopoverService) {
    this.subscription = this.popoverService.getPopoverClose()
      .subscribe(() => {
        this.showActionButton = false;
      });

  }

  ngOnInit() {
  }

  actionButtonClicked($event) {
    this.showActionButton = !this.showActionButton;
  }

}
