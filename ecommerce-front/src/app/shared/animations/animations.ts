import { trigger, style, transition, animate, state, AnimationTriggerMetadata } from '@angular/animations';

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

export const dropDownAnimation = trigger('dropDownAnimation', [
  state(
    'open',
    style({
      opacity: '1',
      'z-index': 20,
      transform: 'translateY(0%)' 
    })
  ),
  state(
    'closed',
    style({
      opacity: '0',
      'z-index': '-1',
      transform: 'translateY(-10%)' 
    })
  ),
  transition('open <=> closed', [animate('200ms')]),
])

export function FadeInOut(timingIn: number, timingOut: number, height: boolean = false): AnimationTriggerMetadata  {
  return trigger('fadeInOut', [
    transition(':enter', [
      style(height ? { opacity: 0 , height: 0, } : { opacity: 0, }),
      animate(timingIn, style(height ? { opacity: 1, height: 'fit-content' } : { opacity: 1, })),
    ]),
    transition(':leave', [
      animate(
        timingOut, 
        style(
          height ? { opacity: 0, height: 0, } : { opacity: 0, })),
    ])
  ]);
}