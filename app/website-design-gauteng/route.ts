export function GET(request: Request) {
  return Response.redirect(new URL('/web-design-johannesburg', request.url), 301)
}