# Reproduction

1. `npm install`
2. `npm run build`
3. Note that the build fails

```typescript
// Since this is before accessing the Request object,
// Next will try to prerender this...
await someAsyncFunc();

// But I expect this GET to be dynamically rendered
// since I'm using the Request object.
// If I  move this block above the await above, it works.
const { searchParams } = new URL(req.url);
const title = searchParams?.get("title") || "";
```

4. Move the `await someAsyncFunc();` line below the searchParams like:

```typescript
// Since the reference to the Request object is first,
// Next build does not prerender this route
const { searchParams } = new URL(req.url);
const title = searchParams?.get("title") || "";

// build doesn't error b/c this is a dynamic route, as expected
await someAsyncFunc();
```

5. `npm run build`
6. Note the build is succesful b/c it treats /api/hello as dynamic
