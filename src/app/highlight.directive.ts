import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private element: ElementRef) {
    // 자바스크립트의 node객체를 가져와서 처리하는부분
    // ex> document.getElementById == element.nativeElement 와 같음
    // element.nativeElement.style.backgroundColor = 'yellow';
  }

  @Input()
  private highlightColor: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || 'yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.element.nativeElement.style.backgroundColor = color;
  }

}
