import {
    trigger,
    transition,
    style,
    query,
    animate,
} from '@angular/animations';

export const fader =
  trigger('routeAnimations', [
    transition('* <=> *', [
      query(':enter, :leave', [
        style({
            opacity: 0,
        }),
      ],{ optional: true}),
      query(':enter', [
        animate('600ms ease', style({opacity: 0})),
      ],{ optional: true})
    ])
  ]);