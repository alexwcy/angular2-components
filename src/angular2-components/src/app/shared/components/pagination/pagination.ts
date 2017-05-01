import { Observable } from 'rxjs/Rx';
import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit } from "@angular/core";
import * as Immutable from "immutable";
import { select } from '@angular-redux/store';

interface ItemPerPageMap {
    key: string;
    value: number;
}
@Component({
    selector: 'material-pagination',
    templateUrl: './pagination.html',
    styleUrls: ['./pagination.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class MdPagination implements OnInit {
    @Input() showPrevNext: boolean;
    @Input() itemsPerPageObs: Observable<any>;
    @Input() itemsPerPage: number;
    @Input() totalItems: number;
    @Input() totalItemsObs: Observable<any>;
    @Input() range: number;
    @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

    @select(['tickets', 'currentPage']) currentPage: Observable<any>;

    itemsToShowList: ItemPerPageMap[] = [];
    itemPerPageMap: ItemPerPageMap;
    selectedTotalItems: number;
    activePage: number;

    totalPages: number;
    constructor() {
        this.activePage = 1;
        let optnMap = Immutable.List([
        //     {
        //     key: '10 Per Page',
        //     value: 10
        // },
        {
            key: '20 Per Page',
            value: 20
        },
        {
            key: '50 Per Page',
            value: 50
        },
        {
            key: '100 per page',
            value: 100
        }
        ]);
        optnMap.forEach((single, index) => {
            this.itemPerPageMap = { key: single.key, value: single.value };
            this.itemsToShowList.push(this.itemPerPageMap);
        });


    }

    ngOnInit(): void {
        this.currentPage.subscribe(res => {
            if(res === 1){
                this.activePage = 1;
            }
        });

        this.totalItemsObs.subscribe(res => {
            if (res != null) {
                this.totalItems = res.count;
                this.itemsPerPage = res.itemsPerPage;
                let totalPages = parseInt((this.totalItems / this.itemsPerPage) +"", 10);
                if((this.totalItems % this.itemsPerPage) > 0){
                    totalPages += 1; 
                }
                this.totalPages = totalPages;
                // number to array
                // total page  number to show in the pagination bar
                let range = this.range;
                this.selectedTotalItems = this.itemsPerPage;

            }
        })


    }

    changePage(pageNumber): void {

        if(pageNumber === this.activePage){ // avoid call for same page
            return; 
        }

        // if the pageNumber comes as << or >> signs handle it
        if (typeof (pageNumber) === "number") {
            if(this.activePage < this.totalPages || (pageNumber > 0 && pageNumber <= this.totalPages)){
                this.activePage = pageNumber;
            } else {
                return;
            }
        }
        else if (typeof (pageNumber) === "string") {
            switch (pageNumber.charCodeAt(0)) {
                case 171: {
                    if(this.activePage > 1) {
                        this.activePage -= 1;
                    } else {
                        return;
                    }
                    break;
                }
                case 187: {
                    if(this.activePage < this.totalPages) {
                        this.activePage += 1;
                    } else {
                        return;
                    }
                    break;
                }
                default:
                    this.activePage = this.activePage;
                    break;

            }
        }

        else {
            this.activePage = pageNumber;
        }
        
        if(localStorage.getItem('itemsPerPage')){
            this.itemsPerPage = parseInt(localStorage.getItem('itemsPerPage'), 10);
        }

        // change the total pages based on the activepage and based on range
        // this.totalPages
        this.onChange.emit({ pageNumber: this.activePage, pageSize: this.itemsPerPage });
    }

    changeTotalItems() {
        this.itemsPerPage = this.selectedTotalItems;
        localStorage.setItem('itemsPerPage', this.itemsPerPage.toString());
        this.onChange.emit({ pageNumber: this.activePage, pageSize: this.itemsPerPage });

    }

}
