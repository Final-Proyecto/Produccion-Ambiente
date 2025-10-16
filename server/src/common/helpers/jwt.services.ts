import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UnauthorizedException } from "@nestjs/common";
import { IPayload} from "../interface/jwt.interface";

@Injectable()
export class CustomJwtService {
  constructor(private jwtService: JwtService) {}

  async createToken(payload: IPayload): Promise<string> {
    try {
      console.log("🔐 Creating token with payload:", payload); // DEBUG

      // Validar que el payload no esté vacío
      if (!payload || !payload.sub) {
        throw new Error("Payload incompleto: falta el subject (sub)");
      }
      const token = this.jwtService.sign(payload);
      console.log(token);
      return token;
    } catch (error) {
      throw new Error("Se produjo un error al crear las credenciales");
    }
  }


  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException("Token inválido o expirado.");
    }
  }
}