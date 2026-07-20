import { HttpInterceptorFn } from "@angular/common/http";

export const JwtBearerAuthorization: HttpInterceptorFn = (req, next) => {
  const authData = JSON.parse(localStorage.getItem('authData') || 'null'); // Or your key

  if (authData && authData.token) {
    // Clone is required — requests are immutable
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authData.token}`)
    });
    return next(authReq);
  }

  return next(req);
}
