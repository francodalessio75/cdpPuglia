import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import {
  KtdDragEnd,
  KtdDragStart,
  KtdGridComponent,
  KtdGridLayout,
  KtdGridLayoutItem,
  KtdResizeEnd,
  KtdResizeStart,
  ktdTrackById
} from '@katoid/angular-grid-layout';


function ktdArrayRemoveItem<T>(array: T[], condition: (item: T) => boolean) {
  const arrayCopy = [...array];
  const index = array.findIndex((item) => condition(item));
  if (index > -1) {
      arrayCopy.splice(index, 1);
  }
  return arrayCopy;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(KtdGridComponent, { static: true }) grid!: KtdGridComponent;
  trackById = ktdTrackById;

  cols = 12;
  rowHeight = 50;
  compactType: 'vertical' | 'horizontal' | null = 'vertical';
  
  widgetTemplate='';
  
  layout: KtdGridLayout = [
    { id: '0', x: 5, y: 0, w: 2, h: 3 },
    { id: '1', x: 2, y: 2, w: 1, h: 2 },
    { id: '2', x: 3, y: 7, w: 1, h: 2 },
    { id: '3', x: 2, y: 0, w: 3, h: 2 }
  ];

  transitions: { name: string; value: string }[] = [
    {
      name: 'ease',
      value: 'transform 500ms ease, width 500ms ease, height 500ms ease'
    },
    {
      name: 'ease-out',
      value:
        'transform 500ms ease-out, width 500ms ease-out, height 500ms ease-out'
    },
    {
      name: 'linear',
      value: 'transform 500ms linear, width 500ms linear, height 500ms linear'
    },
    {
      name: 'overflowing',
      value:
        'transform 500ms cubic-bezier(.28,.49,.79,1.35), width 500ms cubic-bezier(.28,.49,.79,1.35), height 500ms cubic-bezier(.28,.49,.79,1.35)'
    },
    {
      name: 'fast',
      value: 'transform 200ms ease, width 200ms linear, height 200ms linear'
    },
    {
      name: 'slow-motion',
      value:
        'transform 1000ms linear, width 1000ms linear, height 1000ms linear'
    },
    { name: 'transform-only', value: 'transform 500ms ease' }
  ];
  currentTransition: string = this.transitions[0].value;

  dragStartThreshold = 0;
  disableDrag = false;
  disableResize = false;
  disableRemove = false;
  autoResize = true;
  preventCollision = false;
  isDragging = false;
  isResizing = false;
  resizeSubscription!: Subscription;

  /* #region utilities */
  constructor(private ngZone: NgZone) {
    // this.ngZone.onUnstable.subscribe(() => console.log('UnStable'));
  }

  ngOnInit() {
    this.resizeSubscription = merge(
      fromEvent(window, 'resize'),
      fromEvent(window, 'orientationchange')
    )
      .pipe(
        debounceTime(50),
        filter(() => this.autoResize)
      )
      .subscribe(() => {
        this.grid.resize();
      });
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
  }

  onDragStarted(event: KtdDragStart) {
    this.isDragging = true;
  }

  onResizeStarted(event: KtdResizeStart) {
    this.isResizing = true;
  }

  onDragEnded(event: KtdDragEnd) {
    this.isDragging = false;
  }

  onResizeEnded(event: KtdResizeEnd) {
    this.isResizing = false;
  }

  onLayoutUpdated(layout: KtdGridLayout) {
    console.log('on layout updated', layout);
    this.layout = layout;
  }

  onCompactTypeChange(change: MatSelectChange) {
    console.log('onCompactTypeChange', change);
    this.compactType = change.value;
  }

  onTransitionChange(change: MatSelectChange) {
    console.log('onTransitionChange', change);
    this.currentTransition = change.value;
  }

  onDisableDragChange(checked: boolean) {
    this.disableDrag = checked;
  }

  onDisableResizeChange(checked: boolean) {
    this.disableResize = checked;
  }

  onDisableRemoveChange(checked: boolean) {
    this.disableRemove = checked;
  }

  onAutoResizeChange(checked: boolean) {
    this.autoResize = checked;
  }

  onPreventCollisionChange(checked: boolean) {
    this.preventCollision = checked;
  }

  onColsChange(event: Event) {
    this.cols = parseInt((event.target as HTMLInputElement).value, 10);
  }

  onRowHeightChange(event: Event) {
    this.rowHeight = parseInt((event.target as HTMLInputElement).value, 10);
  }

  onDragStartThresholdChange(event: Event) {
    this.dragStartThreshold = parseInt(
      (event.target as HTMLInputElement).value,
      10
    );
  }

  /* #endregion */

  generateLayout() {
    const layout: KtdGridLayout = [];
    for (let i = 0; i < this.cols; i++) {
      const y = Math.ceil(Math.random() * 4) + 1;
      layout.push({
        x: Math.round(Math.random() * Math.floor(this.cols / 2 - 1)) * 2,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        id: i.toString()
        // static: Math.random() < 0.05
      });
    }
    console.log('layout', layout);
    this.layout = layout;
  }

  onInsertWidgetChange() {

    // let newWidgetContentId = this.addItemToLayout();

    // let host = document.getElementById(newWidgetContentId) as HTMLDivElement;

    // let template = document.getElementById('threats-diagram')! as HTMLTemplateElement;
    
    // const importedNode = document.importNode(
    //   template.children[0],
    //   true
    // );

    // let element = importedNode.firstElementChild as Element;

    // host.insertAdjacentElement(
    //   'afterbegin',
    //   element
    // );

    //console.log(document.querySelector('.grid-item-content'))

    this.addItemToLayout();

    let host = document.querySelector('.grid-item') as HTMLDivElement;

    let template = document.getElementById('threats-search')! as HTMLTemplateElement;

    const importedNode = document.importNode(
      template.children[0],
      true
    );

    let element = importedNode.firstElementChild as Element;

    host.insertAdjacentElement(
      'afterbegin',
      element
    );
  }

  /** Adds a grid item to the layout */
  addItemToLayout(){
    const maxId = this.layout.reduce(
      (acc, cur) => Math.max(acc, parseInt(cur.id, 10)),
      -1
    );

    const nextId = maxId + 1;

    const newLayoutItem: KtdGridLayoutItem = {
      id: nextId.toString(),
      x: 0,
      y: 0,
      w: 2,
      h: 2
    };

    // Important: Don't mutate the array, create new instance. This way notifies the Grid component that the layout has changed.
    this.layout = [newLayoutItem, ...this.layout];
  }

  /**
   * Fired when a mousedown happens on the remove grid item button.
   * Stops the event from propagating an causing the drag to start.
   * We don't want to drag when mousedown is fired on remove icon button.
   */
  stopEventPropagation(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  /** Removes the item from the layout */
  removeItem(id: string) {
    // Important: Don't mutate the array. Let Angular know that the layout has changed creating a new reference.
    this.layout = ktdArrayRemoveItem(this.layout, item => item.id === id);
  }

}
