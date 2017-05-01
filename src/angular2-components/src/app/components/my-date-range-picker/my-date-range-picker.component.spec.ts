//<reference path="../../node_modules/@types/jasmine/index.d.ts"/>

import {FormsModule} from "@angular/forms";
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {MyDateRangePicker} from './my-date-range-picker.component';
import {FocusDirective} from './directives/my-date-range-picker.focus.directive';

let comp: MyDateRangePicker;
let fixture: ComponentFixture<MyDateRangePicker>;
let de: DebugElement;
let el: HTMLElement;

let PREVMONTH: string = '.header tr td:first-child div .headerbtncell:first-child .headerbtn';
let NEXTMONTH: string = '.header tr td:first-child div .headerbtncell:last-child .headerbtn';
let PREVYEAR: string = '.header tr td:last-child div .headerbtncell:first-child .headerbtn';
let NEXTYEAR: string = '.header tr td:last-child div .headerbtncell:last-child .headerbtn';

function getDateString(date: any): string {
    return date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
}

function getElement(id: string): DebugElement {
    return de.query(By.css(id));
}

function getElements(id: string): Array<DebugElement> {
    return de.queryAll(By.css(id));
}

describe('MyDateRangePicker', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [MyDateRangePicker, FocusDirective],
        });

        fixture = TestBed.createComponent(MyDateRangePicker);

        comp = fixture.componentInstance;

        de = fixture.debugElement.query(By.css('.mydrp'));
        el = de.nativeElement;
    });

    it('set valid date range', () => {
        comp.selectionDayTxt = '2016-08-22 - 2016-08-23';
        fixture.detectChanges();
        let selection = getElement('.selection');
        expect(selection.nativeElement.value).toContain('2016-08-22 - 2016-08-23');
    });

    it('open/close selector', () => {
        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        let selector = getElement('.selector');
        expect(selector).toBe(null);

        btnpicker.nativeElement.click();
        fixture.detectChanges();
        selector = getElement('.selector');
        expect(selector).not.toBe(null);

        btnpicker.nativeElement.click();
        fixture.detectChanges();
        selector = getElement('.selector');
        expect(selector).toBe(null);
    });

    it('select first and last dates to date range and clear', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 11, year: 2016};

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let selector = getElement('.selector');
        expect(selector).not.toBe(null);

        fixture.detectChanges();
        let currmonth = getElements('.caltable tbody tr td');
        expect(currmonth).not.toBe(null);
        expect(currmonth.length).toBe(42);

        let first = currmonth[1];
        expect(first.nativeElement.textContent.trim()).toBe('1');
        expect(currmonth[30].nativeElement.textContent.trim()).toBe('30');

        fixture.detectChanges();
        first.nativeElement.click();

        fixture.detectChanges();
        let selectedday = getElement('.selectedday');
        expect(selectedday).not.toBe(null);

        fixture.detectChanges();
        currmonth = getElements('.caltable tbody tr td');
        currmonth[30].nativeElement.click();


        fixture.detectChanges();
        btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let selecteddaygreen = getElement('.selecteddaygreen');
        expect(selecteddaygreen).not.toBe(null);

        fixture.detectChanges();
        let range = getElements('.caltable .range');
        expect(range).not.toBe(null);
        expect(range.length).toBe(30);

        fixture.detectChanges();
        let selection = getElement('.selection');
        expect(selection.nativeElement.value).toContain('2016-11-01 - 2016-11-30');

        fixture.detectChanges();
        let btnclear = getElement('.btnclear');
        btnclear.nativeElement.click();

        fixture.detectChanges();
        selection = getElement('.selection');
        expect(selection.nativeElement.value).toEqual('');
    });

    it('select clear button', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 11, year: 2016};

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let selector = getElement('.selector');
        expect(selector).not.toBe(null);

        fixture.detectChanges();
        let currmonth = getElements('.caltable tbody tr td');
        expect(currmonth).not.toBe(null);
        expect(currmonth.length).toBe(42);

        let first = currmonth[1];
        expect(first.nativeElement.textContent.trim()).toBe('1');
        expect(currmonth[30].nativeElement.textContent.trim()).toBe('30');

        fixture.detectChanges();
        first.nativeElement.click();

        fixture.detectChanges();
        let selectedday = getElement('.selectedday');
        expect(selectedday).not.toBe(null);

        fixture.detectChanges();
        currmonth = getElements('.caltable tbody tr td');
        currmonth[30].nativeElement.click();

        fixture.detectChanges();
        btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let range = getElements('.caltable .range');
        expect(range).not.toBe(null);
        expect(range.length).toBe(30);

        fixture.detectChanges();
        let headerclearbtn = getElement('.headerclearbtn');
        expect(headerclearbtn).not.toBe(null);
        expect(headerclearbtn.properties['disabled']).toBe(false);
        headerclearbtn.nativeElement.click();

        fixture.detectChanges();
        selectedday = getElement('.selectedday');
        expect(selectedday).toBe(null);

        let selecteddaygreen = getElement('.selecteddaygreen');
        expect(selecteddaygreen).toBe(null);

        range = getElements('.caltable .range');
        expect(range.length).toBe(0);


        headerclearbtn = getElement('.headerclearbtn');
        expect(headerclearbtn.properties['disabled']).toBe(true);
    });

    it('select previous month', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 11, year: 2016};

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Nov');

        fixture.detectChanges();
        let prevmonth = getElement(PREVMONTH);
        expect(prevmonth).not.toBe(null);

        fixture.detectChanges();
        prevmonth.nativeElement.click();

        expect(comp.visibleMonth.monthTxt).toBe('Oct');
        expect(comp.visibleMonth.monthNbr).toBe(10);
        expect(comp.visibleMonth.year).toBe(2016);

        fixture.detectChanges();
        monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Oct');
    });

    it('select next month', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 11, year: 2016};

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Nov');

        fixture.detectChanges();
        let nextmonth = getElement(NEXTMONTH);
        expect(nextmonth).not.toBe(null);

        fixture.detectChanges();
        nextmonth.nativeElement.click();

        expect(comp.visibleMonth.monthTxt).toBe('Dec');
        expect(comp.visibleMonth.monthNbr).toBe(12);
        expect(comp.visibleMonth.year).toBe(2016);

        fixture.detectChanges();
        monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Dec');
    });

    it('select previous month january change year', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 1, year: 2016};

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Jan');

        fixture.detectChanges();
        let prevmonth = getElement(PREVMONTH);
        expect(prevmonth).not.toBe(null);

        fixture.detectChanges();
        prevmonth.nativeElement.click();

        expect(comp.visibleMonth.monthNbr).toBe(12);
        expect(comp.visibleMonth.year).toBe(2015);

        fixture.detectChanges();
        monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Dec');

        fixture.detectChanges();
        let yearlabel = getElement('.yearlabel');
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.nativeElement.textContent.trim()).toBe('2015');
    });

    it('select next month december change year', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 12, year: 2015};

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Dec');

        fixture.detectChanges();
        let nextmonth = getElement(NEXTMONTH);
        expect(nextmonth).not.toBe(null);

        fixture.detectChanges();
        nextmonth.nativeElement.click();

        expect(comp.visibleMonth.monthNbr).toBe(1);
        expect(comp.visibleMonth.year).toBe(2016);

        fixture.detectChanges();
        monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Jan');

        fixture.detectChanges();
        let yearlabel = getElement('.yearlabel');
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.nativeElement.textContent.trim()).toBe('2016');
    });

    it('select previous and next month from selector', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 11, year: 2016};

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Nov');

        fixture.detectChanges();
        let currmonth = getElements('.caltable tbody tr td');
        expect(currmonth).not.toBe(null);
        expect(currmonth.length).toBe(42);

        fixture.detectChanges();
        currmonth[0].nativeElement.click();

        expect(comp.visibleMonth.monthNbr).toBe(11);
        expect(comp.visibleMonth.monthTxt).toBe('Nov');

        fixture.detectChanges();
        monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Nov');

        fixture.detectChanges();
        currmonth[41].nativeElement.click();

        expect(comp.visibleMonth.monthNbr).toBe(11);
        expect(comp.visibleMonth.monthTxt).toBe('Nov');

        fixture.detectChanges();
        btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Oct');
    });

    it('select previous year', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 5, year: 2016};

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let prevyear = getElement(PREVYEAR);
        expect(prevyear).not.toBe(null);

        fixture.detectChanges();
        prevyear.nativeElement.click();

        expect(comp.visibleMonth.monthNbr).toBe(5);
        expect(comp.visibleMonth.monthTxt).toBe('May');
        expect(comp.visibleMonth.year).toBe(2015);

        fixture.detectChanges();
        let yearLabel = getElement('.yearlabel');
        expect(yearLabel).not.toBe(null);
        expect(yearLabel.nativeElement.textContent).toBe('2015');

        fixture.detectChanges();
        let monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent).toBe('May');
    });

    it('select next year', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 5, year: 2016};

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let nextyear = getElement(NEXTYEAR);
        expect(nextyear).not.toBe(null);

        fixture.detectChanges();
        nextyear.nativeElement.click();

        expect(comp.visibleMonth.monthNbr).toBe(5);
        expect(comp.visibleMonth.monthTxt).toBe('May');
        expect(comp.visibleMonth.year).toBe(2017);

        fixture.detectChanges();
        let yearLabel = getElement('.yearlabel');
        expect(yearLabel).not.toBe(null);
        expect(yearLabel.nativeElement.textContent).toBe('2017');

        fixture.detectChanges();
        let monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent).toBe('May');
    });

    it('test calendar year 2016 month one by one - next month button', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 1, year: 2016};

        comp.options = {firstDayOfWeek: 'mo'};

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Jan');

        fixture.detectChanges();
        let yearlabel = getElement('.yearlabel');
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.nativeElement.textContent.trim()).toBe('2016');

        comp.generateCalendar(1, 2016, false);

        let beginDate: Array<string> = ['28', '1', '29', '28', '25', '30', '27', '1', '29', '26', '31', '28'];
        let endDate: Array<string> = ['7', '13', '10', '8', '5', '10', '7', '11', '9', '6', '11', '8'];

        let i: number = 0;
        do {
            fixture.detectChanges();
            let currmonth = getElements('.caltable tbody tr td');
            expect(currmonth).not.toBe(null);
            expect(currmonth.length).toBe(42);

            expect(currmonth[0]).not.toBe(null);
            expect(currmonth[0].nativeElement.textContent.trim()).toBe(beginDate[i]);

            expect(currmonth[41]).not.toBe(null);
            expect(currmonth[41].nativeElement.textContent.trim()).toBe(endDate[i]);

            comp.nextMonth();

            i++;
        } while (i < 12)
    });

    it('test calendar year 2016 month one by one - previous month button', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 12, year: 2016};

        comp.options = {firstDayOfWeek: 'mo'};

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Dec');

        fixture.detectChanges();
        let yearlabel = getElement('.yearlabel');
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.nativeElement.textContent.trim()).toBe('2016');

        comp.generateCalendar(12, 2016, false);

        let beginDate: Array<string> = ['28', '1', '29', '28', '25', '30', '27', '1', '29', '26', '31', '28'];
        let endDate: Array<string> = ['7', '13', '10', '8', '5', '10', '7', '11', '9', '6', '11', '8'];

        let i: number = 11;
        do {
            fixture.detectChanges();
            let currmonth = getElements('.caltable tbody tr td');
            expect(currmonth).not.toBe(null);
            expect(currmonth.length).toBe(42);

            expect(currmonth[0]).not.toBe(null);
            expect(currmonth[0].nativeElement.textContent.trim()).toBe(beginDate[i]);

            expect(currmonth[41]).not.toBe(null);
            expect(currmonth[41].nativeElement.textContent.trim()).toBe(endDate[i]);

            comp.prevMonth();

            i--;
        } while (i >= 0)
    });

    // options
    it('options - dayLabels', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 11, year: 2016};
        comp.options = {
            dayLabels:  {su: '1', mo: '2', tu: '3', we: '4', th: '5', fr: '6', sa: '7'},
            firstDayOfWeek: 'su'
        };

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let ths = getElements('.caltable thead tr th');
        expect(ths.length).toBe(7);
        for(let i in ths) {
            let el = ths[i];
            expect(parseInt(el.nativeElement.textContent)).toBe(parseInt(i) + 1);
        }
    });

    it('options - monthLabels', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 1, year: 2016};
        comp.options = {
            monthLabels:  { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10', 11: '11', 12: '12' }
        };

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let nextmonth = getElement(NEXTMONTH);
        expect(nextmonth).not.toBe(null);

        for(let i = 1; i <= 12; i++) {
            fixture.detectChanges();
            let monthLabel = getElement('.headermonthtxt .headerlabelbtn');
            expect(parseInt(monthLabel.nativeElement.textContent)).toBe(i);
            nextmonth.nativeElement.click();
        }
    });

    it('options - date format', () => {
        comp.options = {
            dateFormat: 'dd.mm.yyyy',
            indicateInvalidDate: true
        };

        comp.parseOptions();

        fixture.detectChanges();
        comp.onUserDateRangeInput('2016-08-22 - 2016-08-24');
        expect(comp.invalidDateRange).toBe(true);

        fixture.detectChanges();
        let invaliddaterange = getElement('.invaliddaterange');
        expect(invaliddaterange).not.toBe(null);

        comp.onUserDateRangeInput('2016-08-22 - 2016-08-2');
        expect(comp.invalidDateRange).toBe(true);

        comp.onUserDateRangeInput('2016/08-22 - 2016-08/24');
        expect(comp.invalidDateRange).toBe(true);

        comp.onUserDateRangeInput('2016-08-22 - 2016-08-xx');
        expect(comp.invalidDateRange).toBe(true);

        comp.onUserDateRangeInput('22.08.2016 - 24.08.206');
        expect(comp.invalidDateRange).toBe(true);

        comp.onUserDateRangeInput('22.08.2016 - 24.08.20111');
        expect(comp.invalidDateRange).toBe(true);

        comp.onUserDateRangeInput('22.08.2016 - 24.08.2016');
        expect(comp.invalidDateRange).toBe(false);

        comp.options = {dateFormat: 'dd mmm yyyy', indicateInvalidDate: true};

        comp.parseOptions();

        comp.onUserDateRangeInput('2016-08-22 - 2016-08-24');
        expect(comp.invalidDateRange).toBe(true);

        comp.onUserDateRangeInput('22 Aug 2016 - 22 Sep 2016');
        expect(comp.invalidDateRange).toBe(false);
    });

    it('options - show clear button', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 1, year: 2016};

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let headerclearbtn = getElement('.headerclearbtn');
        expect(headerclearbtn).not.toBe(null);

        btnpicker.nativeElement.click();

        comp.options = {showClearBtn: false};
        comp.parseOptions();

        fixture.detectChanges();
        btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        headerclearbtn = getElement('.headerclearbtn');
        expect(headerclearbtn).toBe(null);

        fixture.detectChanges();
        btnpicker.nativeElement.click();

        comp.options = {showClearBtn: true};
        comp.parseOptions();

        fixture.detectChanges();
        btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        headerclearbtn = getElement('.headerclearbtn');
        expect(headerclearbtn).not.toBe(null);
    });

    it('options - show apply button', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 1, year: 2016};

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let headerclearbtn = getElement('.headerokbtn');
        expect(headerclearbtn).not.toBe(null);

        btnpicker.nativeElement.click();

        comp.options = {showApplyBtn: false};
        comp.parseOptions();

        fixture.detectChanges();
        btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        headerclearbtn = getElement('.headerokbtn');
        expect(headerclearbtn).toBe(null);

        fixture.detectChanges();
        btnpicker.nativeElement.click();

        comp.options = {showApplyBtn: true};
        comp.parseOptions();

        fixture.detectChanges();
        btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        headerclearbtn = getElement('.headerokbtn');
        expect(headerclearbtn).not.toBe(null);
    });

    it('options - show select date text', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 1, year: 2016};
        comp.options = {
            showSelectDateText: false
        };

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let titlearea = getElement('.titlearea');
        expect(titlearea).toBe(null);

        btnpicker.nativeElement.click();

        comp.options = {
            showSelectDateText: true
        };

        comp.parseOptions();

        btnpicker.nativeElement.click();

        fixture.detectChanges();
        titlearea = getElement('.titlearea');
        expect(titlearea).not.toBe(null);
    });

    it('options - select begin date text', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 1, year: 2016};
        comp.options = {
            selectBeginDateTxt: 'test text'
        };

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let titleareatxt = getElement('.titleareatxt');
        expect(titleareatxt).not.toBe(null);
        expect(titleareatxt.nativeElement.textContent.trim()).toBe('test text');
    });

    it('options - select end date text', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 1, year: 2016};
        comp.options = {
            selectEndDateTxt: 'test text'
        };

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let currmonth = getElements('.caltable tbody tr td');
        expect(currmonth).not.toBe(null);
        expect(currmonth.length).toBe(42);

        fixture.detectChanges();
        currmonth[1].nativeElement.click();

        fixture.detectChanges();
        let titlearearight = getElement('.titlearearight');
        expect(titlearearight).not.toBe(null);
        expect(titlearearight.nativeElement.textContent.trim()).toBe('test text');
    });

    it('options - first day of week', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 5, year: 2016};
        comp.options = {
            firstDayOfWeek: 'tu'
        };

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let first = getElement('.caltable thead tr th:first-child');
        expect(first).not.toBe(null);
        expect(first.nativeElement.textContent).toBe('Tue');

        let last = getElement('.caltable thead tr th:last-child');
        expect(last).not.toBe(null);
        expect(last.nativeElement.textContent).toBe('Mon');
    });

    it('options - sunday highlight', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 11, year: 2016};
        comp.options = {
            sunHighlight: true
        };

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let sunday = getElements('.sunday');
        expect(sunday).not.toBe(null);
        expect(sunday.length).toBe(6);

        fixture.detectChanges();
        btnpicker.nativeElement.click();

        comp.options = {
            sunHighlight: false
        };

        comp.parseOptions();

        fixture.detectChanges();
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        sunday = getElements('.sunday');
        expect(sunday.length).toBe(0);
    });

    it('options - current day marked', () => {
        comp.options = {markCurrentDay: true};

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let currday = getElement('.currday');
        expect(currday).not.toBe(null);

        btnpicker.nativeElement.click();

        comp.options = {markCurrentDay: false};

        comp.parseOptions();

        fixture.detectChanges();
        btnpicker.nativeElement.click();

        comp.parseOptions();

        fixture.detectChanges();
        currday = getElement('.currday');
        expect(currday).toBe(null);
    });

    it('options - editable month and year', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 11, year: 2016};
        comp.options = {
            editableMonthAndYear: true
        };

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let montlabel = getElement('.headermonthtxt .headerlabelbtn');
        expect(montlabel).not.toBe(null);
        montlabel.nativeElement.click();

        // Month input
        fixture.detectChanges();
        let monthinput = getElement('.monthinput');
        expect(monthinput).not.toBe(null);

        comp.onUserMonthInput('jan');

        fixture.detectChanges();
        montlabel = getElement('.headermonthtxt .headerlabelbtn');
        expect(montlabel).not.toBe(null);
        expect(montlabel.nativeElement.textContent).toBe('Jan');


        // Invalid month
        montlabel.nativeElement.click();

        fixture.detectChanges();
        monthinput = getElement('.monthinput');
        expect(monthinput).not.toBe(null);

        comp.onUserMonthInput('ja');

        fixture.detectChanges();
        montlabel = getElement('.invalidmonth');
        expect(montlabel).not.toBe(null);

        fixture.detectChanges();
        btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        // Year input
        fixture.detectChanges();
        let yearlabel = getElement('.headeryeartxt .headerlabelbtn');
        expect(yearlabel).not.toBe(null);
        yearlabel.nativeElement.click();

        fixture.detectChanges();
        let yearinput = getElement('.yearinput');
        expect(yearinput).not.toBe(null);

        comp.onUserYearInput('2019');

        fixture.detectChanges();
        yearlabel = getElement('.headeryeartxt .headerlabelbtn');
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.nativeElement.textContent).toBe('2019');

        // Invalid year
        yearlabel.nativeElement.click();

        fixture.detectChanges();
        yearinput = getElement('.yearinput');
        expect(yearinput).not.toBe(null);

        comp.onUserYearInput('999');

        fixture.detectChanges();
        yearlabel = getElement('.invalidyear');
        expect(yearlabel).not.toBe(null);
    });

    it('options - disable header buttons', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 5, year: 2016};
        comp.options = {
            disableHeaderButtons: true,
            disableUntil: {year: 2016, month: 4, day: 10}
        };

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let montlabel = getElement('.headermonthtxt .headerlabelbtn');
        expect(montlabel).not.toBe(null);
        expect(montlabel.nativeElement.textContent).toBe('May');

        fixture.detectChanges();
        let prevmonth = getElement(PREVMONTH);
        expect(prevmonth).not.toBe(null);
        prevmonth.nativeElement.click();

        fixture.detectChanges();
        montlabel = getElement('.headermonthtxt .headerlabelbtn');
        expect(montlabel).not.toBe(null);
        expect(montlabel.nativeElement.textContent).toBe('Apr');

        fixture.detectChanges();
        let headerbtndisabled = getElements('.headerbtndisabled');
        expect(headerbtndisabled).not.toBe(null);
        expect(headerbtndisabled.length).toBe(2);

        prevmonth.nativeElement.click();

        fixture.detectChanges();
        montlabel = getElement('.headermonthtxt .headerlabelbtn');
        expect(montlabel).not.toBe(null);
        expect(montlabel.nativeElement.textContent).toBe('Apr');

        fixture.detectChanges();
        let prevyear = getElement(PREVYEAR);
        expect(prevyear).not.toBe(null);
        prevyear.nativeElement.click();

        fixture.detectChanges();
        let yearlabel = getElement('.headeryeartxt .headerlabelbtn');
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.nativeElement.textContent).toBe('2016');

        btnpicker.nativeElement.click();


        comp.options = {
            disableHeaderButtons: true,
            disableSince: {year: 2016, month: 7, day: 10}
        };

        comp.parseOptions();

        fixture.detectChanges();
        btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        montlabel = getElement('.headermonthtxt .headerlabelbtn');
        expect(montlabel).not.toBe(null);
        expect(montlabel.nativeElement.textContent).toBe('May');

        fixture.detectChanges();
        let nextmonth = getElement(NEXTMONTH);
        expect(nextmonth).not.toBe(null);
        nextmonth.nativeElement.click();

        fixture.detectChanges();
        montlabel = getElement('.headermonthtxt .headerlabelbtn');
        expect(montlabel).not.toBe(null);
        expect(montlabel.nativeElement.textContent).toBe('Jun');

        fixture.detectChanges();
        headerbtndisabled = getElements('.headerbtndisabled');
        expect(headerbtndisabled).not.toBe(null);
        expect(headerbtndisabled.length).toBe(2);

        prevmonth.nativeElement.click();

        fixture.detectChanges();
        montlabel = getElement('.headermonthtxt .headerlabelbtn');
        expect(montlabel).not.toBe(null);
        expect(montlabel.nativeElement.textContent).toBe('Jun');

        fixture.detectChanges();
        let nextyear = getElement(NEXTYEAR);
        expect(nextyear).not.toBe(null);
        nextyear.nativeElement.click();

        fixture.detectChanges();
        yearlabel = getElement('.headeryeartxt .headerlabelbtn');
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.nativeElement.textContent).toBe('2016');
    });

    it('options - show week numbers', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 1, year: 2017};
        comp.options = {showWeekNumbers: false};
        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let weekdaytitleweeknbr = getElement('.weekdaytitleweeknbr');
        expect(weekdaytitleweeknbr).toBe(null);

        fixture.detectChanges();
        let daycellweeknbr = getElements('.daycellweeknbr');
        expect(daycellweeknbr.length).toBe(0);

        btnpicker.nativeElement.click();


        comp.options = {showWeekNumbers: true};
        comp.parseOptions();

        fixture.detectChanges();
        btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        weekdaytitleweeknbr = getElement('.weekdaytitleweeknbr');
        expect(weekdaytitleweeknbr).not.toBe(null);

        fixture.detectChanges();
        daycellweeknbr = getElements('.daycellweeknbr');
        expect(daycellweeknbr.length).toBe(6);

        expect(daycellweeknbr[0].nativeElement.textContent.trim()).toBe('52');
        expect(daycellweeknbr[1].nativeElement.textContent.trim()).toBe('1');
        expect(daycellweeknbr[2].nativeElement.textContent.trim()).toBe('2');
        expect(daycellweeknbr[3].nativeElement.textContent.trim()).toBe('3');
        expect(daycellweeknbr[4].nativeElement.textContent.trim()).toBe('4');
        expect(daycellweeknbr[5].nativeElement.textContent.trim()).toBe('5');

        fixture.detectChanges();
        let prevyear = getElement(PREVYEAR);
        expect(prevyear).not.toBe(null);
        prevyear.nativeElement.click();

        fixture.detectChanges();
        daycellweeknbr = getElements('.daycellweeknbr');
        expect(daycellweeknbr.length).toBe(6);

        expect(daycellweeknbr[0].nativeElement.textContent.trim()).toBe('53');
        expect(daycellweeknbr[1].nativeElement.textContent.trim()).toBe('1');
        expect(daycellweeknbr[2].nativeElement.textContent.trim()).toBe('2');
        expect(daycellweeknbr[3].nativeElement.textContent.trim()).toBe('3');
        expect(daycellweeknbr[4].nativeElement.textContent.trim()).toBe('4');
        expect(daycellweeknbr[5].nativeElement.textContent.trim()).toBe('5');

        prevyear.nativeElement.click();

        fixture.detectChanges();
        daycellweeknbr = getElements('.daycellweeknbr');
        expect(daycellweeknbr.length).toBe(6);

        expect(daycellweeknbr[0].nativeElement.textContent.trim()).toBe('1');
        expect(daycellweeknbr[1].nativeElement.textContent.trim()).toBe('2');
        expect(daycellweeknbr[2].nativeElement.textContent.trim()).toBe('3');
        expect(daycellweeknbr[3].nativeElement.textContent.trim()).toBe('4');
        expect(daycellweeknbr[4].nativeElement.textContent.trim()).toBe('5');
        expect(daycellweeknbr[5].nativeElement.textContent.trim()).toBe('6');
    });

    it('options - min year', () => {
        comp.visibleMonth = {monthTxt: 'May', monthNbr: 11, year: 2016};
        comp.options = {
            minYear: 2000
        };

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let yearlabel = getElement('.headeryeartxt .headerlabelbtn');
        expect(yearlabel).not.toBe(null);
        yearlabel.nativeElement.click();

        fixture.detectChanges();
        let yearinput = getElement('.yearinput');
        expect(yearinput).not.toBe(null);

        comp.onUserYearInput('1999');

        fixture.detectChanges();
        let invalidyear = getElement('.invalidyear');
        expect(invalidyear).not.toBe(null);

        comp.onUserYearInput('2000');

        fixture.detectChanges();
        yearlabel = getElement('.headeryeartxt .headerlabelbtn');
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.nativeElement.textContent).toBe('2000');
    });

    it('options - max year', () => {
        comp.visibleMonth = {monthTxt: 'May', monthNbr: 11, year: 2016};
        comp.options = {
            maxYear: 2020
        };

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let yearlabel = getElement('.headeryeartxt .headerlabelbtn');
        expect(yearlabel).not.toBe(null);
        yearlabel.nativeElement.click();

        fixture.detectChanges();
        let yearinput = getElement('.yearinput');
        expect(yearinput).not.toBe(null);

        comp.onUserYearInput('2021');

        fixture.detectChanges();
        let invalidyear = getElement('.invalidyear');
        expect(invalidyear).not.toBe(null);

        comp.onUserYearInput('2020');

        fixture.detectChanges();
        yearlabel = getElement('.headeryeartxt .headerlabelbtn');
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.nativeElement.textContent).toBe('2020');
    });

    it('options - disable until', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 10, year: 2016};
        comp.options = {
            disableUntil: {year: 2016, month: 10, day: 5},
            disableHeaderButtons: false
        };

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        comp.generateCalendar(10, 2016, true);

        fixture.detectChanges();
        let disabled = getElements('tr .disabled');
        expect(disabled).not.toBe(null);
        expect(disabled.length).toBe(10);

        disabled[0].nativeElement.click();

        fixture.detectChanges();
        let selectedday = getElement('.selectedday');
        expect(selectedday).toBe(null);
    });

    it('options - disable since', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 10, year: 2016};
        comp.options = {
            disableSince: {year: 2016, month: 10, day: 30},
            disableHeaderButtons: false
        };

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        comp.generateCalendar(10, 2016, true);

        fixture.detectChanges();
        let disabled = getElements('tr .disabled');
        expect(disabled).not.toBe(null);
        expect(disabled.length).toBe(8);

        disabled[0].nativeElement.click();

        fixture.detectChanges();
        let selectedday = getElement('.selectedday');
        expect(selectedday).toBe(null);
    });

    it('options - disable dates one by one', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 10, year: 2016};
        comp.options = {
            disableDates: [{year: 2016, month: 10, day: 5}, {year: 2016, month: 10, day: 10}]
        };

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        comp.generateCalendar(10, 2016, true);

        fixture.detectChanges();
        let disabled = getElements('tr .disabled');
        expect(disabled).not.toBe(null);
        expect(disabled.length).toBe(2);

        let firstDisabled = disabled[0];
        expect(firstDisabled.nativeElement.textContent.trim()).toBe('5');

        let lastDisabled = disabled[1];
        expect(lastDisabled.nativeElement.textContent.trim()).toBe('10');
    });

    it('options - enable dates one by one', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 1, year: 2017};
        comp.options = {
            dateFormat: 'dd.mm.yyyy',
            disableDateRanges: [{beginDate: {year: 2017, month: 1, day: 1}, endDate:{year: 2017, month: 1, day: 31}}],
            enableDates: [{year: 2017, month: 1, day: 14}, {year: 2017, month: 1, day: 15}, {year: 2017, month: 1, day: 20}]
        };

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let selector = getElement('.selector');
        expect(selector).not.toBe(null);

        fixture.detectChanges();
        let currmonth = getElements('.caltable tbody tr td');
        expect(currmonth).not.toBe(null);
        expect(currmonth.length).toBe(42);

        fixture.detectChanges();
        currmonth[19].nativeElement.click();

        fixture.detectChanges();
        let selectedday = getElement('.selectedday');
        expect(selectedday).not.toBe(null);

        fixture.detectChanges();
        currmonth = getElements('.caltable tbody tr td');
        currmonth[21].nativeElement.click();

        fixture.detectChanges();
        currmonth = getElements('.caltable tbody tr td');
        currmonth[25].nativeElement.click();


        fixture.detectChanges();
        btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let selecteddaygreen = getElement('.selecteddaygreen');
        expect(selecteddaygreen).not.toBe(null);

        fixture.detectChanges();
        let range = getElements('.caltable .range');
        expect(range).not.toBe(null);
        expect(range.length).toBe(7);

        fixture.detectChanges();
        let selection = getElement('.selection');
        expect(selection.nativeElement.value).toContain('14.01.2017 - 20.01.2017');

        fixture.detectChanges();
        let btnclear = getElement('.btnclear');
        btnclear.nativeElement.click();

        fixture.detectChanges();
        selection = getElement('.selection');
        expect(selection.nativeElement.value).toEqual('');
    });

    it('options - disable date ranges one by one', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 10, year: 2016};
        comp.options = {
            disableDateRanges: [
                {beginDate: {year: 2016, month: 10, day: 5}, endDate: {year: 2016, month: 10, day: 7}},
                {beginDate: {year: 2016, month: 10, day: 10}, endDate: {year: 2016, month: 10, day: 12}}
                ]
        };

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        comp.generateCalendar(10, 2016, true);

        fixture.detectChanges();
        let disabled = getElements('tr .disabled');
        expect(disabled).not.toBe(null);
        expect(disabled.length).toBe(6);

        expect(disabled[0].nativeElement.textContent.trim()).toBe('5');
        expect(disabled[1].nativeElement.textContent.trim()).toBe('6');
        expect(disabled[2].nativeElement.textContent.trim()).toBe('7');

        expect(disabled[3].nativeElement.textContent.trim()).toBe('10');
        expect(disabled[4].nativeElement.textContent.trim()).toBe('11');
        expect(disabled[5].nativeElement.textContent.trim()).toBe('12');
    });

    it('options - inline', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 11, year: 2016};
        comp.options = {
            inline: true
        };

        comp.parseOptions();

        fixture.detectChanges();
        let selector = getElement('.selector');
        expect(selector).not.toBe(null);

        fixture.detectChanges();
        let selectiongroup = getElement('.selectiongroup');
        expect(selectiongroup).toBe(null);
    });

    it('options - show clear date range button', () => {
        let date = new Date();
        comp.selectedMonth = {monthTxt: '', monthNbr: date.getMonth() + 1, year: date.getFullYear()};

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let currday = getElement('.currday');
        expect(currday).not.toBe(null);
        currday.nativeElement.click();

        fixture.detectChanges();
        currday = getElement('.currday');
        expect(currday).not.toBe(null);
        currday.nativeElement.click();

        fixture.detectChanges();
        let btnclear = getElement('.btnclear');
        expect(btnclear).not.toBe(null);
        btnclear.nativeElement.click();


        comp.options = {showClearDateRangeBtn: false};
        comp.parseOptions();

        fixture.detectChanges();
        btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        currday = getElement('.currday');
        expect(currday).not.toBe(null);
        currday.nativeElement.click();

        fixture.detectChanges();
        currday = getElement('.currday');
        expect(currday).not.toBe(null);
        currday.nativeElement.click();

        fixture.detectChanges();
        btnclear = getElement('.btnclear');
        expect(btnclear).toBe(null);
    });

    it('options - height', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 11, year: 2016};
        comp.options = {
            height: '50px'
        };

        comp.parseOptions();

        fixture.detectChanges();
        let selection = getElement('.selection');
        expect(selection).not.toBe(null);
        expect(selection.styles['height']).toBe('50px');
    });

    it('options - width', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 11, year: 2016};
        comp.options = {
            width: '300px'
        };

        comp.parseOptions();

        fixture.detectChanges();
        expect(de).not.toBe(null);
        expect(de.styles['width']).toBe('300px');

        comp.options = {width: '20%'};

        comp.parseOptions();

        fixture.detectChanges();
        expect(de).not.toBe(null);
        expect(de.styles['width']).toBe('20%');
    });

    it('options - selection text font size', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 11, year: 2016};
        comp.options = {
            selectionTxtFontSize: '10px'
        };

        comp.parseOptions();

        fixture.detectChanges();
        let selection = getElement('.selection');
        expect(selection).not.toBe(null);
        expect(selection.styles['font-size']).toBe('10px');
    });

    it('options - align selector right', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 11, year: 2016};
        comp.options = {
            alignSelectorRight: true
        };

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        comp.parseOptions();

        fixture.detectChanges();
        let alignselectorright = getElement('.alignselectorright');
        expect(alignselectorright).not.toBe(null);

        comp.options = {
            alignSelectorRight: false
        };

        comp.parseOptions();

        fixture.detectChanges();
        alignselectorright = getElement('.alignselectorright');
        expect(alignselectorright).toBe(null);
    });

    it('options - indicate invalid date range', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 11, year: 2016};
        comp.options = {
            indicateInvalidDate: true,
            dateFormat: 'dd.mm.yyyy'
        };

        comp.parseOptions();

        comp.onUserDateRangeInput('2016-08-22 - 2016-08-24');
        fixture.detectChanges();
        let invaliddate = getElement('.invaliddaterange');
        expect(invaliddate).not.toBe(null);

        comp.onUserDateRangeInput('22.xx.2016 - 24.yy.2016');
        fixture.detectChanges();
        invaliddate = getElement('.invaliddaterange');
        expect(invaliddate).not.toBe(null);

        comp.onUserDateRangeInput('22.14.2016 - 24.15.2016');
        fixture.detectChanges();
        invaliddate = getElement('.invaliddaterange');
        expect(invaliddate).not.toBe(null);

        comp.onUserDateRangeInput('10.10.2016 - 11.11.2016');
        fixture.detectChanges();
        invaliddate = getElement('.invaliddaterange');
        expect(invaliddate).toBe(null);
    });

    it('options - disable component', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 11, year: 2016};
        comp.options = {componentDisabled: true};
        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');

        btnpicker.nativeElement.click();
        fixture.detectChanges();

        let selector = getElement('.selector');
        expect(selector).toBe(null);

        fixture.detectChanges();
        let selection = getElement('.selection');
        expect(selector).toBe(null);
    });

    it('options - editable date range field', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 10, year: 2016};
        comp.options = {editableDateRangeField: false};
        comp.parseOptions();

        fixture.detectChanges();
        let selection = getElement('.selection');

        selection.nativeElement.value = '2016-11-14 - 2016-12-16';

        fixture.detectChanges();
        expect(selection.nativeElement.value).toContain('');

        comp.options = {editableDateRangeField: true};
        comp.parseOptions();

        fixture.detectChanges();
        selection = getElement('.selection');

        selection.nativeElement.value = '2016-11-14 - 2016-12-18';

        fixture.detectChanges();
        expect(selection.nativeElement.value).toContain('2016-11-14 - 2016-12-18');
    });

    it('options - show selector arrow', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 10, year: 2016};
        comp.options = {};
        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let selectorarrow = getElement('.selectorarrow');
        expect(selectorarrow).not.toBe(null);
        btnpicker.nativeElement.click();


        comp.options = {showSelectorArrow: false};
        comp.parseOptions();

        fixture.detectChanges();
        btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        selectorarrow = getElement('.selectorarrow');
        expect(selectorarrow).toBe(null);
        btnpicker.nativeElement.click();


        comp.options = {showSelectorArrow: true};
        comp.parseOptions();

        fixture.detectChanges();
        btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        selectorarrow = getElement('.selectorarrow');
        expect(selectorarrow).not.toBe(null);
        btnpicker.nativeElement.click();
    });

    it('options - click input to open selector', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 10, year: 2016};
        comp.options = {editableDateField: true};
        comp.parseOptions();

        fixture.detectChanges();
        let selection = getElement('.selection');

        selection.nativeElement.click();

        fixture.detectChanges();
        let selector = getElement('.selector');
        expect(selector).toBe(null);

        comp.options = {editableDateRangeField: false, openSelectorOnInputClick: true};
        comp.parseOptions();

        fixture.detectChanges();
        selection = getElement('.selection');
        selection.nativeElement.click();

        fixture.detectChanges();
        selector = getElement('.selector');
        expect(selector).not.toBe(null);
    });

    // attributes
    it('selDateRange - initially selected date range - month as number', () => {
        comp.selectionDayTxt = '2016-11-04 - 2016-11-18';

        comp.options = {
            dateFormat: 'yyyy-mm-dd'
        };

        comp.parseOptions();

        let splitted = comp.selectionDayTxt.split(' - ');
        comp.beginDate = comp.parseSelectedDate(splitted[0]);
        comp.endDate = comp.parseSelectedDate(splitted[1]);

        fixture.detectChanges();
        let selection = getElement('.selection');
        expect(selection).not.toBe(null);
        expect(selection.nativeElement.value).toContain(comp.selectionDayTxt);

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();


        fixture.detectChanges();
        let selectedday = getElements('.selectedday');
        expect(selectedday).not.toBe(null);
        expect(selectedday[0].nativeElement.textContent.trim()).toBe('4');
        expect(selectedday[1].nativeElement.textContent.trim()).toBe('18');

        fixture.detectChanges();
        let selecteddaygreen = getElement('.selecteddaygreen');
        expect(selecteddaygreen).not.toBe(null);
        expect(selecteddaygreen.nativeElement.textContent.trim()).toBe('4');

        fixture.detectChanges();
        let range = getElements('.caltable .range');
        expect(range).not.toBe(null);
        expect(range.length).toBe(15);

        fixture.detectChanges();
        let disabled = getElements('.disabled');
        expect(disabled).not.toBe(null);
        expect(disabled.length).toBe(23);
    });

    it('selDateRange - initially selected date range - mont as text', () => {
        comp.selectionDayTxt = '04 Nov 2016 - 18 Nov 2016';

        comp.options = {
            dateFormat: 'dd mmm yyyy'
        };

        comp.parseOptions();

        let splitted = comp.selectionDayTxt.split(' - ');
        comp.beginDate = comp.parseSelectedDate(splitted[0]);
        comp.endDate = comp.parseSelectedDate(splitted[1]);

        fixture.detectChanges();
        let selection = getElement('.selection');
        expect(selection).not.toBe(null);
        expect(selection.nativeElement.value).toContain(comp.selectionDayTxt);

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();


        fixture.detectChanges();
        let selectedday = getElements('.selectedday');
        expect(selectedday).not.toBe(null);
        expect(selectedday[0].nativeElement.textContent.trim()).toBe('4');
        expect(selectedday[1].nativeElement.textContent.trim()).toBe('18');

        fixture.detectChanges();
        let selecteddaygreen = getElement('.selecteddaygreen');
        expect(selecteddaygreen).not.toBe(null);
        expect(selecteddaygreen.nativeElement.textContent.trim()).toBe('4');

        fixture.detectChanges();
        let range = getElements('.caltable .range');
        expect(range).not.toBe(null);
        expect(range.length).toBe(15);

        fixture.detectChanges();
        let disabled = getElements('.disabled');
        expect(disabled).not.toBe(null);
        expect(disabled.length).toBe(23);
    });

    it('defaultMonth - initially selected month', () => {
        comp.selectedMonth = comp.parseSelectedMonth('08/2019');
        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let monthLabel = getElement('.headermonthtxt .headerlabelbtn');
        expect(monthLabel).not.toBe(null);
        expect(monthLabel.nativeElement.textContent).toBe('Aug');

        fixture.detectChanges();
        let yearLabel = getElement('.headeryeartxt .headerlabelbtn');
        expect(yearLabel).not.toBe(null);
        expect(yearLabel.nativeElement.textContent).toBe('2019');
    });

    it('placeholder - placeholder text', () => {
        comp.placeholder = '';

        fixture.detectChanges();
        let selection = getElement('.selection');
        expect(selection).not.toBe(null);
        expect(selection.properties['placeholder']).toBe('');

        comp.placeholder = 'Select date range';

        fixture.detectChanges();
        selection = getElement('.selection');
        expect(selection).not.toBe(null);
        expect(selection.properties['placeholder']).toBe(comp.placeholder);
    });
});





