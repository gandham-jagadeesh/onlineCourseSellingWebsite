import { AuthGuard } from "@nestjs/passport";

export class jwtRefresh extends AuthGuard('jwt-refresh'){}