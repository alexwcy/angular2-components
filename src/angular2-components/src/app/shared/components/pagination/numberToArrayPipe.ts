import {Pipe, PipeTransform} from "@angular/core";

/**
 * @description this pipe is
 * a) converting number to array
 * b) deciding the min value between the range the the total pages
 * c) pushing arrows for the pagination bar
 * d) +1 to prevent 0
 */
@Pipe({ name: 'numberToArray' })
export class NumberToArray implements PipeTransform {
    transform(value, args: number, activePage: number): any {
        let res = [];
        let range = 5;
        if(value < 4){
            range = value;
        }
        let totalPages = parseInt(value);

        for (let i = 0; i < range / 2; i++) {
            // make the active page as the center of the pagination bar
            let pageNumber = (activePage - i);
            // pageNumber = pageNumber.toString();
            if (pageNumber > 0)
                res.push(pageNumber);
        }
        let temp = res.length;
        for (let i = 1; i <= (range - temp); i++) {
            // make the active page as the center of the pagination bar
            let pageNumber = (activePage + i);
            // pageNumber = pageNumber.toString();
            res.push(pageNumber);
        }
        res.sort(function(a, b) { return a - b });


        res.unshift("«");
        res.push("»");
        return res;
    }
}
