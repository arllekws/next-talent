import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(firebaseUid: string, email: string, displayName: string, photoURL?: string) {
    return this.usersService.findOrCreate(firebaseUid, email, displayName, photoURL);
  }

  async getMe(firebaseUid: string) {
    return this.usersService.findByFirebaseUid(firebaseUid);
  }
}
