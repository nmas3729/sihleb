export function GET(request: Request) {
  const destination = process.env.NODE_ENV === 'production'
    ? 'https://sihleb.co.za/web-design-johannesburg'
    : new URL('/web-design-johannesburg', request.url)

  return Response.redirect(destination, 301)
}