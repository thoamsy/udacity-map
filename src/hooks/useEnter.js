export default function useEnter(fn) {
  return event => {
    event.preventDefault();
    const { key } = event;
    if (key === ' ' || key === 'Enter') {
      fn(event);
    }
  };
}
