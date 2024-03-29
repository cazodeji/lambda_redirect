class BaseError extends Error {
  statusCode;
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
class NotFoundError extends BaseError {
  constructor(message) {
    super(404, message);
  }
}
class DuplicateEntryError extends BaseError {
  constructor(message) {
    super(403, message);
  }
}
class MismatchError extends BaseError {
  constructor(message) {
    super(401, message);
  }
}
class UnauthorizedError extends BaseError {
  constructor(message) {
    super(403, message);
  }
}
class ServerError extends BaseError {
  constructor(message) {
    super(500, message);
  }
}
export {
  DuplicateEntryError,
  MismatchError,
  NotFoundError,
  ServerError,
  UnauthorizedError
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcGFja2FnZXMvZnVuY3Rpb25zL3NyYy9vcmlnaW4tbGFtYmRhL2Vycm9yLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjbGFzcyBCYXNlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgcHVibGljIHN0YXR1c0NvZGU7XG4gIFxuICAgIGNvbnN0cnVjdG9yKHN0YXR1c0NvZGU6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgdGhpcy5zdGF0dXNDb2RlID0gc3RhdHVzQ29kZTtcbiAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgfVxuICB9XG4gIFxuICBleHBvcnQgY2xhc3MgTm90Rm91bmRFcnJvciBleHRlbmRzIEJhc2VFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICBzdXBlcig0MDQsIG1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuICBcbiAgZXhwb3J0IGNsYXNzIER1cGxpY2F0ZUVudHJ5RXJyb3IgZXh0ZW5kcyBCYXNlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgc3VwZXIoNDAzLCBtZXNzYWdlKTtcbiAgICB9XG4gIH1cbiAgXG4gIGV4cG9ydCBjbGFzcyBNaXNtYXRjaEVycm9yIGV4dGVuZHMgQmFzZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgIHN1cGVyKDQwMSwgbWVzc2FnZSk7XG4gICAgfVxuICB9XG4gIFxuICBleHBvcnQgY2xhc3MgVW5hdXRob3JpemVkRXJyb3IgZXh0ZW5kcyBCYXNlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgc3VwZXIoNDAzLCBtZXNzYWdlKTtcbiAgICB9XG4gIH1cbiAgXG4gIGV4cG9ydCBjbGFzcyBTZXJ2ZXJFcnJvciBleHRlbmRzIEJhc2VFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICBzdXBlcig1MDAsIG1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuICAiXSwKICAibWFwcGluZ3MiOiAiQUFBQSxNQUFNLGtCQUFrQixNQUFNO0FBQUEsRUFDbkI7QUFBQSxFQUVQLFlBQVksWUFBb0IsU0FBaUI7QUFDL0MsVUFBTTtBQUNOLFNBQUssYUFBYTtBQUNsQixTQUFLLFVBQVU7QUFBQSxFQUNqQjtBQUNGO0FBRU8sTUFBTSxzQkFBc0IsVUFBVTtBQUFBLEVBQzNDLFlBQVksU0FBaUI7QUFDM0IsVUFBTSxLQUFLLE9BQU87QUFBQSxFQUNwQjtBQUNGO0FBRU8sTUFBTSw0QkFBNEIsVUFBVTtBQUFBLEVBQ2pELFlBQVksU0FBaUI7QUFDM0IsVUFBTSxLQUFLLE9BQU87QUFBQSxFQUNwQjtBQUNGO0FBRU8sTUFBTSxzQkFBc0IsVUFBVTtBQUFBLEVBQzNDLFlBQVksU0FBaUI7QUFDM0IsVUFBTSxLQUFLLE9BQU87QUFBQSxFQUNwQjtBQUNGO0FBRU8sTUFBTSwwQkFBMEIsVUFBVTtBQUFBLEVBQy9DLFlBQVksU0FBaUI7QUFDM0IsVUFBTSxLQUFLLE9BQU87QUFBQSxFQUNwQjtBQUNGO0FBRU8sTUFBTSxvQkFBb0IsVUFBVTtBQUFBLEVBQ3pDLFlBQVksU0FBaUI7QUFDM0IsVUFBTSxLQUFLLE9BQU87QUFBQSxFQUNwQjtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
