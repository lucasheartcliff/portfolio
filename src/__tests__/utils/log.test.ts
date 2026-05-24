import heartcliff from '../../utils/log';

describe('heartcliff', () => {
  it('should log the creator message', () => {
    const spy = jest.spyOn(console, 'info').mockImplementation();
    heartcliff();
    expect(spy).toHaveBeenCalledWith(
      '%cCreated by Lucas Heartcliff',
      'color: orange'
    );
    spy.mockRestore();
  });
});
