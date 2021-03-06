import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe which returns a color value according to BookingState value
 */

@Pipe({
  name: 'bookingStateToColor'
})
export class BookingStateToColorPipe implements PipeTransform {

  transform(value: string): string {

    switch (value) {
      case 'ACCEPTED':
        return 'accepted';
      case 'CANCELED':
      case 'REFUSED':
        return 'refused';
      case 'PENDING':
        return 'pending';
      default:
        return 'default';
    }
  }

}
