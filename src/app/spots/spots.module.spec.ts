import { SpotsModule } from './spots.module';

describe('SpotsModule', () => {
  let spotsModule: SpotsModule;

  beforeEach(() => {
    spotsModule = new SpotsModule();
  });

  it('should create an instance', () => {
    expect(spotsModule).toBeTruthy();
  });
});
