const handler = async (event, context, callback) => {
  const request = event?.Records[0]?.cf.request;
  const response = event.Records[0]?.cf.response;
  console.log("request", request.querystring);
  request.headers["x-forwarded-host"] = [
    { key: "X-Forwarded-Host", value: request.headers.host[0].value }
  ];
  request.headers["x-forwarded-query"] = [
    { key: "X-Forwarded-query", value: request.querystring }
  ];
  callback(null, request);
};
const main = handler;
export {
  main
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcGFja2FnZXMvZnVuY3Rpb25zL3NyYy92aWV3ZXItbGFtYmRhL2hhbmRsZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IGhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IGFueSwgY29udGV4dDogYW55LCBjYWxsYmFjazogYW55KSA9PiB7XG5jb25zdCByZXF1ZXN0ID0gZXZlbnQ/LlJlY29yZHNbMF0/LmNmLnJlcXVlc3RcbmNvbnN0IHJlc3BvbnNlID0gZXZlbnQuUmVjb3Jkc1swXT8uY2YucmVzcG9uc2UgXG5jb25zb2xlLmxvZygncmVxdWVzdCcsIHJlcXVlc3QucXVlcnlzdHJpbmcpXG5yZXF1ZXN0LmhlYWRlcnNbJ3gtZm9yd2FyZGVkLWhvc3QnXSA9IFtcbiAgICB7IGtleTogXCJYLUZvcndhcmRlZC1Ib3N0XCIsIHZhbHVlOiByZXF1ZXN0LmhlYWRlcnMuaG9zdFswXS52YWx1ZSB9XG4gIF1cbnJlcXVlc3QuaGVhZGVyc1sneC1mb3J3YXJkZWQtcXVlcnknXSA9IFtcbiAgICB7IGtleTogXCJYLUZvcndhcmRlZC1xdWVyeVwiLCB2YWx1ZTogcmVxdWVzdC5xdWVyeXN0cmluZyB9XG4gIF1cbiAgY2FsbGJhY2sobnVsbCwgcmVxdWVzdClcbn1cbmV4cG9ydCBjb25zdCBtYWluID0gaGFuZGxlciJdLAogICJtYXBwaW5ncyI6ICJBQUFBLE1BQU0sVUFBVSxPQUFPLE9BQVksU0FBYyxhQUFrQjtBQUNuRSxRQUFNLFVBQVUsT0FBTyxRQUFRLENBQUMsR0FBRyxHQUFHO0FBQ3RDLFFBQU0sV0FBVyxNQUFNLFFBQVEsQ0FBQyxHQUFHLEdBQUc7QUFDdEMsVUFBUSxJQUFJLFdBQVcsUUFBUSxXQUFXO0FBQzFDLFVBQVEsUUFBUSxrQkFBa0IsSUFBSTtBQUFBLElBQ2xDLEVBQUUsS0FBSyxvQkFBb0IsT0FBTyxRQUFRLFFBQVEsS0FBSyxDQUFDLEVBQUUsTUFBTTtBQUFBLEVBQ2xFO0FBQ0YsVUFBUSxRQUFRLG1CQUFtQixJQUFJO0FBQUEsSUFDbkMsRUFBRSxLQUFLLHFCQUFxQixPQUFPLFFBQVEsWUFBWTtBQUFBLEVBQ3pEO0FBQ0EsV0FBUyxNQUFNLE9BQU87QUFDeEI7QUFDTyxNQUFNLE9BQU87IiwKICAibmFtZXMiOiBbXQp9Cg==