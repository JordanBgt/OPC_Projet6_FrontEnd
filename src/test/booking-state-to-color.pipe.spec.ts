import { BookingStateToColorPipe } from '../app/shared/booking-state-to-color.pipe';

describe('BookingStateToColorPipe', () => {
  it('create an instance', () => {
    const pipe = new BookingStateToColorPipe();
    expect(pipe).toBeTruthy();
  });
});
