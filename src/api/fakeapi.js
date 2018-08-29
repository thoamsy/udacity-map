const delay = ms => new Promise(r => setTimeout(r, ms));

export const fakeApi = () =>
  delay(300).then(() => ({
    title: 'here',
  }));
