 Popover similar to the bootstrap popover.
 
 Use:
 Put the app-popover property as the element attribute where you would like to use it, along with a 
 title attribute( popover title).
 Inside popover two element with class:
 a) popover content -> The popover main content below title
 b) action-button -> The button/element on whose click the popover must be displayed.
 
 e.g.
 <div app-popover title="Manage public holidays" >
      <div class="popover-content">
        popover content
      </div>
      <div class="action-button">
        <app-edit-button>
        </app-edit-button>
      </div>
    </div>
