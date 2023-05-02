export default defineEventHandler((event) => {
  const { page = 0, size = 10, offset = 0 } = getQuery(event);
});
