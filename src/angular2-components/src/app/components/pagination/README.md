## Material pagination

<material-pagination
  [showPrevNext]="true"
  (onChange)="getOtherPageData(pageNumber)"
  [itemsPerPage]="10"
  [totalItems]="5000"
   [range]="5">
  </material-pagination>

Click on a page number or the arrows will trigger the function getOtherPageData and pass the page number
which was clicked on the pagination bar so appropriate API call can be made based on the same to get the data
and show the same in the view.
