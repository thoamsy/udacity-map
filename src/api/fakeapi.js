const delay = ms => new Promise(r => setTimeout(r, ms));

export const fakeApi = () =>
  delay(3000).then(() => ({
    title: 'here',
  }));
