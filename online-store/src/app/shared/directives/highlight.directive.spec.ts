import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HighlightDirective],
    });
  });

  it('should create an instance', () => {
    const elementRef = new ElementRef(document.createElement('div'));
    const directive = new HighlightDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
