import { DraftToolPage } from './app.po';

describe('draft-tool App', () => {
  let page: DraftToolPage;

  beforeEach(() => {
    page = new DraftToolPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
