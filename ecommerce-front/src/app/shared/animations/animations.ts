import { trigger, style, transition, animate } from '@angular/animations';

export const slideAnimation = trigger('slideAnimation', [
  transition(':enter', [
    style({        
      opacity: '0',
      transform: 'translateX(100%)'  
    }),
    animate('500ms ease-in', style({
      opacity: '1',
      transform: 'translateX(0%)' 
    }))
  ]),
  transition(':leave', [
    style({        
      opacity: '1',
      transform: 'translateX(0%)'  
    }),
    animate('500ms ease-out', style({
      opacity: '1',
      transform: 'translateX(-100%)'
    }))
  ]),
])