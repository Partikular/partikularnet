export const pageTransitions = {
  initial: {
    x: -100,
    opacity: 0,
  },
  in: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.1 },
  },
  out: {
    opacity: 0,
    x: 1000,
    transition: { duration: 0.2 },
  },
};
