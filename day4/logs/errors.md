# Application Error Logs

## Possible Errors

1. JSON Parse Error
   - Cause: Corrupted localStorage data
   - Handling: Wrapped in try/catch

2. LocalStorage Quota Exceeded
   - Cause: Too much data
   - Handling: try/catch in saveTodos()

3. Null Button Click
   - Cause: Clicking outside button
   - Handling: closest("button") guard
